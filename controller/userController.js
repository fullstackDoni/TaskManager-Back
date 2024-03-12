const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Поиск пользователя в базе данных по email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({message: 'Неверный email или пароль'});
        }

        // Проверка правильности пароля
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Неверный email или пароль'});
        }

        // Генерация JWT токена
        const token = jwt.sign({userId: user._id}, 'test', {expiresIn
    :
        '1h'
    })
        ;

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const register = async (req, res) => {
    try {
        // Извлекаем данные из тела запроса
        const {name, email, password} = req.body;

        // Проверяем, что все необходимые поля присутствуют
        if (!name || !email || !password) {
            return res.status(400).json({message: 'Пожалуйста, заполните все обязательные поля'});
        }

        // Проверка наличия пользователя с таким же email в базе данных
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'Пользователь с таким email уже существует'});
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаем нового пользователя
        const newUser = new User({
            name,
            email,
            password: hashedPassword // Сохраняем хешированный пароль в базу данных
        });
        await newUser.save(); // Сохраняем пользователя в базу данных

        // Отправляем успешный ответ
        res.status(201).json({message: 'Пользователь успешно зарегистрирован'});
    } catch (error) {
        // Если произошла ошибка, отправляем статус 500 и сообщение об ошибке
        res.status(500).json({message: error.message});
    }
};


module.exports = {login, register};

