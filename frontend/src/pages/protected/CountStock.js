import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CountStock from '../../features/product/countStock'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Product | Count Stock |"}))
      }, [])


    return(
        < CountStock />
    )
}

export default InternalPage