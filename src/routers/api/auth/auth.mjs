import express from 'express';
import dotenv from 'dotenv';
import * as authService from '../../../services/auth.service.mjs';

dotenv.config();

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const user = await authService.login(req.body.email, req.body.password);

  if (user) {
    // TODO JWT maybe
    req.session.user = { email: user.email, isAdmin: user.isAdmin };
    return res.status(201).send();
  }

  return res.status(401).send();
});

router.get('/me', async (req, res) => {
  if (req.session.user) return res.send(req.session.user);

  return res.status(401).send({ error: 'Not Logged In' });
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const signup = await authService.signup(req.body.email, req.body.password);

  if (signup === 'USER_EXISTS') {
    return res.status(409).send();
  }

  if (signup === 'SUCCESS') {
    return res.status(201).send();
  }
});

export default router;
