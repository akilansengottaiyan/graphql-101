import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import dotenv from 'dotenv'
import {prisma} from './prisma/generated/prisma-client'
import schema from './schema'
import resolvers from './resolvers'
import {getCurrentUser} from './utils/utils'
dotenv.config()
const app = express()
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({req}) => {
    console.log('Got the request.....')
    return {
      prisma,
      currentUser: await getCurrentUser(req),
    }
  },
})
server.applyMiddleware({app, path: '/graphql'})

app.listen({port: process.env.PORT}, () => {
  console.log(`Apollo Server on http://localhost:${process.env.PORT}/graphql'`)
})
