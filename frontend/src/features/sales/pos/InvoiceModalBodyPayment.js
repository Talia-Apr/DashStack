import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import Printer from '@heroicons/react/24/outline/PrinterIcon'
import { CUSTOMERDATA } from "../../people/customer/index";
import { showNotification } from "../../common/headerSlice"
import { deletePayment, editPayment, getPaymentsContent } from "./PaymentSlice";

function InvoiceModalBodyPayment({closeModal, customerId}){
    const [paymentObj, setPaymentObj] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const printPage = () => {
        window.print();
    };


    useEffect(() => {
        const payment = CUSTOMERDATA.find((c) => c.id === customerId);
        if (payment) {
            setPaymentObj(payment);
        } else {
            setErrorMessage("Payment not found.");
        }
    }, [customerId]);

    if (!paymentObj) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return(
        <>
            <div className="flex items-center mb-2 border-b-2 border-gray-500"></div>           
            
            {/* Info */}
            <div> 
                <div className="flex items-center mb-1 mt-4"> 
                    <label className="w-1/4 text-xs">Date</label>
                    <p className="w-3/4 text-xs">{paymentObj.code}</p>                    
                </div>            
                <div className="flex items-center mb-1"> 
                    <label className="w-1/4 text-xs">Address</label>
                    <p className="w-3/4 text-xs">{paymentObj.address}</p>
                </div>
                <div className="flex items-center mb-1"> 
                    <label className="w-1/4 text-xs">Customer</label>
                    <p className="w-3/4 text-xs">{paymentObj.name}</p>
                </div>
                <div className="flex items-center mb-1"> 
                    <label className="w-1/4 text-xs">Phone</label>
                    <p className="w-3/4 text-xs">{paymentObj.phone}</p>
                </div>
            </div>

            
            {/* Order Detail */}
            <div className="mt-3"> 
                <div className="flex items-center"> 
                    <label className="w-1/4 text-lg">Avocat</label>                   
                </div>  
                <div className="flex items-center mb-2 border-b-2 border-dotted border-gray-300"> 
                    <label className="w-1/4 text-sm font-bold">40.00 kg X 15.00</label>
                    <p className="w-3/4 text-sm text-right font-bold">{paymentObj.name}</p>                    
                </div>            
                <div className="flex items-center mb-2 border-b-2 border-dotted border-gray-300"> 
                    <label className="w-1/4 text-sm font-bold">Order Tax</label>
                    <p className="w-3/4 text-sm text-right font-bold">{paymentObj.tax}</p>
                </div>
                <div className="flex items-center mb-2 border-b-2 border-dotted border-gray-300"> 
                    <label className="w-1/4 text-sm font-bold">Discount</label>
                    <p className="w-3/4 text-sm text-right font-bold">{paymentObj.totalSales}</p>
                </div>
                <div className="flex items-center mb-2 border-b-2 border-dotted border-gray-300"> 
                    <label className="w-1/4 text-sm font-bold">Grand Total</label>
                    <p className="w-3/4 text-sm text-right font-bold">{paymentObj.returnSales}</p>
                </div>
            </div>

            {/* Tabel Order */}
            <table className="w-full border-collapse border border-gray-300 mb-6 mt-4">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-[#D9D9D9] px-2 py-2 text-neutral text-center text-sm">
                        Paid By
                    </th>
                    <th className="border border-[#D9D9D9] px-2 py-2 text-neutral text-center text-sm">
                        Amount
                    </th>
                    <th className="border border-[#D9D9D9] px-2 py-2 text-neutral text-center text-sm">
                        Change Return
                    </th>
                </tr>
                </thead>
                <tbody>                
                    <tr>                        
                        <td className="border border-gray-300 px-2 py-2 text-center text-sm">
                            {paymentObj.name}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-center text-sm">
                            {paymentObj.totalSales}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-center text-sm">
                            {paymentObj.returnSales}                        
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Barcode */}
            <div className="mt-3 flex flex-col items-center justify-center">
                <div className="flex items-center w-full max-w-md"> 
                    <p className="w-full text-sm font-bold text-center">Thank You For Shopping With Us.</p>                   
                </div>            
                <div className="flex items-center mb-2 w-full max-w-md"> 
                    <p className="w-full text-sm font-bold text-center">Please Come Again</p>
                </div>
                <div className="flex items-center justify-center w-full max-w-md"> 
                    <img src="/barcode.png" className="w-32 h-auto" alt="Barcode" />
                </div>
                <div className="flex items-center mb-2 w-full max-w-md"> 
                    <p className="w-full text-sm font-bold text-center">SL_1118</p>
                </div>
            </div>


            {errorMessage && <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>}
            <div className="modal-action">                
                <button className="btn btn-primary px-6" onClick={() => printPage()}>
                    <Printer className="h-5 w-5" />
                    Print
                </button>
            </div>
        </>
    )
}

export default InvoiceModalBodyPayment
