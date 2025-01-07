import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AllProducts from '../../features/product/allProduct'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Product | All Product |"}))
      }, [])


    return(
        < AllProducts />
    )
}

export default InternalPage