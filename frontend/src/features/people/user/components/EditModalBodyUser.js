import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react"
import InputText from '../../../../components/Input/InputText';
import ErrorText from '../../../../components/Typography/ErrorText';
import { showNotification } from "../../../common/headerSlice";
import { editUser } from '../userSlice';
import { USERDATA } from '../index';
import TextAreaInput from "../../../../components/Input/TextAreaInput";

function EditModalBodyUser({ closeModal, userId }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userObj, setUserObj] = useState(USERDATA);

    useEffect(() => {
        const user = USERDATA.find((c) => c.id === userId);
        console.log("User found:", user);
        if (user) {
            setUserObj(user);
        }
    }, [userId]);

    const saveEditUser = () => {
        const editUserObj = {
            id: userId,
            ...userObj,
        };
        
        if (editUserObj.profilImg && editUserObj.profilImg.startsWith("blob:")) {
            editUserObj.profilImg = null;
        }
    
        dispatch(editUser(editUserObj));    
        dispatch(showNotification({ message: "Edit User Success!", status: 1 }));   
        closeModal();
    };
    
    
    
    const [fileName, setFileName] = useState(""); 
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            const fileURL = URL.createObjectURL(file); 
            setUserObj({ ...userObj, profilImg: fileURL }); 
        } else {
            setFileName(""); 
        }
    };    
    

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setUserObj({ ...userObj, [updateType]: value });
    };    

    return (
        <>
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center rounded-lg p-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 mx-5 my-2">
                            <img src={userObj.profilImg} alt="Profile" />
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
                value={userObj.firstName}
                onChange={(e) =>
                    setUserObj({
                        ...userObj,
                        firstName: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="First Name" 
                placeholder={userObj.firstName}
                updateFormValue={updateFormValue} 
            />
            <InputText
                type="text"
                value={userObj.lastName}
                onChange={(e) =>
                    setUserObj({
                        ...userObj,
                        lastName: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Last Name" 
                placeholder={userObj.lastName}
                updateFormValue={updateFormValue} 
            />

            <InputText
                type="text"
                value={userObj.userName}
                onChange={(e) =>
                    setUserObj({
                        ...userObj,
                        userName: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Email" 
                placeholder={userObj.userName}
                updateFormValue={updateFormValue} 
            />

            <InputText
                type="email"
                value={userObj.email}
                onChange={(e) =>
                    setUserObj({
                        ...userObj,
                        email: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Email" 
                placeholder={userObj.email}
                updateFormValue={updateFormValue} 
            />

            <InputText
                type="text"
                value={userObj.phone}
                onChange={(e) =>
                    setUserObj({
                        ...userObj,
                        phone: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Phone" 
                placeholder={userObj.phone}
                updateFormValue={updateFormValue} 
            />

            <div className="form-control">
                <label htmlFor="role" className="label font-bold">
                    Role
                </label>
                <select
                    id="role"
                    value={userObj.role} 
                    onChange={(e) =>
                        setUserObj({
                            ...userObj,
                            role: e.target.value,
                        })
                    }
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
                type="text"
                value={userObj.password}
                onChange={(e) =>
                    setUserObj({
                        ...userObj,
                        password: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Password" 
                placeholder={userObj.password}
                updateFormValue={updateFormValue} 
            />

            <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={saveEditUser}>Save</button>
            </div>
        </>
    );
}

export default EditModalBodyUser;
