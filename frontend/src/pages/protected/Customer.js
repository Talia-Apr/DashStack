import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Customer from '../../features/people/customer'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "People | Customers |"}))
      }, [])


    return(
        <Customer />
    )
}

export default InternalPage