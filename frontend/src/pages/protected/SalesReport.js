import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import SalesReport from '../../features/report/salesreport'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Report | Sales Report |"}))
      }, [])


    return(
        < SalesReport />
    )
}

export default InternalPage