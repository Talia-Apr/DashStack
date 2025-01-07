import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import SupplierReport from '../../features/report/supplierreport'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Report | Supplier Report |"}))
      }, [])


    return(
        < SupplierReport />
    )
}

export default InternalPage