const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Проверяем, есть ли пользователь с таким email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаем пользователя
        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Авторизация
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Проверяем, существует ли пользователь
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Проверяем пароль
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Создаем JWT-токен
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Отправляем токен в cookie
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Проверка аутентификации
router.get('/me', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Выход (очистка cookie)
router.post('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.status(200).json({ message: 'Logged out' });
});

module.exports = router;
