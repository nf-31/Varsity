const { Model } = require('objection');
const knex = require('../db/knex');
const CategoryTable = require('./category_table');
const CommentTable = require('./comment_table');
const UserTable = require('./user_table');

Model.knex(knex);

class PostTable extends Model {
    static get tableName() {
        return 'post_table';
    }

    $beforeInsert() {
        this.date_time = new Date().toISOString().replace('Z','').replace('T', ' ');
    }

    static relationMappings = {
        categories: {
            relation: Model.ManyToManyRelation,
            modelClass: CategoryTable,
            join: {
                from: 'post_table.pid',
                through: {
                    from: 'post_category_table.post',
                    to: 'post_category_table.category'
                },
                to: 'category_table.ctid'
            }
        },
    
        author: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserTable,
            filter: query => query.select('uid', 'username', 'avatar_path'),
            join: {
                from: 'post_table.user',
                to: 'user_table.uid'
            }
        },

        comments: {
            relation: Model.HasManyRelation,
            modelClass: CommentTable,
            join: {
                from: 'post_table.pid',
                to: 'comment_table.post'
            }
        }
    }
};

module.exports = PostTable;