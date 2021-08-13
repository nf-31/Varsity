const CommentTable = require('../models/comment_table');

async function createComment(postID, userID, bodyText) {

    // Create group and set user as admin
    const comment = await CommentTable.query().insert(
        {
            post: postID,
            user: userID,
            body: bodyText,
        });
    return comment;


}

module.exports = { createComment };