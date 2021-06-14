import express from 'express';
import fs from 'fs';
import render from '../renderer.mjs';

const loginBody = fs.readFileSync('src/fragments/login/login.html');
const login = render(loginBody);

const router = express.Router();

// GET /login
router.get('/', (req, res) => {
  res.send(login);
});

export default router;
