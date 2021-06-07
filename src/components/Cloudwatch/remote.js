import cloudwatchlogs from 'aws-sdk/clients/cloudwatchlogs'
import {endpoint} from '../../aws'
import {toFullStringFromMillis} from '../../utils/date'

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
      lastEvent: toFullStringFromMillis(stream.lastEventTimestamp),
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
      time: toFullStringFromMillis(event.timestamp),
      message: event.message
    }
  })
}
