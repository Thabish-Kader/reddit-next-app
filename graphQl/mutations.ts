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

export const ADD_COMMENT = gql`
	mutation createComment($username: String!, $post_id: ID!, $text: String!) {
		insertComment(username: $username, post_id: $post_id, text: $text) {
			post_id
			text
			username
		}
	}
`;
