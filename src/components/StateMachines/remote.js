import stepfunctions from 'aws-sdk/clients/stepfunctions'
import {endpoint} from '../../aws'
import {toFullString} from '../../utils/date'

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
      startTime: toFullString(execution.startDate),
      stopTime: toFullString(execution.stopDate),
      status: execution.status
    }
  })
}

export async function getExecution(executionArn) {
  const response = await client.describeExecution({executionArn}).promise()
  return response
}
