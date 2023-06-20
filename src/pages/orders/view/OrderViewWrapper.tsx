import React, { useEffect } from 'react'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import { useParams } from 'react-router-dom'
import { useGetOrderByIdQuery } from 'src/services/OrderService'
import { setSelectedItem } from 'src/redux/slices/orderSlice'
import OrderView from './OrderView'

const OrderViewWrapper = () => {
    const params = useParams()
    const id: any = params.id
    const dispatch = useDispatch<AppDispatch>()

    const { data, isLoading, isFetching } = useGetOrderByIdQuery(id)

    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [data, isLoading, isFetching, dispatch])

    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.order
    )

    return (
        <SideNavLayout>
            <OrderView items={selectedItem} />
        </SideNavLayout>
    )
}

export default OrderViewWrapper
