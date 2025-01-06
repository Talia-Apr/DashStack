import { useState } from "react";
import "jspdf-autotable";
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import TitleCard from "../../../components/Cards/TitleCard";
import ShoppingCart from '@heroicons/react/24/outline/ShoppingCartIcon'
import Squares2X2Icon  from '@heroicons/react/24/outline/Squares2X2Icon'
import XCircle  from '@heroicons/react/24/outline/XCircleIcon'
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { CUSTOMERDATA } from "../../people/customer/index";
import { showNotification } from "../../common/headerSlice";
import { openModal } from "../../common/modalSlice";
import { deletePayment, editPayment, getPaymentContent } from "../pos/PaymentSlice";
import { MODAL_BODY_TYPES } from '../../../../src/utils/globalConstantUtil';
import { NavLink,  Routes, Link , useLocation, useNavigate} from 'react-router-dom'


function POS() {
    const [orderTax, setOrderTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [scanning, setScanning] = useState(false);
    const [productCode, setProductCode] = useState("");
    const [orderItems, setOrderItems] = useState([]);
    const [shipping, setShipping] = useState(0);
    const [searchText, setSearchText] = useState(""); // Untuk teks pencarian
    const [cartItems, setCartItems] = useState([
        { id: 1, product: "Pineapple", price: 16, quantity: 1 },
        { id: 2, product: "Lemon", price: 16, quantity: 1 },
    ]);

    const handleBarcodeScan = (data) => {
        if (data) {
          const scannedProduct = {
            id: Date.now(),
            product: "Scanned Product",
            unitPrice: 15.0,
            currentStock: "1 kg",
            qty: 1,
            discount: 0.0,
            tax: 0.75,
            subtotal: 15.75,
          };
          setProductCode(data.text);
          setOrderItems((prev) => [...prev, scannedProduct]);
          setScanning(false);
        }
    };

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getPaymentContent())
    }, [])  

    // CREATE
    const openCreatePayment = () => {
        dispatch(openModal({title : "Create Payment", bodyType : MODAL_BODY_TYPES.PAYMENT_ADD_NEW}))
    }
    
    const toggleScanner = () => {
        setScanning(!scanning);
    };

    const resetFields = () => {
        setOrderTax(0);
        setDiscount(0);
        setShipping(0);
    };

    const totalPayable = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

     // VIEW
     const navigate = useNavigate();

     const handleClick = () => {
         navigate("/app/dashboard");
     };
 

    const finalTotal = totalPayable + orderTax - discount + shipping;

    const [products] = useState(
        Array.from({ length: 12 }, (_, index) => ({
            id: index + 1,
            name: `Honey Bee ${index + 1}`,
            price: 15,
            stock: "100 pcs",
        }))
    );

    const updateQuantity = (id, value) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + value) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...prev,
                { id: product.id, product: product.name, price: product.price, quantity: 1 },
            ];
        });
    };

    
    // VIEW
    const openInvoicePayment = () => {
        dispatch(openModal({title : "Invoice", bodyType : MODAL_BODY_TYPES.PAYMENT_INVOICE}))
    }


    // State untuk halaman saat ini
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Menghitung total halaman
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Menghitung produk yang akan ditampilkan berdasarkan halaman
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Fungsi untuk mengubah halaman
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
                <div className="flex flex-row gap-2">
                    {/* Bagian Transaksi */}
                    <div className="flex flex-col h-screen">
                        {/* Konten Utama */}
                        <div className="flex-1 p-4 space-y-4 bg-white overflow-y-auto">
                            {/* Header */}
                            <header className="flex justify-between items-center mb-4">
                            {/* Logo dan Text DashStack */}
                            <div className="flex items-center space-x-2">
                                <img
                                className="mask mask-squircle w-10"
                                src="/SnowIcon.png"
                                alt="DashStack Logo"
                                />
                                <div className="mb-1 font-bold text-2xl">
                                <span className="text-primary">Dash</span>
                                <span className="text-accentcont">Stack</span>
                                </div>
                            </div>

                            {/* Ikon dan Profil */}
                            <div className="flex items-center space-x-4">
                                <button class="border btn-sm border-primary text-primary rounded-md px-4 py-2 flex items-center space-x-1 hover:bg-primary hover:text-white transition duration-200"
                                    onClick={handleClick} >                  
                                    <span className="text-semibold">Back</span>
                                </button>
                                <Squares2X2Icon className="h-6 w-6" />
                                <ShoppingCart className="h-6 w-6" />
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src="/Profile.svg" />
                                </div>
                                </label>
                            </div>
                            </header>

                            {/* Form dan Tabel */}
                            <div className="space-y-4">
                            <select className="border p-2 rounded w-full">
                                <option value="">Walk in Customers</option>
                                {CUSTOMERDATA.map((cust) => (
                                    <option key={cust.id} value={cust.name}>
                                        {cust.name}
                                    </option>
                                ))}
                            </select>
                            <select className="border p-2 rounded w-full">
                                <option value="">Warehouse 1</option>
                                <option value="">Warehouse </option>
                            </select>
                            </div>

                            <table className="w-full border-collapse border border-gray-300 mt-4">
                            <thead>
                                <tr>
                                <th className="border px-4 py-2">Product</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2">Qty</th>
                                <th className="border px-4 py-2">Subtotal</th>
                                <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="border px-4 py-2">{item.product}</td>
                                    <td className="border px-4 py-2">${item.price}</td>
                                    <td className="border px-4 py-2 flex items-center">
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="px-2 py-2 rounded text-white ml-7 border bg-primary font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="px-2">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="px-2 py-2 rounded text-white border bg-primary font-bold"
                                    >
                                        +
                                    </button>
                                    </td>
                                    <td className="border px-4 py-2">
                                    ${item.price * item.quantity}
                                    </td>
                                    <td className="border px-4 py-2">
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500"
                                    >
                                        <XCircle className="h-6 w-6 font-error" />
                                    </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>

                        {/* Total Payable dan Tombol */}
                        <div className="p-4 bg-white rounded shadow-md">
                            <div className="text-center font-bold text-lg bg-blue-100 py-2 rounded">
                            Total Payable: ${finalTotal.toFixed(2)}
                            </div>

                            <div className="flex justify-between items-center mt-4 space-x-4">
                            <div className="flex flex-col">
                                <label className="text-gray-700 text-sm mb-2">Order Tax</label>
                                <div className="relative">
                                <input
                                    type="number"
                                    value={orderTax}
                                    onChange={(e) => setOrderTax(parseFloat(e.target.value) || 0)}
                                    className="border rounded px-3 py-2 w-full text-sm"
                                />
                                <span className="absolute top-2 right-3 text-gray-500">%</span>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 text-sm mb-2">Discount</label>
                                <div className="relative">
                                <input
                                    type="number"
                                    value={discount}
                                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                                    className="border rounded px-3 py-2 w-full text-sm"
                                />
                                <span className="absolute top-2 right-3 text-gray-500">%</span>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 text-sm mb-2">Shipping</label>
                                <div className="relative">
                                <input
                                    type="number"
                                    value={shipping}
                                    onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
                                    className="border rounded px-3 py-2 w-full text-sm"
                                />
                                <span className="absolute top-2 right-3 text-gray-500">$</span>
                                </div>
                            </div>
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <button
                                    onClick={resetFields}
                                    className="flex items-center space-x-2 px-4 py-2 border border-red-500 text-red-500 rounded"
                                >
                                    <span>&#8634;</span>
                                    <span>Reset</span>
                                </button>
                                <button className="bg-primary text-white px-6 py-2 rounded flex-grow ml-4"
                                    onClick={() => openCreatePayment()}>
                                    Pay Now
                                </button>
                            </div>

                        </div>
                    </div>


                    {/* Bagian Produk */}
                    <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
                        {/* Scanner Section */}
                        <div className="mb-4">
                            <div className="relative flex items-center">
                            <button
                                onClick={toggleScanner}
                                className="btn btn-primary mr-4 flex items-center"
                            >
                                <QrCodeIcon className="w-10 h-10 mr-1" 
                                onUpdate={(err, result) => {
                                    if (result) handleBarcodeScan(result);
                                  }}/>
                            </button>
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => {
                                    const text = e.target.value;
                                    setSearchText(text); // Update teks pencarian
                                    setCurrentPage(1); // Reset halaman ke awal setelah pencarian
                                }}
                                placeholder="Search Product By Name"
                                className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                        {/* Products Section */}
                        <div className="grid grid-cols-3 gap-4 mt-10">
                            {currentProducts.map((product) => (
                                <div key={product.id} className="border rounded p-2 text-center bg-white">
                                    <img
                                        src="/product.png"
                                        alt={product.name}
                                        className="mx-auto mb-2 h-24 object-contain"
                                    />
                                    <div className="font-bold">{product.name}</div>
                                    <div>{product.stock}</div>
                                    <div className="text-primary font-bold">${product.price}</div>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-primary text-white px-4 py-1 rounded mt-2"
                                    >
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Section */}
                        <div className="flex justify-center mt-10 space-x-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-primary text-white' : ''}`}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
        </>
    );
}

export default POS;
