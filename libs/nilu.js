/**
 * Name: nilu.js
 * Description: Small helper library to handle data flow between the external API and our service
 * Documentation: https://api.nilu.no/
 * Author: Stian W. Instebø
 * 
 * Created: 16.10.2023
 */

/**
 * Library to handle our external requests
 */
const axios = require("axios")
const { proxyStore } = require("./db")

/**
 * Set base API URL
 */
const baseUrl = 'https://api.nilu.no'

/**
 * Fetch data from all available areas
 * @returns Promise <Array>
 */
const lookupAreas = () => {
    /**
     * Endpoint path: [GET] /lookup/areas
     */
    return new Promise(async (resolve, reject) => {
        try {
            /**
             * Simple GET request, no user input needed
             */
            let { data } = await axios.get(`${baseUrl}/lookup/areas`)
            
            /**
             * Local datastore
             */
            await proxyStore('areas', data)

            resolve(data)
        } catch ( error ) {
            /**
             * Reject our Promise with the error
             */
            reject(error)
        }
    })
}

/**
 * Fetch stations data from specific area or city
 * @param { String } station ex. Bergen, Oslo, Stavanger (automatically transformed to lower case)
 * @returns Promise <Array>
 */
const lookupStations = (station) => {
    /**
     * Endpoint path: [GET] /lookup/stations
     */
    return new Promise(async (resolve, reject) => {
        try {
            /**
             * Simple GET request, converting user input toLowerCase() in case the API
             * dosent like capitalized letters. (not tested tho)
             */
            let { data } = await axios.get(`${baseUrl}/lookup/stations?area=${station.toLowerCase()}`)
            
            /**
             * Resolve "no data", but do not reject the request
             */
            if (data.length == 0) {
                return resolve('Nothing found, invalid station?')
            }

            /**
             * Local datastore
             */
            await proxyStore('stations', data)

            resolve(data)
        } catch ( error ) {
            /**
             * Reject our Promise with the error
             */
            reject(error)
        }
    })
}

/**
 * Fetch the different available components
 * @returns Promise <Array>
 */
const lookupComponents = () => {
    /**
     * Endpoint path: [GET] /lookup/components
     */
    return new Promise(async (resolve, reject) => {
        try {
            let { data } = await axios.get(`${baseUrl}/lookup/components`)
            
            /**
             * Local datastore
             */
            await proxyStore('components', data)

            resolve(data)
        } catch ( error ) {
            reject(error)
        }
    })
}

/**
 * Fetch data about a specific component, list can be found by invoking 'lookupComponents()'
 * @param { String } component Component name
 * @returns 
 */
const lookupAqis = (component) => {
    /**
     * Endpoint path: [GET] /lookup/aqis
     */
    return new Promise(async (resolve, reject) => {
        try {
            /**
             * Simple GET request, converting user input toLowerCase() in case the API
             * dosent like capitalized letters. (not tested tho)
             */
            let { data } = await axios.get(`${baseUrl}/lookup/aqis?component=${component.toLowerCase()}`)
            
            /**
             * Resolve "no data", but do not reject the request
             */
            if (data.length == 0) {
                return resolve('Nothing found, invalid component?')
            }

            /**
             * Local datastore
             */
            await proxyStore('aqis', data)

            resolve(data)
        } catch ( error ) {
            reject(error)
        }
    })
}

/**
 * Fetch and list the different meantypes from the API
 * @returns Promise <Array>
 */
const lookupMeanTypes = () => {
    /**
     * Endpoint path: [GET] /lookup/meantypes
     */
    return new Promise(async (resolve, reject) => {
        try {
            let { data } = await axios.get(`${baseUrl}/lookup/meantypes`)
            

            /**
             * Local datastore
             */
            await proxyStore('meantypes', data)

            resolve(data)
        } catch ( error ) {
            reject(error)
        }
    })
}

/**
 * Fetch the latest timeseries from the API
 * @param { String } station Station, city or place
 * @returns Promise <Array>
 */
const lookupTimeseries = (station) => {
    /**
     * Endpoint path: [GET] /lookup/timeseries
     */
    return new Promise(async (resolve, reject) => {
        try {
            let { data } = await axios.get(`${baseUrl}/lookup/timeseries?station=${station.toLowerCase()}`)
            
            /**
             * Resolve "no data", but do not reject the request
             */
            if (data.length == 0) {
                return resolve('Nothing found, invalid station?')
            }

            /**
             * Local datastore
             */
            await proxyStore('timeseries', data)

            resolve(data)
        } catch ( error ) {
            reject(error)
        }
    })
}


module.exports = {
    lookupAreas,
    lookupAqis,
    lookupComponents,
    lookupMeanTypes,
    lookupStations,
    lookupTimeseries
}