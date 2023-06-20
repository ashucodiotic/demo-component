import { Step, StepLabel, Stepper } from '@mui/material'
import { FormikProps } from 'formik'
import React from 'react'
import ATMBreadCrumbs from 'src/components/UI/atoms/ATMBreadCrumbs/ATMBreadCrumbs'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { FormInitialValues } from './AddDealerWrapper'
import { setFormSubmitting } from 'src/redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/redux/store'

type Props = {
    formikProps: FormikProps<FormInitialValues>
    activeStep: number
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    steps: any[]
    dealerCategoryOptions: any[]
}

const AddDealers = ({
    formikProps,
    activeStep,
    setActiveStep,
    steps,
    dealerCategoryOptions,
}: Props) => {
    // Handle Previous
    const dispatch = useDispatch<AppDispatch>()
    const handlePrevious = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const breadcrumbs = [
        {
            label: 'Dealers',
            onClick: () => {
                console.log('Dealers')
            },
            path: '/dealers',
        },
        {
            label: 'Add Dealer',
            onClick: () => {
                console.log('add-dealer')
            },
        },
    ]

    return (
        <div className="">
            <div className="p-4 flex flex-col gap-2  ">
                {/* Breadcrumbs */}
                <div className="">
                    <ATMBreadCrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Page Heading */}
                <div className="pt-1">
                    <ATMPageHeading> Add New Dealer </ATMPageHeading>
                </div>

                <div className="grow max-h-full bg-white border bg-1 rounded shadow  bg-form-bg bg-cover bg-no-repeat">
                    <div className="flex justify-between px-3 h-[60px] items-center border-b border-slate-300">
                        {/* Form Step Label */}
                        <div className="text-xl font-medium">
                            {' '}
                            {steps[activeStep]?.label}{' '}
                        </div>

                        {/* Buttons - Previous / Next */}
                        <div className="flex gap-1">
                            {activeStep > 0 && (
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    className="text-primary-main font-semibold py-1 px-5 hover:border border-primary-main rounded"
                                >
                                    Previous
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => {
                                    dispatch(setFormSubmitting(true))
                                    formikProps.handleSubmit()
                                }}
                                className="bg-primary-main rounded py-1 px-5 text-white border border-primary-main "
                            >
                                {activeStep === steps.length - 1
                                    ? 'Submit'
                                    : 'Next'}
                            </button>
                        </div>
                    </div>

                    <div className="py-9 px-16 border-b border-slate-300">
                        {/* Steps */}
                        <Stepper activeStep={activeStep}>
                            {steps.map((step, index) => {
                                const stepProps: { completed?: boolean } = {}
                                const labelProps: {
                                    optional?: React.ReactNode
                                } = {}
                                return (
                                    <Step key={step.label} {...stepProps}>
                                        <StepLabel {...labelProps}>
                                            {step.label}
                                        </StepLabel>
                                    </Step>
                                )
                            })}
                        </Stepper>
                    </div>

                    {/* Form */}
                    <div className="grow">
                        {steps[activeStep]?.component({
                            formikProps,
                            dealerCategoryOptions,
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDealers
