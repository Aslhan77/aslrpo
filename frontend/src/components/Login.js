import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🆕 Добавили для перехода
import axios from "axios";
import styled, { keyframes } from "styled-components";

// Анимация появления
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  } to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 400px;
  margin: 60px auto;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: 1px;
`;

const LoginForm = styled.form`
  background-color: #1e1e3f;
  padding: 30px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
`;

const Input = styled.input`
  padding: 14px 18px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.3s ease;
  color: #333;

  &:focus {
    box-shadow: 0 0 8px 3px rgba(255, 255, 255, 0.7);
  }
`;

const Button = styled.button`
  padding: 14px;
  background-color: #ff5722;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e64a19;
  }
`;

const Message = styled.p`
  margin-top: 25px;
  text-align: center;
  font-weight: 600;
  color: ${({ success }) => (success ? "#4caf50" : "#f44336")};
  font-size: 1.1rem;
  user-select: none;
`;

export default function Login() {
  const navigate = useNavigate(); // 🆕 создаём навигатор
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      setMessage(res.data.message);
      setSuccess(true);
      navigate("/catalog"); // 🆕 переход после входа
    } catch (err) {
      setMessage(err.response?.data?.message || "Ошибка сервера");
      setSuccess(false);
    }
  };

  return (
    <Container>
      <Title>Вход в аккаунт</Title>
      <LoginForm onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <Button type="submit">Войти</Button>
      </LoginForm>
      {message && <Message success={success}>{message}</Message>}
    </Container>
  );
}
