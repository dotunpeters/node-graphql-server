
import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import { schema } from './schema'
import { retrieveDataFromFile } from './data.db'

function main() {
    const yoga = createYoga({ schema: schema })
    const server = createServer(yoga)
    server.listen(4000, () => {
        retrieveDataFromFile()
        console.info('Server is running on http://localhost:4000/graphql')
    })
}

main()
