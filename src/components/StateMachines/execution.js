import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'
import {Component} from 'react'

import ClickableRowsDataGrid from '../DataGrids/ClickableRowsDataGrid'
import {renderDate, renderStatus} from '../DataGrids/helpers'
import {getExecution} from './remote'

const columns = [
  {field: 'timestamp', headerName: 'Timestamp', flex: 2, renderCell: renderDate},
  {field: 'details', headerName: 'Details', flex: 2},
  {field: 'type', headerName: 'Event Type', flex: 2, renderCell: renderStatus}
]

const sortModel = [
  {
    field: 'timestamp',
    sort: 'asc'
  }
]

function renderEvents(events) {
  return (
    <ClickableRowsDataGrid
      rows={events}
      columns={columns}
      sortModel={sortModel}
      isRowSelectable={false}
      hideFooterPagination={true}
      autoHeight={true}
    />)
}

class Execution extends Component {

  constructor(props) {
    super(props)
    this.state = {
      details: {},
      executionArn: undefined,
      error: undefined,
      isLoading: true,
    }
  }

  render() {
    const {events, isLoading} = this.state
    if (isLoading)
      return (<CircularProgress />)

    return (
      <div>
        <h2>Events</h2>
        {renderEvents(events)}
      </div>
    )
  }

  componentDidMount() {
    const executionArnParam = this.props.match.params.executionArn
    const executionArn = decodeURIComponent(executionArnParam)
    this.setState({executionArn})

    getExecution(executionArn)
      .then(({details, events}) => this.setState({details, events, isLoading: false}))
      .catch(error => {
        console.error(error)
        this.setState({error, isLoading: false})
      })
  }
}

export default Execution
