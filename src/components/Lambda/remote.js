import lambda from 'aws-sdk/clients/lambda'

import {endpoint} from '../../aws'

const client = new lambda({endpoint})

export async function getFunctions() {
  const response = await client.listFunctions({MaxItems: 100}).promise()
  return response.Functions.map(f => ({
    id: f.FunctionArn,
    name: f.FunctionName,
    description: f.Description,
  }))
}
