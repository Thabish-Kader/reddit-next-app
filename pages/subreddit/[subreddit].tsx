import { useRouter } from "next/router";
import React from "react";
import { Feed } from "../../components/Feed";
import { PostInput } from "../../components/PostInput";
import { UserIcon } from "../../components/UserIcon";

type Props = {};

export default function Subreddits(props: Props) {
	const { query } = useRouter();
	const subreddit = query.subreddit;

	return (
		<div className=" ">
			{/* banner */}
			<div className="bg-red-500 flex flex-col">
				<div className="h-2"></div>
				<div className="mt-16 bg-white">
					<div className="mx-auto max-w-5xl flex">
						<div className="-mt-10">
							<UserIcon name="subreddit name" />
						</div>
						{/* subredddit info */}
						<div className="flex flex-col justify-center p-2">
							<p className="text-2xl font-bold ">
								Welcome to the r/{subreddit} subreddit
							</p>
							<p className="text-gray-500 text-sm">r/subreddit</p>
						</div>
					</div>
				</div>
			</div>
			{/* post and subreddit component */}
			<div className="mx-auto max-w-5xl mt-3">
				<PostInput subreddit={subreddit as string} />
				<Feed subreddit={subreddit as string} />
			</div>
		</div>
	);
}
