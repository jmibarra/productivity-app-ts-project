import React from "react";
import { Container, Content, Header } from "./styles/UserProfileStyles";

const UserProfileComponent = () => {
	return (
		<Container>
			<Header>
				<h1>Profile</h1>
			</Header>
			<Content>
				<div>UserProfileSection</div>
			</Content>
		</Container>
	);
};

export default UserProfileComponent;
