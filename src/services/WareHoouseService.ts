import { AddWarehouse, UpdateWarehouse } from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const wareHouseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getWareHouses: builder.query({
            providesTags: ['WareHouse'],
            query: (companyId) => ({
                url: `/warehouse/company/${companyId}`,

                method: 'GET',
                // body,
            }),
        }),

        //***** GET PAGINATION DATA *****/
        getPaginationWareHouses: builder.query({
            providesTags: ['WareHouse'],
            query: (body: PaginationType) => ({
                url: '/warehouse',
                method: 'POST',
                body,
            }),
        }),

        //***** ADD *****/
        addWareHouse: builder.mutation({
            invalidatesTags: ['WareHouse'],
            query: (body: AddWarehouse) => ({
                url: '/warehouse/add',
                method: 'POST',

                body,
            }),
        }),

        //***** Update *****/
        updateWareHouse: builder.mutation({
            invalidatesTags: ['WareHouse'],
            query: ({ body, id }: UpdateWarehouse) => ({
                url: `/warehouse/${id}`,

                method: 'PUT',
                body,
            }),
        }),
        //***** Delete *****/
        deleteWareHouse: builder.mutation({
            invalidatesTags: ['WareHouse'],
            query: (id) => ({
                url: `/warehouse/${id}`,

                method: 'DELETE',
            }),
        }),

        // **** GET BY ID
        getWareHouseById: builder.query({
            providesTags: ['WareHouse'],
            query: (id) => ({
                url: `/warehouse/${id}`,

                method: 'GET',
            }),
        }),

        // **** GET ALL BY Dealer ID
        getAllWareHouseByDealerId: builder.query({
            providesTags: ['WareHouse'],
            query: ({ companyId, dealerId }) => ({
                url: `/warehouse/company/${companyId}/dealer/${dealerId}`,

                method: 'GET',
            }),
        }),
    }),
})
export const {
    useGetWareHousesQuery,
    useAddWareHouseMutation,
    useUpdateWareHouseMutation,
    useGetWareHouseByIdQuery,
    useGetPaginationWareHousesQuery,
    useDeleteWareHouseMutation,
    useGetAllWareHouseByDealerIdQuery,
} = wareHouseApi
