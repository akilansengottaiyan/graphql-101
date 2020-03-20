import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export default {
  Query: {
    getUsers: (parent, args, context) => {
      return context.prisma.users()
    },
    getUser: (parent, args, context) => {
      return context.prisma.user({id: args.id})
    },
  },
  Mutation: {
    signup: async (parent, args, context) => {
      const password = await bcrypt.hash(args.password, 10)
      const user = await context.prisma.createUser({...args, password})
      const token = jwt.sign({userId: user.id}, process.env.APP_SECRET)
      return {
        token,
        user,
      }
    },
    login: async (parent, args, context) => {
      const user = await context.prisma.user({email: args.email})
      if (!user) {
        throw new Error('No user found with this login credentials.')
      }
      if (await bcrypt.compare(args.password, user.password)) {
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET)
        return {
          token,
          user,
        }
      } else {
        throw new Error('Invalid Password')
      }
    },
  },
  User: {
    apps: (parent, args, context) => {
      return context.prisma.user({id: parent.id}).apps()
    },
  },
}
