const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Пример пользователей
const users = [
  { email: "user@example.com", password: "Password1!" } // Тестовый пользователь
];

// API для входа
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({ message: "Успешно вошли" });
  } else {
    res.status(401).json({ message: "Неверный email или пароль" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
