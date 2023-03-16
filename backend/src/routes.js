const { Router } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserController = require('./app/controllers/UserController');
const BoardController = require('./app/controllers/BoardController');

const router = Router();

router.post('/register', UserController.store);
router.post('/login', UserController.login);

router.use((request, response, next) => {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[2];
  if (!token) {
    return response.status(401).json({ error: 'Access denied!' });
  }
  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    response.status(400).json({ error: 'Invalid Token' });
  }
});

router.post('/board/:userId', BoardController.createBoardWithColumns)
router.put('/board/:boardId', BoardController.updateBoardWithColumns)

module.exports = router;
