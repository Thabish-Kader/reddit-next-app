import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_POSTS_BY_ORDER } from "../graphQl/queries";
import { Post } from "./Post";

type Props = {};

export const Feed = (props: Props) => {
	const { data } = useQuery(ALL_POSTS_BY_ORDER);
	const posts: Post[] = data?.getPostListByOrder;
	console.log(data);
	return (
		<div className="space-y-4">
			{posts?.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
};
