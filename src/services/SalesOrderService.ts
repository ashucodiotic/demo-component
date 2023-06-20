import {
    AddSaleOrder,
    UpdateSaleOrder,
    UpdateSOApprovalLevel,
} from 'src/models'
import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const SalesOrderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET PAGINATION DATA *****/

        getPaginationSaleOrder: builder.query({
            providesTags: ['SalesOrder'],
            query: (body: PaginationType) => ({
                url: '/sales-order',
                method: 'POST',
                body,
            }),
        }),

        //***** GET SALESORDER BY DEALER-ID DATA *****/
        getSalesOrderByDealerId: builder.query({
            providesTags: ['SalesOrder'],
            query: (dealerId) => ({
                url: `/sales-order/get-by-dealer/${dealerId}`,
                method: 'GET',
            }),
        }),

        //***** ADD *****/
        addSalesOrder: builder.mutation({
            invalidatesTags: ['SalesOrder'],
            query: (body: AddSaleOrder) => ({
                url: '/sales-order/add',
                method: 'POST',
                body,
            }),
        }),

        //***** Update *****/
        updateSalesOrder: builder.mutation({
            invalidatesTags: ['SalesOrder'],
            query: ({ body, id }: UpdateSaleOrder) => ({
                url: `/sales-order/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        //***** Update *****/
        updateSoLevel: builder.mutation({
            invalidatesTags: ['SalesOrder'],
            query: ({ body, id }: UpdateSOApprovalLevel) => ({
                url: `/sales-order/approval-level/${id}`,

                method: 'PUT',
                body,
            }),
        }),

        //***** Delete *****/
        deleteSalesOrder: builder.mutation({
            invalidatesTags: ['SalesOrder'],
            query: (id) => ({
                url: `/sales-order/${id}`,
                method: 'DELETE',
            }),
        }),

        // **** GET BY ID
        getSalesOrderById: builder.query({
            providesTags: ['SalesOrder'],
            query: (id) => ({
                url: `/sales-order/${id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetPaginationSaleOrderQuery,
    useGetSalesOrderByDealerIdQuery,
    useAddSalesOrderMutation,
    useUpdateSalesOrderMutation,
    useGetSalesOrderByIdQuery,
    useDeleteSalesOrderMutation,
    useUpdateSoLevelMutation,
} = SalesOrderApi
