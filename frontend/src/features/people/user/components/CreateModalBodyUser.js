import React, { useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios";
import InputText from '../../../../components/Input/InputText'
import ErrorText from '../../../../components/Typography/ErrorText'
import { showNotification } from "../../../common/headerSlice"
import { addNewUser } from '../userSlice';
import TextAreaInput from "../../../../components/Input/TextAreaInput"

const INITIAL_USER_OBJ = {  
    firstName: "", 
    lastName: "", 
    userName: "", 
    email: "", 
    phone: "", 
    role: "", 
    password: "",
    profilImg: null
} 

function CreateModalBodyUser({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [UserObj, setUserObj] = useState(INITIAL_USER_OBJ)

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');    
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); 
    const [status, setStatus] = useState('');

    const [fileName, setFileName] = useState(""); 
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            const fileURL = URL.createObjectURL(file); 
            setUserObj({ ...UserObj, profilImg: fileURL }); 
        } else {
            setFileName(""); 
        }
    };   


    const saveNewUser = () => {
        if(UserObj.firstName.trim() === "") return setErrorMessage("Name is required!")
        else if(UserObj.email.trim() === "") return setErrorMessage("Email id is required!")
        else {
            let newUserObj = {
                "userId": 2, 
                "firstName": UserObj.firstName, 
                "lastName": UserObj.lastName, 
                "userName": UserObj.userName,
                "email": UserObj.email,
                "phone": UserObj.phone,
                "role": UserObj.role, 
                "password": UserObj.password, 
            }
            if (newUserObj.profilImg.startsWith("blob:")) {
                newUserObj.profilImg = null;
            }
            console.log('Dispatching addNewUser', newUserObj);
            dispatch(addNewUser({ newUserObj }));

            dispatch(showNotification({ message: "New User Added!", status: 1 }))
            closeModal()
        }
    }
    

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setUserObj({ ...UserObj, [updateType]: value });
    };    

    return(
        <>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 mx-5 my-2">
                            <img 
                                src={UserObj.profilImg || "/default.jpeg"} 
                                alt="Profile" 
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="productImage" className="label font-bold">
                        Profile
                    </label>
                    <input
                        type="file"
                        id="productImage"
                        onChange={handleImageUpload}
                        className="input input-bordered py-2"
                    />
                </div>
            </div>

            <InputText 
                type="text" 
                defaultValue={UserObj.name} 
                updateType="name" 
                labelTitle="Name" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={UserObj.phone} 
                updateType="phone" 
                labelTitle="Phone" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={UserObj.email} 
                updateType="email" 
                labelTitle="Email" 
                updateFormValue={updateFormValue} 
            />

            <InputText 
                type="text" 
                defaultValue={UserObj.password} 
                updateType="password" 
                labelTitle="Password" 
                updateFormValue={updateFormValue} 
            />

            <div className="form-control">
                <label htmlFor="role" className="label font-bold">
                    Role
                </label>
                <select
                    id="role"
                    value={UserObj.role} 
                    onChange={(e) => updateFormValue({ updateType: "role", value: e.target.value })} 
                    className="select select-bordered"
                >
                    <option value="" disabled>
                        Select a Role
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Cashier">Cashier</option>
                </select>
            </div>


            <InputText 
                type="email" 
                defaultValue={UserObj.email} 
                updateType="email" 
                labelTitle="Email" 
                updateFormValue={updateFormValue} 
            />  

            <InputText 
                type="text" 
                defaultValue={UserObj.password} 
                updateType="password" 
                labelTitle="Password" 
                updateFormValue={updateFormValue} 
            />    

            <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={() => saveNewUser()}>Save</button>
            </div>
        </>
    )
}

export default CreateModalBodyUser
