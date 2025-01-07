import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ReturnPurchase from '../../features/Inventory/ReturnPurchase'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Inventory | Return Purchase |"}))
      }, [])


    return(
        < ReturnPurchase />
    )
}

export default InternalPage