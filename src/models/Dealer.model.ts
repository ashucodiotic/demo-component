export type DealersListResponse = {
    firstName: string
    lastName: string
    creditLimit: number
    openingBalance: number
    autoMapping: boolean
    quantityQuotient: number
    dealerCode: string
    firmName: string
    dealerCategoryId: String
    email: string
    registrationCountryName: string
    registrationStateName: string
    registrationDistrictName: string
    registrationPincodeName: string
    billingAddressCountryName: string
    billingAddressStateName: string
    billingAddressDistrictName: string
    billingAddressPincodeName: string
    registrationAddress: registrationAddress
    billingAddress: billingAddress
    contactInformation: contactInformation[]
    document: document
    otherDocument: otherDocument[]
    companyID: string
    isActive: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    _id: string
    __v: number
}

export type registrationAddress = {
    phone: string
    address: string
    countryId: string
    stateId: string
    districtId: string
    pincodeId: string
}

export type billingAddress = {
    phone: string
    address: string
    countryId: string
    stateId: string
    districtId: string
    pincodeId: string
}
export type contactInformation = {
    name: string
    department: string
    designation: string
    email: string
    mobileNumber: string
    landLine: string
}

export type document = {
    gstNumber: string
    gstCertificate: string
    adharCardNumber: string
    adharCard: string
}
export type otherDocument = {
    documentName: string
    documentFile: string
}

export type AddDealer = {
    firstName: string
    lastName: string
    creditLimit: number
    openingBalance: number
    autoMapping: boolean
    quantityQuotient: number
    dealerCode: string
    firmName: string
    dealerCategoryId: String
    email: string
    password: string
    registrationAddress: registrationAddress
    billingAddress: billingAddress
    contactInformation: contactInformation[]
    document: document
    otherDocument: otherDocument[]
    companyId: string
}

export type UpdateDealer = {
    body: {
        firstName: string
        lastName: string
        creditLimit: number
        openingBalance: number
        autoMapping: boolean
        quantityQuotient: number
        dealerCode: string
        firmName: string
        dealerCategoryId: String
        email: string
        registrationAddress: registrationAddress
        billingAddress: billingAddress
        contactInformation: contactInformation[]
        document: document
        otherDocument: otherDocument[]
        companyId: string
    }
    id: string
}
