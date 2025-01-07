import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import UnitPage from '../../features/product/unit'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Product | Unit |"}))
      }, [])


    return(
        < UnitPage />
    )
}

export default InternalPage