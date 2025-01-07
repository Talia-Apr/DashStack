import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import TopSell from '../../features/report/topsellingproduct'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Report | Top-Selling Product |"}))
      }, [])


    return(
        < TopSell />
    )
}

export default InternalPage