import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CustomerReport from '../../features/report/customerreport'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Report | Customer Report |"}))
      }, [])


    return(
        < CustomerReport />
    )
}

export default InternalPage