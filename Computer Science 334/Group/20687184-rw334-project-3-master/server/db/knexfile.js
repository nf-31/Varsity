

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'social_admin',
      password: '!QWErty123',
      database: 'social_db'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'social_admin',
      password: '!QWErty123',
      database: 'social_db'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'social_admin',
      password: '!QWErty123',
      database: 'social_db'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
