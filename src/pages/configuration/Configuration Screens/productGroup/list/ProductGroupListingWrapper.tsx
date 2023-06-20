import React, { useState, useEffect } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import ProductGroupListing from './ProductGroupListing'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/productGroupSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import {
    useDeleteProductGroupMutation,
    useGetProductGroupQuery,
} from 'src/services/ProductGroupService'
import { useNavigate } from 'react-router-dom'
import { ProductGroupListResponse } from 'src/models/ProductGroup.model'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const ProductGroupListingWrapper = () => {
    const productGroupState: any = useSelector(
        (state: RootState) => state.productGroup
    )
    const [deleteProductGroup] = useDeleteProductGroupMutation()
    const { page, rowsPerPage, searchValue, items } = productGroupState
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentId, setCurrentId] = useState('')
    const { userData } = useSelector((state: RootState) => state?.auth)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const columns: columnTypes[] = [
        {
            field: 'groupName',
            headerName: 'Group Name ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row.groupName} </span>
            },
        },
        {
            field: 'dealerSalePrice',
            headerName: 'Dealer Sale Price ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row.dealerSalePrice} </span>
            },
        },
        {
            field: 'sgst',
            headerName: 'Sate GST',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row.sgst} </span>
            },
        },
        {
            field: 'cgst',
            headerName: 'Center GST ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row.cgst} </span>
            },
        },
        {
            field: 'igst',
            headerName: 'Integated GST ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row.igst} </span>
            },
        },
        {
            field: 'utgst',
            headerName: 'Union Territory ',
            flex: 'flex-[1.5_1.5_0%]',
            renderCell: (row: ProductGroupListResponse) => {
                return <span> {row.utgst} </span>
            },
        },

        {
            field: 'actions',
            headerName: 'Actions',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <ActionPopup
                    handleOnAction={() => {
                        setShowDropdown(!showDropdown)
                        setCurrentId(row?._id)
                    }}
                >
                    <>
                        <button
                            onClick={() => {
                                navigate(
                                    `/configurations/product-group/${currentId}`
                                )
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Delete Product-Group',
                                    text: 'Do you want to delete',
                                    showCancelButton: true,
                                    next: (res: any) => {
                                        return res.isConfirmed
                                            ? handleDelete()
                                            : setShowDropdown(false)
                                    },
                                })
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Delete
                        </button>
                    </>
                </ActionPopup>
            ),
            align: 'end',
        },
    ]

    const { data, isFetching, isLoading } = useGetProductGroupQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['groupName'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId,
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: true,
    })
    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setIsTableLoading(false))
            dispatch(setItems(data?.data || []))
            dispatch(setTotalItems(data?.totalItem || 4))
        } else {
            dispatch(setIsTableLoading(true))
        }
    }, [isLoading, isFetching, data, dispatch])

    const handleDelete = () => {
        setShowDropdown(false)
        deleteProductGroup(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Deleted successfully!')
                } else {
                    showToast('error', res?.data?.message)
                }
            } else {
                showToast(
                    'error',
                    'Something went wrong, Please try again later'
                )
            }
        })
    }

    return (
        <>
            <ConfigurationLayout>
                <ProductGroupListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default ProductGroupListingWrapper
