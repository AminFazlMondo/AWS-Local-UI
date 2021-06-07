import React from 'react'
import {Component} from 'react'
import ClickableRowsDataGrid from '../DataGrids/ClickableRowsDataGrid'
import {getExecutions} from './remote'
import {Route, Switch, withRouter} from 'react-router-dom'
// import Execution from './execution'
import CircularProgress from '@material-ui/core/CircularProgress'
// import {withStyles} from '@material-ui/core/styles'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CancelIcon from '@material-ui/icons/Cancel'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Typography from '@material-ui/core/Typography'

function renderStatusIcon(status) {
  if (status === 'SUCCEEDED')
    return (<CheckCircleOutlineIcon style={{color: 'green'}} />)
  if (status === 'FAILED')
    return (<CancelIcon style={{color: 'red'}} />)

  return (<MoreHorizIcon style={{color: 'blue'}}  />)
}

class Machine extends Component {
  columns = [
    {field: 'id', headerName: 'ARN', flex: 3, hide: true},
    {field: 'startTime', headerName: 'Start Time', flex: 2},
    {field: 'stopTime', headerName: 'Stop Time', flex: 2},
    {field: 'status', headerName: 'Status', flex: 2, renderCell: this.renderStatus}
  ]

  renderStatus(params) {
    const status = params.value
    return (<Typography>{renderStatusIcon(status)} {status}</Typography>)
  }

  sortModel = [
    {
      field: 'startTime',
      sort: 'desc'
    }
  ]

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
          {/* <Route path={`${path}/execution/:executionArn`} component={Execution} /> */}
          <Route path={path}>
            <h2>Executions</h2>
            {this.renderGrid(this.state, this.props)}
          </Route>
        </Switch>

      </div>
    )
  }

  renderGrid(state, props) {
    const {rows, error, isLoading} = state
    const {match, history} = props
    const {url} = match
    const clickHandler = this.getRowClickHandler(history, url)
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

  getRowClickHandler(history, currentPath) {
    return function(target) {
      const {row} = target
      const path = `${currentPath}/execution/${encodeURIComponent(row.id)}`
      history.push(path)
    }
  }
}

export default withRouter(Machine)
