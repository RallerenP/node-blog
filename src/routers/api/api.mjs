import express from 'express';
import authRouter from './auth/auth.mjs'
import mongoose from 'mongoose';

const router = express.Router();
router.use('/auth', authRouter)

const uri = 'mongodb+srv://Fyziik:' + process.env.DB_PASSWORD + '@cluster0.vxa4u.mongodb.net/' + process.env.DB_NAME + '?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('User', {
  email: { type : String, required : true, unique : true },
  password: { type : String, required : true }
});

const Post = mongoose.model('Post', {
  title: { type : String, required : true },
  description: { type : String, required : true },
  imageUrl: { type : String, required : true }
})

let loggedIn = true; // TODO this should be set via auth.mjs

// POST /api/login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec(); // check credentials towards users in db

  if (user) { // if match
    if (req.body.password === user.password) { //Check credentials match TODO make use of Bcrypt decryption
      // TODO Log user in
      res.status(201).send();
    }
  }
  console.log('Credentials mismatch');

});

// POST /api/signup
router.post('/signup', async (req, res) =>  {
  if (loggedIn) { // check if authenticated

    // do encryption

    // if successful - insert into DB
    const user = new User({...req.body});
    await user.save();
    res.status(201).send();
  }
});

// POST /api/posts - insert post into db
router.post('/posts', async (req, res) => {
  if (loggedIn) {
    const post = new Post({...req.body})
    await post.save()
    res.status(201).send()
  }
})

// GET /api/posts/:id - return one specific post
router.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post) {
    return res.json(post);
  }
  return res.status(404).send()
})

// GET /api/posts - return all posts
router.get('/posts', async (req, res) => {
  const posts = await Post.find()
  return res.json(posts);
})

export default router;
