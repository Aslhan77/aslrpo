const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [];

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  // Минимум 8 символов, 1 заглавная, 1 строчная, 1 цифра, 1 спецсимвол !@#$
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$])[A-Za-z\d!@#$]{8,}$/;
  return re.test(password);
}

app.post('/register', (req, res) => {
  const { name, email, password, confirm } = req.body;

  if (!name || !email || !password || !confirm) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Неверный формат email' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email уже зарегистрирован' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Пароль не соответствует требованиям' });
  }
  if (password !== confirm) {
    return res.status(400).json({ message: 'Пароли не совпадают' });
  }

  users.push({ name, email, password });
  res.json({ message: 'Регистрация прошла успешно' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ message: 'Неверный email или пароль' });
  }
  res.json({ message: 'Успешный вход', name: user.name });
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
