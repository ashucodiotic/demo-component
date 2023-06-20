import React, { useState } from 'react'
import Header from 'src/components/UI/Header/Header'
import VerticalNavBar from 'src/components/UI/VerticalNavBar/VerticalNavBar'
import { NavItemType } from 'src/navigation'
import { BsPersonHeart } from 'react-icons/bs'
import { BiChevronsLeft } from 'react-icons/bi'
import { GrChannel } from 'react-icons/gr'
import { MdEmojiEvents } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'

const dispositionNavigation: NavItemType[] = [
    {
        label: 'Disposition One',
        icon: GrChannel,
        path: '/dispositions/disposition-one',
    },
    {
        label: 'Disposition Two',
        icon: GrChannel,
        path: '/dispositions/disposition-two',
    },
    {
        label: 'Disposition Three',
        icon: GrChannel,
        path: '/dispositions/disposition-three',
    },
    {
        label: 'IC-One',
        icon: BsPersonHeart,
        path: '/dispositions/initialcall-one',
    },
    {
        label: 'IC-Two',
        icon: BsPersonHeart,
        path: '/dispositions/initialcall-two',
    },
    {
        label: 'IC-Three',
        icon: BsPersonHeart,
        path: '/dispositions/initialcall-three',
    },
    {
        label: 'Disposition Complaint',
        icon: MdEmojiEvents,
        path: '/dispositions/disposition-complaint',
    },
]

type Props = {
    children?: React.ReactNode | string
}

const DispositionLayout = ({ children }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev)
    }

    const location = useLocation()
    const navigate = useNavigate()

    const currentPath = `/dispositions/${location.pathname?.split('/')[2]}`

    return (
        <div className="flex h-screen w-screen relative">
            {/* Side Navigation Bar */}
            <div
                className={`border-r border-slate-300 h-full transition-all duration-500   ${
                    isCollapsed ? 'w-[50px]' : 'min-w-[250px]'
                }`}
            >
                <VerticalNavBar
                    toggleCollapse={toggleCollapse}
                    isCollapsed={isCollapsed}
                    navigation={dispositionNavigation}
                    isPathEqualtoNavItem={(navItem: any) =>
                        navItem.path === currentPath
                    }
                />
            </div>

            <div className="h-full grow ">
                {/* Header */}
                <div className="h-[55px] border-b border-slate-300  ">
                    <Header />
                </div>

                <div className="h-[calc(100%-55px)]  w-full overflow-auto bg-slate-50 ">
                    {children}
                </div>
            </div>

            {/* BUTTON - Back to main menu */}
            <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className={`bg-primary-main absolute bottom-0 left-0 text-white py-1 flex px-3 gap-4 w-[250px] items-center text-sm ${
                    isCollapsed ? 'w-[50px]' : 'min-w-[250px]'
                }`}
            >
                <BiChevronsLeft className="text-2xl" />{' '}
                {!isCollapsed && <div> BACK TO MAIN MENU </div>}
            </button>
        </div>
    )
}

export default DispositionLayout
