# AWS Local UI

This is a UI to look into the AWS resources created in LocalStack and aimed to be used for developers.
This project is inspired by [LocalStack](https://github.com/localstack/localstack)

![preview](https://raw.githubusercontent.com/AminFazlMondo/AWS-Local-UI/main/docs/preview.gif)

## Supported AWS Resources

- Cloudwatch logs
- Lambda functions

## How to use

### Local package
While this package can be cloned and run locally;
```
npm run start
```

### Docker
The app can run as a docker container with all of the default values and accessing the UI via (http://localhost:8080/)
```
docker run -p 8080:80 aminfazl/aws-local-ui
```

#### Override default values
```
docker run \
    -p 8080:80 \
    --env AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID> \
    --env AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY> \
    --env AWS_REGION=<AWS_REGION> \
    --env LOCALSTACK_HOSTNAME=<LOCALSTACK_HOSTNAME> \
    --env LOCALSTACK_PORT=<LOCALSTACK_PORT> \
    aminfazl/aws-local-ui
```

environment variable | default value
--- | ---
*AWS_ACCESS_KEY_ID* | `test`
*AWS_SECRET_ACCESS_KEY* | `test`
*AWS_REGION* | `ap-southeast-2`
*LOCALSTACK_HOSTNAME* | `http://localhost`
*LOCALSTACK_PORT* | `4566`
