import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { username, password, answer } = req.body;
        if (!username) {
            return res.status(400).send({ message: 'Vui lòng nhập tên tài khoản' });
        }

        if (!password) {
            return res.status(400).send({ message: 'Vui lòng nhập mật khẩu' });
        }

        if (!answer) {
            return res.status(400).send({ message: 'Vui lòng nhập câu trả lời' });
        }

        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: 'Tài khoản đã tồn tại.',
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await userModel.create({ username, password: hashedPassword, answer });

        res.status(201).send({
            success: true,
            message: 'Đăng ký thành công',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Lỗi đăng ký',
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({
                success: false,
                message: 'Tên người dùng và mật khẩu là bắt buộc.',
            });
        }
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Tài khoản không tồn tại.',
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: 'Mật khẩu không chính xác.',
            });
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '40d' });
        res.status(200).send({
            success: true,
            message: 'Đăng nhập thành công',
            user: {
                username: user.username,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Lỗi đăng nhập',
            error,
        });
    }
};

export const forgotPasswordController = async (req, res) => {
    try {
        const { username, answer, newPassword } = req.body;
        if (!username) {
            res.status(400).send({ message: 'Vui lòng nhập tên tài khoản' });
        }
        if (!answer) {
            res.status(400).send({ message: 'Vui lòng nhập câu trả lời' });
        }
        if (!newPassword) {
            res.status(400).send({ message: 'Vui lòng nhập mật khẩu mới' });
        }

        const user = await userModel.findOne({ username, answer });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Ten tai khoan hoac cau tra loi sai',
            });
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: 'Thay đổi mật khẩu thành công!',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Loi',
            error,
        });
    }
};

export const testController = (req, res) => {
    res.send('protected Route');
};
