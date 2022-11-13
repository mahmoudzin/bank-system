import {MongoClient} from 'mongodb';

export default class DB {
    client;
    constructor() {
        this.conStr = "mongodb+srv://mahmoudShaaban:mahmoud123+-*@mahmoud-cluster.m38xysg.mongodb.net/banksystem?retryWrites=true&w=majority";
        this.MongoClient = MongoClient;
    }

    connect = () => {
        this.client = new this.MongoClient(this.conStr, { useUnifiedTopology: true });
        console.log("Start connecting...");
        return new Promise((resolve, reject) => {
            this.client.connect((err) => {
                if (err) {
                    console.log("Connection Error");
                    reject(err);
                }
                console.log("Connected")
                    //console.log(db);
                var db = this.client.db();
                resolve(db);
            })
        });       
    }
    getCollection = async (collection) =>{
        const db = await this.connect();
        const col = db.collection(collection);
        return col
    }
    getAllCollectionAsArray = async (collection) =>{
        const db = await this.connect();
         return db.collection(collection).find({}).toArray()
         .then((collection) => {
            // console.log(users);
            return collection
         })
        .catch(err=> console.log(err));
    }
}