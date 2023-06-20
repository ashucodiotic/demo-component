/* eslint-disable react-hooks/exhaustive-deps */
import { FormikProps } from 'formik'
import React from 'react'
import { Field, SelectOption } from 'src/models/FormField/FormField.model'
import { FormInitialValues } from '../../EditWarehouseWrapper'
import StepEditComapnyDetails from './StepEditComapnyDetails'

export type DropdownOptions = {
    countryOptions: SelectOption[]
}

type Props = {
    formikProps: FormikProps<FormInitialValues>
    allCountry: any
}

export type FieldType = Field<'countryOptions'>

const formFields: FieldType[] = [
    {
        name: 'warehouseCode',
        label: 'Warehouse Code',
        placeholder: 'Warehouse Code',
    },
    {
        name: 'warehouseName',
        label: 'Warehouse Name',
        placeholder: 'Warehouse Name',
    },
    {
        name: 'country',
        label: 'Country',
        placeholder: 'Country',
        type: 'select',
        optionAccessKey: 'countryOptions',
    },

    {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
    },
]

const StepEditCompanyDetailsWrapper = ({ formikProps, allCountry }: Props) => {
    const countryOptions = allCountry?.map((ele: any) => {
        return { label: ele?.countryName, value: ele?._id }
    })
    const dropdownOptions: DropdownOptions = {
        countryOptions,
    }

    return (
        <>
            <StepEditComapnyDetails
                formikProps={formikProps}
                dropdownOptions={dropdownOptions}
                formFields={formFields}
            />
        </>
    )
}

export default StepEditCompanyDetailsWrapper
