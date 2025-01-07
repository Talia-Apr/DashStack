import { useEffect } from 'react'
import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import AddLeadModalBody from '../features/leads/components/AddLeadModalBody'
import ConfirmationModalBody from '../features/common/components/ConfirmationModalBody'
import CreateModalBodyCustomer from '../features/people/customer/components/CreateModalBodyCustomer'
import EditModalBodyCustomer from '../features/people/customer/components/EditModalBodyCustomer'
import ViewModalBodyCustomer from '../features/people/customer/components/ViewModalBodyCustomer'
import CardInfoModalBodyCustomer from '../features/people/customer/components/CardInfoModalBodyCustomer'

import CreateModalBodySupplier from '../features/people/supplier/components/CreateModalBodySupplier'
import EditModalBodySupplier from '../features/people/supplier/components/EditModalBodySupplier'
import ViewModalBodySupplier from '../features/people/supplier/components/ViewModalBodySupplier'

import CreateModalBodyUser from '../features/people/user/components/CreateModalBodyUser'
import EditModalBodyUser from '../features/people/user/components/EditModalBodyUser'
import ViewModalBodyUser from '../features/people/user/components/ViewModalBodyUser'

import CreateModalBodyPayment from '../features/sales/pos/CreateModalBodyPayment'
import InvoiceModalBodyPayment from '../features/sales/pos/InvoiceModalBodyPayment'

function ModalLayout(){

    const {isOpen, bodyType, size, extraObject, title} = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const close = (e) => {
        dispatch(closeModal(e))
    }

    return(
        <>
        {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>


                {/* Loading modal body according to different modal type */}
                {
                    {        
                             // LEAD
                             [MODAL_BODY_TYPES.LEAD_ADD_NEW] : <AddLeadModalBody closeModal={close} extraObject={extraObject}/>,

                             // CONFIRM
                             [MODAL_BODY_TYPES.CONFIRMATION] : <ConfirmationModalBody extraObject={extraObject} closeModal={close}/>,

                             // CUSTOMER
                             [MODAL_BODY_TYPES.CUSTOMER_ADD_NEW] : <CreateModalBodyCustomer extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.CUSTOMER_EDIT] : <EditModalBodyCustomer extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.CUSTOMER_VIEW] : <ViewModalBodyCustomer extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.CUSTOMER_CARD] : <CardInfoModalBodyCustomer extraObject={extraObject} closeModal={close}/>,

                             // SUPPLIER
                             [MODAL_BODY_TYPES.SUPPLIER_ADD_NEW] : <CreateModalBodySupplier extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.SUPPLIER_EDIT] : <EditModalBodySupplier extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.SUPPLIER_VIEW] : <ViewModalBodySupplier extraObject={extraObject} closeModal={close}/>,

                             // USER
                             [MODAL_BODY_TYPES.USER_ADD_NEW] : <CreateModalBodyUser extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.USER_EDIT] : <EditModalBodyUser extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.USER_VIEW] : <ViewModalBodyUser extraObject={extraObject} closeModal={close}/>,

                             [MODAL_BODY_TYPES.PAYMENT_ADD_NEW] : <CreateModalBodyPayment extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.PAYMENT_INVOICE] : <InvoiceModalBodyPayment extraObject={extraObject} closeModal={close}/>,

                             // DEFAULT
                             [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                    }[bodyType]
                }
            </div>
            </div>
            </>
    )
}

export default ModalLayout