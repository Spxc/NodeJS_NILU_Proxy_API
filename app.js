/**
 * Name: app.js
 * Description: Runtime file for express and handling user routes
 * Author: Stian W. Instebø
 * 
 * Created: 16.10.2023
 */

/**
 * Internal library helpers / extensions
 */
const { lookupAreas, lookupStations, lookupComponents, lookupAqis, lookupMeanTypes, lookupTimeseries } = require("./libs/nilu");

/**
 * Import our middleware managers
 */
const setCacheOptions = require('./libs/cache')

/**
 * Express library to handle the REST requests
 */
const express = require('express')

/**
 * Define the runtime app as Express and setup the port on which the service
 * can be contacted on ex: port 3000
 */
const app = express()
const port = 3000

/**
 * One would also set the routes in a separate file in order to keep track of 
 * API version changes ex: 
        const routes = require('./routes')
        app.use('/api/v1', routes)
 */

/**
 * Setup and call our custom middleware for handeling storage
 */
app.use(setCacheOptions)

/**
 * Fetch all the areas (just proxy the result) and them store the data in the local
 * database
 */
app.get('/lookup/areas', async (req, res) => {
    /**
     * We can either do await/async or one could do .then()
     */
    try {
        let areas = await lookupAreas()
        return res.status(200).json({status: "OK", data: areas})
    } catch (error) {
        return res.status(404).json({status: "ERROR", data: error})
    }
})

/**
 * Get data about one specific weather station
 */
app.get('/lookup/stations/:station?', async (req, res) => {
    /**
     * Check to see if the 'stations' param is included in the 
     * user request to our proxy server
     */
    if (!req.params.station) {
        return res.status(405).json({status: "ERROR", data: 'Missing params'})
    }

    /**
     * Fetch the station after checks have been done
     */
    try {
        let station = await lookupStations(req.params.station)
        return res.status(200).json({status: "OK", data: station})
    } catch (error) {
        return res.status(404).json({status: "ERROR", data: error})
    }
})

/**
 * Fetch all available components
 */
app.get('/lookup/components', async (req, res) => {
    /**
     * We can either do await/async or one could do .then()
     */
    try {
        let components = await lookupComponents()
        return res.status(200).json({status: "OK", data: components})
    } catch (error) {
        return res.status(404).json({status: "ERROR", data: error})
    }
})

/**
 * Fetch data about a specific component based on the API
 */
app.get('/lookup/aqis/:component?', async (req, res) => {
    /**
     * Check to see if the 'component' param is included in the 
     * user request to our proxy server
     */
    if (!req.params.component) {
        return res.status(405).json({status: "ERROR", data: 'Missing params'})
    }

    /**
     * Run the logic and return the data to the user
     */
    try {
        let component = await lookupAqis(req.params.component)
        return res.status(200).json({status: "OK", data: component})
    } catch (error) {
        return res.status(404).json({status: "ERROR", data: error})
    }
})

/**
 * Fetch all meantypes available to the API
 */
app.get('/lookup/meantypes', async (req, res) => {
    /**
     * Run the logic and return the data to the user
     */
    try {
        let meantypes = await lookupMeanTypes()
        return res.status(200).json({status: "OK", data: meantypes})
    } catch (error) {
        return res.status(404).json({status: "ERROR", data: error})
    }
})

/**
 * Get the timeseries from a specific station or place
 */
app.get('/lookup/timeseries/:station?', async (req, res) => {
    /**
     * Check to see if the 'component' param is included in the 
     * user request to our proxy server
     */
    if (!req.params.station) {
        return res.status(405).json({status: "ERROR", data: 'Missing params'})
    }

    /**
     * Run the logic and return the data to the user
     */
    try {
        let timeseries = await lookupTimeseries(req.params.station)
        return res.status(200).json({status: "OK", data: timeseries})
    } catch (error) {
        return res.status(404).json({status: "ERROR", data: error})
    }
})

/**
 * Starts the Express.js listening service
 */
app.listen(port, () => {
  console.log(`Proxy API listening on ${port}`)
})