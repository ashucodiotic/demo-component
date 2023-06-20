import React, { useState } from 'react'
import LocationListView from '../../sharedComponents/LocationListView'
import AddDistrictWrapper from '../add/AddDistrictWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/redux/store'
import {
    setSearchValue,
    setSelectedLocationDistrict,
} from 'src/redux/slices/districtSlice'
import {
    setFilterValue,
    setSelectedLocationTehsil,
} from 'src/redux/slices/tehsilSlice'
import { setSelectedLocationPincode } from 'src/redux/slices/pincodeSlice'
import { setFilterValue as setAreaFilterValue } from 'src/redux/slices/areaSlice'
import { setFilterValue as setPincodeFilterValue } from 'src/redux/slices/pincodeSlice'
import { showToast } from 'src/utils'

type Props = {
    districts: any[]
}

const DistrictListing = ({ districts }: Props) => {
    const [isOpenAddForm, setisOpenAddForm] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { searchValue }: any = useSelector(
        (state: RootState) => state.district
    )
    const { selectedLocationState }: any = useSelector(
        (state: RootState) => state.states
    )
    const { selectedLocationDistrict }: any = useSelector(
        (state: RootState) => state.district
    )

    function handleCountryClick(newValue: any) {
        if (selectedLocationDistrict?.value === newValue.value) {
            dispatch(setSelectedLocationDistrict(null))
            dispatch(setSelectedLocationTehsil(null))
            dispatch(setSelectedLocationPincode(null))
            dispatch(setFilterValue(''))
            dispatch(setAreaFilterValue(''))
            dispatch(setPincodeFilterValue(''))
        } else {
            dispatch(setSelectedLocationDistrict(newValue))
            dispatch(setFilterValue(newValue.value))
        }
    }

    return (
        <>
            <LocationListView
                listHeading="Districts"
                searchValue={searchValue}
                OnSearchChange={(newValue) =>
                    dispatch(setSearchValue(newValue))
                }
                listData={districts}
                onAddClick={() => {
                    if (selectedLocationState === null) {
                        showToast('error', 'Please select state')
                    } else {
                        setisOpenAddForm(true)
                    }
                }}
                onListItemClick={(newValue) => {
                    if (selectedLocationState !== null) {
                        handleCountryClick(newValue)
                    }
                }}
                disabled={false}
            />

            {isOpenAddForm && (
                <AddDistrictWrapper onClose={() => setisOpenAddForm(false)} />
            )}
        </>
    )
}

export default DistrictListing
