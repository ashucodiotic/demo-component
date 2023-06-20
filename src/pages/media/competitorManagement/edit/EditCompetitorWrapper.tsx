import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import EditCompetitor from './EditCompetitor'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import {
    useGetCompetitorByIdQuery,
    useUpdatecompetitorMutation,
} from 'src/services/media/CompetitorManagementServices'
import { setSelectedCompetitor } from 'src/redux/slices/media/competitorManagementSlice'
import MediaLayout from '../../MediaLayout'
import { useGetPaginationchannelQuery } from 'src/services/media/ChannelManagementServices'
import { setChannelMgt } from 'src/redux/slices/media/channelManagementSlice'
import { ChannelManagementListResponse } from 'src/models/Channel.model'

type Props = {}

export type FormInitialValues = {
    competitorName: string
    companyName: string
    productName: string
    websiteLink: string
    youtubeLink: string
    whatsappNumber: string
    schemePrice: string
    channelNameId: string
    startTime: string
    endTime: string
}

const EditCompetitorWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const Id = params.id
    const { selectedItem }: any = useSelector(
        (state: RootState) => state.competitor
    )
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const { channelMgt } = useSelector(
        (state: RootState) => state?.channelManagement
    )

    const {
        data: channelData,
        isLoading: channelIsLoading,
        isFetching: channelIsFetching,
    } = useGetPaginationchannelQuery({
        limit: 10,
        searchValue: '',
        params: ['channelName'],
        page: 1,
        filterBy: [
            {
                fieldName: '',
                value: [],
            },
        ],
        dateFilter: {},
        orderBy: 'createdAt',
        orderByValue: -1,
        isPaginationRequired: false,
    })

    useEffect(() => {
        if (!channelIsLoading && !channelIsFetching) {
            dispatch(setChannelMgt(channelData?.data || []))
        }
    }, [dispatch, channelData, channelIsLoading, channelIsFetching])

    const [EditCompetitors] = useUpdatecompetitorMutation()
    const { data, isLoading, isFetching } = useGetCompetitorByIdQuery(Id)

    useEffect(() => {
        dispatch(setSelectedCompetitor(data?.data))
    }, [dispatch, data, isLoading, isFetching])

    //console.log(data)

    const initialValues: FormInitialValues = {
        competitorName: selectedItem?.competitorName || '',
        companyName: selectedItem?.companyName || '',
        productName: selectedItem?.productName || '',
        websiteLink: selectedItem?.websiteLink || '',
        youtubeLink: selectedItem?.youtubeLink || '',
        schemePrice: selectedItem?.schemePrice || '0',
        whatsappNumber: selectedItem?.whatsappNumber || '',
        channelNameId: selectedItem?.channelNameId || '',
        startTime: selectedItem?.startTime || '',
        endTime: selectedItem?.endTime || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        competitorName: string().required('Required'),
        companyName: string().required('Required'),
        productName: string().required('Required'),
        websiteLink: string().url('Invalid URL').required('Required'),
        youtubeLink: string().url('Invalid URL').required('Required'),
        whatsappNumber: string()
            .min(10, 'Number should be 10 digits')
            .max(10, 'maximum 10 digit')
            .required('Required'),
        schemePrice: string().required('Required'),
        channelNameId: string().required('Required'),
        startTime: string().required('Required'),
        endTime: string().required('Required'),
    })

    const dropdownOptions = {
        channelOptions:
            channelMgt?.map((ele: ChannelManagementListResponse) => {
                return {
                    label: ele.channelName,
                    value: ele._id,
                }
            }) || [],
    }

    //console.log(dropdownOptions)

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        console.log(values.channelNameId)
        setTimeout(() => {
            EditCompetitors({
                body: {
                    competitorName: values.competitorName,
                    companyName: values.companyName,
                    productName: values.productName,
                    websiteLink: values.websiteLink,
                    youtubeLink: values.youtubeLink,
                    schemePrice: values.schemePrice,
                    whatsappNumber: values.whatsappNumber,
                    channelNameId: values.channelNameId || '',
                    startTime: values.startTime,
                    endTime: values.endTime,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Competitor updated successfully!')
                        navigate('/media/competitor')
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
        <MediaLayout>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <>
                            <EditCompetitor
                                apiStatus={apiStatus}
                                formikProps={formikProps}
                                dropdownOptions={dropdownOptions}
                            />
                        </>
                    )
                }}
            </Formik>
        </MediaLayout>
    )
}

export default EditCompetitorWrapper
