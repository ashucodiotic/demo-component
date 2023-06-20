import React, { useEffect, useState } from 'react'
import { columnTypes } from 'src/components/UI/atoms/ATMTable/ATMTable'
import { LanguageListResponse } from 'src/models/Language.model'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'
import LanguageListing from './LanguageListing'
import {
    useDeleteLanguageMutation,
    useGetLanguageQuery,
} from 'src/services/LanguageService'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    setIsTableLoading,
    setItems,
    setTotalItems,
} from 'src/redux/slices/languageSlice'
import { showConfirmationDialog } from 'src/utils/showConfirmationDialog'
import { useNavigate } from 'react-router-dom'
import { showToast } from 'src/utils'
import ActionPopup from 'src/components/utilsComponent/ActionPopup'

const LanguageListingWrapper = () => {
    const navigate = useNavigate()
    const languageState: any = useSelector((state: RootState) => state.language)
    const { page, rowsPerPage, items, searchValue } = languageState
    const [deleteLanguage] = useDeleteLanguageMutation()
    const dispatch = useDispatch<AppDispatch>()
    const [currentId, setCurrentId] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)

    const columns: columnTypes[] = [
        {
            field: 'languageName',
            headerName: 'Language',
            flex: 'flex-[1_1_0%]',
            renderCell: (row: LanguageListResponse) => (
                <span> {row.languageName} </span>
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
                                navigate(
                                    `/configurations/language/${currentId}`
                                )
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                showConfirmationDialog({
                                    title: 'Delete Attribute',
                                    text: 'Do you want to delete',
                                    showCancelButton: true,
                                    next: (res) => {
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
    const { data, isFetching, isLoading } = useGetLanguageQuery({
        limit: rowsPerPage,
        searchValue: searchValue,
        params: ['languageName'],
        page: page,
        filterBy: [
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
        deleteLanguage(currentId).then((res) => {
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
                <LanguageListing
                    columns={columns}
                    rows={items}
                    setShowDropdown={setShowDropdown}
                />
            </ConfigurationLayout>
        </>
    )
}

export default LanguageListingWrapper
