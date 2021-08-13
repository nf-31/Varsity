const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class UserTable extends Model {
    static get tableName() {
        return 'user_table';
    }
    static relationMappings = {
        friends: {
            relation: Model.ManyToManyRelation,
            modelClass: UserTable,
            filter: query => query.select('uid', 'username', 'avatar_path'),
            join: {
                from: 'user_table.uid',
                through: {
                    from: 'friends_table.user',
                    to: 'friends_table.friend'
                },
                to: 'user_table.uid'
            }
        }
    }
}

module.exports = UserTable;




  
  