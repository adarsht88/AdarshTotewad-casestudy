const {Router} = require("express");

const checkInController  =require('../controllers/checkInControllers')
const isAuthenticated = require('../../middlewares/isAuthenticated');

const router =Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CheckIn:
 *       type: object
 *       required:
 *         - booking_id
 *         - flight_id
 *         - seat_no
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the checkIn
 *         booking_id:
 *           type: string
 *           description: this is booking id
 *         flight_id:
 *           type: number
 *           description: This is flight id
 *         seat_no:
 *           type: string
 *           description: The seat no of customer
 *       example:
 *         id:60ce0ef19bee9e2ed0dd8f97
 *         booking_id:odqyw
 *	       flight_id:103
 *	       seat_no:A2
 *
 */

 
 /**
  * @swagger
  * tags:
  *   name: CheckIn
  *   description: The checkIn managing API
  */




//router.get('/flight/book',checkInController.book_get);


/**
 * @swagger
 * /book/checkin:
 *   post:
 *     summary: To check In
 *     tags: [CheckIn]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckIn'
 *     responses:
 *       200:
 *         description: Check In was successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckIn'
 *       500:
 *         description: Some server error
 */



//router.post('/book/checkin',checkInController.checkin_post);
router.post('/book/checkin',isAuthenticated.isAuthenticated,checkInController.checkin_post);




module.exports =router;