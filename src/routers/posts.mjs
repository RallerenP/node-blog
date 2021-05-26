import express from 'express';
import fs from 'fs';
import render from '../renderer.mjs';

const allPostsBody = fs.readFileSync('src/fragments/posts/allPosts.html');
const allPosts = render(allPostsBody);

const postBody = fs.readFileSync('src/fragments/posts/post.html');
const post = render(postBody);

const router = express.Router();

router.get('/', (req, res) => {
  res.send(allPosts);
});

router.get('/:id', (req, res) => {
  res.send(post);
});

export default router;
