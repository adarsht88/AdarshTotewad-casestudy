const {Router} = require("express");
const flightController  =require('../controllers/flightControllers')
const isAuthenticated = require('../../middlewares/isAuthenticated');

const router =Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Flight:
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
 *           description: The auto-generated id of the Flight
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
  *   name: Flight
  *   description: The Flight managing API
  */



 /**
 * @swagger
 * /flight:
 *   get:
 *     summary: Returns the list of all the Flights
 *     tags: [Flight]
 *     responses:
 *       200:
 *         description: The list of the Flights
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flight'
 *       400:
 *         description: Some error in server
 *       404:
 *         description: No flights avaliable
 */



//router.get('/flight',flightController.flight_get);
router.get('/flight',isAuthenticated.isAuthenticated,flightController.flight_get);


/**
 * @swagger
 * /flight/{id}:
 *   get:
 *     summary: Get the fligfht by id
 *     tags: [Flight]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The flight id
 *     responses:
 *       200:
 *         description: The  Flight as per Id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flight'
 *       400:
 *         description: Some error in server
 *       404:
 *         description: No flights avaliable
 */



router.get('/flight/:id',flightController.flight_getbyId);



/**
 * @swagger
 * /flight:
 *   post:
 *     summary: To Add Flight
 *     tags: [Flight]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       200:
 *         description: Flight Added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flight'
 *       400:
 *         description: Flight is not added
 *      
 */



//router.post('/flight',flightController.flight_post);

router.post('/flight',isAuthenticated.isAuthenticated,flightController.flight_post);

/**
 * @swagger
 * /flight/{id}:
 *  patch:
 *    summary: Update the book by the id
 *    tags: [Flight]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The flight id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Flight'
 *    responses:
 *      200:
 *        description: The Flight is updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Flight'
 *      404:
 *        description: The Flight  not found
 *      400:
 *        description: Some error happened
 */



//router.patch('/flight/:id',flightController.flight_update);

router.patch('/flight/:id',isAuthenticated.isAuthenticated,flightController.flight_update);


/**
 * @swagger
 * /flight/{id}:
 *   delete:
 *     summary: Delete Flight
 *     tags: [Flight]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The flight id
 * 
 *     responses:
 *       200:
 *         description: The flight deleted
 *       400:
 *         description: The flight not deleted
 *       404:
 *         description: The flight not found
 */



//router.delete('/flight/:id',flightController.flight_delete);

router.delete('/flight/:id',isAuthenticated.isAuthenticated,flightController.flight_delete);




module.exports =router;