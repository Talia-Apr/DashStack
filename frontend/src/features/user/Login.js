import {useState, useRef} from 'react'
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const [loginObj, setLoginObj] = useState("")

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage("");
    
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: email,
                password: password,
            });

            // Arahkan ke halaman dashboard
            navigate('/app/dashboard');
        } catch (error) {
            if (error.response) {
                console.log('Error Response:', error.response.data);
                setErrorMessage(error.response.data.msg || 'An error occurred');
            } else {
                setErrorMessage('Something went wrong. Please try again.');
            }
        }
        
        console.log("Email:", email);
        console.log("Password:", password);

    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        if (updateType === "email") setEmail(value);
        if (updateType === "password") setPassword(value);
    };   
    

    return (
        <div className="min-h-screen bg-base-200 flex items-center relative">
            <div className="card mx-auto w-full max-w-5xl shadow-xl relative z-10">
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div className="">
                        <LandingIntro />
                    </div>
                    <div className="py-24 px-10">
                        <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-4">
                            <InputText
                                type="email"
                                value={email} // Controlled value
                                onChange={(e) => setEmail(e.target.value)}
                                updateFormValue={({ value }) => setEmail(value)} // Pastikan ini sesuai
                                containerStyle="mt-4"
                                labelTitle="Email"
                            />
                            <InputText
                                type="password"
                                value={password} // Controlled value
                                onChange={(e) => setPassword(e.target.value)}
                                updateFormValue={({ value }) => setPassword(value)} // Pastikan ini sesuai
                                containerStyle="mt-4"
                                labelTitle="Password"
                            />

                            </div>
                            <div className="text-right text-primary">
                                <Link to="/forgot-password">
                                    <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span>
                                </Link>
                            </div>
                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className="btn mt-2 w-full btn-primary">Login</button>
                            <div className="text-center mt-4">Don't have an account yet? <Link to="/register"><span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Login