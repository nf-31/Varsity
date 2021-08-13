// server/index.js

const express = require("express");
const cookieParser = require("cookie-parser");
const helpers = require('./helpers');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const PORT = 3001;

const app = express();

// Generate secret key
const secretKey = require('crypto').randomBytes(48).toString('hex');

// import functions
const users = require('./api/users');
const groups = require('./api/groups');
const posts = require('./api/posts');
const comments = require('./api/comments');
const { doesNotMatch } = require("assert");

app.use(express.json()); // express middleware for parsing json
app.use(cookieParser()); // middleware for parsing cookies
app.use("/avatars", express.static(__dirname + '/public')); // public directory to serve avatars from
app.use(cors()) // middleware for allowing cross origin resource sharing

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/public/');
  },

  // By default, multer removes file extensions
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});



app.get("/api", (req, res) => {
  res.json({ message: "Hello from api server!" });
});

// Get list of groups

app.get("/api/groups", verifyToken, async (req, res) => {

  try {
    var group_list = await groups.get_groups();
    res.send(JSON.stringify(group_list));
  } catch (e) {
    res.status(500).send("500: Internal server error");
    console.log(e);
  }

});

// Get list of posts in a specific group

app.get("/api/groups/:groupid/posts", verifyToken, async (req, res) => {

  try {
    var group_post_list = await posts.get_group_posts(req.params.groupid);
    res.send(JSON.stringify(group_post_list));
  } catch (e) {
    res.status(500).send("500: Internal server error");
    console.log(e);
  }

});

// Get all members of a specific group

app.get("/api/groups/:groupid/members", verifyToken, async (req, res) => {

  try {
    var group_member_list = await groups.get_group_members(req.params.groupid);
    res.send(JSON.stringify(group_member_list));
  } catch (e) {
    res.status(500).send("500: Internal server error");
    console.log(e);
  }

});

//Returns all posts (global feed)

app.get("/api/posts/all/:sorting", verifyToken, async (req, res) => {

  try {
    var post_data = await posts.get_all_posts(req.params.sorting);
    res.status(200).json(post_data);
  } catch (e) {
    res.status(500).send("500: Internal server error");
    console.log(e);
  }


});

//Returns friends of a user

app.get("/api/friends", verifyToken, async (req, res) => {
  const uid = req.user.uid;

  try {
    var friends_list = await users.get_friends(uid);
    res.status(200).json(friends_list);
  } catch (e) {
    res.status(500).send("500: Internal server error");
    console.log(e);
  }
});

app.get("/api/friends/:userid", verifyToken, async (req, res) => {
  const uid = req.user.uid;
  const friendid = req.params.userid;
  try {
    var friends_list = await users.get_friends(uid);
    friends_list.forEach(friend => {
      if (friend.uid == friendid) {
        res.status(200).json({ isfriend: true });
      }
    });
    res.status(200).json({ isfriend: false });
  } catch (e) {
    res.status(500).send("500: Internal server error");
    console.log(e);
  }
});

/*
Example of body for post creation:
{
  "bodyText": "Some text for the body",
  "geoTag": "{'lat': 1245, 'long': 6578}",
  "categories": ["Pizza", "Cat", "Dog"]
}

The dateTime is created by the Server at the time of the post.
*/
app.post("/api/groups/:groupid/posts", verifyToken, (req, res) => {
  const postJSON = req.body;
  const groupID = req.params.groupid;
  const uid = req.user.uid; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  posts.createPost(
    uid, parseInt(groupID), postJSON.bodyText, postJSON.geoTag, postJSON.categories)
    .then(result => {
      if (result) {
        return res.status(201).json(result);
      }
      else {
        return res.status(401).send("Failed to create post");
      }
    }).catch(function (err) {
      console.log(err);
      return res.status(500).send("500: Internal server error");

    });
});

//Get a single post by id

app.get("/api/posts/:postid", verifyToken, async (req, res) => {
  try {
    var post_data = await posts.get_post(req.params.postid);
    res.send(JSON.stringify(post_data));
  } catch (e) {
    res.status(500).send("500: Internal server error");
    console.log(e);
  }
});

/*
Example of body for comment creation:
{
  "bodyText": "Body 6"
}

The dateTime is created by the Server at the time of the post.
*/
app.post("/api/posts/:postid/comments", verifyToken, (req, res) => {
  const postJSON = req.body;
  const postID = req.params.postid;
  const uid = req.user.uid;

  comments.createComment(
    parseInt(postID), uid, postJSON.bodyText)
    .then(result => {
      if (result) {
        return res.status(201).json(result);
      }
      else {
        return res.status(401).send("Failed to create comment");
      }
    }).catch(function (err) {
      console.log(err);
      return res.status(500).send("500: Internal server error");

    });
});

// Get current user's account details
app.get("/api/profile", verifyToken, (req, res) => {

  const uid = req.user.uid;

  users.getProfile(uid).then(profile => {
    if (profile) {
      return res.status(200).json(profile);
    }
  }).catch(function (err) {
    return res.status(404).send(err.message);
  });
});

