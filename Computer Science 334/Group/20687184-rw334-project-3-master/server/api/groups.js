const GroupTable = require('../models/group_table');
const MemberTable = require('../models/member_table');

async function get_groups() {
    const groups = await GroupTable.query();
    return groups;
}

async function get_group_members(group_id) {
    const query_members = await MemberTable.query()
    .where('gid', group_id)
    .withGraphFetched('users');
    
    var members = [];
    for (var i in query_members){
        var query_user = query_members[i]['users'];
        var user = {
            uid : query_user['uid'],
            username: query_user['username'],
            avatar_path:  query_user['avatar_path'],
            is_admin: query_members[i]['is_admin']
        };
        members.push(user);
    }
    return members;
}

// Create group
async function createGroup(userId, groupName) {
    
    // check that group does not already exist
    const check = await GroupTable.query().findOne({ name: groupName });

    if (check) {
        return false;
    }
    else {
        // Create group and set user as admin
        const group = await GroupTable.query().insert({ name: groupName });
        const setAdmin = await MemberTable.query().insert({
            gid: group.id,
            user: userId,
            is_admin: true
        });
        return group;
    }
    

} // end function createGroup

// Delete group
async function deleteGroup(groupID, userID) {

    // check if group exists
    const check = await GroupTable.query().findOne({gid: groupID});
    const isAdmin = await checkGroupAdmin(userID, groupID);
    if (check && isAdmin) {
        // delete group from group_table and association in member_table
        const deletedGroup = await GroupTable.query().delete().where({ gid: groupID });
        const deletedAssociation = await MemberTable.query().delete().where({ gid: groupID });
        return true;
    }
    else {
        return false;
    }



} // end function deleteGroup

// Join group

async function joinGroup(uid, groupName) {

    // get group info
    const group = await GroupTable.query().findOne({ name: groupName});

  

    if (group) {
        // check if user in group
        const checkUser = await MemberTable.query().findOne({
            gid: group.gid,
            user: uid
        });
        if (checkUser) {
            throw "You are already a member of the group";

        }
        else {
            const join = await MemberTable.query().insert({
                gid: group.gid,
                user: uid,
                is_admin: false
            });
            return true;
        }
        
    }
    else {
        return false;
    }

} // end function joinGroup

// Leave group
async function leaveGroup(uid, groupName) {
    // get group info
    const group = await GroupTable.query().findOne({ name: groupName});

    if (group) {

        // check if user in group
        const checkUser = await MemberTable.query().findOne({
            gid: group.gid,
            user: uid
        });

        if (checkUser) {
            // exit group
            const leave = await MemberTable.query().delete().where({
                gid: group.gid,
                user: uid
            });
            return true;
        }
        else {
            throw "You are not a member of this group"
        }

        
    }
    else {
        return false;
    }

} // end function leaveGroup


// check if user is admin of group 
async function checkGroupAdmin(uid, groupID) {

    
    // get group info
    const group = await GroupTable.query().findOne({ gid: groupID});

    if (group) {
        // check if user is member of the group
        const check = await MemberTable.query().findOne({
            gid: group.gid,
            user: uid
        });
    
        if (check) {
            return check.is_admin;
        }
        else {
            throw "You are not a member of this group";
        }
    }
    else {
        return false;
    }

} // end function checkAdmin

// Get group using group name
async function getGroup(groupName) {

    const groups = await GroupTable.query().select('gid', 'name').where('name', 'like', '%'+ groupName +'%').throwIfNotFound({
        message: "No groups found"
      });
      return groups;
    

}

module.exports = { get_groups, get_group_members, createGroup, deleteGroup, joinGroup, leaveGroup, checkGroupAdmin, getGroup };