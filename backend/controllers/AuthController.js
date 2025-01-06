import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email,
            },
        });

        if (user.length === 0) 
            return res.status(404).json({ msg: "User Tidak Ditemukan!" });

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) 
            return res.status(400).json({ msg: "Password Salah!" });

        req.session.userId = user[0].id;

        const { id: userId, name, phone, profilImg, email, role, status } = user[0];

        const accessToken = jwt.sign(
            { userId, name, phone, profilImg, email, role, status },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '20s' }
        );

        const refreshToken = jwt.sign(
            { userId, name, phone, profilImg, email, role, status },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        await Users.update({ refresh_token: refreshToken }, { where: { id: userId } });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        // Kirim hanya satu respon JSON
        res.status(200).json({ 
            accessToken, 
            user: { name, phone, profilImg, email, role, status } 
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke Akun Anda!" });
    }
    
    const user = await Users.findOne({
        attributes: ['id', 'name', 'phone', 'profilImg', 'email', 'role', 'status'],
        where: { id: req.session.userId }
    });
    
    if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan!" });
    
    res.status(200).json(user);
}


export const Logout = async (req, res) => {
    try {
        // Hapus session
        req.session.destroy((err) => {
            if (err) {
                return res.status(400).json({ msg: "Gagal Logout!" });
            }
        });

        // Cek keberadaan refreshToken
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(204); // Tidak ada konten
        }

        // Cari user berdasarkan refreshToken
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
            },
        });

        if (!user) {
            return res.sendStatus(204); // Tidak ada konten
        }

        // Hapus refreshToken di database
        await Users.update(
            { refresh_token: null },
            {
                where: {
                    id: user.id,
                },
            }
        );

        // Hapus cookie refreshToken
        res.clearCookie('refreshToken');

        // Kirim respon sukses
        return res.status(200).json({ msg: "Anda telah Logout" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
