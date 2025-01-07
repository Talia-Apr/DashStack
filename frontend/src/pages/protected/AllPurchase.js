import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AllPurchases from '../../features/Inventory/AllPurchase'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Inventory | All Purchase |"}))
      }, [])


    return(
        < AllPurchases />
    )
}

export default InternalPage