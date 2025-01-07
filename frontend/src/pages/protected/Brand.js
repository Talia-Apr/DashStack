import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import BrandPage from '../../features/product/brand'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Product | Brand |"}))
      }, [])


    return(
        < BrandPage />
    )
}

export default InternalPage