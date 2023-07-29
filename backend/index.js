const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Configuração do MongoDB
const mongoURI = 'mongodb://localhost:27017/sistema-login';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas de autenticação
app.use('/api', authRoutes)