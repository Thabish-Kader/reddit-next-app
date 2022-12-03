import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { GET_LATEST_SUBREDDIT } from "../graphQl/queries";
import { UserIcon } from "./UserIcon";

type Props = {};

export const TopSubreddit = (props: Props) => {
	const { data } = useQuery(GET_LATEST_SUBREDDIT);
	const subreddits: Subreddit[] = data?.getLatestSubreddit;
	const router = useRouter();
	return (
		<div className="bg-white space-y-3 border-b border-t border-black rounded-lg">
			{subreddits?.map((subreddit, index) => (
				<div
					key={subreddit.id}
					className="flex items-center p-3 last:border-b-0  justify-between space-x-4 border-b border-black "
				>
					<p>{index + 1}.</p>
					<UserIcon name={subreddit.created_at} />
					<p className="flex-1">{subreddit.topic}</p>
					<button
						onClick={() =>
							router.push(`/subreddit/${subreddit.topic}`)
						}
						className="px-2 bg-orange-500 rounded-full text-white "
					>
						View
					</button>
				</div>
			))}
		</div>
	);
};
