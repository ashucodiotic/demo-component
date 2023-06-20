import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { SlotManagementListResponse } from 'src/models/Slot.model'
import SlotManagementListing from './SlotManagementListing'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { AppDispatch, RootState } from 'src/redux/store'
// import { useNavigate } from "react-router-dom";
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/media/slotManagementSlice'
import {
    useDeleteSlotMangementMutation,
    useGetPaginationSlotQuery,
} from 'src/services/media/SlotManagementServices'
import MediaLayout from 'src/pages/media/MediaLayout'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { showToast } from 'src/utils'
import DialogLogBox from 'src/components/utilsComponent/DialogLogBox'
import SlotRunWrapper from '../update/SlotRunWrapper'
import { FaExclamation } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const SlotManagementListingWrapper = () => {
    const navigate = useNavigate()
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const slotManagementState: any = useSelector(
        (state: RootState) => state.slotManagement
    )
    const [showDropdown, setShowDropdown] = useState(false)
    const [runState, setRunState] = useState('')
    const [currentId, setCurrentId] = useState('')
    const { page, rowsPerPage, searchValue, items } = slotManagementState
    const { userData } = useSelector((state: RootState) => state?.auth)

    const [deleteSlotMangement] = useDeleteSlotMangementMutation()
    const dispatch = useDispatch<AppDispatch>()
    // const navigate = useNavigate();
    const { data, isFetching, isLoading } = useGetPaginationSlotQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['slotName', 'channelLabel', 'groupNameLabel', 'tapeLabel'],
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

    const columns: columnTypes[] = [
        {
            field: 'slotName',
            headerName: 'Slot Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row.slotName} </span>
            ),
        },
        {
            field: 'channelGroup',
            headerName: 'Channel Group',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row.groupNameLabel} </span>
            ),
        },
        {
            field: 'channelLabel',
            headerName: 'Channel Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row.channelLabel} </span>
            ),
        },
        {
            field: 'tapeLabel',
            headerName: 'Tape Name',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SlotManagementListResponse) => (
                <span> {row.tapeLabel} </span>
            ),
        },
        {
            field: 'slotStartTime',
            headerName: 'Start Time',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SlotManagementListResponse) => (
                <span> {moment(row.slotStartTime).format('hh:mm:ss a')} </span>
            ),
        },
        {
            field: 'slotEndTime',
            headerName: 'End Time',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: SlotManagementListResponse) => (
                <span> {moment(row.slotEndTime).format('hh:mm:ss a')} </span>
            ),
        },
        {
            field: 'SlotRun',
            headerName: 'Run Status',
            flex: 'flex-[0.5_0.5_0%]',
            renderCell: (row: any) => (
                <div className="relative">
                    {moment(row?.slotStartTime).format('hh:mm:ss') <
                        moment(new Date()).format('hh:mm:ss') &&
                    moment(new Date()).format('hh:mm:ss') <
                        moment(row?.slotEndTime).format('hh:mm:ss') ? (
                        <button
                            disabled={true}
                            className={`text-slate-600 font-bold m-1 transition-all duration-[600ms] ${
                                row.runStatus === true && row.run === true
                                    ? 'hover:bg-green-100'
                                    : row.runStatus === true &&
                                      row.run === false
                                    ? 'hover:bg-red-100'
                                    : 'hover:bg-orange-100'
                            } p-2 rounded-full border
                            ${
                                row.runStatus === true && row.run === true
                                    ? 'border-green-500'
                                    : row.runStatus === true &&
                                      row.run === false
                                    ? 'border-red-500'
                                    : 'border-orange-500'
                            }
                            `}
                        >
                            {row.runStatus === true && row.run === true ? (
                                <TiTick />
                            ) : (row.runStatus === true && row.run === false) ||
                              (row.runStatus === false && row.run === true) ? (
                                <FaTimes />
                            ) : (
                                <FaExclamation />
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                setRunState(row._id)
                                setIsOpenDialog(true)
                            }}
                            className={`text-slate-600 font-bold m-1 transition-all duration-[600ms] ${
                                row.runStatus === true && row.run === true
                                    ? 'hover:bg-green-100'
                                    : row.runStatus === true &&
                                      row.run === false
                                    ? 'hover:bg-red-100'
                                    : 'hover:bg-orange-100'
                            } p-2 rounded-full border  ${
                                row.runStatus === true && row.run === true
                                    ? 'border-green-500'
                                    : row.runStatus === true &&
                                      row.run === false
                                    ? 'border-red-500'
                                    : 'border-orange-500'
                            }`}
                        >
                            {row.runStatus === true && row.run === true ? (
                                <TiTick />
                            ) : row.runStatus === true && row.run === false ? (
                                <FaTimes />
                            ) : (
                                <FaExclamation />
                            )}
                        </button>
                    )}
                </div>
            ),
            align: 'end',
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
                                navigate(`edit/${row?._id}`)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Delete Slot ',
                                    text: 'Do you want to delete Slot ?',
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
    const handleDelete = () => {
        setShowDropdown(false)
        //alert(currentId)
        deleteSlotMangement(currentId).then((res: any) => {
            if ('data' in res) {
                if (res?.data?.status) {
                    showToast('success', 'Slot deleted successfully!')
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
                    <SlotManagementListing
                        columns={columns}
                        rows={items}
                        setShowDropdown={setShowDropdown}
                    />
                    <DialogLogBox
                        isOpen={isOpenDialog}
                        buttonClass="cursor-pointer"
                        handleClose={() => {
                            setIsOpenDialog(false)
                        }}
                        Component={
                            <SlotRunWrapper
                                id={runState}
                                setIsOpenDialog={setIsOpenDialog}
                            />
                        }
                    />
                </div>
            </MediaLayout>
        </>
    )
}

export default SlotManagementListingWrapper
