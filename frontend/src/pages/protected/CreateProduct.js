import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CreateProduct from '../../features/product/createProduct/'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Product | Create Product |"}))
      }, [])


    return(
        < CreateProduct />
    )
}

export default InternalPage