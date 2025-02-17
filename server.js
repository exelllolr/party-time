require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes"); // Импортируем маршруты пользователей
const placeRoutes = require("./routes/placeRoutes"); // Импортируем маршруты мест

const app = express(); // ✅ Сначала объявляем `app`
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Исправлено: клиент на 3000 порту
app.use(cookieParser());

// Подключаем маршруты
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Маршруты для пользователей
app.use('/api/places', placeRoutes); // Маршруты для мест

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




