const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class CategoryTable extends Model {
    static get tableName() {
        return 'category_table';
    }
};

module.exports = CategoryTable;