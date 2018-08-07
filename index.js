const AWS = require('aws-sdk');
const lambdaDefault = new AWS.Lambda();

const invoke = require('./lib/invoke-lambda');
const getOptions = require('./lib/get-options');
const attachPayload = require('./lib/attach-payload');
module.exports = (lambdaParams = {}, lambda = lambdaDefault) => {
    const options = getOptions(lambdaParams);

    return (req, res, next) => {
        const {
            method,
            params,
            query,
            headers,
            body
        } = req;

        const Payload = JSON.stringify({
            method,
            params,
            query,
            headers,
            body
        });
        attachPayload(options, Payload);
        return invoke(options, lambda, res, next)
            .then(() => next())
            .catch(next);
    };
};
