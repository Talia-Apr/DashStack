import { useEffect, useState } from "react";
import { SUPPLIERDATA } from "../index";
import ErrorText from "../../../../components/Typography/ErrorText";

function ViewModalBodySupplier({ closeModal, supplierId }) {
    const [supplierObj, setSupplierObj] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const supplier = SUPPLIERDATA.find((c) => c.id === supplierId);
        if (supplier) {
            setSupplierObj(supplier);
        } else {
            setErrorMessage("Supplier not found.");
        }
    }, [supplierId]);

    if (!supplierObj) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Name</label>
                    <p className="w-3/4">{supplierObj.name}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Phone</label>
                    <p className="w-3/4">{supplierObj.phone}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Email</label>
                    <p className="w-3/4">{supplierObj.email}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">City</label>
                    <p className="w-3/4">{supplierObj.city}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Tax Number</label>
                    <p className="w-3/4">{supplierObj.tax}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Total Purchase Due</label>
                    <p className="w-3/4">{supplierObj.purchaseDue}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Total Purchase Return Due</label>
                    <p className="w-3/4">{supplierObj.totalReturn}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Address</label>
                    <p className="w-3/4">{supplierObj.address}</p>
                </div>
            </div>

            {errorMessage && <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>}
            <div className="modal-action">                
            <button className="btn btn-primary px-6" onClick={() => closeModal()}>OK</button>
            </div>
        </>
    );
}

export default ViewModalBodySupplier;
