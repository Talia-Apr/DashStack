import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import WarehousePage from '../../features/warehouse/warehouse'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Warehouse | Warehouses |"}))
      }, [])


    return(
        < WarehousePage />
    )
}

export default InternalPage