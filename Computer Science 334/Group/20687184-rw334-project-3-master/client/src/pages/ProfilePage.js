import React, { useState, useEffect } from 'react';
import withProfileLoading from "../components/WithComponentLoading"
import { Container } from '@material-ui/core';
import Profile from '../components/Profile';
import axios from "axios"

function ProfilePage() {
	const ProfileLoading = withProfileLoading(Profile);
	const [refreshProfile, setRefresh] = useState(false)

	const [pageState, setPageState] = useState({
		loading: true,
		profile: null,
	});

	useEffect(() => {
		setPageState({ loading: true });

		const token = localStorage.getItem("token")
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		const API_URL = `http://localhost:3001/api/profile`;

		axios.get(API_URL)
			.then(function (response) {
				setPageState({ loading: false, profile: response.data })
			})
			
		setRefresh(false)
	}, [setPageState, refreshProfile, setRefresh]);

	return (
		<div>
			<Container>
				<ProfileLoading isLoading={pageState.loading} profile={pageState.profile} setRefresh={setRefresh} />
			</Container>
		</div>
	)
}

export default ProfilePage;