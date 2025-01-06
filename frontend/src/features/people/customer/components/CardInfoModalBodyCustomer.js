import { useEffect, useState } from "react";
import { CUSTOMERDATA } from "../index";
import ErrorText from "../../../../components/Typography/ErrorText";

function CardInfoModalBodyCustomer({ closeModal, customerId }) {
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
        return <p className="text-center text-gray-500">Customer don't have credit card saved...</p>
    }

    return (
        <>   
           <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Credit Card</label>
                    <p className="w-3/4">{customerObj.creditCard}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Account Number</label>
                    <p className="w-3/4">{customerObj.accountNumber}</p>
                </div>
            </div>
            {errorMessage && <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>}
            <div className="modal-action">                
                <button className="btn btn-primary px-6" onClick={() => closeModal()}>OK</button>
            </div>
        </>
    );
}

export default CardInfoModalBodyCustomer;
