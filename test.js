const getMiddleware = require('./index');
const assert = require('assert');

describe('test to get middleware', () => {
    it('should return a express middleware', (done) => {
        const params = {
            FunctionName: 'FunctionName',
            InvocationType : 'InvocationType',
            Qualifier: 'Qualifier',
            LogType: 'LogType'
        };
        const lambda = {
            invoke:(options) => {
                assert(options.Payload === JSON.stringify({
                    method : 'GET',
                    params: 'params',
                    query: 'query',
                    headers: 'headers',
                    body: 'body'
                }));

                assert(params.FunctionName === 'FunctionName');
                assert(params.InvocationType === 'InvocationType');
                assert(params.Qualifier === 'Qualifier');
                assert(params.LogType === 'LogType');
                return {
                    promise:() => Promise.resolve({
                        Payload:'response',
                        StatusCode: 'StatusCode'
                    })
                };
            }
        };
        const middleware = getMiddleware(params, lambda);
        const req = {
            method : 'GET',
            params: 'params',
            query: 'query',
            headers: 'headers',
            body: 'body'
        };
        let called = false;
        const res = {
            status:(status) => {
                assert(status === 'StatusCode');
                called = true;
                return res;
            },
            send: (send) => {
                assert(send === 'response');
                if (called) done();
            }
        };
        middleware(req, res, (err) => {
            assert(!err);
            res
                .status(res.lambdaFunctionNameResponse.StatusCode)
                .send(res.lambdaFunctionNameResponse.Payload);
        });
    });

    it('should return a express middleware', (done) => {
        const params = {
            FunctionName: 'FunctionName',
            InvocationType : 'InvocationType',
            Qualifier: 'Qualifier',
            LogType: 'LogType'
        };
        const lambda = {
            invoke:(options) => {
                assert(options.Payload === JSON.stringify({
                    method : 'GET',
                    params: 'params',
                    query: 'query',
                    headers: 'headers',
                    body: 'body'
                }));

                assert(params.FunctionName === 'FunctionName');
                assert(params.InvocationType === 'InvocationType');
                assert(params.Qualifier === 'Qualifier');
                assert(params.LogType === 'LogType');
                return {
                    promise:() => Promise.reject('error')
                };
            }
        };
        const middleware = getMiddleware(params, lambda);
        const req = {
            method : 'GET',
            params: 'params',
            query: 'query',
            headers: 'headers',
            body: 'body'
        };
        let called = false;
        const res = {
            status:(status) => {
                assert(status === 'StatusCode');
                called = true;
                return res;
            },
            send: (send) => {
                assert(send === 'response');
                if (called) done();
            }
        };
        middleware(req, res, (err) => {
            assert(err === 'error');
            done();
        });
    });

    it('should return a express middleware', (done) => {
        const params = {
            FunctionName: 'FunctionName',
            InvocationType : 'InvocationType',
            Qualifier: 'Qualifier',
            LogType: 'LogType'
        };
        const lambda = {
            invoke:(options) => {
                assert(options.Payload === JSON.stringify({
                    method : 'GET',
                    params: 'params',
                    query: 'query',
                    headers: 'headers',
                    body: 'body'
                }));

                assert(params.FunctionName === 'FunctionName');
                assert(params.InvocationType === 'InvocationType');
                assert(params.Qualifier === 'Qualifier');
                assert(params.LogType === 'LogType');
                return {
                    promise:() => Promise.resolve({
                        FunctionError:'FunctionError',
                        LogResult: 'LogResults'
                    })
                };
            }
        };
        const middleware = getMiddleware(params, lambda);
        const req = {
            method : 'GET',
            params: 'params',
            query: 'query',
            headers: 'headers',
            body: 'body'
        };
        let called = false;
        const res = {
            status:(status) => {
                assert(status === 'StatusCode');
                called = true;
                return res;
            },
            send: (send) => {
                assert(send === 'response');
                if (called) done();
            }
        };
        middleware(req, res, (err) => {
            assert(err.message === 'LogResults');
            done();
        });
    });
});
