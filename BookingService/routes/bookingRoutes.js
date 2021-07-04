const {Router} = require("express");
const bookingController  =require('../controllers/bookingControllers')
const isAuthenticated = require('../../middlewares/isAuthenticated');
const router =Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - booking_id
 *         - flight_id
 *         - user_id
 *         - quantity
 *         - total_price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Book
 *         booking_id:
 *           type: string
 *           description: this is booking id
 *         booking_date:
 *           type: date
 *           description: this is booking date
 *         flight_id:
 *           type: number
 *           description: This is flight id
 *         user_id:
 *           type: string
 *           description: This is user id
 *         quantity:
 *           type: number
 *           description: The total tickets
 *         classType:
 *           type: string
 *           description: Class of tickets
 *         total_price:
 *           type: number
 *           description: This is total checkout price
 *       
 */


 /**
  * @swagger
  * tags:
  *   name: Book
  *   description: The Book managing API
  */




/**
 * @swagger
 * /flight/book/{id}:
 *   get:
 *     summary:  Booking Summary
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The Flight id
 * 
 *     responses:
 *       200:
 *         description: The booking Summary
 *       400:
 *         description: Can't show booking summary
 */




//router.get('/flight/book/:id',bookingController.book_getinfo);

router.get('/flight/book/:id',isAuthenticated.isAuthenticated,bookingController.book_getinfo);



/**
 * @swagger
 * /flight/book:
 *   post:
 *     summary: To Book Ticket
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Booking successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Booking not succesfull
 */


//router.post('/flight/book',bookingController.book_post);

router.post('/flight/book',isAuthenticated.isAuthenticated,bookingController.book_post);

/**
 * @swagger
 * /flight/cancel/{id}:
 *   delete:
 *     summary: Cancel Booking
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 * 
 *     responses:
 *       200:
 *         description: The booking canceled
 *       400:
 *         description: The booking not canceled
 */






//router.delete('/flight/cancel/:id',bookingController.book_delete);
router.delete('/flight/cancel/:id',isAuthenticated.isAuthenticated,bookingController.book_delete);





module.exports =router;