import React, { useState, useEffect } from 'react';
import { Container } from "@material-ui/core"
import withGroupsLoading from "../components/WithComponentLoading"
import GroupList from "../components/GroupList"
import axios from "axios"
import CreateGroup from "../pages/CreateGroup"

function GroupsPage() {
	const GroupListLoading = withGroupsLoading(GroupList);
	const [loading, setLoading] = useState(false)
	const [groups, setGroups] = useState(null)
	const [newGroup, setNewGroup] = useState(false)

	useEffect(() => {
		setLoading({ loading: true });
		setNewGroup(true)

		const token = localStorage.getItem("token")
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		const API_URL = `http://localhost:3001/api/groups`;

		axios.get(API_URL)
			.then(function (response) {
				setLoading(false)
				setGroups(response.data)
			})

		setNewGroup(false)
	}, [setLoading, setGroups, setNewGroup, newGroup]);

	return (
		<Container>
			<CreateGroup isLoading={loading} setNewGroup={setNewGroup} />
			<GroupListLoading isLoading={loading} groups={groups} />
		</Container>
		
	)
}

export default GroupsPage;