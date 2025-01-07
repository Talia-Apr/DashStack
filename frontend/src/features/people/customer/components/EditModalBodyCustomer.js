import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react"
import InputText from '../../../../components/Input/InputText';
import ErrorText from '../../../../components/Typography/ErrorText';
import { showNotification } from "../../../common/headerSlice";
import { editCustomer } from '../customersSlice';
import { CUSTOMERDATA } from '../index';
import TextAreaInput from "../../../../components/Input/TextAreaInput";

function EditModalBodyCustomer({ closeModal, customerId }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [customerObj, setCustomerObj] = useState(CUSTOMERDATA);

    useEffect(() => {
        const customer = CUSTOMERDATA.find((c) => c.id === customerId);
        console.log("Customer found:", customer);
        if (customer) {
            setCustomerObj(customer);
        }
    }, [customerId]);

    const saveEditCustomer = () => {
        const editCustomerObj = {
            id: customerId,
            ...customerObj,
        };
        dispatch(editCustomer(editCustomerObj));
        dispatch(showNotification({ message: "Edit Customer Success!", status: 1 }));
        closeModal();
    };
    

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setCustomerObj({ ...customerObj, [updateType]: value });
    };
    

    return (
        <>
            <InputText
                type="text"
                value={customerObj.name}
                onChange={(e) =>
                    setCustomerObj({
                        ...customerObj,
                        name: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Name" 
                placeholder={customerObj.name}
                updateFormValue={updateFormValue} 
            />
            <InputText
                type="text"
                value={customerObj.phone}
                onChange={(e) =>
                    setCustomerObj({
                        ...customerObj,
                        phone: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Phone" 
                placeholder={customerObj.phone}
                updateFormValue={updateFormValue} 
            />
            <InputText
                type="email"
                value={customerObj.email}
                onChange={(e) =>
                    setCustomerObj({
                        ...customerObj,
                        email: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Email" 
                placeholder={customerObj.email}
                updateFormValue={updateFormValue} 
            />
            <InputText
                type="text"
                value={customerObj.address}
                onChange={(e) =>
                    setCustomerObj({
                        ...customerObj,
                        tax: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Address" 
                placeholder={customerObj.address}
                updateFormValue={updateFormValue} 
            />
            <InputText
                type="text"
                value={customerObj.city}
                onChange={(e) =>
                    setCustomerObj({
                        ...customerObj,
                        tax: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="City" 
                placeholder={customerObj.city}
                updateFormValue={updateFormValue} 
            />
            <InputText
                type="text"
                value={customerObj.country}
                onChange={(e) =>
                    setCustomerObj({
                        ...customerObj,
                        tax: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Country" 
                placeholder={customerObj.country}
                updateFormValue={updateFormValue} 
            />
            <InputText
                type="text"
                value={customerObj.tax}
                onChange={(e) =>
                    setCustomerObj({
                        ...customerObj,
                        tax: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Tax" 
                placeholder={customerObj.tax}
                updateFormValue={updateFormValue} 
            />
            <InputText
                type="text"
                value={customerObj.totalSales}
                onChange={(e) =>
                    setCustomerObj({
                        ...customerObj,
                        totalSales: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Total Sale Due" 
                placeholder={customerObj.totalSales}
                updateFormValue={updateFormValue} 
            />
            <InputText
                type="text"
                value={customerObj.returnSales}
                onChange={(e) =>
                    setCustomerObj({
                        ...customerObj,
                        returnSales: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Total Sell Return Due" 
                placeholder={customerObj.returnSales}
                updateFormValue={updateFormValue} 
            />
            
            <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={saveEditCustomer}>Save</button>
            </div>
        </>
    );
}

export default EditModalBodyCustomer;
