import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ATMPageHeading from 'src/components/UI/atoms/ATMPageHeading/ATMPageHeading'
import ATMPagination from 'src/components/UI/atoms/ATMPagination/ATMPagination'
import ATMTable from 'src/components/UI/atoms/ATMTable/ATMTable'
import ATMTableHeader from 'src/components/UI/atoms/ATMTableHeader/ATMTableHeader'
import {
    setRowsPerPage,
    setPage,
    setSearchValue,
} from 'src/redux/slices/schemeSlice'
import { AppDispatch, RootState } from 'src/redux/store'
// import FilterDialogWarpper from "../components/FilterDialog/FilterDialogWarpper";

type Props = {
    columns: any[]
    rows: any[]
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

const SchemeListing = ({ columns, rows, setShowDropdown }: Props) => {
    const dispatch = useDispatch<AppDispatch>()
    const schemeState: any = useSelector((state: RootState) => state.scheme)
    // const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState([])

    const { page, rowsPerPage, searchValue, totalItems ,isTableLoading} = schemeState

    return (
        <div className="px-4 h-[calc(100vh-55px)] pt-3 ">
            {/* Page Header */}
            <div className="flex justify-between items-center h-[55px]">
                <ATMPageHeading> Schemes</ATMPageHeading>
                <button
                    onClick={() => navigate('/scheme/add')}
                    className="bg-primary-main text-white rounded py-1 px-3"
                >
                    + Add Scheme
                </button>
            </div>

            <div className="border flex flex-col h-[calc(100%-75px)] rounded bg-white">
                {/*Table Header */}
                <div id="table-header">
                    <ATMTableHeader
                        page={page}
                        searchValue={searchValue}
                        rowCount={totalItems}
                        rowsPerPage={rowsPerPage}
                        rows={rows}
                        onRowsPerPageChange={(newValue) =>
                            dispatch(setRowsPerPage(newValue))
                        }
                        isFilter
                        // onFilterClick={() => setIsFilterOpen(true)}
                        onSearch={(newValue) =>
                            dispatch(setSearchValue(newValue))
                        }
                    />
                </div>

                {/* Table */}
                <div className="grow overflow-auto  ">
                    <ATMTable
                        columns={columns}
                        rows={rows}
                        isCheckbox={true}
                        selectedRows={selectedRows}
                        onRowSelect={(selectedRows) =>
                            setSelectedRows(selectedRows)
                        }
                        setShowDropdown={setShowDropdown}
                        isLoading={isTableLoading}
                    />
                </div>

                {/* Pagination */}
                <div className="h-[90px] flex items-center justify-end border-t border-slate-300">
                    <ATMPagination
                        page={page}
                        rowCount={totalItems}
                        rows={rows}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(newPage) => dispatch(setPage(newPage))}
                    />
                </div>
            </div>

            {/* {isFilterOpen && (
       <FilterDialogWarpper
       onClose={()=> setIsFilterOpen(false)}
       />
      )} */}
        </div>
    )
}

export default SchemeListing
