import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import EditArtist from './EditArtist'
import { showToast } from 'src/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import {
    useGetArtistByIdQuery,
    useUpdateArtistMutation,
} from 'src/services/media/ArtistServices'
import { setSelectedArtist } from 'src/redux/slices/media/artist'
import MediaLayout from '../../MediaLayout'

type Props = {}

export type FormInitialValues = {
    artistName: string
}

const EditArtistWrapper = (props: Props) => {
    // Form Initial Values
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const Id = params.id
    const { selectedItem }: any = useSelector(
        (state: RootState) => state.artist
    )
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState<boolean>(false)

    const [editArtists] = useUpdateArtistMutation()
    const { data, isLoading, isFetching } = useGetArtistByIdQuery(Id)
    const initialValues: FormInitialValues = {
        artistName: selectedItem?.artistName || '',
    }

    // Form Validation Schema
    const validationSchema = object({
        artistName: string().required('Artist Name is required'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            editArtists({
                body: {
                    artistName: values.artistName,
                    companyId: userData?.companyId || '',
                },
                id: Id || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Artist updated successfully!')
                        navigate('/media/artist')
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

    useEffect(() => {
        dispatch(setSelectedArtist(data?.data))
    }, [dispatch, data, isLoading, isFetching])
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
                            <EditArtist
                                apiStatus={apiStatus}
                                formikProps={formikProps}
                            />
                        </>
                    )
                }}
            </Formik>
        </MediaLayout>
    )
}

export default EditArtistWrapper
