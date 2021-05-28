import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import postsRouter from './routers/posts.mjs';
import apiRouter from './routers/api/api.mjs'
import loginRouter from './routers/login.mjs';
import signUpRouter from './routers/signUp.mjs';
import render from './renderer.mjs';

const body = fs.readFileSync('src/fragments/home/home.html');

dotenv.config();

const app = express();

app.use(express.static('src/public'));
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.use('/posts', postsRouter);
app.use('/login', loginRouter)
app.use('/signup', signUpRouter)
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send(render(body));
});

app.listen(port, (e) => {
  if (e) {
    console.log('Error occured');
  } else {
    console.log(`Server running on port ${port}`);
  }
});
