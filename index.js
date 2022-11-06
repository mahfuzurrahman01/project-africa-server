const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware 
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//mongodb using start here 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clusterm01.jgnnfze.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const dataCollection = client.db('projects').collection('projectsData')
        const usersCollection = client.db('projects').collection('usersData')
        //get all donation projects data
        app.get('/projects', async (req, res) => {
            const query = {}
            const cursor = dataCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })
        //get one projects data : find one
        app.get('/donate/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result =await dataCollection.findOne(query)
            res.send(result)
        })
        //insert one data in mongo
        app.post('/user',async(req,res)=>{
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })
    }
    finally {

    }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
    //checking if the secret .env data is secured or not
    const newOne = process.env.DB_USER_ACCESS;
    console.log(newOne)
    res.send('running')
})


app.listen(port, () => {
    console.log(`this is running on port ${port}`)

})