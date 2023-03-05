const express = require('express');
const { randomBytes } = require('crypto');
const app = express();

app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/comment', (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId]);
});

app.post('/posts/:id/comment', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  res.status(201).json(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
