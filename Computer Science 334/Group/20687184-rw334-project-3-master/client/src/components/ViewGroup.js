import React from 'react'
import {useParams} from 'react-router'
import axios from 'axios'
import {useState} from 'react'
import {Button} from '@material-ui/core'

   
function ViewGroup() {
    // Gets gid and groupname from the url which is generated when the View Group button is clicked on the Search Groups page
    const {gid,groupname} = useParams()
    const [member, setMember] = useState(false)
    const [initialMC,setInitialMC] = useState(true)
    
    const current_user = 7 // NEEDS TO BE CHANGED TO THE UID OF THE CURRENT USER
    
    // Check to determine whether user is a member of the group, used to determine whether check for admin is needed
    if (initialMC) {
        handleCheck()
        setInitialMC(false)
    }

    return (
        <div><h1>Group: {groupname}</h1>
        <button onClick={handleClick}> {(member) ? 'Leave group' : 'Join group'}</button> 
        {(checkAdmin()) ? <Button onClick={handleDeleteGroup}>Delete group</Button> : null}
        </div>
    )

    function handleClick() {
        if (member) {
            handleLeave()
        } else {
            handleJoin()
        }
    }

    // Handles joining the group
    function handleJoin() {
        axios.post('http://localhost:3001/api/groups/join/' + groupname)
        .then((response) =>
            {
                alert(response.data)
                if (response.status === 200) {
                    setMember(true)
                }    
            }
        )
    }


    // Handles leaving the group
    function handleLeave() {
        axios.post('http://localhost:3001/api/groups/leave/' + groupname)
        .then((response) => 
            {   
                alert(response.data)
                if (response.status === 200) {
                    setMember(false)
                } 
            }
        )
    }

    // Handles the initial check to see if the user is a member of the group
    function handleCheck() {
        var i;
        axios.get('http://localhost:3001/api/groups/' + gid +'/members')
        .then((response) => 
            {
                for (i = 0; i < response.data.length; i++) {
                    if (response.data[i].uid === current_user) {
                        setMember(true)
                    }     
                }
            }    
        )
    }

    function handleDeleteGroup() {
        axios.delete('http://localhost:3001/api/groups/' + gid)
        .then((response) => 
            {
                if (response.status === 200) {
                    alert('Successfully deleted ' + {groupname})
                } else {
                    alert('Deleting group failed')
                }
            }
        )
    }


    // Checks whether the user is the admin of the group and displays a 'delete group' button if the user is an admin
    function checkAdmin() {
        if (member) {
            axios.get('http://localhost:3001/api/groups/' + gid +'/isAdmin')
            .then((response) => 
                {
                    if (response.data.isAdmin) {
                        return true
                    } else {
                        return false
                    }
                } 
            )
        }
    }
}

export default ViewGroup;
