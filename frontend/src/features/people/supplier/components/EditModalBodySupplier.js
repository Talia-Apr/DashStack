import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react"
import InputText from '../../../../components/Input/InputText';
import ErrorText from '../../../../components/Typography/ErrorText';
import { showNotification } from "../../../common/headerSlice";
import { editSupplier } from '../supplierSlice';
import { SUPPLIERDATA } from '../index';
import TextAreaInput from "../../../../components/Input/TextAreaInput";

function EditModalBodySupplier({ closeModal, supplierId }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [supplierObj, setSupplierObj] = useState(SUPPLIERDATA);

    useEffect(() => {
        const supplier = SUPPLIERDATA.find((c) => c.id === supplierId);
        console.log("Supplier found:", supplier);
        if (supplier) {
            setSupplierObj(supplier);
        }
    }, [supplierId]);

    const saveEditSupplier = () => {
        const editSupplierObj = {
            id: supplierId,
            ...supplierObj,
        };
        dispatch(editSupplier(editSupplierObj));
        dispatch(showNotification({ message: "Edit Supplier Success!", status: 1 }));
        closeModal();
    };    

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setSupplierObj({ ...supplierObj, [updateType]: value });
    };
    

    return (
        <>
            <InputText
                type="text"
                value={supplierObj.name}
                onChange={(e) =>
                    setSupplierObj({
                        ...supplierObj,
                        name: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Name" 
                placeholder={supplierObj.name}
                updateFormValue={updateFormValue} 
            />
            <InputText
                type="text"
                value={supplierObj.phone}
                onChange={(e) =>
                    setSupplierObj({
                        ...supplierObj,
                        phone: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Phone" 
                placeholder={supplierObj.phone}
                updateFormValue={updateFormValue} 
            />

            <InputText
                type="email"
                value={supplierObj.email}
                onChange={(e) =>
                    setSupplierObj({
                        ...supplierObj,
                        email: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Email" 
                placeholder={supplierObj.email}
                updateFormValue={updateFormValue} 
            />

            <InputText
                type="text"
                value={supplierObj.city}
                onChange={(e) =>
                    setSupplierObj({
                        ...supplierObj,
                        city: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="City" 
                placeholder={supplierObj.city}
                updateFormValue={updateFormValue} 
            />

            <InputText
                type="text"
                value={supplierObj.tax}
                onChange={(e) =>
                    setSupplierObj({
                        ...supplierObj,
                        tax: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Tax Number" 
                placeholder={supplierObj.tax}
                updateFormValue={updateFormValue} 
            />

            <InputText
                type="text"
                value={supplierObj.purchaseDue}
                onChange={(e) =>
                    setSupplierObj({
                        ...supplierObj,
                        purchaseDue: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Total Purchase Due" 
                placeholder={supplierObj.purchaseDue}
                updateFormValue={updateFormValue} 
            />
            <InputText
                type="text"
                value={supplierObj.totalReturn}
                onChange={(e) =>
                    setSupplierObj({
                        ...supplierObj,
                        totalReturn: e.target.value,
                    })
                }
                className="input input-bordered w-full mt-4"
                labelTitle="Return Sales" 
                placeholder={supplierObj.totalReturn}
                updateFormValue={updateFormValue} 
            />

            <TextAreaInput 
                type="text" 
                defaultValue={supplierObj.address} 
                updateType="address" 
                labelTitle="Address" 
                placeholder={supplierObj.address}
                updateFormValue={updateFormValue} 
            />

            <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-primary px-6" onClick={saveEditSupplier}>Save</button>
            </div>
        </>
    );
}

export default EditModalBodySupplier;
