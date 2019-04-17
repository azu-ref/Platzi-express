const {MongoClient, ObjectId} = require('mongodb');
const  {config}  = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?ssl=true&authSource=admin&retryWrites=true`;



class MongoLib {
    constructor(){
        //console.log(MONGO_URI);
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true }); //creamos la instancia de coneccion
        this.dbName = DB_NAME; //guardamos el nombre de la db
    }

    /**
     * @param resolve = nos devolvera la conexcion exitosa a la db, de esa maneraya tendriamos en uso la db
     * @param reject = en caso de algun error la promesa sera rechazada y no se realiza la conexcion
     */
    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect( error => {
                if(error){
                    reject(error);
                }

                resolve(this.client.db(this.dbName));
                console.log('conected successfully to mongodb');
            });
        });
    }

    /**
     * 
     * @param collection  = nombre de la coleccion que deseamos
     * @param query = query de condiciones por el que deseamos realizar la busqueda
     */
    getAll(collection, query) {
        return this.connect().then( db => {
            return db
                .collection(collection)
                .find(query)
                .toArray();
        });
    }

    get(collection, id) {
        return this.connect().then( db => {
            return db
                .collection(collection)
                .findOne({ _id: ObjectId(id) });
        });
    }

    create(collection, data) {
        return this.connect().then( db => {
            return db
                .collection(collection)
                .insertOne(data);
        })
        .then( result => result.insertedId );
    }

    update(collection, id, data) {
        return this.connect().then( db => {
            return db
                .collection(collection)
                .updateOne({ _id: ObjectId(id) }, {$set: data}, {upsert: true});
        })
        .then( result => result.upsertedId || id);
    }

    delete(collection, id) {
        return this.connect().then( db => {
            return db
                .collection(collection)
                .deleteOne({ _id: ObjectId(id) });
        })
        .then( () => id);
    }

}

module.exports = MongoLib;