import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CreatePurchase from '../../features/Inventory/CreatePurchase'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Inventory | Create Purchase |"}))
      }, [])


    return(
        < CreatePurchase />
    )
}

export default InternalPage