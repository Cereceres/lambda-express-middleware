# lambda-express-middleware
lambda middleware to express


# API

## lambdaExpress(params[, lambdaInstance]) -> ExpressMiddleware

# params

```js
{
    FunctionName,
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
    FunctionName: 'FunctionName',
    InvocationType : 'InvocationType',
    Qualifier: 'Qualifier',
    LogType: 'LogType'
})
// middleware to manage the lambda response
// res.lambdaFunctionNameResponse is response from lambda
)
```
