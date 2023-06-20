export type AssetsRequestListResponse = {
    assetName: string
    assetCategoryId: string
    quantity: number
    price: number
    remark: string
    assetDetails: string[]
    assetcategorieLabel: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddAssetsRequest = {
    assetName: string
    assetCategoryId: string
    quantity: number
    price: number
    remark: string
    assetDetails: string[]
    companyId: string
}

export type UpdateAssetsRequest = {
    body: {
        assetName: string
        assetCategoryId: string
        quantity: number
        price: number
        remark: string
        assetDetails: string[]
        companyId: string
    }
    id: string
}
