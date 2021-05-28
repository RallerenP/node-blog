import express from 'express';
import fs from 'fs';
import render from '../renderer.mjs';

const allPostsBody = fs.readFileSync('src/fragments/posts/allPosts.html');
const allPosts = render(allPostsBody);

const postBody = fs.readFileSync('src/fragments/posts/post.html');
const post = render(postBody);

const postEditorBody = fs.readFileSync('src/fragments/posts/postEditor.html');
const postEditor = render(postEditorBody);

const router = express.Router();

router.get('/edit', (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.status(401).send();
  }

  return res.send(postEditor);
});

router.get('/:id', async (req, res) => {
  return res.send(post);
});

router.get('/', (req, res) => {
  console.log(req.session.user);
  return res.send(allPosts);
});

export default router;
