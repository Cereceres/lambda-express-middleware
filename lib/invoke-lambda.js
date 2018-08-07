const invoke = module.exports = (options, lambda, res, next) => {
    if (Array.isArray(options)) return Promise.all(options.map((option) => invoke(option, lambda, res, next)));
    return lambda
        .invoke(options)
        .promise()
        .then((data) => {
            if (data.FunctionError) return Promise.reject(new Error(data.LogResult));

            res[`lambda${
                options.FunctionName[0].toUpperCase() + options.FunctionName.slice(1)
            }Response`] = data;
        });
};
