import { gql, useQuery } from "@apollo/client";

const GET_SUBREDDIT = gql`
	query getSubredditQuery($topic: String = "next js") {
		getSubreddiByTopic(topic: $topic) {
			created_at
			id
			topic
		}
	}
`;
