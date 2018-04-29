module.exports = {
  port: 3000,
  mongodb: {
    name: 'elapse',
    host: 'localhost',
    port: 27017,
  },
  mailer: {

  },
  encrypt: {
    salt: 'elapse-server2018',
  },
  token: {
    secret: 'elapse',
    expires: '4h',
    unlesses: [/^\/api\/v1\/user/, /^\/api\/v1\/article/, /^\/api\/v1\/classify/, /^\/api\/v1\/tag/]
  },
  router: {
    prefix: '/api/v1/'
  },
  qiniu: {
    accessKey: '',
    secretKey: '',
    scope: '',
    expires: 7200
  },
}
