import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'
import {Component} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'

import ClickableRowsDataGrid from '../DataGrids/ClickableRowsDataGrid'
import {renderDate, renderStatus} from '../DataGrids/helpers'
import Execution from './execution'
import {getExecutions} from './remote'

const columns = [
  {field: 'id', headerName: 'ARN', flex: 3, hide: true},
  {field: 'startTime', headerName: 'Start Time', flex: 2, renderCell: renderDate},
  {field: 'stopTime', headerName: 'Stop Time', flex: 2, renderCell: renderDate},
  {field: 'status', headerName: 'Status', flex: 2, renderCell: renderStatus}
]

const sortModel = [
  {
    field: 'startTime',
    sort: 'desc'
  }
]

function renderGrid(state, props) {
  const {rows, error, isLoading} = state
  const {match, history} = props
  const {url} = match
  const clickHandler = getRowClickHandler(history, url)
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
    const path = `${currentPath}/execution/${encodeURIComponent(row.id)}`
    history.push(path)
  }
}

class Machine extends Component {

  constructor(props) {
    super(props)
    this.state = {
      stateMachineArn: '',
      rows: [],
      error: undefined,
      isLoading: true,
    }
  }

  render() {
    const {match} = this.props
    const {path} = match
    return (
      <div style={{width: '100%'}}>
        <Switch>
          <Route path={`${path}/execution/:executionArn`} component={Execution} />
          <Route path={path}>
            <h2>Executions</h2>
            {renderGrid(this.state, this.props)}
          </Route>
        </Switch>

      </div>
    )
  }

  componentDidMount() {
    const stateMachineArnParam = this.props.match.params.stateMachineArn
    const stateMachineArn = decodeURIComponent(stateMachineArnParam)
    this.setState({stateMachineArn})
    getExecutions(decodeURIComponent(stateMachineArn))
      .then(rows => this.setState({rows, isLoading: false}))
      .catch(error => {
        console.error(error)
        this.setState({error, isLoading: false})
      })
  }
}

export default withRouter(Machine)
