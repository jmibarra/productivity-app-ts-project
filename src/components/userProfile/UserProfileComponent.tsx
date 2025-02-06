import React from "react";
import {
	Container,
	Content,
	Header,
	AvatarSection,
	Section,
	DangerSection,
} from "./styles/UserProfileStyles";
import { Avatar, Button, Input } from "@mui/material";

const UserProfileComponent = () => {
	return (
		<Container>
			<Header fullWidth>
				<h1>Profile</h1>
			</Header>
			<Content>
				<AvatarSection>
					<Avatar
						alt="User Avatar"
						src="https://media.licdn.com/dms/image/v2/C4E03AQHc3ZyN7_o_1Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1616351350827?e=1741219200&v=beta&t=lCCs-byJtbdnw343Svv9cl1kg32OinXbS65_uJtJPc0"
						sx={{ width: 100, height: 100 }}
					/>
				</AvatarSection>

				<Section>
					<h2>Edit Name</h2>
					<Input placeholder="Full Name" fullWidth />
					<Button>Save</Button>
				</Section>

				<Section>
					<h2>Change Password</h2>
					<Button variant="contained" color="warning">
						Reset Password
					</Button>
				</Section>

				<DangerSection>
					<h2>Danger Zone</h2>
					<Button variant="contained" color="error">
						Delete Account
					</Button>
				</DangerSection>
			</Content>
		</Container>
	);
};

export default UserProfileComponent;
