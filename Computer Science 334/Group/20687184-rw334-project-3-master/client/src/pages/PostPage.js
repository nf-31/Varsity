import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import withPostLoading from "../components/WithComponentLoading"
import Post from "../components/Post"
import axios from "axios"

function PostPage() {
	const PostLoading = withPostLoading(Post);
	const [refreshPost, setRefresh] = useState(false)
	const [pageState, setPageState] = useState({
		loading: false,
		post: null,
	});

	const { pid } = useParams();

	useEffect(() => {
		setPageState({ loading: true });

		const API_URL = `http://localhost:3001/api/posts/${pid}`;

		const token = localStorage.getItem("token")
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		axios.get(API_URL)
			.then(function (response) {
				setPageState({ loading: false, post: response.data[0] })
			})

		setRefresh(false)

	}, [setPageState, pid, setRefresh, refreshPost]);

	return (
		<PostLoading isLoading={pageState.loading} post={pageState.post} setRefresh={setRefresh} />
	)
}

export default PostPage;