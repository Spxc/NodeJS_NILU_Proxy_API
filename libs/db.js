/**
 * Name: db.js
 * Description: Small helper library to handle data flow between the external API and our service
 * Documentation: https://api.nilu.no/
 * Author: Stian W. Instebø
 * 
 * Created: 16.10.2023
 */

/**
 * Import needed libraries
 */
const { MongoClient } = require('mongodb')

/**
 * Connect to MongoDB instance
 * 
 * In production one would read the data from a .env file instead of hard coding it
 */
const instance = 'mongodb://localhost:27017'
const client = new MongoClient(instance)
const database = 'nilu_proxy'



/**
 * Store the NILU data in MongoDB
 * @param { String } type areas/timeseries/meantypes
 * @param {Object/Array} object 
 * @returns 
 */
const proxyStore = async (type, object) => {
    return new Promise(async (resolve, reject) => {
        try {
            /**
             * Wait for our instance connection
             */
            await client.connect()

            /**
             * Select database and collection
             * collection is based on user input 'type'
             */
            const collection = client.db(database).collection(type)

            /**
             * Validate if 'object' is Array or single JSON Object
             */
            if (Array.isArray(object)) {
                /**
                 * Run batch insertion into the database
                 */
                const results = await collection.insertMany(object)
                return resolve(results)
            }

            /**
             * Insert a single object into our database
             */
            const results = await collection.insertOne(object)

            /**
             * Resolve state
             */
            return resolve(results)
        } catch (error) {
            /**
             * Catch error and reject Promise
             */
            return reject(error)
        }
    })
}

/**
 * Fetch NILU data from proxy storage, can be used for caching
 * @param { String } type areas/timeseries/meantypes
 * @returns 
 */
const proxyRead = async (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            /**
             * Wait for our instance connection
             */
            await client.connect()

            /**
             * Select database and collection
             * collection is based on user input 'type'
             */
            const collection = client.db(database).collection(type)

            /**
             * Insert a single object into our database
             */
            const results = await collection.find().toArray()

            if (results.length == 0) {
                return resolve('Nothing found')
            }
            /**
             * Resolve state
             */
            resolve(results)
        } catch (error) {
            /**
             * Catch error and reject Promise
             */
            reject(error)
        }
    })
}

const proxyDisconnect = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await client.close()
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
    
}

module.exports = {
    proxyStore,
    proxyRead,
    proxyDisconnect
}