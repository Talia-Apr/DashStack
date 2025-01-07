import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import PSalesReport from '../../features/report/psalesreport'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Report | Product Sales Report |"}))
      }, [])


    return(
        < PSalesReport />
    )
}

export default InternalPage