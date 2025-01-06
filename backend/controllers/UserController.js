import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req, res) => {
    try {
        const users = await Users.findOne({
            attributes: ['name', 'phone', 'profilImg', 'email', 'password', 'role', 'status'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req, res) => {
    const { name, phone, profilImg, email, password, role, status } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            phone: phone,
            profilImg: profilImg,
            email: email,
            password: hashPassword,
            role: role,
            status: status,
        });
        res.status(200).json({msg: "User Berhasil Ditambahkan!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async(req, res) => {
    const users = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!users) return res.status(404).json({msg: "User Tidak Ditemukan!"});
    const { name, phone, profilImg, email, password, role, status } = req.body;
    const salt = await bcrypt.genSalt();
    let hashPassword = await bcrypt.hash(password, salt);
    if(password === "" || password === null) {
        hashPassword = users.password;
    }else{
        hashPassword = await bcrypt.hash(password, salt);
    }
    try {
        await Users.update({
            name: name,
            phone: phone,
            profilImg: profilImg,
            email: email,
            password: hashPassword,
            role: role,
            status: status,
        }, {
            where: {
                id: users.id
            }
        });
        res.status(200).json({msg: "User Berhasil Diubah!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }

}

export const deleteUser = async(req, res) => {
    const users = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!users) return res.status(404).json({msg: "User Tidak Ditemukan!"});
    try {
        await Users.destroy({
            where: {
                id: users.id
            }
        });
        res.status(200).json({msg: "User Berhasil Dihapus!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
