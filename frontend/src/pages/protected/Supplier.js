import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Supplier from '../../features/people/supplier/index'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "People | Supplier |"}))
      }, [])


    return(
        <Supplier />
    )
}

export default InternalPage