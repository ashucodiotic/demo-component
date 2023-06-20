import { FormikProps, FieldArray } from 'formik'
import React, { useState } from 'react'
import { FormInitialValues } from './AddTapeManagementWrapper'
import ATMBreadCrumbs, {
    BreadcrumbType,
} from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import ATMTextArea from 'src/components/UI/atoms/formFields/ATMTextArea/ATMTextArea'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { SelectOption } from 'src/models/FormField/FormField.model'
import ATMSelectSearchable from 'src/components/UI/atoms/formFields/ATMSelectSearchable.tsx/ATMSelectSearchable'
import { HiPlus } from 'react-icons/hi'
import { setFormSubmitting } from 'src/redux/slices/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { MdDeleteOutline } from 'react-icons/md'
import { RootState, AppDispatch } from 'src/redux/store'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    apiStatus: boolean
    dropdownOptions: {
        channelGroupOptions: SelectOption[]
        schemeDataOption: SelectOption[]
        languageOptions: SelectOption[]
        artistOption: SelectOption[]
        tapeTypeOption: SelectOption[]
    }
}
const breadcrumbs: BreadcrumbType[] = [
    {
        label: ' Tape Management',
        path: '/media/tape',
    },
    {
        label: 'Add Tape',
    },
]

const AddTapeManagement = ({
    formikProps,
    apiStatus,
    dropdownOptions,
}: Props) => {
    const { values, setFieldValue } = formikProps
    const [show, setShow] = useState(false)

    const dispatch = useDispatch<AppDispatch>()

    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

    const MinuteOptions = () => {
        let options: SelectOption[] = []
        options = [...options, { label: '00', value: '00' }]
        for (let i = 1; i <= 60; i++) {
            options = [...options, { label: i.toString(), value: i.toString() }]
        }
        return options
    }
    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2 ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Heading */}
                        <div className="text-xl font-medium">Tape Details</div>

                        {/* BUTTON - Add Button */}
                        <div>
                            <button
                                type="button"
                                disabled={apiStatus}
                                onClick={() => {
                                    if (
                                        formikProps?.values.hour === '0' &&
                                        formikProps.values.minute === '00' &&
                                        formikProps.values.second === '00'
                                    ) {
                                        setShow(true)
                                        dispatch(setFormSubmitting(true))
                                        if (
                                            formikProps.values.languageId
                                                .length === 0 ||
                                            formikProps.values.tapeName ===
                                                '' ||
                                            formikProps.values.tapeType ===
                                                '' ||
                                            formikProps.values.artistId
                                                .length === 0
                                        ) {
                                            dispatch(setFormSubmitting(true))
                                            formikProps.handleSubmit()
                                        }
                                    } else {
                                        dispatch(setFormSubmitting(true))
                                        formikProps.handleSubmit()
                                    }
                                }}
                                className={`bg-primary-main rounded py-1 px-5 text-white border border-primary-main ${
                                    apiStatus ? 'opacity-50' : ''
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="grow py-2 px-3 ">
                        <div className="grid grid-cols-3 gap-4 -mt-4">
                            {/* FirstName */}
                            <ATMTextField
                                name="tapeName"
                                required
                                value={values.tapeName}
                                label="Tape Name"
                                placeholder="Tape Name"
                                onChange={(e) =>
                                    setFieldValue('tapeName', e.target.value)
                                }
                            />

                            <ATMSelectSearchable
                                options={dropdownOptions.tapeTypeOption}
                                name="tapeType"
                                required
                                value={values.tapeType}
                                selectLabel="Select Tape type"
                                label="Tape Type"
                                onChange={(e) => setFieldValue('tapeType', e)}
                            />
                            <ATMSelectSearchable
                                name="schemeId"
                                value={values.schemeId}
                                selectLabel="Select Scheme"
                                onChange={(value) =>
                                    setFieldValue('schemeId', value)
                                }
                                options={dropdownOptions.schemeDataOption}
                                label="Scheme"
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4 ">
                            <ATMSelectSearchable
                                name="artistId"
                                required
                                isMulti={true}
                                selectLabel="Select Artist"
                                value={values.artistId}
                                onChange={(value) =>
                                    setFieldValue('artistId', value)
                                }
                                options={dropdownOptions.artistOption}
                                label="Artist"
                            />
                            <ATMSelectSearchable
                                name="languageId"
                                required
                                isMulti={true}
                                value={values.languageId}
                                onChange={(value) =>
                                    setFieldValue('languageId', value)
                                }
                                options={dropdownOptions.languageOptions}
                                label="Language"
                            />
                            <ATMTextField
                                name="webSiteLink"
                                value={values.webSiteLink}
                                label="Website Link"
                                placeholder="Website Link"
                                onChange={(e) =>
                                    setFieldValue('webSiteLink', e.target.value)
                                }
                            />
                            <ATMTextField
                                name="youtubeLink"
                                value={values.youtubeLink}
                                label="Youtube Link"
                                placeholder="Youtube Link"
                                onChange={(e) =>
                                    setFieldValue('youtubeLink', e.target.value)
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="grid grid-rows-2 ">
                                <div className=" row-sapn-1 text-slate-700 text-center justify-start flex -mt-4 p-0 m-0 items-center   font-medium ">
                                    Duration
                                </div>

                                <div className=" row-sapn-1 grid grid-cols-3 gap-x-2 -mt-9 ">
                                    <div className=" ">
                                        <ATMTextField
                                            name="hour"
                                            required
                                            value={values.hour}
                                            type="number"
                                            label="Hour"
                                            min={0}
                                            placeholder="HH"
                                            onChange={(e) => {
                                                if (e.target.value !== '0') {
                                                    setShow(false)
                                                }
                                                setFieldValue(
                                                    'hour',
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className=" ">
                                        <ATMSelectSearchable
                                            name="minute"
                                            required
                                            value={values.minute}
                                            selectLabel="MM"
                                            label="Minute"
                                            options={MinuteOptions()}
                                            onChange={(selectValue) => {
                                                if (selectValue !== '00') {
                                                    setShow(false)
                                                }
                                                setFieldValue(
                                                    'minute',
                                                    selectValue
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className=" ">
                                        <ATMSelectSearchable
                                            defaultValue="00"
                                            label="Second"
                                            required
                                            options={MinuteOptions()}
                                            name="second"
                                            value={values.second}
                                            selectLabel="SS"
                                            onChange={(selectValue) => {
                                                if (selectValue !== '00') {
                                                    setShow(false)
                                                }
                                                setFieldValue(
                                                    'second',
                                                    selectValue
                                                )
                                            }}
                                        />
                                    </div>

                                    {show ? (
                                        <p className="font-poppins relative text-[14px] text-start mt-0 ml-24 text-red-500 col-span-3">
                                            Duration is Required
                                        </p>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                            <ATMTextArea
                                minRows={3}
                                name="remarks"
                                value={values.remarks}
                                label="Remark"
                                onChange={(newValue) =>
                                    setFieldValue('remarks', newValue)
                                }
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4 "></div>
                        {/*  Phone  */}
                        <div className="px-3 py-8">
                            <div className=" text-lg pb-2 font-medium text-primary-main">
                                Add Phone Number
                            </div>

                            <FieldArray name="phone">
                                {({ push, remove }) => {
                                    return (
                                        <>
                                            <div className="grid grid-cols-3 gap-9 ">
                                                {values.phone?.map(
                                                    (
                                                        item: any,
                                                        itemIndex: any
                                                    ) => {
                                                        let { phoneNo } = item
                                                        console.log(phoneNo)
                                                        return (
                                                            <div
                                                                key={itemIndex}
                                                                className="flex "
                                                            >
                                                                {/* Phone */}
                                                                <div className="flex">
                                                                    <ATMTextField
                                                                        type="text"
                                                                        required
                                                                        name={`phone[${itemIndex}].phoneNo`}
                                                                        value={
                                                                            phoneNo
                                                                        }
                                                                        label="Phone"
                                                                        placeholder="Phone"
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            setFieldValue(
                                                                                `phone[${itemIndex}].phoneNo`,
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }}
                                                                        isSubmitting={
                                                                            isSubmitting
                                                                        }
                                                                    />

                                                                    {/* BUTTON - Delete */}
                                                                    {values
                                                                        .phone
                                                                        ?.length >
                                                                        1 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                remove(
                                                                                    itemIndex
                                                                                )
                                                                            }}
                                                                            className="p-2 bg-red-500 text-white rounded my-[48px] mx-[10px]"
                                                                        >
                                                                            <MdDeleteOutline className="text-2xl" />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                )}
                                            </div>

                                            {/* BUTTON - Add More Product */}
                                            <div className="flex justify-self-start py-7">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        push({
                                                            phoneNo: '',
                                                        })
                                                    }
                                                    className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                                                >
                                                    <HiPlus size="20" /> Add
                                                    More
                                                </button>
                                            </div>
                                        </>
                                    )
                                }}
                            </FieldArray>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddTapeManagement
