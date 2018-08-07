const attach = module.exports = (options, payload) => {
    if (Array.isArray(options)) options.map((option) => attach(option, payload));

    options.Payload = payload;
};
