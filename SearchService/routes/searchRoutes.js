const {Router} = require("express");
const searchController = require('../controllers/searchControllers')

const router =Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Search:
 *       type: object
 *       required:
 *         - flight_id
 *         - name
 *         - source
 *         - destination
 *         - date
 *         - time
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the checkIn
 *         flight_id:
 *           type: number
 *           description: This is flight id
 *         name:
 *           type: string
 *           description: this is flight name
 *         source:
 *           type: string
 *           description: The source address of flight
 *         destination:
 *           type: string
 *           description: The destination address of flight
 *         date:
 *           type: date
 *           description: This is flight date
 *         time:
 *           type: string
 *           description: this is flight time
 *         price:
 *           type: number
 *           description: The price  of flight seat
 *       
 */

 
 /**
  * @swagger
  * tags:
  *   name: Search
  *   description: The search managing API
  */




/**
 * @swagger
 * /flight/search?source={source}&destination={destination}:
 *   get:
 *     summary: Returns the list of flights
 *     tags: [Search]
 *     parameters:
 *        - in: query
 *          name: source
 *          schema:
 *            type: string
 *          required: true
 *          description: source address
 *        - in: query
 *          name: destination
 *          schema:
 *            type: string
 *          description: destination addresss
 *     responses:
 *       200:
 *         description: The list of the flights
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Search'
 *       300:
 *         description: No flights are avalaible at this moment
 *       400:
 *         description: Query is Invalid
 *       404:
 *         description: some server error 
 */





router.get('/flight/search',searchController.flights_get);

module.exports =router;