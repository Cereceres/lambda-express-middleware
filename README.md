# lambda-express-middleware
lambda middleware to express


# API

## lambdaExpress(params[, lambdaInstance]) -> ExpressMiddleware

# params

```js
{
    FunctionName: "theNameisHere",
    InvocationType = 'RequestResponse',
    Qualifier = '$LATEST',
    LogType = 'Tail'
}
```

# Usage

```js
app.use(
// other middleware
getMiddleware({
    FunctionName: 'MyLambda',
    InvocationType : 'InvocationType',
    Qualifier: 'Qualifier',
    LogType: 'LogType'
}),
// middleware to manage the lambda response
(req,res) => res.json(res.MyLambda)
// res.lambdaFunctionNameResponse is response from lambda
)
```
