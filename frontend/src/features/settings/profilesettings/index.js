import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from '../../common/headerSlice';
import InputText from '../../../components/Input/InputText';

function ProfileSettings() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');     
    const [profilImg, setProfil] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file); 
            setProfil(fileURL); // Simpan URL gambar
        } else {
            setProfil(""); 
        }
    };

    // Fungsi untuk refresh token jika diperlukan
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setPhone(decoded.phone);
            setEmail(decoded.email);
            setRole(decoded.role);
            setPassword(decoded.password);
            setExpire(decoded.exp);
            setProfil(decoded.profilImg); // Menyimpan gambar profil dari token jika ada
        } catch (error) {
            console.log(error);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        if (updateType === "name") setName(value);
        if (updateType === "phone") setPhone(value);
        if (updateType === "email") setEmail(value);
        if (updateType === "role") setRole(value);
        if (updateType === "password") setPassword(value);
    };

    const dispatch = useDispatch();

    const updateProfile = () => {
        dispatch(showNotification({ message: "Profile Updated", status: 1 }));    
    };

    return (
        <>
            <TitleCard title="Profile Settings" topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center rounded-lg p-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-20 h-20 mx-10 my-2">
                                    <img 
                                        src="/Profile.svg"
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
                        labelTitle="Name"
                        defaultValue={name}
                        updateFormValue={({ value }) => updateFormValue({ updateType: "name", value })}
                    />
                    <InputText
                        labelTitle="Phone"
                        defaultValue={phone}
                        updateFormValue={({ value }) => updateFormValue({ updateType: "phone", value })}
                    />
                    <InputText
                        labelTitle="Email"
                        defaultValue={email}
                        updateFormValue={({ value }) => updateFormValue({ updateType: "email", value })}
                    />
                    <InputText
                        labelTitle="Role"
                        defaultValue={role}
                        readOnly
                        updateFormValue={({ value }) => updateFormValue({ updateType: "role", value })}
                        disabled 
                    />
                    <InputText
                        labelTitle="Password"
                        type="password"
                        defaultValue="*********"    
                        readOnly                    
                        updateFormValue={({ value }) => updateFormValue({ updateType: "password", value })}
                        disabled 
                    />
                </div>
                <div className="divider"></div>              
                <div className="mt-16">
                    <button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button>
                </div>
            </TitleCard>
        </>
    );
}

export default ProfileSettings;
