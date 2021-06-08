import React from 'react'
import {Component} from 'react'
import {getLogEvents} from './remote'
import {LazyLog} from 'react-lazylog'
import CircularProgress from '@material-ui/core/CircularProgress'

function renderLogs(rows, isLoading) {
  if (isLoading)
    return (<CircularProgress />)

  const text = rows.map(row => `[${row.time}]\t${row.message}`).join('\n')

  return (
    <LazyLog
      text={text}
      enableSearch={true}
      selectableLines={true}
    />
  )
}

class CloudwatchStream extends Component {
  columns = [
    {field: 'time', headerName: 'Time', flex: 1},
    {field: 'message', headerName: 'Message', flex: 4}
  ]

  constructor(props) {
    super(props)
    this.state = {
      streamName: '',
      groupName: '',
      rows: [],
      error: undefined,
      isLoading: true,
    }
  }

  render() {
    const {rows, groupName, streamName, isLoading} = this.state
    return (
      <div style={{height: 750}}>
        <h2>Log Events</h2>
        <h3>Group: {groupName}</h3>
        <h4>Stream: {streamName}</h4>
        {renderLogs(rows, isLoading)}
      </div>
    )
  }

  componentDidMount() {
    const {streamName, groupName} = this.props.match.params
    const decodedStreamName = streamName ? decodeURIComponent(streamName) : undefined
    const decodedGroupName = decodeURIComponent(groupName)
    this.setState({streamName: decodedStreamName, groupName: decodedGroupName})

    getLogEvents(decodedGroupName, decodedStreamName)
      .then(rows => this.setState({rows, isLoading: false}))
      .catch(error => {
        console.error(error)
        this.setState({error, isLoading: false})
      })
  }
}

export default CloudwatchStream
