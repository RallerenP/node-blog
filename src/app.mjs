import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import postsRouter from './routers/posts.mjs';
import apiRouter from './routers/api/api.mjs';
import loginRouter from './routers/login.mjs';
import signUpRouter from './routers/signUp.mjs';
import errorRouter from './routers/errors.mjs';
import render from './renderer.mjs';
import connect from './db.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import initChat from './chat.js';

dotenv.config();

await connect();

const body = render(fs.readFileSync('src/fragments/home/home.html'));
const notFound = render(fs.readFileSync('src/fragments/errors/404.html'))

const app = express();

app.use(express.static('src/public'));
app.use(cookieParser());
app.use(session({ secret: 'A_SECRET' }));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.use('/posts', postsRouter);
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/api', apiRouter);
app.use('/error', errorRouter);

app.get('/', (req, res) => {
  res.send(body);
});

app.get('*', (req, res) => {
  console.log(res.locals);
  res.status(404).send(notFound);
})

app.listen(port, (e) => {
  initChat()
  if (e) {
    console.log('Error occured');
  } else {
    console.log(`Server running on port ${port}`);
  }
});

