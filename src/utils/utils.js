import jwt from 'jsonwebtoken'
import {AuthenticationError} from 'apollo-server-express'
const getCurrentUser = async req => {
  const token = req.headers['authorization']
  if (token) {
    try {
      return await jwt.verify(token, process.env.APP_SECRET)
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }
  return null
  throw new Error('Not authenticated')
}
export {getCurrentUser}
