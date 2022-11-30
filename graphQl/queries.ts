import { gql, useQuery } from "@apollo/client";

export const GET_SUBREDDIT = gql`
	query getSubredditQuery($topic: String!) {
		getSubreddiByTopic(topic: $topic) {
			created_at
			id
			topic
		}
	}
`;

export const ALL_POSTS = gql`
	query getPostQuery {
		getPostList {
			body
			created_at
			id
			image
			subreddit_id
			title
			username
			subreddit {
				created_at
				id
				topic
			}
			comment {
				created_at
				id
				post_id
				text
				username
			}
			vote {
				created_at
				id
				upvote
				post_id
				username
			}
		}
	}
`;
