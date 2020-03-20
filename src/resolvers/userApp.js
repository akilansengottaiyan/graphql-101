export default {
  Query: {
    getApps: (_, args, context) => {
      return context.prisma.apps()
    },
    getApp: (_, args, context) => {
      return context.prisma.app({id: args.id})
    },
    getFlows: (_, __, context) => {
      return context.prisma.flows()
    },
    getFlow: (_, __, context) => {
      return context.prisma.flow({id: args.id})
    },
  },
  Mutation: {
    createApp: (_, args, context) => {
      const userId = context.currentUser.userId
      return context.prisma.createApp({
        url: args.url,
        createdBy: {connect: {id: userId}},
      })
    },
    deleteApp: (_, args, context) => {
      return context.prisma.deleteApp({
        id: args.id,
      })
    },
    createFlow: (_, args, context) => {
      return context.prisma.createFlow({
        title: args.title,
        flowType: args.flowType,
        associatedWith: {connect: {id: args.associatedWith}},
      })
    },
    deleteFlow: (_, args, context) => {
      return context.prisma.deleteFlow({
        title: args.title,
      })
    },
    updateFlow: (_, args, context) => {
      return context.prisma.updateFlow({
        data: {title: args.title},
        where: {id: args.id},
      })
    },
    createStep: async (_, args, context) => {
      const order = args.order
        ? args.order
        : (await context.prisma.flow({id: args.associatedWith}).steps()).length
      return context.prisma.createStep({
        order: order,
        text: args.text,
        associatedWith: {connect: {id: args.associatedWith}},
      })
    },
    deleteStep: (_, args, context) => {
      return context.prisma.deleteStep({
        id: args.id,
      })
    },
  },
  App: {
    createdBy: (parent, _, context) => {
      return context.prisma.app({id: parent.id}).createdBy()
    },
    flows: (parent, _, context) => {
      return context.prisma.app({id: parent.id}).flows()
    },
  },
  Flow: {
    associatedWith: (parent, _, context) => {
      return context.prisma.flow({id: parent.id}).associatedWith()
    },
    steps: (parent, _, context) => {
      return context.prisma.flow({id: parent.id}).steps()
    },
  },
  Step: {
    associatedWith: (parent, _, context) => {
      return context.prisma.step({id: parent.id}).associatedWith()
    },
  },
}
