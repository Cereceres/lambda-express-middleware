const getOptios = module.exports = (lambdaParams) => {
    if (Array.isArray(lambdaParams)) return lambdaParams
        .map((param) => getOptios(param));
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

    return options;
};
