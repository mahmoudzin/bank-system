
import DB from './db.js';
export default class TrasferController extends DB{

    getAllTransfers = async () => {
        try{
          const transfers = await this.getAllCollectionAsArray('transfers');
          return transfers
        }
        finally{
          this.client.close();
        }
    }
    
    newTransfer = async (transfer) => {
       try{
         const transfers = await this.getCollection('transfers')
         const result = await transfers.insertOne(transfer);
         return `A document was inserted with the _id: ${result.insertedId}`
       }
       finally{
            this.client.close();
       }
    }
}
