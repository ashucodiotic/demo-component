import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ChannelManagementListResponse } from 'src/models/Channel.model'
import ChannelManagementListing from './ChannelManagementListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from "react-router-dom";
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/channelManagementSlice'
import {
    useDeleteChannelMutation,
    useGetPaginationchannelQuery,
} from 'src/services/media/ChannelManagementServices'
import MediaLayout from 'src/pages/media/MediaLayout'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { useNavigate } from 'react-router-dom'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const ChannelManagementListingWrapper = () => {
    const channelManagementState: any = useSelector(
        (state: RootState) => state.channelManagement
    )
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const { page, rowsPerPage, searchValue, items } = channelManagementState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [deleteChannel] = useDeleteChannelMutation()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const columns: columnTypes[] = [
        {
            field: 'channelName',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: ChannelManagementListResponse) => (
                <span> {row.channelName} </span>
            ),
        },
        {
            field: 'channelGroupLabel',
            headerName: 'Channel Group',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: ChannelManagementListResponse) => (
                <span> {row.channelGroupLabel} </span>
            ),
        },

        {
            field: 'contactPerson',
            headerName: 'Contact Person',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: ChannelManagementListResponse) => (
                <span> {row.contactPerson} </span>
            ),
        },

        {
            field: 'mobile',
            headerName: 'Mobile',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: ChannelManagementListResponse) => (
                <span> {row.mobile} </span>
            ),
        },

        {
            field: 'email',
            headerName: 'Email',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: ChannelManagementListResponse) => (
                <span> {row.email} </span>
            ),
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
                                navigate(`/media/channel/${currentId}`)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Delete Channel',
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

    const { data, isFetching, isLoading } = useGetPaginationchannelQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['channelName', 'channelGroupLabel'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
            },
            {
                fieldName: '',
                value: [],
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isFetching, data])

    const handleDelete = () => {
        setShowDropdown(false)
        deleteChannel(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Channel  deleted successfully!')
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
            <MediaLayout>
                <div className="h-full">
                    <ChannelManagementListing
                        columns={columns}
                        rows={items}
                        setShowDropdown={setShowDropdown}
                    />
                </div>
            </MediaLayout>
        </>
    )
}

export default ChannelManagementListingWrapper
