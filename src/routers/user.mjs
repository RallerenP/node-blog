import express from 'express';
import fs from 'fs';
import render from '../renderer.mjs';
import User from '../entities/user.entity.mjs';

const userBody = fs.readFileSync('src/fragments/user/user.html');

const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/error/401');
  }

  const user = {
    id: req.session.user._id,
    email: req.session.user.email,
    isAdmin: req.session.user.isAdmin,
  };

  console.log(user);

  const content = render(userBody, {
    user, activeNav: 'none',
  });

  res.send(content);
});

export default router;
