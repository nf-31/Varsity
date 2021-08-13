import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import withGroupLoading from "../components/WithComponentLoading"
import Group from "../components/Group"
import axios from "axios"
import CreatePost from "../components/CreatePost"
import { Container } from "@material-ui/core"

function GroupPage() {
	const GroupLoading = withGroupLoading(Group);
	const [refreshPosts, setRefresh] = useState(false)
	const [pageState, setPageState] = useState({
		loading: false,
		group: null,
	});

	const { gid } = useParams();

	function createPost(post) {
		const API_CREATE_POST = `http://localhost:3001/api/groups/${gid}/posts`;
		const token = localStorage.getItem("token")
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		axios.post(API_CREATE_POST, post).then(function (response) {
			console.log(response);
			setRefresh(true)
		})
	}

	useEffect(() => {
		setPageState({ loading: true });
		setRefresh(true)

		const API_URL = `http://localhost:3001/api/groups/${gid}/posts`;

		const token = localStorage.getItem("token")
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		axios.get(API_URL)
			.then(function (response) {
				setPageState({ loading: false, group: { posts: response.data } })
				setRefresh(false)
			}).catch(function (error) {
				setPageState({ loading: false })
				console.error(error)
			})

		setRefresh(false)

	}, [setPageState, setRefresh, refreshPosts, gid]);

	return (
		<Container>
			<GroupLoading isLoading={pageState.loading} group={pageState.group} />
			<CreatePost setRefresh={setRefresh} createPost={createPost} />
		</Container>
	)
}
export default GroupPage;