import {gql} from 'apollo-server-express'

export default gql`
  extend type Query {
    getApps: [App!]!
    getApp(id: ID!): App!
    getFlows: [Flow!]!
    getFlow(id: ID!): Flow!
  }
  extend type Mutation {
    createApp(url: String!): App
    deleteApp(id: String!): App
    createFlow(
      title: String!
      flowType: FlowType!
      associatedWith: String!
    ): Flow
    updateFlow(title: String!, id: String!): Flow
    deleteFlow(title: String!): Flow
    createStep(order: Int, text: String!, associatedWith: String!): Step
    deleteStep(id: String!): Step
  }

  type App {
    id: ID!
    url: String!
    createdBy: User!
    flows: [Flow!]!
  }
  type Flow {
    id: ID!
    title: String!
    associatedWith: App!
    flowType: FlowType!
    steps: [Step]!
  }
  type Step {
    id: ID!
    order: Int
    text: String!
    associatedWith: Flow!
  }
  enum FlowType {
    HOTSPOT
    MODAL
  }
`
