import React from 'react'
import { useParams } from 'react-router'
import { Container, Avatar, CardActions, Button, Card, CardHeader } from "@material-ui/core"
import axios from 'axios'
import { useState, useEffect } from 'react'

function ViewUser() {
  // Gets uid from the url which is generated when the View Profile button is clicked on on the Search Users page
  const { uid } = useParams()
  const [friends, setFriends] = useState(null)

  function handleClick() {
    if (friends) {
      handleRemove()
    } else {
      handleAdd()
    }
  }

  function handleAdd() {
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.post(`http://localhost:3001/api/friends/add/${uid}`)
      .then(function () {
        setFriends(true)
      }
      )
  }

  function handleRemove() {
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.delete(`http://localhost:3001/api/friends/remove/${uid}`)
      .then(function () {
        setFriends(false)
      }
      )
  }

  useEffect(() => {
    setFriends({})
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get(`http://localhost:3001/api/users/${uid}`)
      .then(function (response) {
        setFriends(...friends, response.data)
      })

    axios.get(`http://localhost:3001/api/friends/${uid}`) // change
      .then(function (response) {
        setFriends(response.data.isfriend)
      })
  }, [setFriends, uid, friends])

  return (
    <Container>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              src={friends.user ? friends.user.avatar_path : null}
              alt={friends.user ? friends.user.username : null}
            />
          }
          title={friends.user ? friends.user.username : "not loaded"}
          titleTypographyProps={{ variant: "h5" }}
        />
        <CardActions>
          <Button color="primary" onClick={handleRemove}>
           Remove friend
          </Button>
        </CardActions>

      </Card>
    </Container>
  )



}

export default ViewUser;
