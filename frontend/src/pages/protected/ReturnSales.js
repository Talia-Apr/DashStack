import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ReturnSales from '../../features/sales/returnsales'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Return Sales"}))
      }, [])


    return(
        <ReturnSales />
    )
}

export default InternalPage