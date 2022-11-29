import { gql, useMutation } from "@apollo/client";

export const ADD_POST = gql`
	mutation createPost(
		$body: String!
		$image: String!
		$subreddit_id: ID!
		$title: String!
		$username: String!
	) {
		createPost(
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

export const CREAT_SUBREDDIT = gql`
	mutation createSubreddit($topic: String!) {
		insertSubreddit(topic: $topic) {
			created_at
			id
			topic
		}
	}
`;
