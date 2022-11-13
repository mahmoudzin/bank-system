import {MongoClient} from 'mongodb';
import DB from './db.js';




export default class UsersController extends DB {
    getAllUsers = async () => {
        try{
            const users = await this.getAllCollectionAsArray('users');
            return users
        }finally{
            await this.client.close();
        }
        
    }

    //update balance 
    checkSender = async (id, quantity) => {
        try
        {   
            const db = await this.connect();
            const users = db.collection('users');
            const user = await users.findOne({_id: id, balance: {$gte: quantity}});

            return user
            
        }
        finally
        {
            await this.client.close();
        }
    } 
    updateSenderBalance = async (id, quantity) => {
        try
        {   
            const db = await this.connect();
            const users = db.collection('users');
            const result = await users.updateOne({_id: id},{$inc : { balance: - quantity}});
           
            return `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
            
        }
        finally
        {
            await this.client.close();
        }
    }
    updateReceiverBalance = async (id, quantity) => {
        try
        {   
            const db = await this.connect();
            const users = db.collection('users');
            const result = await users.updateOne({_id: id},{$inc : { balance: + quantity}});
           
            return `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
            
        }
        finally
        {
            await this.client.close();
        }
    }
}

