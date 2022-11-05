const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware 
app.use(cors())
app.use(express.json())

//mongodb using start here 


app.get('/', (req, res) => {
    //checking if the secret .env data is secured or not
    const newOne = process.env.DB_USER_ACCESS;
    console.log(newOne)
    res.send('running')
})


app.listen(port, () => {
    console.log(`this is running on port ${port}`)

})