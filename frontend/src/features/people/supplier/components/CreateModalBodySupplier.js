import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../../components/Input/InputText'
import ErrorText from '../../../../components/Typography/ErrorText'
import { showNotification } from "../../../common/headerSlice"
import { addNewSupplier } from '../supplierSlice';
import TextAreaInput from "../../../../components/Input/TextAreaInput"

const INITIAL_SUPPLIER_OBJ = {   
    name: "", 
    phone: "", 
    email: "", 
    city: "", 
    tax: "", 
    purchaseDue: "", 
    totalReturn: "",
    address: ""
}

function CreateModalBodySupplier({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [supplierObj, setSupplierObj] = useState(INITIAL_SUPPLIER_OBJ)


    const saveNewSupplier = () => {
        if(supplierObj.name.trim() === "") return setErrorMessage("Name is required!")
        else if(supplierObj.email.trim() === "") return setErrorMessage("Email id is required!")
        else {
            let newsupplierObj = {
                "supplierId": 14, 
                "code": 43567, 
                "name": supplierObj.name, 
                "phone": supplierObj.phone, 
                "email": supplierObj.email,
                "tax": supplierObj.tax,
                "city": supplierObj.city, 
                "purchaseDue": supplierObj.purchaseDue, 
                "totalReturn": supplierObj.totalReturn,
                "address": supplierObj.address,
            }
            console.log('Dispatching addNewSupplier', newsupplierObj);
            dispatch(addNewSupplier({ newsupplierObj }));

            dispatch(showNotification({ message: "New Supplier Added!", status: 1 }))
            closeModal()
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setSupplierObj({ ...supplierObj, [updateType]: value });
    };

    return(
        <>
            <InputText type="text" defaultValue={supplierObj.name} updateType="name" labelTitle="Name" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={supplierObj.phone} updateType="phone" labelTitle="Phone" updateFormValue={updateFormValue} />
            <InputText type="email" defaultValue={supplierObj.email} updateType="email" labelTitle="Email" updateFormValue={updateFormValue} />            
            <InputText type="text" defaultValue={supplierObj.city} updateType="city" labelTitle="City" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={supplierObj.tax} updateType="tax" labelTitle="Tax" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={supplierObj.purchaseDue} updateType="purchaseDue" labelTitle="Total Purchase Due" updateFormValue={updateFormValue} />
            <InputText type="text" defaultValue={supplierObj.totalReturn} updateType="totalReturn" labelTitle="Total Purchase Return Due" updateFormValue={updateFormValue} />
            <TextAreaInput type="text" defaultValue={supplierObj.address} updateType="address" labelTitle="Address" updateFormValue={updateFormValue} />

            <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewSupplier()}>Save</button>
            </div>
        </>
    )
}

export default CreateModalBodySupplier
