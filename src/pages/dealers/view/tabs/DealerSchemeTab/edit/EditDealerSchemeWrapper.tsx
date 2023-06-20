import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    useGetDealerSchemeByIdQuery,
    useUpdateDealerSchemeMutation,
} from 'src/services/DealerSchemeService'
import { object, array, string } from 'yup'
import { showToast } from 'src/utils'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import EditDealerScheme from './EditDealerScheme'
import { useGetAllPincodeByDealerQuery } from 'src/services/DealerPincodeService'
import { useGetSchemeQuery } from 'src/services/SchemeService'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'src/redux/store'
import { setAllItems as setAllDealerSchemes } from 'src/redux/slices/schemeSlice'
import {
    UpdateDealerSchemeInitialValues,
    DealerSchemeByIdResponse,
} from 'src/models/DealerScheme.model'

const EditDealerSchemeWrapper = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const schemeId = params.schemeId
    const dealerId = params.dealerId
    const { userData } = useSelector((state: RootState) => state?.auth)
    const companyId: any = userData?.companyId
    const [schemeData, setSchemeData] = useState<DealerSchemeByIdResponse>()
    const [pinCodeOptions, setPinCodeOptions] = useState([])
    const [apiStatus, setApiStatus] = useState<boolean>(false)
    const { data, isLoading, isFetching } = useGetDealerSchemeByIdQuery(
        schemeId || ''
    )
    const [updateScheme] = useUpdateDealerSchemeMutation()

    const {
        data: pinCodeList,
        isLoading: pinCodeIsLoading,
        isFetching: pinCodeIsFetching,
    } = useGetAllPincodeByDealerQuery({
        companyId: companyId || '',
        dealerId: dealerId || '',
    })
    const {
        data: schemeDataListInfo,
        isLoading: schemeIsLoading,
        isFetching: schemeIsFetching,
    } = useGetSchemeQuery(companyId)

    useEffect(() => {
        dispatch(setAllDealerSchemes(schemeDataListInfo?.data))
    }, [schemeDataListInfo, schemeIsLoading, schemeIsFetching, dispatch])

    const { allItems: schemeItems }: any = useSelector(
        (state: RootState) => state?.scheme
    )
    const schemeOptions = schemeItems?.map((ele: any) => {
        return {
            label: ele.schemeName,
            value: ele._id,
        }
    })

    useEffect(() => {
        if (!isFetching && !isLoading) {
            setSchemeData(data?.data || [])
        }
    }, [isLoading, isFetching, data])

    useEffect(() => {
        if (!pinCodeIsLoading && !pinCodeIsFetching) {
            let options = pinCodeList?.data?.map((item: any) => {
                return {
                    label: item?.pincode,
                    value: item?.pincode,
                }
            })
            setPinCodeOptions(options)
        }
    }, [pinCodeList, pinCodeIsLoading, pinCodeIsFetching])

    const initialValues: UpdateDealerSchemeInitialValues = {
        companyId: companyId || '',
        dealerId: dealerId || '',
        schemeId: schemeData?.schemeId || '',
        pincodes: schemeData?.pincodes?.map((item: any) => item) || [],
    }
    const validationSchema = object({
        schemeId: string().required('Please select scheme'),
        pincodes: array().min(1, 'Please select atleast 1 pincode'),
    })

    //    Form Submit Handler
    const onSubmitHandler = (values: UpdateDealerSchemeInitialValues) => {
        setApiStatus(true)
        setTimeout(() => {
            updateScheme({
                body: {
                    dealerId: values.dealerId || '',
                    schemeId: values?.schemeId,
                    pincodes: values?.pincodes,
                    companyId: values.companyId || '',
                },
                id: schemeId || '',
            }).then((res) => {
                if ('data' in res) {
                    if (res?.data?.status) {
                        showToast('success', 'Scheme edited successfully!')
                        navigate('/dealers/' + dealerId + '/scheme')
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
        <div>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
            >
                {(formikProps) => {
                    return (
                        <EditDealerScheme
                            apiStatus={apiStatus}
                            formikProps={formikProps}
                            schemeOptions={schemeOptions}
                            pinCodeOptions={pinCodeOptions}
                        />
                    )
                }}
            </Formik>
        </div>
    )
}

export default EditDealerSchemeWrapper
