import React, { useState } from 'react'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import { Tabs } from '../outwardRequest/list/OutwardRequestListingWrapper'
import ChangePassword from './ChangePassword'
import ProfileDetails from './ProfileDetails'

const Profile = ({ tabs }: { tabs: Tabs[] }) => {
    const [activeTab, setActiveTab] = useState('My Profile')

    return (
        <div className="p-4 ">
            <ATMPageHeading> Profile </ATMPageHeading>
            <div className="flex shadow rounded h-[45px] items-center gap-3 bg-white w-full overflow-auto px-3 ">
                {tabs.map((tab, tabIndex) => {
                    const { label } = tab
                    return (
                        <button
                            type="button"
                            onClick={() => setActiveTab(label)}
                            key={tabIndex}
                            className={`flex items-center gap-2 px-4 h-[calc(100%-14px)] rounded transition-all duration-500 ${
                                activeTab === label
                                    ? 'bg-slate-100 text-primary-main '
                                    : 'text-slate-500'
                            }`}
                        >
                            <div>
                                <tab.icon className="text-xl" />{' '}
                            </div>
                            <div className="font-medium"> {label} </div>
                        </button>
                    )
                })}
            </div>
            {activeTab === 'My Profile' && <ProfileDetails />}
            {activeTab === 'Change Password' && <ChangePassword />}
        </div>
    )
}

export default Profile
