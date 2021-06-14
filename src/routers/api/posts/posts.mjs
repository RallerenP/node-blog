import express from 'express';
import Post from '../../../entities/post.entity.mjs';
import Comment from '../../../entities/comment.entity.mjs';

const router = express.Router();

// POST /api/posts/comments - insert post into db
router.post('/:id/comments', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/error/401');
  }

  const date = new Date();
  date.setHours(date.getHours() + 2);

  const comment = new Comment(
    {
      author: req.session.user.email,
      text: req.body.comment,
      timestamp: date,
    },
  );
  await comment.save();

  const post = await Post.findById(req.params.id);
  post.comments.push(comment);
  await post.save();

  return res.status(201).send();
});

// POST /api/posts - insert post into db
router.post('/', async (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.redirect('/error/401');
  }

  const post = new Post({ ...req.body });

  await post.save();
  return res.status(201).send();
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById({ _id: req.params.id }).populate('comments');
  if (post) {
    return res.json(post);
  }
  return res.redirect('/error/404');
});

router.get('/', async (req, res) => {
  const posts = await Post.find();
  return res.json(posts);
});

router.delete('/:id', async (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.redirect('/error/401');
  }

  const found = await Post.findById({ _id: req.params.id }).populate('comments');

  if (!found) {
    return res.status(404).send();
  }

  const deletes = [];

  found.comments.forEach((comment) => {
    deletes.push(Comment.deleteOne({ _id: comment._id }));
  });

  await Promise.all(deletes);

  await Post.deleteOne({ _id: req.params.id });

  return res.status(200).send();
});

export default router;
