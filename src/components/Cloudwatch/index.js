import React from 'react'
import {Component} from 'react'
import ClickableRowsDataGrid from '../DataGrids/ClickableRowsDataGrid'
import {getLogGroups} from './remote'
import {Route, Switch, withRouter} from 'react-router-dom'
import CloudwatchGroup from './group'
import CircularProgress from '@material-ui/core/CircularProgress'

class Cloudwatch extends Component {
  columns = [
    {field: 'name', headerName: 'Log group', flex: 1}
  ]

  sortModel = [
    {
      field: 'name',
      sort: 'asc'
    }
  ]

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
          <Route path={`${path}/group/:groupName`} component={CloudwatchGroup} />
          <Route path={path}>
            <h2>Log Groups</h2>
            {this.renderGrid(this.state, this.props)}
          </Route>
        </Switch>
      </div>
    )
  }

  renderGrid(state, props) {
    const {rows, error, isLoading} = state
    const {match, history} = props
    const {path} = match
    const clickHandler = this.getRowClickHandler(history, path)
    if (isLoading)
      return (<CircularProgress />)

    return (
      <ClickableRowsDataGrid
        error={error}
        rows={rows}
        columns={this.columns}
        sortModel={this.sortModel}
        onRowClick={clickHandler}
        isRowSelectable={false}
        hideFooterPagination={true}
        loading={isLoading}
        autoHeight={true}
      />
    )
  }

  componentDidMount() {
    getLogGroups()
      .then(rows => this.setState({rows, isLoading: false}))
      .catch(error => {
        console.error(error)
        this.setState({error, isLoading: false})
      })
  }

  getRowClickHandler(history, currentPath) {
    return function(target) {
      const {row} = target
      const path = `${currentPath}/group/${encodeURIComponent(row.name)}`
      history.push(path)
    }
  }
}

export default withRouter(Cloudwatch)
