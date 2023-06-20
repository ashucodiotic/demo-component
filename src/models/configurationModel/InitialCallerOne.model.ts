export type InitialCallerOneListResponse = {
    initialCallName: string
    initailCallNameLabel: string
    companyId: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type AddInitialCallerOne = {
    initialCallName: string
    companyId: string
}

export type UpdateInitialCallerOne = {
    body: {
        initialCallName: string
        companyId: string
    }
    id: string
}
