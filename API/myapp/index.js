const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')
// const cookieValidator = require('./cookieValidator')
// app.get('/',(req, res)=>{
//     res.send('I am Backend running in  node');
// })

// const logged = function (req,res,next) {
//     res.send("LOGGED")
//     console.log("LOGGED")
//     next()
// }

// app.use(logged)

// const requestTime = function (req,res,next) {
//     req.requestTime = Date.now()
//     next()
// }
//
// app.use(requestTime)
//
// app.get('/', (req,res,next) => {
//     let responseText = 'Hello World!<br>'
//     responseText += `<small>Requested at: ${req.requestTime}</small>`
//     res.send(responseText)
// })

async function cookieValidator (cookies) {
    try {
        await externallyValidateCookie(cookies.testCookie)
    } catch {
        throw new Error('Invalid cookies')
    }
}
async function validateCookies (req, res, next) {
    await cookieValidator(req.cookies)
    next()
}

app.use(cookieParser())

app.use(validateCookies)

// error handler
app.use((err, req, res, next) => {
    res.status(400).send(err.message)
})


app.listen(port,()=> {
    console.log(`App listening on port ${port}`)
})
