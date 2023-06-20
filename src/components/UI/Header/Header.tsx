import React, { useState } from 'react'
import { FormControl, MenuItem, Select } from '@mui/material'
import { IoNotifications } from 'react-icons/io5'
import UserProfileCard from '../UserProfileCard/UserProfileCard'
import NotificationCard from './NotificationCard/NotificationCard'
import { useGetAllCompaniesQuery } from 'src/services/CompanyServices'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useUpdateCompanyByAdminMutation } from 'src/services/UserServices'
import { setUserData } from 'src/redux/slices/authSlice'

interface Props {}

const Header = (props: Props) => {
    const [isShowProfileCard, setIsShowProfileCard] = useState(false)
    const [isShowNotification, setIsShowNotification] = useState(false)
    const { userData } = useSelector((state: RootState) => state?.auth)
    const [isNewNotificationsAvailable, setIsNewNotificationsAvailable] =
        useState(true)
    const [company, setCompany] = useState(userData?.companyId)
    const { data } = useGetAllCompaniesQuery('')
    const [updaeCompany] = useUpdateCompanyByAdminMutation()
    const dispatch = useDispatch()
    const handleUpdate = (companyId: string) => {
        if (!companyId) return
        const update = {
            companyId: companyId,
        }
        updaeCompany({ body: update, id: userData?.userId || '' }).then(
            (updateCompanyInfo: any) => {
                if (updateCompanyInfo?.data?.status) {
                    const {
                        _id,
                        firstName,
                        lastName,
                        email,
                        mobile,
                        userName,
                        companyId,
                        userType,
                    } = updateCompanyInfo?.data?.data
                    let userData = {
                        userId: _id,
                        fullName: firstName + lastName,
                        email: email,
                        mobile: mobile,
                        userName: userName,
                        companyId: companyId,
                        role: userType,
                    }
                    localStorage.setItem('userData', JSON.stringify(userData))
                    dispatch(setUserData(userData))
                    window.location.reload()
                }
            }
        )
    }

    return (
        <div className="grid grid-cols-2 w-full h-full shadow-lg border ">
            {/* Right Section */}
            <div className="flex gap-4 col-start-2 justify-end items-center px-4 ">
                {userData?.role === 'ADMIN' ? (
                    <FormControl sx={{ width: 150 }}>
                        <Select
                            value={company}
                            onChange={(e) => {
                                setCompany(e.target.value)
                                handleUpdate(e.target.value)
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            size="small"
                        >
                            <MenuItem value="" disabled>
                                <em>Select Company</em>
                            </MenuItem>
                            {data?.data?.map((ele: any) => {
                                return (
                                    <MenuItem key={ele._id} value={ele?._id}>
                                        {ele?.companyName}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                ) : (
                    <span> CODIOTIC TECHNOLOGY</span>
                )}

                <button
                    onClick={() => {
                        setIsShowNotification(
                            (isShowNotification) => !isShowNotification
                        )
                        setIsNewNotificationsAvailable(false)
                    }}
                    className="relative text-lg text-slate-700 transition-all duration-[800ms] hover:bg-slate-200 p-3 rounded-full"
                >
                    <IoNotifications className="" />
                    {isNewNotificationsAvailable ? (
                        <span className="flex h-[7px] w-[7px] absolute top-[9px] right-[10px]">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-100"></span>
                            <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-red-600"></span>
                        </span>
                    ) : null}
                </button>

                <button
                    onClick={() =>
                        setIsShowProfileCard(
                            (isShowProfileCard) => !isShowProfileCard
                        )
                    }
                    className="flex gap-5"
                >
                    <div className="h-[35px] w-[35px] flex justify-center items-center font-bold bg-primary-main text-white  rounded-full">
                        {userData?.fullName[0].toUpperCase() || ''}
                    </div>

                    {/* <div className='flex flex-col gap-1 justify-start items-start' >
                        <div className='text-primary-main text-[13px]' > Administrator </div>
                        <div className='flex gap-1 items-center font-bold text-slate-500 text-sm' > Himanshu Jain  <BiChevronDown className='text-lg font-bold' />  </div>

                    </div> */}
                </button>
                {isShowProfileCard && (
                    <UserProfileCard
                        onClickAway={() => setIsShowProfileCard(false)}
                    />
                )}

                {isShowNotification && (
                    <NotificationCard
                        onClickAway={() => setIsShowNotification(false)}
                    />
                )}
            </div>
        </div>
    )
}
export default Header
