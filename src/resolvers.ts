
import { GraphQLError } from 'graphql'
import * as fs from "fs";
import path from "path";
import uuid4 from "uuid4";
import dataList from "./data";
import {ICompany, ISignedFileUploadInput, ISignedLinkData, IUpdateCompanyResponse, IUpdateCompanyInput, IFileUpload} from "./types";
import { pubSub } from './pubsub';
import upload from "./cloudinaryUpload";


const resolvers = {
    Query: {
        getCompany: (parent: any, args: { id: string }): ICompany | undefined => {
            const { id } = args;
            if (!uuid4.valid(id)) throw new Error('Invalid company id');
            const company = dataList.companies.find(company => company.id === id);
            if (company) {
                return company;
            }else {
                throw new GraphQLError('Company not found');
            }
        },
        companies: () => {
            return dataList.companies;
        },
        getSignedDownloadUrl: (parent: any, args: { s3Key: string }): ISignedLinkData  => {
            const { s3Key } = args;
            const result = dataList.link.find(link => link.key === s3Key) as ISignedLinkData;
            if (result) {
                return result;
            }else {
                throw new GraphQLError('Key not found');
            }
        }
    },

    Mutation: {
        updateCompany: (parent: any, args: { companyId: string, input: ICompany }): IUpdateCompanyResponse | undefined => {
            const { companyId, input } = args;
            if (!uuid4.valid(companyId)) throw new Error('Invalid company id');
            const company = dataList.companies.find(company => company.id === companyId);
            if (company) {
                Object.assign(company, input);
                pubSub.publish('updatedCompany', { updatedCompany: dataList.companies });
                return {company};
            } else {
                throw new GraphQLError('Company not found');
            }
        },
        createCompany: (parent: any, args: { input: IUpdateCompanyInput }): IUpdateCompanyResponse => {
            const { input } = args;
            // if (!dataList.link.some(link => link.key === input.logoS3Key)) throw new GraphQLError('Invalid logoS3Key');
            const company = {
                id: uuid4(),
                ...input
            } as ICompany;
            dataList.companies.push(company);
            pubSub.publish('updatedCompany', { updatedCompany: dataList.companies });
            return {company};
        },
        deleteCompany: (parent: any, args: { companyId: string }): IUpdateCompanyResponse | undefined => {
            const { companyId } = args;
            if (!uuid4.valid(companyId)) throw new Error('Invalid company id');
            const company = dataList.companies.find(company => company.id === companyId);
            if (company) {
                const index = dataList.companies.indexOf(company);
                dataList.companies.splice(index, 1);
                pubSub.publish('updatedCompany', { updatedCompany: dataList.companies });
                return {company};
            } else {
                throw new GraphQLError('Company not found');
            }
        },
        getSignedUploadUrl: async (parent: any, args: { input: ISignedFileUploadInput, file: File}): Promise<ISignedLinkData> => {
            const { input, file } = args;
            const key = input.fileName + "-" + uuid4();
            const imagePath: string = `./images/${key}`;
            try {
                const fileArrayBuffer = await file.arrayBuffer()
                await fs.promises.writeFile(
                    path.join(__dirname, `/images/${key}.${input.contentType.split("/")[1]}`),
                    Buffer.from(fileArrayBuffer)
                )
            } catch (e: any) {
                throw new GraphQLError(e.message);
            }
            const { url, downloadUrl } = await upload(path.resolve(__dirname)+`/images/${key}.${input.contentType.split("/")[1]}`, key);
            // delete image from local storage
            fs.unlinkSync(path.resolve(__dirname)+`/images/${key}.${input.contentType.split("/")[1]}`)
            dataList.link.push({key, url: downloadUrl});
            return {url, key} as ISignedLinkData;
        }
    },
    Subscription: {
        updatedCompany: {
            subscribe: () =>
                pubSub.subscribe('updatedCompany')
        }
    }
}

export default resolvers;
