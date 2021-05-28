import express from 'express';
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router();


// POST /api/auth/login
router.post('/login', (req, res) => {

});


// POST /api/auth/signup
router.post('/signup', (req, res) =>  {

});

export default router;
