import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { apiSlice } from 'src/services'
import {
    barcodeSlice,
    companySlice,
    dealerSlice,
    sideNavLayoutSlice,
    userSlice,
    vendorSlice,
} from './slices'
import ASRSlice from './slices/ASRSlice'
import attributesGroupSlice from './slices/attributesGroupSlice'
import attributesSlice from './slices/attributesSlice'
import cartonBoxSlice from './slices/cartonBoxSlice'
import configurationCompanySlice from './slices/configurationCompanySlice'
import dealersCategorySlice from './slices/dealersCategorySlice'
import dealerPincodeSlice from './slices/dealerPincodeSlice'
import dealerSchemeSlice from './slices/dealerSchemeSlice'
import DealerLedgerSlice from './slices/DealerLedgerSlice'
import DealerOrderLedgerSlice from './slices/dealerOrderLedgerSlice'
import DealerSupervisorSlice from './DealerSupervisorSlice'
import GRNSlice from './slices/GRNSlice'
import inventorySlice from './slices/inventorySlice'
import itemSlice from './slices/itemSlice'
import languageSlice from './slices/languageSlice'
import outwardRequestSlice from './slices/outwardRequestSlice'
import productCategorySlice from './slices/productCategorySlice'
import productSlice from './slices/productSlice'
import productSubCategorySlice from './slices/productSubCategorySlice'
import PurchaseOrderSlice from './slices/PurchaseOrderSlice'
import saleOrderSlice from './slices/saleOrderSlice'
import schemeSlice from './slices/schemeSlice'
import warehouseSlice from './slices/warehouseSlice'
import authSlice from './slices/authSlice'
import { authMiddleware } from 'src/utils'
import productGroupSlice from './slices/productGroupSlice'
import TaxesSlice from './slices/TaxesSlice'
import areaSlice from './slices/areaSlice'
import countrySlice from './slices/countrySlice'
import statesSlice from './slices/statesSlice'
import districtSlice from './slices/districtSlice'
import tehsilSlice from './slices/tehsilSlice'
import pincodeSlice from './slices/pincodeSlice'
import CartonBoxBarcodeSlice from './slices/CartonBoxBarcodeSlice'
import ProductGroupBarcodeSlice from './slices/productGroupBarcodeSlice'
import NewUserSlice from './slices/NewUserSlice'
import didManagementSlice from './slices/media/didManagementSlice'
import channelManagementSlice from './slices/media/channelManagementSlice'
import tapeManagementSlice from './slices/media/tapeManagementSlice'
import slotManagementSlice from './slices/media/slotManagementSlice'
import dispositionOneSlice from './slices/configuration/dispositionOneSlice'
import channelGroupSlice from './slices/media/channelGroupSlice'
import channelCategorySlice from './slices/media/channelCategorySlice'
import competitorSlice from './slices/media/competitorManagementSlice'
import dispositionTwoSlice from './slices/configuration/dispositionTwoSlice'
import artistSlice from './slices/media/artist'
import dispositionThreeSlice from './slices/configuration/dispositionThreeSlice'
import initialCallerOneSlice from './slices/configuration/initialCallerOneSlice'
import initialCallerTwoSlice from './slices/configuration/initialCallerTwoSlice'
import initialCallerThreeSlice from './slices/configuration/initialCallerThreeSlice'
import websiteSlice from './slices/website/websiteSlice'
import websiteBlogSlice from './slices/website/websiteBlogSlice'
import websitePageSlice from './slices/website/websitePageSlice'
import websiteTagsSlice from './slices/website/websiteTagsSlice'
import orderSlice from './slices/orderSlice'
import inquirySlice from './slices/inquirySlice'
import dispositionComplaintSlice from './slices/configuration/dispositionComplaintSlice'
import batchSlice from './slices/BatchSlice'
import influencerSlice from './slices/website/influencerSlice'
import inboundCallerSlice from './slices/media/inboundCallerSlice'
import assetLocationSlice from './slices/assets/assetsLocationSlice'
import assetsRequestSlice from './slices/assets/assetsRequestSlice'
import assetsCategorySlice from './slices/assets/assetsCategorySlice'

// Middleware for handling 401 Error
// const authMiddelware = () => (next: any) => (action: any) => {
//     if (action.type.includes("rejected") && action.payload.status === 401) {
//         localStorage.clear(
//         window.location.href = "/"
//     }
//     return next(action)
// }

const store = configureStore({
    reducer: {
        auth: authSlice,
        sideNavLayout: sideNavLayoutSlice,
        dealer: dealerSlice,
        dealerPincode: dealerPincodeSlice,
        dealerScheme: dealerSchemeSlice,
        dealerSupervisor: DealerSupervisorSlice,
        dealerLedger: DealerLedgerSlice,
        dealerOrderLedger: DealerOrderLedgerSlice,
        vendor: vendorSlice,
        user: userSlice,
        newUser: NewUserSlice,
        company: companySlice,
        warehouse: warehouseSlice,
        inventory: inventorySlice,
        outwardRequest: outwardRequestSlice,
        saleOrder: saleOrderSlice,
        attributesGroup: attributesGroupSlice,
        productCategory: productCategorySlice,
        cartonBox: cartonBoxSlice,
        scheme: schemeSlice,
        purchaseOrder: PurchaseOrderSlice,
        grn: GRNSlice,
        productSubCategory: productSubCategorySlice,
        productGroup: productGroupSlice,
        attributes: attributesSlice,
        tax: TaxesSlice,
        item: itemSlice,
        states: statesSlice,
        district: districtSlice,
        areas: areaSlice,
        language: languageSlice,
        dealersCategory: dealersCategorySlice,
        products: productSlice,
        tehsils: tehsilSlice,
        pincode: pincodeSlice,
        asr: ASRSlice,
        country: countrySlice,
        configurationCompany: configurationCompanySlice,
        barcode: barcodeSlice,
        cartonBoxBarcode: CartonBoxBarcodeSlice,
        productGroupBarcode: ProductGroupBarcodeSlice,
        didManagement: didManagementSlice,
        channelManagement: channelManagementSlice,
        slotManagement: slotManagementSlice,
        tapeManagement: tapeManagementSlice,
        dispositionOne: dispositionOneSlice,
        channelGroup: channelGroupSlice,
        channelCategory: channelCategorySlice,
        competitor: competitorSlice,
        artist: artistSlice,
        website: websiteSlice,
        websiteBlog: websiteBlogSlice,
        websiteTags: websiteTagsSlice,
        dispositionThree: dispositionThreeSlice,
        initialCallerOne: initialCallerOneSlice,
        initialCallerTwo: initialCallerTwoSlice,
        initialCallerThree: initialCallerThreeSlice,
        websitePage: websitePageSlice,
        dispositionTwo: dispositionTwoSlice,
        order: orderSlice,
        inquiry: inquirySlice,
        batch: batchSlice,
        dispositionComplaint: dispositionComplaintSlice,
        influencer: influencerSlice,
        inboundCaller: inboundCallerSlice,
        assetLocation: assetLocationSlice,
        assetsRequest: assetsRequestSlice,
        assetsCategory: assetsCategorySlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([authMiddleware, apiSlice.middleware]),
})

setupListeners(store.dispatch)
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
