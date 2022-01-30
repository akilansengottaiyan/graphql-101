import {gql} from 'apollo-server-express'

export default gql`
  extend type Query {
    getUsers: [User!]
    getUser(id: ID!): User
    me: User!
  }
  extend type Mutation {
    signup(
      email: String!
      password: String!
      firstName: String!
      lastName: String
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String
    apps: [App]!
  }
  type AuthPayload {
    token: String
    user: User
  }
`
