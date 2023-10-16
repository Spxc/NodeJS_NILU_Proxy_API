/**
 * Name: cache.js
 * Description: Middleware that can be used for caching the data upfront if needed
 * Author: Stian W. Instebø
 * 
 * Created: 16.10.2023
 */

/**
 * Simple cache middleware
 * @param {*} req HTTP Request
 * @param {*} res HTTP Result
 * @param {*} next HTTP Middlware next() function (continue on with the request)
 */

module.exports = function cache(req, res, next) {
    /**
     * You can setup a cache on the datastore if needed
     * if (time/date >= 5min) fetch from cache 
     */
    next()
}