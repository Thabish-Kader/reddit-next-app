import { useQuery } from "@apollo/client";
import React from "react";
import {
	ALL_POSTS_BY_ORDER,
	ALL_POSTS_BY_SUBREDDIT_TOPIC,
} from "../graphQl/queries";
import { Post } from "./Post";

type Props = {
	subreddit?: string;
};

export const Feed = ({ subreddit }: Props) => {
	const { data } = !subreddit
		? useQuery(ALL_POSTS_BY_ORDER)
		: useQuery(ALL_POSTS_BY_SUBREDDIT_TOPIC, {
				variables: {
					topic: subreddit,
				},
		  });
	const posts: Post[] = !subreddit
		? data?.getPostListByOrder
		: data?.getPostBySubredditTopic;

	return (
		<div className="space-y-4">
			{posts?.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
};
