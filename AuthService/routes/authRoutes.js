const express = require('express')
const router = express.Router()
const {signup_get, signup_post, login_get, login_post}  =require('../controllers/authControllers')




/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: This is 
 *         name:
 *           type: string
 *           description: email of the user
 *         password:
 *           type: string
 *           description: password of user
 *       example:
 *           id: 60ca4440b297eb46f89b077b
 *           email: adarsh@1admin
 *           password: 123456789
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Auth managing API
 */





 /**
 * @swagger
 * /signup:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The list of the Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auth'
 *       404:
 *         description: Some error in server
 *       400:
 *         description:Email already exist
 */



router.get('/signup',signup_get);


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: To Add User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: User Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       400:
 *         description: User already exits
 *       404:
 *         description: page not found
 *      
 */

router.post('/signup',signup_post);
// router.get('/login',login_get);


/**
 * @swagger
 * /login:
 *   post:
 *     summary: To Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Login Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       205:
 *         description: Please enter all Fields
 *       400:
 *         description: Some validation error.
 *      
 */



router.post('/login',login_post);





module.exports =router;