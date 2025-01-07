import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AllSales from '../../features/sales/allsales'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "All Sales"}))
      }, [])


    return(
        <AllSales />
    )
}

export default InternalPage