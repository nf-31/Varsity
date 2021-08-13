const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class PostCategoryTable extends Model {
    static get tableName() {
        return 'post_category_table';
    }
};

module.exports = PostCategoryTable;