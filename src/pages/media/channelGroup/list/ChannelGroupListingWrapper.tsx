import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { ChannelGroupListResponse } from 'src/models/ChannelGroup.model'
import ChannelGroupListing from './ChannelGroupListing'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { useNavigate } from 'react-router-dom'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/channelGroupSlice'
import {
    useDeleteChannelGroupMutation,
    useGetPaginationChannelGroupQuery,
} from 'src/services/media/ChannelGroupServices'
import MediaLayout from 'src/pages/media/MediaLayout'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const ChannelGroupListingWrapper = () => {
    const navigate = useNavigate()

    const channelGroupState: any = useSelector(
        (state: RootState) => state.channelGroup
    )
    const [deleteChannelGroup] = useDeleteChannelGroupMutation()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const { page, rowsPerPage, searchValue, items } = channelGroupState
    const { userData } = useSelector((state: RootState) => state?.auth)
    const dispatch = useDispatch<AppDispatch>()
    const columns: columnTypes[] = [
        {
            field: 'groupName',
            headerName: 'Channel Group Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: ChannelGroupListResponse) => (
                <span> {row.groupName} </span>
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
                                navigate(`/media/channel-group/${currentId}`)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Delete channel group',
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
    const { data, isFetching, isLoading } = useGetPaginationChannelGroupQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['groupName'],
        page: page,
        filterBy: [
            {
                fieldName: 'companyId',
                value: userData?.companyId as string,
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
        deleteChannelGroup(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Channel group deleted successfully!')
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
                    <ChannelGroupListing
                        columns={columns}
                        rows={items}
                        setShowDropdown={setShowDropdown}
                    />
                </div>
            </MediaLayout>
        </>
    )
}

export default ChannelGroupListingWrapper