// Search for user by id
app.get("/api/users/:userid", verifyToken, (req, res) => {
  const userID = req.params.userid;

  users.getProfile(userID).then(profile => {
    if (profile) {
      delete profile.email;
      return res.status(200).json(profile);
    }
  }).catch(function (err) {
    return res.status(404).send(err.message);
  });
});

// Search for users by searchterm
app.get("/api/users/search/:searchterm", verifyToken, (req, res) => {
  const searchTerm = req.params.searchterm;
  users.searchUsers(searchTerm).then(users => {
    if (users) {
      return res.status(200).json(users);
    }
  }).catch(function (err) {
    return res.status(404).send(err.message);
  });
});

// Search for group using group name
app.get("/api/groups/:groupname", verifyToken, (req, res) => {
  const groupName = req.params.groupname;

  groups.getGroup(groupName).then(group => {
    if (group) {
      return res.status(200).json(group);
    }
  }).catch(function (err) {
    return res.status(404).send(err.message);
  });
});

// Create group

app.post("/api/groups", verifyToken, (req, res) => {
  const { groupName } = req.body;
  const uid = req.user.uid;

  groups.createGroup(uid, groupName).then(group => {
    if (group) {
      return res.status(201).json(group);
    }
    else {
      return res.status(401).send(`Failed to create ${groupName}`);
    }
  }).catch(function (err) {
    console.log(err);
    return res.status(500).send("500: Internal server error");

  });
});

// Delete group
app.delete("/api/groups/:groupid", verifyToken, (req, res) => {
  const groupID = req.params.groupid;
  const uid = req.user.uid;

  groups.deleteGroup(groupID, uid).then(success => {
    if (success) {
      return res.status(200).send("Successfully deleted group");
    }
    else {
      return res.status(409).send("Failed to delete group");
    }

  }).catch(function (err) {
    console.log(err);
    return res.status(500).send("500: Internal server error");
  });
});

// Join group
app.post("/api/groups/join/:groupname", verifyToken, (req, res) => {
  const userId = req.user.uid;
  const groupName = req.params.groupname;

  groups.joinGroup(userId, groupName).then(success => {

    if (success) {
      return res.status(200).send(`Successfully joined ${groupName}`);
    }
    else {
      return res.status(400).send(`Failed to join ${groupName}`);
    }

  }).catch(function (err) {
    // error thrown if user is already in group
    console.log(err);
    return res.status(400).send(err);
  });
});

// check if user is group admin
app.get("/api/groups/:groupid/isAdmin", verifyToken, (req, res) => {
  const userId = req.user.uid;
  const groupID = req.params.groupid;

  groups.checkGroupAdmin(userId, groupID).then(admin => {
    if (admin) {
      return res.status(200).json({ isAdmin: true });
    }
    else {
      return res.status(200).json({ isAdmin: false });
    }

  }).catch(function (err) {
    // user is not a member of the group
    console.log(err);
    return res.status(409).send(err);

  });

});

// Leave group
app.post("/api/groups/leave/:groupname", verifyToken, (req, res) => {
  const userId = req.user.uid;
  const groupName = req.params.groupname;

  groups.leaveGroup(userId, groupName).then(success => {
    if (success) {
      return res.status(200).send(`Left ${groupName} successfully`);
    }
    else {
      return res.status(400).send(`Failed to leave ${groupName}`);
    }

  }).catch(function (err) {
    console.log(err);
    return res.status(409).send(err);

  });

});

// Upload a profile picture

app.post('/api/upload-profile-pic', verifyToken, (req, res) => {
  const uid = req.user.uid;

  // 'profile_pic' is the name of our file input field in the HTML form
  let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.file) {
      return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
      return res.send(err);
    }
    else if (err) {
      return res.send(err);
    }

    // update avatar path in database
    users.updateAvatar(uid, `http://localhost:3001/avatars/${req.file.filename}`).then(success => {
      if (success) {
        // Display uploaded image for user validation
        return res.status(200).send(`You have uploaded this image: <hr /><img src="http://localhost:3001/avatars/${req.file.filename}" width="500">`);
      }
      else {
        return res.status(400).send("Failed to upload image");
      }
    }).catch(function (err) {
      console.log(err);
      return res.status(500).send("500: Internal server error");
    });


  });
});

// Register a user

app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;

  users.checkUser(username, email, res).then(exists => {
    if (exists === true) {
      users.insertUser(username, email, password).catch(function (err) {
        console.log('error: ', err);
        return res.status(500).send("500: Internal server error");

      });
      return res.status(201).json({ message: "Account created" });
    }

  }).catch(function (err) {
    console.log('error: ', err);
    return res.status(500).send("500: Internal server error");

  });


});

// Login

