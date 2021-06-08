import stepfunctions from 'aws-sdk/clients/stepfunctions'
import {endpoint} from '../../aws'

const client = new stepfunctions({endpoint})

export async function getStateMachines() {
  const response = await client.listStateMachines().promise()
  return response.stateMachines.map(sm => ({id: sm.stateMachineArn, name: sm.name}))
}

export async function getExecutions(stateMachineArn) {
  const response = await client.listExecutions({stateMachineArn}).promise()
  return response.executions.map(execution => {
    return {
      id: execution.executionArn,
      startTime: execution.startDate,
      stopTime: execution.stopDate,
      status: execution.status
    }
  })
}

const typeToDetailsPropertyMapper = {
  ExecutionStarted: 'executionStartedEventDetails.input',
  TaskStateEntered: 'stateEnteredEventDetails.name',
  LambdaFunctionScheduled: 'lambdaFunctionScheduledEventDetails.input',
  ExecutionSucceeded: 'executionSucceededEventDetails.output',
  TaskStateExited: 'stateExitedEventDetails.name',
  LambdaFunctionSucceeded: 'lambdaFunctionSucceededEventDetails.output',
  LambdaFunctionStarted: '',
  ChoiceStateEntered: 'stateEnteredEventDetails.name',
  ChoiceStateExited: 'stateExitedEventDetails.name',
  LambdaFunctionFailed: 'lambdaFunctionFailedEventDetails.cause'
}

function getEventDetails(event) {
  const mappedProperty = typeToDetailsPropertyMapper[event.type]
  if (mappedProperty === '')
    return

  if (!mappedProperty) {
    console.log('mapped property not found for', event)
    return
  }
  const parts = mappedProperty.split('.')

  let result = event

  while (parts.length > 0)
    result = result[parts.shift()]

  return result
}

export async function getExecution(executionArn) {
  const details = await client.describeExecution({executionArn}).promise()
  const history = await client.getExecutionHistory({executionArn}).promise()
  const events = history.events.map(event => {
    return {
      id: event.id,
      timestamp: event.timestamp,
      type: event.type,
      details: getEventDetails(event)
    }
  })
  return {details, events}
}
