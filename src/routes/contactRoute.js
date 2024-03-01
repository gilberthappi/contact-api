import express from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  deleteContact,
  updateContactAdminResponse,
} from '../controllers/contact/contactCrud.js';
import { uploaded } from '../middleware/index.js';

const contactRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API for managing contacts
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         subject:
 *           type: string
 *         message:
 *           type: string
 *         adminResponse:
 *           type: string
 */



/**
 * @swagger
 * /cont/contact:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - email
 *               - message
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /cont/contact/all:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: The page to search for (e.g., "3").
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: The limit to match in the specified page.
 *     responses:
 *       200:
 *         description: List of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cont/contact/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact details
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cont/contact/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cont/contact/adminResponse/{id}:
 *   put:
 *     summary: Add an admin response to a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               adminResponse:
 *                 type: string
 *             required:
 *               - adminResponse
 *     responses:
 *       200:
 *         description: Admin response added successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */

contactRouter.put('/contact/adminResponse/:id',uploaded,updateContactAdminResponse);
contactRouter.post('/contact',uploaded, createContact);
contactRouter.get('/contact/all', getContacts);
contactRouter.get('/contact/:id', getContactById);
contactRouter.delete('/contact/:id', deleteContact);

export default contactRouter;