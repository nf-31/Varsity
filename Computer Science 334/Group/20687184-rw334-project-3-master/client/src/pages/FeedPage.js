import React, { useState, useEffect } from 'react';
import withPostsLoading from "../components/WithComponentLoading"
import GlobalFeed from "../components/GlobalFeed"
import SortFeed from "../components/SortFeed"
import { Container, Typography } from '@material-ui/core';
import axios from 'axios';

function FeedPage() {
	const FeedLoading = withPostsLoading(GlobalFeed);

	const [sorting, changeSorting] = React.useState('time');

	const [pageState, setPageState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
		setPageState({ loading: true });

		const token = localStorage.getItem("token")
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		const API_URL = `http://localhost:3001/api/posts/all/${sorting}`;

		// change to axios later
		axios.get(API_URL)
			.then(function (response) {
				setPageState({ loading: false, posts: response.data })
			})

	}, [setPageState, sorting]);

	return (
		<Container>
			<Typography variant="h4">Global Feed:</Typography>
			<SortFeed sorting={sorting} changeSorting={changeSorting} />
			<FeedLoading isLoading={pageState.loading} posts={pageState.posts} />
		</Container>
	)
}

export default FeedPage;