app.post("/api/login", (req, res) => {
  const { username, password, rememberMe } = req.body.auth;
  var id; // user id


  // Validate password. If successful, generate authentication token and set cookie. Expiration set to 1 minute for now, will change later.
  users.checkPassword(username, password, res).then(valid => {

    if (valid) {
      users.getUserId(username).then(uid => {
        id = uid;
        if (rememberMe) {
          // generate authentication token without expiry
          jwt.sign({ uid: id }, secretKey, { algorithm: 'HS256' }, function (err, token) {
            if (err) {
              console.log(err);
              return res.status(500).send("500: Internal server error");
            }
            return res.status(200).json({ message: "Login successful", authtoken: token });
          });

        }
        else {

          jwt.sign({ uid: id }, secretKey, { algorithm: 'HS256', expiresIn: '5m' }, function (err, token) {
            if (err) {
              console.log(err);
              return res.status(500).send("500: Internal server error");
            }

            const currentDate = new Date()
            const expiresIn = new Date(currentDate.getTime() + 5 * 60000).getTime();
            return res.status(200).json({ message: "Login successful", authtoken: token, expiresIn: expiresIn });
          });
        }
      }).catch(function (err) {
        console.log(err);

      });

    }
    else {
      return res.status(401).json({ error: "Invalid password" });
    }

  }).catch(function (err) {
    console.log('error: ', err);

  });


});

// Logout

app.post("/api/logout", verifyToken, (req, res) => {
  // If time permits, will add functionality to immediately expire auth token


  const { user } = req.user.uid;
  return res.status(200).json({ message: "Logout successful", "authtoken": "" });


});

// Delete account
app.delete("/api/delete", verifyToken, (req, res) => {
  const uid = req.user.uid;

  users.deleteAccount(uid).then(success => {
    if (success) {
      return res.status(200).json({ message: "Account deleted" });
    }
    else {
      return res.status(409).json({ message: "Cannot delete account/Account does not exist" });
    }

  }).catch(function (err) {
    console.log(err);
    return res.status(500).send("500: Internal server error");
  });

});

// Update email
app.patch("/api/update/email", verifyToken, (req, res) => {
  const { email } = req.body;
  const uid = req.user.uid;

  users.updateEmail(uid, email).then(success => {
    if (success) {
      return res.status(200).json({ message: "Successfully updated email" });
    }
    else {
      return res.status(400).json({ message: "Failed to update email" });
    }
  }).catch(function (err) {
    console.log(err);
    return res.status(500).send("500: Internal server error");
  });

});

// Update password
app.post("/api/update/password", verifyToken, (req, res) => {
  const { password } = req.body
  const uid = req.user.uid;

  users.updatePassword(uid, password).then(success => {
    if (success) {
      return res.status(200).json({ message: "Password updated successfully" });
    }
    else {
      return res.status(400).json({ message: "Failed to update password" });
    }
  }).catch(function (err) {
    console.log(err);
    return res.status(500).send("500: Internal server error");

  });

});

// Update username
app.patch("/api/update/username", verifyToken, (req, res) => {
  const { newUsername } = req.body;
  const userId = req.user.uid;

  users.updateUsername(userId, newUsername).then(success => {
    if (success) {

      return res.status(200).json({ message: "Username updated successfully" });

    }
    else {
      return res.status(400).json({ message: "Username already taken" });
    }
  }).catch(function (err) {
    console.log(err);
    return res.status(500).json({ message: "500: Internal server error" });

  });

});

// Add friend
app.post("/api/friends/add/:friendid", verifyToken, (req, res) => {

  const userId = req.user.uid;
  const friendId = req.params.friendid;

  users.addFriend(userId, friendId).then(success => {
    if (success) {
      return res.status(200).json({ message: `Added ${friendId} successfully` });
    }
    else {
      return res.status(400).json({ message: `Failed to add ${friendId}` });
    }
  }).catch(function (err) {
    console.log(err);
    return res.status(500).send("500: Internal server error");
  });

});

// Delete friend

app.delete("/api/friends/remove/:friendid", verifyToken, (req, res) => {

  const userId = req.user.uid;
  const friendId = req.params.friendid;

  users.removeFriend(userId, friendId).then(success => {
    if (success) {
      return res.status(200).send("Successfully removed friend");
    }
    else {
      return res.status(400).send("You are not friends with this user");
    }

  }).catch(function (err) {
    console.log(err);
    return res.status(500).send("500: Internal server error");
  });
});



// Verify token
// Token format
// Authorization: Bearer [JWT_TOKEN]
function verifyToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (typeof authHeader !== 'undefined') {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          //Forbidden
          return res.sendStatus(403);
        }
        // Ensures routes will not be accessed if account does not exist / deleted
        users.checkUserInDB(user.uid).then(success => {
          if (success) {
            req.user = user;
            next();

          }
          else {
            return res.sendStatus(403);
          }

        }).catch(function (err) {
          console.log(err);
        });

      });
    } else {
      res.sendStatus(401);
    }
};

app.listen(
  PORT,
  () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
