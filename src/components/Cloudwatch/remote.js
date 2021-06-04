import cloudwatchlogs from 'aws-sdk/clients/cloudwatchlogs'
import {endpoint} from '../../aws'


const client = new cloudwatchlogs({endpoint})

export async function getLogGroups() {
  const response = await client.describeLogGroups().promise()
  return response.logGroups.map(lg => ({id: lg.arn, name: lg.logGroupName}))
}

export async function getLogStreams(logGroupName) {
  const response = await client.describeLogStreams({logGroupName}).promise()
  return response.logStreams.map(stream => {
    return {
      id: stream.arn,
      lastEvent: new Date(stream.lastEventTimestamp).toLocaleString(),
      name: stream.logStreamName
    }
  })
}

export async function getLogEvents(logGroupName, logStreamName) {
  const promise = logStreamName ? client.getLogEvents({logGroupName, logStreamName}).promise() : client.filterLogEvents({logGroupName}).promise()
  const response = await promise
  return response.events.map((event, index) => {
    return {
      id: index,
      time: new Date(event.timestamp).toLocaleString(),
      message: event.message
    }
  })
}