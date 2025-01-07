import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import POS from '../../features/sales/pos'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "POS"}))
      }, [])


    return(
        <POS />
    )
}

export default InternalPage