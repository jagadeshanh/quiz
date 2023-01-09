const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res,next) => {
    res.send('I am Backend running in node js')
})

app.listen(port, ()=>{
    console.log(`App listen on port ${port}`)
})
