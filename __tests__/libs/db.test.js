/**
 * Unit tests for database (MongoDB) helper library
 */

const { proxyStore, proxyRead, proxyDisconnect } = require("../../libs/db")

/**
 * Test storing of data
 */
test('Saving data to local database', () => {
    /**
     * Setup simple test array to test out data store
     */
    let testArray = [{
        "zone": "Øst og Sørlandet",
        "municipality": "N/A",
        "area": "Bamble",
        "description": null
    }]
    return proxyStore('areas', testArray).then(data => {
        expect(data.acknowledged).toBe(true)
    })
})

/**
 * Test reading of data
 */
test('Fetching data to local database', () => {
    return proxyRead('areas').then(data => {
        expect(Array.isArray(data)).toBe(true)
    })
})

/**
 * Close all connections etc so Jest dosen't throw any errors
 */
afterAll(async () => {
    await proxyDisconnect()
})