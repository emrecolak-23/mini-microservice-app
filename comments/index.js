const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/comment', (req, res) => {
  const postId = req.params.id;
  const comment = commentsByPostId[postId] || [];
  res.send(comment);
});

app.post('/posts/:id/comment', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).json(comments);
});

app.post('/events', (req, res) => {
  console.log('Received Event: ', req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
