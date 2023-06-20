import React from 'react'
import { FormikProps, FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from './AddASRWrapper'
import ATMSelect from 'src/components/UI/atoms/formFields/ATMSelect/ATMSelect'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { HiPlus } from 'react-icons/hi'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
}

// Breadcrumbs
const breadcrumbs: BreadcrumbType[] = [
    {
        label: 'ASR',
        path: '/asr',
    },
    {
        label: 'Add ASR',
    },
]

const AddASR = ({ formikProps, apiStatus }: Props) => {
    const { values, setFieldValue } = formikProps
    const { items }: any = useSelector(
        (state: RootState) => state?.productGroup
    )

    const options = items?.map((ele: any) => {
        return { id: ele?._id, label: ele?.groupName, value: ele?.groupName }
    })
    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New ASR </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium"> ASR Details </div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => formikProps.handleSubmit()}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main  ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                            >
                                Add ASR
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <FieldArray name="asrDetails">
                        {({ push, remove }) => {
                            return (
                                <div className="">
                                    {values?.asrDetails?.map(
                                        (asr: any, asrIndex: number) => {
                                            const { productName, quantity } =
                                                asr

                                            return (
                                                <div
                                                    key={asrIndex}
                                                    className={`border-b border-slate-300`}
                                                >
                                                    <div
                                                        className={`py-9 px-7`}
                                                    >
                                                        <div className="text-primary-main text-lg pb-2 font-medium flex justify-between items-center">
                                                            ASR #{asrIndex + 1}
                                                            {/* Delete Button */}
                                                            {values.asrDetails
                                                                ?.length >
                                                                1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        remove(
                                                                            asrIndex
                                                                        )
                                                                    }
                                                                    className="p-1 bg-red-500 text-white rounded"
                                                                >
                                                                    <MdDeleteOutline className="text-2xl" />
                                                                </button>
                                                            )}
                                                        </div>

                                                        <div className="grid grid-cols-3 gap-4 gap-y-5">
                                                            {/* Product Name */}
                                                            {/* <div className="flex-1"> */}
                                                            <ATMSelect
                                                                name={`asrDetails[${asrIndex}].productName`}
                                                                value={
                                                                    productName
                                                                }
                                                                label="Product group"
                                                                options={
                                                                    options
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setFieldValue(
                                                                        `asrDetails[${asrIndex}].productName`,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                    setFieldValue(
                                                                        `asrDetails[${asrIndex}].productId`,
                                                                        options.find(
                                                                            (
                                                                                obj: any
                                                                            ) =>
                                                                                obj.label ===
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                        ).id
                                                                    )
                                                                }}
                                                            />
                                                            {/* </div> */}

                                                            {/* Quantity */}
                                                            {/* <div className="flex-1"> */}
                                                            <ATMTextField
                                                                name={`asrDetails[${asrIndex}].quantity`}
                                                                value={quantity}
                                                                label="Quantity"
                                                                placeholder="Quantity"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const inputValue =
                                                                        e.target
                                                                            .value
                                                                    if (
                                                                        !isNaN(
                                                                            Number(
                                                                                inputValue
                                                                            )
                                                                        )
                                                                    ) {
                                                                        setFieldValue(
                                                                            `asrDetails[${asrIndex}].quantity`,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                }}
                                                            />
                                                            {/* </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )}

                                    {/*BUTTON - Add New */}
                                    <div className="flex justify-self-start p-5">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                push({
                                                    productName: '',
                                                    productId: '',
                                                    quantity: '',
                                                })
                                            }
                                            className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                                        >
                                            <HiPlus size="20" /> Add More
                                        </button>
                                    </div>
                                </div>
                            )
                        }}
                    </FieldArray>
                </div>
            </div>
        </div>
    )
}

export default AddASR
