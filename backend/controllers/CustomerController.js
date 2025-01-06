import Customers from "../models/CustomerModel.js";

export const getCustomers = async(req, res) => {
    try {
        const customers = await Customers.findAll();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getCustomerById = async(req, res) => {
    try {
        const customers = await Customers.findOne({
            attributes: ['code', 'name', 'phone', 'email', 'address', 'city', 'country'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createCustomer = async (req, res) => { 
    const { name, phone, email, address, city, country } = req.body;

    try {
        // Ambil pelanggan terakhir untuk menentukan code berikutnya
        const lastCustomer = await Customers.findOne({
            order: [['createdAt', 'DESC']] 
        });

        // Mendapatkan code terakhir
        let newCode;
        if (lastCustomer) {
            const lastCode = lastCustomer.code; // Misal "C_001"
            const lastNumber = parseInt(lastCode.split('_')[1]); // Mengambil nomor terakhir (1)
            const newNumber = lastNumber + 1; // Menambahkan 1 untuk nomor berikutnya
            newCode = `CS_${String(newNumber).padStart(3, '0')}`; // Menghasilkan code baru
        } else {
            newCode = 'CS_001'; // Jika tidak ada pelanggan, mulai dari C_001
        }

        // Buat pelanggan baru
        await Customers.create({
            code: newCode,
            name: name,
            phone: phone,
            email: email,
            address: address,
            city: city,
            country: country,
        });

        res.status(200).json({ msg: "Customer Berhasil Ditambahkan!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const updateCustomer = async (req, res) => {
    const customers = await Customers.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!customers) return res.status(404).json({ msg: "Customer Tidak Ditemukan!" });

    const { name, phone, email, address, city, country } = req.body;

    try {
        await Customers.update({
            name: name,
            phone: phone,
            email: email,
            address: address,
            city: city,
            country: country,
        }, {
            where: {
                id: customers.id
            }
        });
        res.status(200).json({ msg: "Customer Berhasil Diubah!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const deleteCustomer = async(req, res) => {
    const customers = await Customers.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!customers) return res.status(404).json({msg: "Customer Tidak Ditemukan!"});
    try {
        await Customers.destroy({
            where: {
                id: customers.id
            }
        });
        res.status(200).json({msg: "Customer Berhasil Dihapus!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
