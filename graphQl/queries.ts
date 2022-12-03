import { gql } from "@apollo/client";

export const GET_SUBREDDIT = gql`
	query getSubredditQuery($topic: String!) {
		getSubreddiByTopic(topic: $topic) {
			created_at
			id
			topic
		}
	}
`;

export const GET_LATEST_SUBREDDIT = gql`
	query getLatestSubreddit {
		getLatestSubreddit {
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

export const ALL_POSTS_BY_ORDER = gql`
	query getPostQuery {
		getPostListByOrder {
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

export const ALL_POSTS_BY_SUBREDDIT_TOPIC = gql`
	query getPostQuery($topic: String!) {
		getPostBySubredditTopic(topic: $topic) {
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

export const GET_POST_BY_ID = gql`
	query getPostQuery($id: ID!) {
		getPostById(id: $id) {
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

export const GET_VOTE_BY_ID = gql`
	query getVoteQuery($post_id: ID!) {
		getVoteListById(post_id: $post_id) {
			id
			post_id
			username
			upvote
		}
	}
`;
