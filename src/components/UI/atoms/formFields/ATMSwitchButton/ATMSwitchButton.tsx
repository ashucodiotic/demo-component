import React from 'react'
import { ErrorMessage } from 'formik'

type Props = {
    label?: string
    required?: boolean
    name: string
    value: boolean
    onChange: (value: boolean) => void
    disabled?: boolean
}

const ATMSwitchButton = ({
    label,
    name,
    required = false,
    value,
    onChange,
    disabled,
}: Props) => {
    return (
        <div className="relative mt-4 ml-1">
            {label && (
                <label className="text-slate-700 font-medium">
                    {' '}
                    {label}{' '}
                    {required && <span className="text-red-500"> * </span>}{' '}
                </label>
            )}

            <div className={`${label} h-[40px] flex items-center`}>
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange(!value)}
                    className="flex justify-between min-w-[150px]  rounded bg-slate-200 shadow"
                >
                    <div
                        className={`${
                            value
                                ? 'bg-primary-main text-white rounded shadow-lg'
                                : 'rounded-r'
                        } flex-1 py-1 h-full transition-all duration-500`}
                    >
                        YES
                    </div>
                    <div
                        className={`${
                            !value
                                ? ' bg-primary-main text-white rounded shadow-lg'
                                : 'rounded-r'
                        } flex-1 py-1 h-full transition-all duration-500`}
                    >
                        NO
                    </div>
                </button>
            </div>

            {name && (
                <ErrorMessage name={name}>
                    {(errMsg) => (
                        <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500">
                            {' '}
                            {errMsg}{' '}
                        </p>
                    )}
                </ErrorMessage>
            )}
        </div>
    )
}

export default ATMSwitchButton
