const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const port =  4040;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hey, This is Amir Making Memories Server!')
})




const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pcwvo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("amirPhoto").collection("services");
  const orderCollection = client.db("amirPhoto").collection("orders");
  // perform actions on the collection object
  

  // adding Services
  app.post('/addService', (req, res) => {
      const service = req.body;
      serviceCollection.insertOne(service)
      .then(result => {
          res.send(result.insertedCount > 0)
      })
  })

// Getting Services
 app.get('/services', (req, res) => {
     serviceCollection.find()
     .toArray((err, documents) => {
         res.send(documents)
         console.log(err)
     })
 })


// getting Services By Id
app.get('/makeOrder/:id', (req, res) => {
    // const id = ObjectId(req.params._id)
    serviceCollection.find({_id: ObjectId(req.params.id)})
    .toArray((err, documents) => {
        res.send(documents[0])
        console.log(err)
    })
})

// getting Service Details By Id
app.get('/serviceDetails/:id', (req, res) => {
    // const id = ObjectId(req.params._id)
    serviceCollection.find({_id: ObjectId(req.params.id)})
    .toArray((err, documents) => {
        res.send(documents[0])
        console.log(err)
    })
})





// adding Order 
app.post('/addOrder', (req, res) => {
    const order = req.body;
    orderCollection.insertOne(order)
    .then(result => {
        res.send(result.insertedCount > 0)
        console.log(result)
    })
})

// getting order list
app.get('/orderList', (req, res) => {
    orderCollection.find()
    .toArray((err, documents) => {
        res.send(documents)
        console.log(err)
    })
})










  console.log('Database Connected')
});



app.listen(process.env.PORT || port);