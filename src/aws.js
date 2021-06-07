import aws, {Credentials} from 'aws-sdk'
import {AWSAccessKeyId, AWSRegion, AWSSecretAccessKey, localStackHostname, localStackPort} from './config'

aws.config.update({
  credentials: new Credentials({
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretAccessKey
  }),
  region: AWSRegion
})

export const endpoint = `${localStackHostname}:${localStackPort}`
