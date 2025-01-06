import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AllTransfer from '../../features/warehouse/allTransfer'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Warehouse | All Transfer |"}))
      }, [])


    return(
        < AllTransfer />
    )
}

export default InternalPage