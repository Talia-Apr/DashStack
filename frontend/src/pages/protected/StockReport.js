import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import StockReport from '../../features/report/stockreport'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Report | Stock Report |"}))
      }, [])


    return(
        < StockReport />
    )
}

export default InternalPage