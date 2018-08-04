const AWS = require('aws-sdk');
const lambdaDefault = new AWS.Lambda();
module.exports = (lambdaParams = {}, lambda = lambdaDefault) => {
    const {
        FunctionName,
        InvocationType = 'RequestResponse',
        Qualifier = '$LATEST',
        LogType = 'Tail'
    } = lambdaParams;
    const options = {
        FunctionName,
        InvocationType,
        LogType,
        Qualifier
    };

    return (req, res, next) => {
        const {
            method,
            params,
            query,
            headers,
            body
        } = req;

        options.Payload = JSON.stringify({
            method,
            params,
            query,
            headers,
            body
        });
        return lambda
            .invoke(options)
            .promise()
            .then((data) => {
                if (data.FunctionError) return next(data.LogResult);

                res
                    .status(data.StatusCode)
                    .send(data.Payload);
            })
            .catch(next);
    };
};
