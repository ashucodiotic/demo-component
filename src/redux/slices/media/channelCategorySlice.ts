import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ChannelCategoryListResponse } from 'src/models/ChannelCategory.model'

export interface ChannelCategorySliceStateType {
    items: ChannelCategoryListResponse[] | []
    selectedItem: ChannelCategoryListResponse | null
    totalItems: number
    isTableLoading: boolean
    page: number
    rowsPerPage: number
    searchValue: string
    sortValue: { field: string; value: 'DESC' | 'ASC' }
    selectedId: string
    channelCategory: ChannelCategoryListResponse[] | null
}

const initialState: ChannelCategorySliceStateType = {
    items: [],
    totalItems: 0,
    selectedItem: null,
    isTableLoading: false,
    page: 1,
    rowsPerPage: 10,
    searchValue: '',
    sortValue: { field: 'createdAt', value: 'DESC' },
    selectedId: '',
    channelCategory: null,
}

const channelCategorySlice: any = createSlice({
    name: 'channelCategory',
    initialState,
    reducers: {
        setItems: (
            state,
            action: PayloadAction<ChannelCategoryListResponse[] | []>
        ) => {
            state.items = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
            document.getElementById('scroll-top')?.scrollTo(0, 0)
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload
            state.page = 1
            document.getElementById('scroll-top')?.scrollTo(0, 0)
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
            state.page = 1
        },
        setSortValue: (
            state,
            action: PayloadAction<{ field: string; value: 'DESC' | 'ASC' }>
        ) => {
            state.sortValue = action.payload
            state.page = 1
        },
        setTotalItems: (state, action: PayloadAction<number>) => {
            state.totalItems = action.payload
        },
        setIsTableLoading: (state, action: PayloadAction<boolean>) => {
            state.isTableLoading = action.payload
        },
        setSelectedItem: (
            state,
            action: PayloadAction<ChannelCategoryListResponse | null>
        ) => {
            state.selectedItem = action.payload
        },
        setSelectedId: (state, action: PayloadAction<string>) => {
            state.selectedId = action.payload
        },
        setChannelCategorys: (
            state,
            action: PayloadAction<ChannelCategoryListResponse[]>
        ) => {
            state.channelCategory = action.payload
        },
    },
})

export const {
    setItems,
    setPage,
    setRowsPerPage,
    setSearchValue,
    setSortValue,
    setTotalItems,
    setIsTableLoading,
    setSelectedId,
    setSelectedItem,
    setChannelCategorys,
} = channelCategorySlice.actions
export default channelCategorySlice.reducer
