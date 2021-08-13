const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class FriendsTable extends Model {
    static get tableName() {
        return 'friends_table';
    }
};

module.exports = FriendsTable;