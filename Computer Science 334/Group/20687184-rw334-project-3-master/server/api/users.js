// import UserTable
const UserTable = require('../models/user_table');
const FriendTable = require('../models/friends_table');
const bcrypt = require('bcrypt');
const { whereNotExists } = require('../db/knex');

// Functions

async function insertUser(username, email, password) {

  // hash password before inserting into database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


  const user = await UserTable.query().insert({
    username: username,
    password: hashedPassword,
    email: email,
    avatar_path: "https://image.flaticon.com/icons/png/512/747/747376.png"
  });
} // end insertUser

// Check if username or email exists in database

async function checkUser(username, email, res) {

  // Check if either username or email, or both exist in database. Return true if none present
  const checkUsername = await UserTable.query().findOne({
    username: username
  });
  const checkEmail = await UserTable.query().findOne({
    email: email
  });

  if (checkUsername && (!checkEmail)) {
    return res.status(422).json({ message: "Username taken" });
  }
  if (checkEmail && (!checkUsername)) {
    return res.status(422).json({ message: "Email taken" });

  }
  if (checkUsername && checkEmail) {
    return res.status(422).json({ message: "Username and email taken" });
  }
  else {
    return true;
  }

} // end checkUser



// checkPassword

async function checkPassword(username, password, res) {

  try {

    var valid = false;
    const user = await UserTable.query().findOne({
      username: username
    }).throwIfNotFound({
      message: "User does not exist"
    });
    if (user) {
      // compare supplied password with that stored in database
      valid = await bcrypt.compare(password, user.password);
    }
    return valid;


  }
  catch (err) {
    return res.status(401).json({ error: err.message });

  }

} // end checkPassword

// update user avatar
async function updateAvatar(uid, avatarPath) {

  const affected = await UserTable.query().patch({ avatar_path: avatarPath }).findOne({ uid: uid });
  if (affected > 0) {
    return true;
  }
  else {
    return false;
  }
} // end updateAvatar

// Update email
async function updateEmail(uid, email) {
  // Patch query returns number of affected rows, which should always be 1 in this case.
  const affected = await UserTable.query().patch({ email: email }).findOne({ uid: uid });
  if (affected > 0) {
    return true;
  }
  else {
    return false;
  }

} // end updateEmail

// Update password
async function updatePassword(uid, password) {

  // Patch query returns number of affected rows, which should be 1 in this case.

  const user = await UserTable.query().findOne({
    uid: uid
  });

  // hash password before inserting into database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // check that password does not already exist in database
  const exists = await bcrypt.compare(password, user.password);
  if (exists === true) {
    return false;
  }
  else {
    const affected = await UserTable.query().patch({ password: hashedPassword }).findOne({ uid: uid });
    return true;
  }

} // end update password

// update username
async function updateUsername(uid, newUsername) {

  // check if new username is already taken
  const check = await UserTable.query().findOne({ username: newUsername });

  if (check) {
    return false;
  }
  else {
    const updatedUsername = await UserTable.query().patch({ username: newUsername }).findOne({ uid: uid });
    return true;
  }

} // end update username

// Add user as friend
async function addFriend(userId, friendId) {



  // check if friend relation is not already in database (prevent duplicate entries)
  const check = await FriendTable.query().findOne({
    user: userId,
    friend: friendId
  });

  if (check) {
    return false;
  }
  else {
    const add = await FriendTable.query().insert({
      user: userId,
      friend: friendId
    });
    return true;

  }
} // end function addFriend

// remove friend
async function removeFriend(userId, friendId) {

  // check if friend relation exists
  const check = await FriendTable.query().findOne({
    user: userId,
    friend: friendId
  });

  // Delete if relation exists, otherwise return false
  if (check) {
    deletedFriend = await FriendTable.query().delete().where({
      user: userId,
      friend: friendId
    });
    return true;
  }
  else {
    return false;
  }
  
} // end function removeFriend

// Delete account
async function deleteAccount(uid) {

  // Delete query returns number of deleted rows, which should always be 1 in this case.
  const deleted = await UserTable.query().delete().where({ uid: uid });
  if (deleted > 0) {
    return true;
  }
  else {
    return false;
  }

} // end deleteAccount



// Get avatar path
async function getAvatarPath(uid, res) {

  try {
    const avatarPath = await UserTable.query().select('avatar_path').where({ uid: uid }).throwIfNotFound({ message: "No profile picture found" });
    return avatarPath[0].avatar_path;

  }
  catch (err) {
    return res.status(401).send(err.message);

  }

} //end getAvatarPath

// Get profile details
async function getProfile(uid) {

  const profile = await UserTable.query().select('username', 'email', 'avatar_path').where({ uid: uid }).throwIfNotFound({
    message: "User not found"
  });
  return profile[0];


} // end getProfile

// Get profile details
async function searchUsers(searchTerm) {

  const users = await UserTable.query()
  .select('uid','username', 'email', 'avatar_path')
  .where( 'username', 'like', '%'+ searchTerm+'%');
  return users;


} // end getProfile


async function get_friends(user_id) {
  var query_friends = await UserTable.query()
    .where('uid', user_id)
    .withGraphFetched('friends');
  var friends = query_friends[0]['friends'];
  return friends;
}

async function getUserId(username) {

  const userID = await UserTable.query().select('uid').where({ username: username });
  return userID[0].uid;

}

// check user in db (for verification purposes)
async function checkUserInDB(uid) {

  const check = await UserTable.query().findOne({ uid: uid });

  if (check) {
    return true;
  }
  else {
    return false;
  }
} // end function checkUserInDB



module.exports = { insertUser, checkUser, checkPassword, deleteAccount, 
  updateEmail, updatePassword, updateUsername, updateAvatar, 
  getAvatarPath, getProfile, searchUsers, addFriend, get_friends,
  getUserId, checkUserInDB, removeFriend };
