import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { object, string } from 'yup'
import { showToast } from 'src/utils'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import AddInitialCallTwo from './AddInitialCallTwo'
import { useAddinitialCallerTwoMutation } from 'src/services/configurations/InitialCallerTwoServices'
import { setAllItems } from 'src/redux/slices/configuration/initialCallerOneSlice'
import DispositionLayout from '../../DispositionLayout'
import { useGetAllinitialCallerOneQuery } from 'src/services/configurations/InitialCallerOneServices'

export type FormInitialValues = {
    initialCallName: string
    initialCallOneId: string
}
const AddInitialCallTwoWrapper = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [addinitialCallTwo] = useAddinitialCallerTwoMutation()
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [apiStatus, setApiStatus] = useState(false)

    const { allItems }: any = useSelector(
        (state: RootState) => state?.initialCallerOne
    )

    console.log(allItems)

    const { data, isFetching, isLoading } = useGetAllinitialCallerOneQuery('')
    console.log(data)

    useEffect(() => {
        if (!isFetching && !isLoading) {
            dispatch(setAllItems(data?.data || []))
        }
    }, [isFetching, isLoading, data, dispatch])

    const initicalCallOneOptions = allItems?.map((ele: any) => {
        return {
            label: ele.initialCallName,
            value: ele._id,
        }
    })
    const initialValues: FormInitialValues = {
        initialCallName: '',
        initialCallOneId: '',
    }
    const validationSchema = object({
        initialCallName: string().required('Required'),
        initialCallOneId: string().required('Required'),
    })
    const onSubmitHandler = (values: FormInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            addinitialCallTwo({
                initialCallName: values.initialCallName,
                initialCallOneId: values.initialCallOneId || '',
                companyId: userData?.companyId || '',
            }).then((res: any) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Added successfully!')
                        navigate('/dispositions/initialcall-two')
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

    const dropdownOptions = {
        initicalCallOneOptions,
    }

    return (
        <>
            <DispositionLayout>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmitHandler}
                >
                    {(formikProps: any) => {
                        return (
                            <AddInitialCallTwo
                                apiStatus={apiStatus}
                                formikProps={formikProps}
                                dropdownOptions={dropdownOptions}
                            />
                        )
                    }}
                </Formik>
            </DispositionLayout>
        </>
    )
}

export default AddInitialCallTwoWrapper
