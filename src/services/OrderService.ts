import { PaginationType } from 'src/models/common/paginationType'
import apiSlice from './ApiSlice'

export const OrderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //***** GET *****/
        getOrder: builder.query({
            providesTags: ['order'],
            query: (body: PaginationType) => ({
                url: '/order',
                method: 'POST',
                body,
            }),
        }),

        //***** GET *****/
        getAllOrder: builder.query({
            providesTags: ['order'],
            query: () => ({
                url: '/order',
                method: 'GET',
                // body,
            }),
        }),

        //***** Update *****/
        // updateOrder: builder.mutation({
        //     invalidatesTags: ['order'],
        //     query: ({ body, id }: UpdateOrder) => ({
        //         url: `/order/${id}`,

        //         method: 'PUT',
        //         body,
        //     }),
        // }),

        // **** GET BY ID
        getOrderById: builder.query({
            providesTags: ['order'],
            query: (id) => ({
                url: `/order/${id}`,

                method: 'GET',
            }),
        }),

        //**** Export
        exportOrderData: builder.mutation({
            query: (body: PaginationType) => ({
                url: '',

                params: {
                    _page: body.page,
                    _limit: body.limit,
                },
                method: 'GET',
                // body,
            }),
        }),

        //**** Status
        updateOrderStatus: builder.mutation({
            invalidatesTags: ['order'],
            query: (id) => ({
                url: `/order/completed/${id}`,

                method: 'PUT',
            }),
        }),

        // **** Delete
        deleteOrder: builder.mutation({
            invalidatesTags: ['order'],
            query: (id) => ({
                url: `/order/${id}`,

                method: 'DELETE',
            }),
        }),
    }),
})
export const {
    useGetOrderQuery,
    useUpdateOrderStatusMutation,
    useGetOrderByIdQuery,
    useExportOrderDataMutation,
    useDeleteOrderMutation,
    useGetAllOrderQuery,
} = OrderApi
