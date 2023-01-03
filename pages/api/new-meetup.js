//api/new-meetup
//POST  /api/new-meetup

import { MongoClient } from 'mongodb';

async function handler(req,res) {       //req object contaisn fdata about incoming request, res object needed for send back an response! 
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://mongoadmin:kKXJKjZywgAUGDgL@cluster0.rs3k4vd.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();      //if the database named meetups is not created, then it will create one

        const meetupsCollection = db.collection('meetups');       //connection done

        const result = await meetupsCollection.insertOne(data);                       //insierts one new documents to the collections
    
        console.log(result);

        client.close();                    //use to close the db connection

        res.status(201).json({message: 'Meetup inserted!'});             //201 stats that something was inserted successfully
    }
}

export default handler;