const { Model } = require('objection');
const knex = require('../db/knex');
const UserTable = require('./user_table');

Model.knex(knex);

class GroupTable extends Model {
    static get tableName() {
        return 'group_table';
    }

    static relationMappings = {
        members: {
            relation: Model.ManyToManyRelation,
            modelClass: UserTable,
            filter: query => query.select('uid','username', 'email', 'avatar_path'),
            join: {
                from: 'group_table.gid',
                through:{
                    from: 'member_table.gid',
                    to: 'member_table.user'
                },
                to: 'user_table.uid'
            }
        }
    }
};

module.exports = GroupTable;