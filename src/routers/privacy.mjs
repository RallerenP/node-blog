import express from 'express';
import fs from 'fs';
import render from '../renderer.mjs';

const privacyPolicyBody = fs.readFileSync('src/fragments/privacy.html');
const privacyPolicy = render(privacyPolicyBody);

const router = express.Router();

router.get('/', (req, res) => {
  res.send(privacyPolicy);
});

export default router;
