import React from 'react'
import { FormikProps } from 'formik'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'
import { FormInitialValues } from '../../EditProductWrapper'
import { FieldArray } from 'formik'
import { MdDeleteOutline } from 'react-icons/md'
import { HiPlus } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

type Props = {
    formikProps: FormikProps<FormInitialValues>
}

const StepEditFAQs = ({ formikProps }: Props) => {
    const { values, setFieldValue } = formikProps

    const { formSubmitting: isSubmitting } = useSelector(
        (state: RootState) => state?.auth
    )

    return (
        <div className=" ">
            <FieldArray name="FAQs">
                {({ push, remove }) => (
                    <div className="">
                        {values.FAQs?.map((FAQ, FAQIndex) => {
                            const { question, answer } = FAQ

                            return (
                                <div
                                    key={FAQIndex}
                                    className={`flex flex-col gap-3 py-6 px-7 ${
                                        FAQIndex !== values.FAQs.length - 1 &&
                                        'border-b'
                                    }  border-slate-300 `}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="text-primary-main text-lg pb-2 font-medium ">
                                            FAQ's #{FAQIndex + 1}
                                        </div>
                                        {/* Delete Button */}
                                        {values.FAQs?.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => remove(FAQIndex)}
                                                className="p-1 bg-red-500 text-white rounded"
                                            >
                                                <MdDeleteOutline className="text-2xl" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 gap-y-5">
                                        {/* Question */}
                                        <ATMTextField
                                            name={`FAQs[${FAQIndex}].question`}
                                            value={question}
                                            onChange={(e) => {
                                                setFieldValue(
                                                    `FAQs[${FAQIndex}].question`,
                                                    e.target.value
                                                )
                                            }}
                                            label="Question"
                                            placeholder="Question"
                                            className="shadow bg-white rounded"
                                            isSubmitting={isSubmitting}
                                        />

                                        {/* Answer */}
                                        <ATMTextField
                                            name={`FAQs[${FAQIndex}].answer`}
                                            value={answer}
                                            onChange={(e) => {
                                                setFieldValue(
                                                    `FAQs[${FAQIndex}].answer`,
                                                    e.target.value
                                                )
                                            }}
                                            label="Answer"
                                            placeholder="Answer"
                                            className="shadow bg-white rounded"
                                            isSubmitting={isSubmitting}
                                        />
                                    </div>
                                </div>
                            )
                        })}

                        <div className="flex justify-self-start p-5">
                            <button
                                type="button"
                                onClick={() =>
                                    push({
                                        question: '',
                                        answer: '',
                                    })
                                }
                                className="bg-transparent text-blue-700 font-semibold py-2 px-2 border border-blue-500 rounded-full flex items-center "
                            >
                                <HiPlus size="20" /> Add More
                            </button>
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    )
}

export default StepEditFAQs
