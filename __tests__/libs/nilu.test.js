/**
 * Unit tests for the NILU helper library
 */

const { proxyDisconnect } = require("../../libs/db");
const { lookupAreas, lookupStations, lookupComponents, lookupAqis, lookupMeanTypes, lookupTimeseries } = require("../../libs/nilu");

/**
 * Test area lookup
 */
test('Endpoint: /lookup/areas', () => {
    return lookupAreas().then(data => {
        expect(Array.isArray(data)).toBe(true)
    })
})

/**
 * Test stations lookup
 */
test('Endpoint: /lookup/stations', () => {
    return lookupStations('Bergen').then(data => {
        expect(Array.isArray(data)).toBe(true)
    })
})

/**
 * Test components lookup
 */
test('Endpoint: /lookup/components', () => {
    return lookupComponents().then(data => {
        expect(Array.isArray(data)).toBe(true)
    })
})
  
/**
 * Test specific component lookup
 */
test('Endpoint: /lookup/aqis', () => {
    return lookupAqis('pm10').then(data => {
        expect(Array.isArray(data)).toBe(true)
    })
})

/**
 * Test specific component lookup
 */
test('Endpoint: /lookup/meantypes', () => {
    return lookupMeanTypes().then(data => {
        expect(Array.isArray(data)).toBe(true)
    })
})

/**
 * Test specific component lookup
 */
test('Endpoint: /lookup/timeseries', () => {
    return lookupTimeseries('Alnabru').then(data => {
        expect(Array.isArray(data)).toBe(true)
    })
})

/**
 * Close all connections etc so Jest dosen't throw any errors
 */
afterAll(async () => {
    await proxyDisconnect()
})