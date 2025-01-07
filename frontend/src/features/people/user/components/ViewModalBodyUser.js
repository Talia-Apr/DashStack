import { useEffect, useState } from "react";
import { USERDATA } from "../index";
import ErrorText from "../../../../components/Typography/ErrorText";

function ViewModalBodyUser({ closeModal, userId }) {
    const [userObj, setUserObj] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const user = USERDATA.find((c) => c.id === userId);
        if (user) {
            setUserObj(user);
        } else {
            setErrorMessage("User not found.");
        }
    }, [userId]);

    if (!userObj) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <>
            <div className="mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Profile</label>
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 mr-4">
                            <img src={userObj.profilImg} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">First Name</label>
                    <p className="w-3/4">{userObj.firstName}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Last Name</label>
                    <p className="w-3/4">{userObj.lastName}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">User Name</label>
                    <p className="w-3/4">{userObj.userName}</p>
                </div>
            </div>            
            <div className="mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Phone</label>
                    <p className="w-3/4">{userObj.phone}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Role</label>
                    <p className="w-3/4">{userObj.role}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Email</label>
                    <p className="w-3/4">{userObj.email}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex items-center bg-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-bold w-1/4">Password</label>
                    <p className="w-3/4">{userObj.password}</p>
                </div>
            </div>

            {errorMessage && <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>}
            <div className="modal-action">                
            <button className="btn btn-primary px-6" onClick={() => closeModal()}>OK</button>
            </div>
        </>
    );
}

export default ViewModalBodyUser;
