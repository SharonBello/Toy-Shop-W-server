const authService = require('../api/auth/auth.service')
const logger = require('../services/logger.service')

console.log('im midlleware' )

function requireAuth(req, res, next) {
 
  console.log('1- req?.cookies?.loginToken in middleware---------', req.cookies.loginToken)
  if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  console.log('loggedinUser', loggedinUser)
  if (!loggedinUser) return res.status(401).send('Not Authenticated')
  next()
}

function requireAdmin(req, res, next) {
  
  console.log('2- req?.cookies?.loginToken in middleware----------', req.cookies.loginToken)
  if (!req?.cookies?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  console.log('loggedinUser', loggedinUser)
  if (!loggedinUser.isAdmin) {
    logger.warn(loggedinUser.fullname + 'attempted to perform admin action')
    res.status(403).end('Not Authorized')
    return
  }
  next()
}


// module.exports = requireAuth

module.exports = {
  requireAuth,
  requireAdmin
}
