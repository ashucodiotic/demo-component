import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface columnTypes {
    field: string
    headerName: string
    flex?: string
    renderCell?: (row: any) => string | React.ReactNode
    align?: 'start' | 'center' | 'end'
    extraClasses?: string
}

const idKey = '_id'
interface ATMTablePropTypes<T> {
    columns: columnTypes[]
    rows: T[]
    isCheckbox?: boolean
    selectedRows?: T[]
    onRowSelect?: (row: any) => void
    extraClasses?: string
    onRowClick?: (row: any) => void
    rowExtraClasses?: (row: any) => void
    isLoading?: boolean
    setShowDropdown?: React.Dispatch<React.SetStateAction<boolean>>
    onClick?: (event: any) => void
    headerClassName?: string
    rowClassName?: string
    noDataFoundText?: string
    noDataFoundClass?: string
}

const NOT_DATA_FOUND = 'No Data Found'
const ATMTable = <T extends {}>({
    columns,
    rows,
    selectedRows = [],
    onRowSelect,
    isCheckbox = false,
    extraClasses = '',
    onRowClick,
    rowExtraClasses,
    isLoading = false,
    setShowDropdown,
    headerClassName = ' py-2 px-2',
    rowClassName = 'px-2 bg-white py-2',
    noDataFoundText = `${NOT_DATA_FOUND}`,
    noDataFoundClass = 'text-slate-500',
}: ATMTablePropTypes<T>) => {
    return (
        <div
            onClick={() => {
                setShowDropdown && setShowDropdown(false)
            }}
            className={twMerge(
                `min-w-fit relative flex flex-col h-full ${extraClasses}`
            )}
        >
            {/* Columns */}
            <div
                className={`flex items-center ${headerClassName} border-b sticky top-0 border-slate-300 bg-slate-50 z-40 `}
            >
                {/* Checkbox */}
                {rows.length && isCheckbox ? (
                    <div className={`w-[20px]`}>
                        <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 "
                            checked={selectedRows.length === rows.length}
                            onChange={(e) => {
                                e.stopPropagation()
                                selectedRows.length === rows.length
                                    ? onRowSelect && onRowSelect([])
                                    : onRowSelect && onRowSelect(rows)
                            }}
                        />
                    </div>
                ) : null}

                {columns.map((column, index) => {
                    return (
                        <div
                            key={column.field}
                            className={`${
                                column.flex
                            } text-sm text-black  font-semibold px-2 flex justify-${
                                column.align || 'start'
                            }  ${column.extraClasses}`}
                        >
                            {column.headerName}
                        </div>
                    )
                })}
            </div>

            {isLoading ? (
                Array(10)
                    .fill(0)
                    .map((_, index) => {
                        return (
                            <div
                                key={index}
                                className="animate-pulse  h-[50px] p-2"
                            >
                                <div className="bg-slate-200 h-full rounded">
                                    {' '}
                                </div>
                            </div>
                        )
                    })
            ) : rows.length ? (
                rows.map((row: any, rowIndex) => (
                    <div
                        onClick={() => onRowClick && onRowClick(row)}
                        key={row[idKey] || rowIndex}
                        className={`flex items-center font-semibold text-grey-600  ${rowClassName}  ${
                            onRowClick && 'cursor-pointer'
                        }  ${rowExtraClasses && rowExtraClasses(row)}  ${
                            rowIndex !== rows.length - 1 && 'border-b'
                        } `}
                    >
                        {/* Checkbox */}
                        {isCheckbox ? (
                            <div
                                className={`w-[20px]`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <input
                                    type="checkbox"
                                    checked={
                                        selectedRows.findIndex(
                                            (ele: any) => ele._id === row._id
                                        ) !== -1
                                    }
                                    onChange={(e) => {
                                        e.stopPropagation()
                                        onRowSelect &&
                                            onRowSelect((selectedRows: any) =>
                                                selectedRows.findIndex(
                                                    (ele: any) =>
                                                        ele._id === row._id
                                                ) === -1
                                                    ? [...selectedRows, row]
                                                    : selectedRows.filter(
                                                          (selectedRow: any) =>
                                                              selectedRow._id !==
                                                              row._id
                                                      )
                                            )
                                    }}
                                    className=" w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        ) : null}

                        {columns.map((column, index) => {
                            return (
                                <div
                                    key={column.field}
                                    className={`${
                                        column.flex
                                    } text-sm text-slate-600 px-2 flex justify-${
                                        column.align || 'start'
                                    } ${column.extraClasses}`}
                                >
                                    {column.renderCell
                                        ? column.renderCell(row)
                                        : row[column.field]}
                                </div>
                            )
                        })}
                    </div>
                ))
            ) : (
                <div
                    className={`w-full flex justify-center font-semibold ${noDataFoundClass}`}
                >
                    {noDataFoundText}
                </div>
            )}
        </div>
    )
}

export default ATMTable
