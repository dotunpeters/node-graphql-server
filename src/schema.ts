
import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from './resolvers'

const typeDefinitions = /* GraphQL */ `
    scalar File
    type Query {
        getCompany(id: String): Company!
        getSignedDownloadUrl(s3Key: String): SignedLinkData!
        companies: [Company!]!
    }
    
    type Mutation {
        updateCompany(companyId: ID!, input: UpdateCompanyInput!): UpdateCompanyResponse!
        createCompany(input: UpdateCompanyInput!): UpdateCompanyResponse!
        deleteCompany(companyId: ID!): UpdateCompanyResponse!
        getSignedUploadUrl(input: SignedFileUploadInput, file: File!): SignedLinkData!
    }
   
    type Subscription {
        updatedCompany: [Company!]!
    }
  
    type Company {
        id: ID!
        legalName: String
        stateOfIncorporation: String
        industry: String
        totalNumberOfEmployees: Int
        numberOfFullTimeEmployees: Int
        numberOfPartTimeEmployees: Int
        website: String
        linkedInCompanyPage: String
        facebookCompanyPage: String
        otherInformation: String
        primaryContactPerson: Contact
        logoS3Key: String
        phone: String
        fax: String
        email: String
        registeredAddress: BasicAddress
        mailingAddress: BasicAddress
        isMailingAddressDifferentFromRegisteredAddress: Boolean
    }
    
    type Contact {
        firstName: String
        lastName: String
        email: String
        phone: String
    }
    
    type BasicAddress {
        country: String
        state: String
        city: String
        street: String
        zipCode: String
    }
    
    input SignedFileUploadInput {
        fileName: String!
        contentType: String!
    }
    
    type SignedLinkData {
        url: String!
        key: String!
    }
    
    input UpdateCompanyInput {
        legalName: String
        stateOfIncorporation: String
        industry: String
        totalNumberOfEmployees: Int
        numberOfFullTimeEmployees: Int
        numberOfPartTimeEmployees: Int
        website: String
        linkedInCompanyPage: String
        facebookCompanyPage: String
        otherInformation: String
        primaryContactPerson: ContactInput
        logoS3Key: String
        phone: String
        fax: String
        email: String
        registeredAddress: BasicAddressInput
        mailingAddress: BasicAddressInput
        isMailingAddressDifferentFromRegisteredAddress: Boolean
    }
    
    input ContactInput {
        firstName: String
        lastName: String
        email: String
        phone: String
    }
    
    input BasicAddressInput {
        country: String
        state: String
        city: String
        street: String
        zipCode: String
    }

    type UpdateCompanyResponse {
        company: Company!
    }
`

export const schema = makeExecutableSchema({
    resolvers: [resolvers],
    typeDefs: [typeDefinitions]
})
