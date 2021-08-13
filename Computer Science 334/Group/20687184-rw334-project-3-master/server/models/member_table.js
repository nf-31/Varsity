const { Model } = require('objection');
const knex = require('../db/knex');
const UserTable = require('./user_table');

Model.knex(knex);

class MemberTable extends Model {
    static get tableName() {
        return 'member_table';
    }

    static relationMappings = {
        users: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserTable,
            filter: query => query.select('uid','username', 'email', 'avatar_path'),
            join: {
                from: 'member_table.user',
                to: 'user_table.uid'
            }
        }
    }
};

module.exports = MemberTable;