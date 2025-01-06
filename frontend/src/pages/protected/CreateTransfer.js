import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CreateTransfer from '../../features/warehouse/createTransfer'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Warehouse | Create Transfer |"}))
      }, [])


    return(
        < CreateTransfer />
    )
}

export default InternalPage