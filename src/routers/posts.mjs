import express from 'express';
import fs from 'fs';
import render from '../renderer.mjs';

const ctx = { activeNav: 'posts' };

const allPostsBody = fs.readFileSync('src/fragments/posts/allPosts.html');
const allPosts = render(allPostsBody, ctx);

const postBody = fs.readFileSync('src/fragments/posts/post.html');
const post = render(postBody, ctx);

const postEditorBody = fs.readFileSync('src/fragments/posts/postEditor.html');
const postEditor = render(postEditorBody, ctx);

const router = express.Router();

router.get('/new', (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.redirect('/error/401');
  }

  return res.send(postEditor);
});

router.get('/:id', async (req, res) => {
  return res.send(post);
});

router.get('/', (req, res) => {
  return res.send(allPosts);
});

export default router;
