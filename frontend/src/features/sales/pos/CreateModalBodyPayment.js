import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewPayment } from "./PaymentSlice"
import { useNavigate } from 'react-router-dom';
import { openModal } from "../../common/modalSlice";
import { MODAL_BODY_TYPES } from '../../../../src/utils/globalConstantUtil';

const INITIAL_PAYMENT_OBJ = {  
    receivedAmount: "", 
    payingAmount: "", 
    changeReturn: "", 
    paymentChoice: "", 
    account: ""
} 

function CreateModalBodyPayment({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    const [PaymentObj, setPaymentObj] = useState(INITIAL_PAYMENT_OBJ)

    const [fileName, setFileName] = useState(""); 
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            const fileURL = URL.createObjectURL(file); 
            setPaymentObj({ ...PaymentObj, profilImg: fileURL }); 
        } else {
            setFileName(""); 
        }
    };   


    const saveNewPayment = () => {
        let newPaymentObj = {
            "receivedAmount": PaymentObj.receivedAmount, 
            "payingAmount": PaymentObj.payingAmount, 
            "changeReturn": PaymentObj.changeReturn,
            "paymentChoice": PaymentObj.paymentChoice,
            "account": PaymentObj.account, 
        }
    
        // Jika ada validasi atau logika lain yang perlu dipertahankan, tambahkan di sini.
    
        if (newPaymentObj.profilImg && newPaymentObj.profilImg.startsWith("blob:")) {
            newPaymentObj.profilImg = null;
        }
    
        console.log('Dispatching addNewPayment', newPaymentObj);
        dispatch(addNewPayment({ newPaymentObj }));
    
        dispatch(showNotification({ message: "New Payment Added!", status: 1 }));
        closeModal();
    
        // Panggil fungsi untuk membuka modal invoice setelah menutup modal sebelumnya
        dispatch(openModal({
            title: "Invoice POS",
            bodyType: MODAL_BODY_TYPES.PAYMENT_INVOICE
        }));
    }
    
    
    
    

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setPaymentObj({ ...PaymentObj, [updateType]: value });
    };    

    return(
        <>
            <InputText 
                type="text" 
                defaultValue={PaymentObj.receivedAmount} 
                updateType="receivedAmount" 
                labelTitle="Received Amount" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={PaymentObj.payingAmount} 
                updateType="payingAmount" 
                labelTitle="Paying Amount" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={PaymentObj.changeReturn} 
                updateType="changeReturn" 
                labelTitle="Change Return" 
                updateFormValue={updateFormValue} 
            />

            <div className="form-control">
                <label htmlFor="paymentChoice" className="label font-bold">
                    Payment Choice
                </label>
                <select
                    id="paymentChoice"
                    value={PaymentObj.paymentChoice} 
                    onChange={(e) => updateFormValue({ updateType: "paymentChoice", value: e.target.value })} 
                    className="select select-bordered"
                >
                    <option value="" disabled>
                        Select Payment
                    </option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                </select>
            </div>

            <div className="form-control">
                <label htmlFor="bankAccount" className="label font-bold">
                    Back Account
                </label>
                <select
                    id="bankAccount"
                    value={PaymentObj.role} 
                    onChange={(e) => updateFormValue({ updateType: "bankAccount", value: e.target.value })} 
                    className="select select-bordered"
                >
                    <option value="" disabled>
                        Select Bank
                    </option>
                    <option value="BNI">BNI</option>
                    <option value="BRI">BRI</option>
                    <option value="BCA">BCA</option>
                </select>
            </div>

            <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewPayment()}>Save</button>
            </div>
        </>
    )
}

export default CreateModalBodyPayment
