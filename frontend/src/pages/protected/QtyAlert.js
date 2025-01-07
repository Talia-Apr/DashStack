import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import QtyAlert from '../../features/report/pquantityalert/index'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Report | Product Quantity Alert |"}))
      }, [])


    return(
        < QtyAlert />
    )
}

export default InternalPage