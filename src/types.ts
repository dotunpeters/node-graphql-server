
import { ReadStream } from 'fs';

export interface ICompany {
    id: string
    legalName: string
    stateOfIncorporation: string
    industry: string
    totalNumberOfEmployees: number
    numberOfFullTimeEmployees: number
    numberOfPartTimeEmployees: number
    website: string
    linkedInCompanyPage: string
    facebookCompanyPage: string
    otherInformation: string
    primaryContactPerson: IContact
    logoS3Key: string
    phone: string
    fax: string
    email: string
    registeredAddress: IBasicAddress
    mailingAddress: IBasicAddress
    isMailingAddressDifferentFromRegisteredAddress: boolean
}

interface IBasicAddress {
    country: string
    state: string
    city: string
    street: string
    zipCode: string
}

interface IContact {
    firstName: string
    lastName: string
    email: string
    phone: string
}

export interface ISignedFileUploadInput {
    fileName: string
    contentType: string
}

export interface ISignedLinkData {
    url: string
    key: string
}

export interface IUpdateCompanyResponse {
    company: ICompany
}

export interface IUpdateCompanyInput {
    legalName: string
    stateOfIncorporation: string
    industry: string
    totalNumberOfEmployees: number
    numberOfFullTimeEmployees: number
    numberOfPartTimeEmployees: number
    website: string
    linkedInCompanyPage: string
    facebookCompanyPage: string
    otherInformation: string
    primaryContactPerson: IContact
    logoS3Key: string
    phone: string
    fax: string
    email: string
    registeredAddress: IBasicAddress
    mailingAddress: IBasicAddress
    isMailingAddressDifferentFromRegisteredAddress: boolean
}

export interface IFileUpload {
    createReadStream: () => ReadStream;
    filename: string;
}
