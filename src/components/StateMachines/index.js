import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'
import {Component} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'

import ClickableRowsDataGrid from '../DataGrids/ClickableRowsDataGrid'
import Machine from './machine'
import {getStateMachines} from './remote'

const columns = [
  {field: 'name', headerName: 'Name', flex: 1}
]

const sortModel = [
  {
    field: 'name',
    sort: 'asc'
  }
]

function renderGrid(state, props) {
  const {rows, error, isLoading} = state
  const {match, history} = props
  const {path} = match
  const clickHandler = getRowClickHandler(history, path)
  if (isLoading)
    return (<CircularProgress />)

  return (
    <ClickableRowsDataGrid
      error={error}
      rows={rows}
      columns={columns}
      sortModel={sortModel}
      onRowClick={clickHandler}
      isRowSelectable={false}
      hideFooterPagination={true}
      loading={isLoading}
      autoHeight={true}
    />
  )
}

function getRowClickHandler(history, currentPath) {
  return function(target) {
    const {row} = target
    const path = `${currentPath}/machine/${encodeURIComponent(row.id)}`
    history.push(path)
  }
}

class StateMachine extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      isLoading: true,
      error: undefined
    }
  }

  render() {
    const {match} = this.props
    const {path} = match
    return (
      <div style={{width: '100%'}}>
        <Switch>
          <Route path={`${path}/machine/:stateMachineArn`} component={Machine} />
          <Route path={path}>
            <h2>State Machines</h2>
            {renderGrid(this.state, this.props)}
          </Route>
        </Switch>
      </div>
    )
  }

  componentDidMount() {
    getStateMachines()
      .then(rows => this.setState({rows, isLoading: false}))
      .catch(error => {
        console.error(error)
        this.setState({error, isLoading: false})
      })
  }
}

export default withRouter(StateMachine)
