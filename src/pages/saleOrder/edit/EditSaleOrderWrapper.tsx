import React, { useEffect, useState } from 'react'
import { Formik, FormikProps } from 'formik'
import { number, object, string } from 'yup'
import EditSaleOrder from './EditSaleOrder'
import SideNavLayout from 'src/components/layouts/SideNavLayout/SideNavLayout'
import { showToast } from 'src/utils'
import { useGetAllDealersQuery } from 'src/services/DealerServices'
import { useGetWareHousesQuery } from 'src/services/WareHoouseService'
import { useGetAllProductGroupQuery } from 'src/services/ProductGroupService'
import { setAllItems } from 'src/redux/slices/dealerSlice'
import { setAllItems as setAllWareHouse } from 'src/redux/slices/warehouseSlice'
import { setAllItems as setAllProductGroups } from 'src/redux/slices/productGroupSlice'
import {
    useGetSalesOrderByIdQuery,
    useUpdateSalesOrderMutation,
} from 'src/services/SalesOrderService'
import { RootState, AppDispatch } from 'src/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setSelectedItem } from 'src/redux/slices/saleOrderSlice'

type Props = {}

export type FormInitialValues = {
    soNumber: string | ''
    dealerId: string | ''
    dealerWareHouseId: string | ''
    companyWareHouseId: string | ''
    companyId: string | ''
    productSalesOrder: {
        productGroupId: string
        rate: number | 0
        quantity: number | 0
    }
}

const EditSaleOrderWrapper = (props: Props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const [updateSaleOrder] = useUpdateSalesOrderMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const { selectedItem }: any = useSelector(
        (state: RootState) => state?.saleOrder
    )

    const { data, isLoading, isFetching } = useGetSalesOrderByIdQuery(Id)
    //console.log(data)

    useEffect(() => {
        dispatch(setSelectedItem(data?.data))
    }, [dispatch, data, isLoading, isFetching])

    const {
        data: dealerData,
        isLoading: dealerIsLoading,
        isFetching: dealerIsFetching,
    } = useGetAllDealersQuery(userData?.companyId)
    const { allItems }: any = useSelector((state: RootState) => state?.dealer)
    //console.log(dealerData)
    const {
        data: warehouseData,
        isLoading: warehouseIsLoading,
        isFetching: warehouseIsFetching,
    } = useGetWareHousesQuery(userData?.companyId)
    const { allItems: warehouseItems }: any = useSelector(
        (state: RootState) => state?.warehouse
    )

    const {
        data: productGroupData,
        isLoading: productGroupIsLoading,
        isFetching: productGroupIsFetching,
    } = useGetAllProductGroupQuery(userData?.companyId)
    const { allItems: productGroupItems }: any = useSelector(
        (state: RootState) => state?.productGroup
    )
    const dealerOptions = allItems?.map((ele: any) => {
        return {
            label: ele.firstName + ' ' + ele.lastName,
            value: ele._id,
        }
    })

    const warehouseOptions = warehouseItems?.map((ele: any) => {
        return {
            label: ele.wareHouseName,
            value: ele._id,
        }
    })

    const productGroupOptions = productGroupItems?.map((ele: any) => {
        return {
            label: ele.groupName,
            value: ele._id,
        }
    })
    const productPriceOptions: any = productGroupItems?.map((ele: any) => {
        return {
            key: ele._id,
            value: ele.dealerSalePrice,
        }
    })

    //Dealer
    useEffect(() => {
        dispatch(setAllItems(dealerData?.data))
    }, [dealerData, dealerIsLoading, dealerIsFetching, dispatch])

    //Warehouse
    useEffect(() => {
        dispatch(setAllWareHouse(warehouseData?.data))
    }, [warehouseData, warehouseIsLoading, warehouseIsFetching, dispatch])

    //ProductGroup
    useEffect(() => {
        dispatch(setAllProductGroups(productGroupData?.data))
    }, [
        productGroupData,
        productGroupIsLoading,
        productGroupIsFetching,
        dispatch,
    ])

    const dropdownOptions = {
        dealerOptions: dealerOptions,
        warehouseOptions: warehouseOptions,
        productGroupOptions: productGroupOptions,
    }
    //console.log(selectedItem)

    // Form Initial Values
    const initialValues: FormInitialValues = {
        soNumber: selectedItem?.soNumber || '',
        dealerId: selectedItem?.dealerId || '',
        dealerWareHouseId: selectedItem?.dealerWareHouseId || '',
        companyWareHouseId: selectedItem?.companyWareHouseId || '',
        productSalesOrder: selectedItem?.productSalesOrder,
        companyId: selectedItem?.companyId || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        soNumber: string().required('Sale order number is required'),
        dealerId: string().required('Please select a dealer'),
        dealerWareHouseId: string().required(
            'Please select a dealer warehouse'
        ),
        companyWareHouseId: string().required('Please select a warehouse'),
        productSalesOrder: object().shape({
            productGroupId: string().required('Please select a product name'),
            rate: number()
                .min(0, 'Rate must be greater than 0')
                .required('Please enter rate')
                .nullable(),
            quantity: number()
                .min(0, 'Quantity must be greater than 0')
                .required('Please enter quantity')
                .nullable(),
        }),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        const productSalesOrder = {
            productGroupId: values.productSalesOrder.productGroupId,
            rate: values.productSalesOrder.rate,
            quantity: values.productSalesOrder.quantity,
        }

        setApiStatus(true)
        setTimeout(() => {
            updateSaleOrder({
                body: {
                    soNumber: values.soNumber,
                    dealerId: values.dealerId,
                    dealerWareHouseId: values.dealerWareHouseId,
                    companyWareHouseId: values.companyWareHouseId,
                    productSalesOrder: productSalesOrder,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Sale-Order Updated successfully!')
                        navigate('/sale-order')
                    } else {
                        showToast('error', res?.data?.message)
                    }
                } else {
                    showToast('error', 'Something went wrong')
                }
                setApiStatus(false)
            })
        }, 1000)
    }

    return (
        <SideNavLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps: FormikProps<FormInitialValues>) => {
                    return (
                        <EditSaleOrder
                            formikProps={formikProps}
                            dropdownOptions={dropdownOptions}
                            apiStatus={apiStatus}
                            productPriceOptions={productPriceOptions}
                        />
                    )
                }}
            </Formik>
        </SideNavLayout>
    )
}

export default EditSaleOrderWrapper
