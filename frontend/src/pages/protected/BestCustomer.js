import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import BestCustomer from '../../features/report/bestcustomer'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Report | Best Customer |"}))
      }, [])


    return(
        < BestCustomer />
    )
}

export default InternalPage
