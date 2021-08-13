const { Model } = require('objection');
const knex = require('../db/knex');
const UserTable = require('./user_table');

Model.knex(knex);

class CommentTable extends Model {
    static get tableName() {
        return 'comment_table';
    }

    $beforeInsert() {
        this.date_time = new Date().toISOString().replace('Z','').replace('T', ' ');
    }

    static relationMappings = {
        comment_author: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserTable,
            filter: query => query.select('uid', 'username', 'avatar_path'),
            join: {
                from: 'comment_table.user',
                to: 'user_table.uid'
            }
        }
    }
};

module.exports = CommentTable;