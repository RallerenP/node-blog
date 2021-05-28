import express from 'express';
import Post from '../../../entities/post.entity.mjs';

const router = express.Router();

// POST /api/posts - insert post into db
router.post('/', async (req, res) => {
  // TODO Logged in, via service??
  if (loggedIn) {
    const post = new Post({ ...req.body });
    await post.save();
    res.status(201).send();
  }
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    return res.json(post);
  }
  return res.status(404).send();
});

router.get('/', async (req, res) => {
  const posts = await Post.find();
  return res.json(posts);
});

export default router;
