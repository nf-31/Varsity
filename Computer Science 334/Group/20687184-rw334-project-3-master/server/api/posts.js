const CategoryTable = require('../models/category_table');
const PostCategoryTable = require('../models/post_category_table');
const PostTable = require('../models/post_table');

async function get_group_posts(group_id) {
    var posts = await PostTable.query()
        .where('gid', group_id)
        .withGraphFetched('[author, categories]')
        .orderBy('date_time', 'desc');
    return posts;
}

async function get_all_posts(sorting) {
    var posts;

    switch (sorting) {
        case 'time':
            posts = await PostTable.query().orderBy('date_time', 'desc')
            .withGraphFetched('[author, categories]');
            break;
        case 'category':
            posts = await PostTable.query().orderBy('date_time', 'desc')
            .withGraphFetched('[author, categories]')

            posts = posts.sort((a, b) => a.categories[0].type.localeCompare(b.categories[0].type) ||
            a.categories[1].type.localeCompare(b.categories[1].type) ||
            a.categories[2].type.localeCompare(b.categories[2].type));
            break;
        case 'user':
            posts = await PostTable.query().orderBy('user', 'asc')
            .orderBy('date_time', 'desc')
            .withGraphFetched('[author, categories]');
            break;
        case 'group':
            posts = await PostTable.query().orderBy('gid', 'asc')
                .orderBy('date_time', 'desc')
                .withGraphFetched('[author, categories]');
            break;
        default:
    }

    var postGraph = posts
    return posts;
}

async function get_post(post_id) {
    var post = await PostTable.query()
        .where('pid', post_id)
        .withGraphFetched('[author, categories, comments.[comment_author]]');
    return post;
}

async function createPost(userID, groupID, bodyText, geoTag, categories) {

    // Create group and set user as admin
    await PostTable.query().insert(
        {
            user: userID,
            gid: groupID,
            body: bodyText,
            geo_tag: geoTag
        });
    var post = await PostTable.query().max({ pid: 'pid' }).first();
    categories.forEach(number => addCategories(number, post.pid));
    return post;
}

async function addCategories(category, postID) {
    var result = await CategoryTable.query().where({ 'type': category });

    if (!result.length) {
        await CategoryTable.query().insert(
            {
                type: category
            });
        var new_cat = await CategoryTable.query().where('type', category).first();
        await PostCategoryTable.query().insert(
            {
                post: postID,
                category: new_cat.ctid
            });
    } else {
        await PostCategoryTable.query().insert(
            {
                post: postID,
                category: result[0].ctid
            });
    }

}
module.exports = { get_group_posts, get_post, createPost, get_all_posts, addCategories };

