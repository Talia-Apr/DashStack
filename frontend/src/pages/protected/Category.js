import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CategoryPage from '../../features/product/category'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Product | Category |"}))
      }, [])


    return(
        < CategoryPage />
    )
}

export default InternalPage