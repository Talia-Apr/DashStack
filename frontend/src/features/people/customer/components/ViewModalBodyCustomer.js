import { useEffect, useState } from "react";
import { CUSTOMERDATA } from "../index";
import ErrorText from "../../../../components/Typography/ErrorText";

function ViewModalBodyCustomer({ closeModal, customerId }) {
    const [customerObj, setCustomerObj] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const customer = CUSTOMERDATA.find((c) => c.id === customerId);
        if (customer) {
            setCustomerObj(customer);
        } else {
            setErrorMessage("Customer not found.");
        }
    }, [customerId]);

    if (!customerObj) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Name</label>
                    <p className="w-3/4">{customerObj.name}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Phone</label>
                    <p className="w-3/4">{customerObj.phone}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Email</label>
                    <p className="w-3/4">{customerObj.email}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Address</label>
                    <p className="w-3/4">{customerObj.address}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">City</label>
                    <p className="w-3/4">{customerObj.city}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Country</label>
                    <p className="w-3/4">{customerObj.country}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Tax</label>
                    <p className="w-3/4">{customerObj.tax}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Total Sale Due</label>
                    <p className="w-3/4">{customerObj.totalSales}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Total Sell Return Due</label>
                    <p className="w-3/4">{customerObj.returnSales}</p>
                </div>
            </div>

            {errorMessage && <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>}
            <div className="modal-action">                
            <button className="btn btn-primary px-6" onClick={() => closeModal()}>OK</button>
            </div>
        </>
    );
}

export default ViewModalBodyCustomer;
