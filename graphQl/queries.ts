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
