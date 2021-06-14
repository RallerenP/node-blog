import express from 'express';
import fs from 'fs';
import render from '../renderer.mjs';

const signUpBody = fs.readFileSync('src/fragments/signUp/signUp.html');
const signUp = render(signUpBody);

const router = express.Router();

// GET /signup
router.get('/', (req, res) => {
  res.send(signUp);
});

export default router;
