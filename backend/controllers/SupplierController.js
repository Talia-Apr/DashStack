import Suppliers from "../models/SupplierModel.js";

export const getSuppliers = async(req, res) => {
    try {
        const suppliers = await Suppliers.findAll();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getSupplierById = async(req, res) => {
    try {
        const suppliers = await Suppliers.findOne({
            attributes: ['code', 'name', 'phone', 'email', 'address', 'city', 'country'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createSupplier = async (req, res) => { 
    const { name, phone, email, address, city, country } = req.body;

    try {
        // Ambil pelanggan terakhir untuk menentukan code berikutnya
        const lastSupplier = await Suppliers.findOne({
            order: [['createdAt', 'DESC']] 
        });

        // Mendapatkan code terakhir
        let newCode;
        if (lastSupplier) {
            const lastCode = lastSupplier.code; // Misal "C_001"
            const lastNumber = parseInt(lastCode.split('_')[1]); // Mengambil nomor terakhir (1)
            const newNumber = lastNumber + 1; // Menambahkan 1 untuk nomor berikutnya
            newCode = `SP_${String(newNumber).padStart(3, '0')}`; // Menghasilkan code baru
        } else {
            newCode = 'SP_001'; // Jika tidak ada pelanggan, mulai dari C_001
        }

        // Buat pelanggan baru
        await Suppliers.create({
            code: newCode,
            name: name,
            phone: phone,
            email: email,
            address: address,
            city: city,
            country: country,
        });

        res.status(200).json({ msg: "Supplier Berhasil Ditambahkan!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const updateSupplier = async (req, res) => {
    const suppliers = await Suppliers.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!suppliers) return res.status(404).json({ msg: "Supplier Tidak Ditemukan!" });

    const { name, phone, email, address, city, country } = req.body;

    try {
        await Suppliers.update({
            name: name,
            phone: phone,
            email: email,
            address: address,
            city: city,
            country: country,
        }, {
            where: {
                id: suppliers.id
            }
        });
        res.status(200).json({ msg: "Supplier Berhasil Diubah!" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


export const deleteSupplier = async(req, res) => {
    const suppliers = await Suppliers.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!suppliers) return res.status(404).json({msg: "Supplier Tidak Ditemukan!"});
    try {
        await Suppliers.destroy({
            where: {
                id: suppliers.id
            }
        });
        res.status(200).json({msg: "Supplier Berhasil Dihapus!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
