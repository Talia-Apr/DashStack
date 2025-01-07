import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../../components/Input/InputText'
import ErrorText from '../../../../components/Typography/ErrorText'
import { showNotification } from "../../../common/headerSlice"
import { addNewCustomer } from '../customersSlice';
import TextAreaInput from "../../../../components/Input/TextAreaInput"

const INITIAL_CUSTOMER_OBJ = {   
    name: "", 
    phone: "", 
    email: "", 
    tax: "", 
    totalSales: "", 
    returnSales: "",
    address: ""
}

function CreateModalBodyCustomer({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [customerObj, setcustomerObj] = useState(INITIAL_CUSTOMER_OBJ)


    const saveNewCustomer = () => {
        if(customerObj.name.trim() === "") return setErrorMessage("Name is required!")
        else if(customerObj.email.trim() === "") return setErrorMessage("Email id is required!")
        else {
            let newcustomerObj = {
                "customerId": 14, 
                "code": 43567, 
                "name": customerObj.name, 
                "phone": customerObj.phone, 
                "email": customerObj.email,
                "tax": customerObj.tax, 
                "totalSales": customerObj.totalSales, 
                "returnSales": customerObj.returnSales,
                "address": customerObj.address,
            }
            console.log('Dispatching addNewCustomer', newcustomerObj);
            dispatch(addNewCustomer({ newcustomerObj }));

            dispatch(showNotification({ message: "New Customer Added!", status: 1 }))
            closeModal()
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setcustomerObj({ ...customerObj, [updateType]: value });
    };

    return(
        <>
            <InputText 
                type="text" 
                defaultValue={customerObj.name} 
                updateType="name" 
                labelTitle="Name" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={customerObj.phone} 
                updateType="phone" 
                labelTitle="Phone" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="email" 
                defaultValue={customerObj.email} 
                updateType="email" 
                labelTitle="Email" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={customerObj.tax} 
                updateType="tax" 
                labelTitle="Tax" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={customerObj.totalSales} 
                updateType="totalSales" 
                labelTitle="Total Sale Due" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={customerObj.returnSales} 
                updateType="returnSales" 
                labelTitle="Total Sell Return Due" 
                updateFormValue={updateFormValue} 
            />

            <TextAreaInput 
                type="text" 
                defaultValue={customerObj.address} 
                updateType="address" 
                labelTitle="Address" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={customerObj.city} 
                updateType="city" 
                labelTitle="City" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={customerObj.country} 
                updateType="country" 
                labelTitle="Country" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={customerObj.creditCard} 
                updateType="creditCard" 
                labelTitle="Credit Card" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={customerObj.accountNumber} 
                updateType="accountNumber" 
                labelTitle="Account Number" 
                updateFormValue={updateFormValue} 
            />

            <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewCustomer()}>Save</button>
            </div>
        </>
    )
}

export default CreateModalBodyCustomer
