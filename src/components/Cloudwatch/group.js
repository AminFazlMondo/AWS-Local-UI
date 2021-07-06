import {Link} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'
import {Component} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'

import ClickableRowsDataGrid from '../DataGrids/ClickableRowsDataGrid'
import {renderTimestamp} from '../DataGrids/helpers'
import {getLogStreams} from './remote'
import CloudwatchStream from './stream'

const columns = [
  {field: 'name', headerName: 'Log stream', flex: 3},
  {field: 'lastEvent', headerName: 'Last Event', flex: 2, renderCell: renderTimestamp}
]

const sortModel = [
  {
    field: 'lastEvent',
    sort: 'desc'
  }
]

function getRowClickHandler(history, currentPath) {
  return function(target) {
    const {row} = target
    const path = `${currentPath}/stream/${encodeURIComponent(row.name)}`
    history.push(path)
  }
}

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

class CloudwatchGroup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      groupName: '',
      rows: [],
      error: undefined,
      isLoading: true,
    }
  }

  render() {
    const {groupName} = this.state
    const {match} = this.props
    const {path, url} = match
    return (
      <div style={{width: '100%'}}>
        <Switch>
          <Route path={`${path}/stream/`} component={CloudwatchStream} />
          <Route path={`${path}/stream/:streamName`} component={CloudwatchStream} />
          <Route path={path}>
            <h2>Log Streams</h2>
            <h3>Group: {groupName}</h3>
            <h4><Link href={`${url}/stream/`}>All</Link></h4>
            {renderGrid(this.state, this.props)}
          </Route>
        </Switch>

      </div>
    )
  }

  componentDidMount() {
    const groupNameParam = this.props.match.params.groupName
    const groupName = decodeURIComponent(groupNameParam)
    this.setState({groupName})
    getLogStreams(decodeURIComponent(groupName))
      .then(rows => this.setState({rows, isLoading: false}))
      .catch(error => {
        console.error(error)
        this.setState({error, isLoading: false})
      })
  }
}

export default withRouter(CloudwatchGroup)
