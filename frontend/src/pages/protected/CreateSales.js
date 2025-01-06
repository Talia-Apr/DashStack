import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CreateSales from '../../features/sales/createsales'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Create Sales"}))
      }, [])


    return(
        <CreateSales />
    )
}

export default InternalPage