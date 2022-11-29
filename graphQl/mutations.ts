import { gql, useMutation } from "@apollo/client";

const ADD_POST = gql`
	mutation createPost(body: $body, image: $image, subreddit_id: $subreddit_id, title: $title, username: $username) {
		insertPost(
			body: $body
			image: $image
			subreddit_id: $subreddit_id
			title: $title
			username: $username
		) {
			id
			created_at
			body
			image
			subreddit_id
			username
			title
		}
	}
`;
