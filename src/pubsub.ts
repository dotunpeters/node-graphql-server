
import { createPubSub } from '@graphql-yoga/subscription'
import { ICompany } from './types'

export type PubSubChannels = {
    updatedCompany: [{ updatedCompany: ICompany[] }]
}

export const pubSub = createPubSub<PubSubChannels>()
