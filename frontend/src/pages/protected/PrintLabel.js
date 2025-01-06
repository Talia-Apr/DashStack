import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import PrintLabels from '../../features/product/printLabels/'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Product | Print Labels |"}))
      }, [])


    return(
        < PrintLabels />
    )
}

export default InternalPage