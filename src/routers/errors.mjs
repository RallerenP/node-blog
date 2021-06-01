import express from 'express';
import fs from 'fs';
import render from '../renderer.mjs';

const error401Body = fs.readFileSync('src/fragments/errors/401.html');
const error401 = render(error401Body);

const error404Body = fs.readFileSync('src/fragments/errors/404.html');
const error404 = render(error404Body);

const router = express.Router();

router.get('/401', (req, res) => {
  res.send(error401);
});

router.get('/404', (req, res) => {
  res.send(error404);
});

export default router;
