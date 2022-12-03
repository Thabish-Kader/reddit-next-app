import React, { useEffect, useState } from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import TimeAgo from "react-timeago";
import { BsChatDots, BsThreeDots, BsSave } from "react-icons/bs";
import { AiOutlineGift, AiOutlineShareAlt } from "react-icons/ai";
import { UserIcon } from "./UserIcon";
import { Pinwheel } from "@uiball/loaders";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_UPVOTE } from "../graphQl/mutations";
import { GET_VOTE_BY_ID } from "../graphQl/queries";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

type Props = {
	post: Post;
};

export const Post = ({ post }: Props) => {
	const router = useRouter();
	const { data: session } = useSession();
	const [voted, setVoted] = useState<boolean>();

	// vote query and mutation
	const { data } = useQuery(GET_VOTE_BY_ID, {
		variables: {
			post_id: post?.id,
		},
	});

	const [addVote] = useMutation(ADD_UPVOTE, {
		refetchQueries: [GET_VOTE_BY_ID, "getVoteListById"],
	});

	const upVote = async (isUpVote: boolean) => {
		if (!session) {
			toast("You need to sign in to vote");
			return;
		}

		if (voted && isUpVote) return;
		if (voted === false && !isUpVote) return;

		await addVote({
			variables: {
				post_id: post.id,
				username: session.user?.name,
				upvote: isUpVote,
			},
		});
	};

	//update vote whenever the data changes
	useEffect(() => {
		const votes: Vote[] = data?.getVoteListById;

		const vote = votes?.find(
			(vote) => vote.username == session?.user?.name
		)?.upvote;

		setVoted(vote);
	}, [data]);

	const displayVotes = (data: any) => {
		const votes: Vote[] = data?.getVoteListById;

		const displayNumber = votes?.reduce(
			(total, vote) => (vote?.upvote ? (total += 1) : (total -= 1)),
			0
		);

		if (votes?.length === 0) return 0;

		if (displayNumber === 0) {
			return votes[0]?.upvote ? 1 : -1;
		}

		return displayNumber;
	};

	if (!post) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				{" "}
				<Pinwheel size={35} lineWeight={3.5} speed={1} color="black" />
				<p>One moment.....</p>
			</div>
		);
	}
	console.log(voted);
	return (
		<div
			onClick={() => router.push(`/post/${post.id}`)}
			className="flex bg-white hover:border cursor-pointer border-black"
		>
			{/* voteing side */}
			<div className="flex flex-col items-center p-5 space-y-2  bg-gray-100">
				<FiArrowUp
					onClick={() => upVote(true)}
					className={`vote-icons ${voted && "text-green-500"}`}
				/>
				<p className="font-bold">{displayVotes(data)}</p>
				<FiArrowDown
					onClick={() => upVote(false)}
					className={`vote-icons ${
						voted === false && "text-red-500"
					}`}
				/>
			</div>

			<div className="flex flex-col p-2 space-y-2">
				{/* user info */}
				<div className="flex items-center space-x-1 m-2">
					<UserIcon name={post?.username} />
					<p className="font-bold tracking-tight text-sm">
						<Link href={`/subreddit/${post?.subreddit[0].topic}`}>
							<span className="hover:text-blue-500 cursor-pointer">
								r/{post?.subreddit[0].topic}
							</span>
						</Link>
					</p>
					<p className="text-xs text-gray-500">
						Posted by {post?.username}
					</p>
					<TimeAgo
						className="text-xs text-gray-500"
						date={post?.created_at}
					/>
				</div>
				{/* post info */}
				<div className="flex flex-col m-2">
					<p className="text-xl font-bold">{post?.title}</p>
					<p>{post?.body}</p>
				</div>

				{/* image */}
				{post?.image && (
					<picture>
						<img src={post?.image} alt="" className="w-full" />
					</picture>
				)}
				{/* footer */}
				<div className="flex space-x-4 items-center m-10">
					<div className="post-icons">
						<BsChatDots size={20} />
						<p>{post?.comment.length} Comments</p>
					</div>

					<div className="post-icons">
						<AiOutlineGift size={20} />
						<p className="hidden sm:inline"> Award</p>
					</div>

					<div className="post-icons">
						<AiOutlineShareAlt size={20} />
						<p className="hidden sm:inline"> Share</p>
					</div>

					<div className="post-icons">
						<BsSave size={20} />
						<p className="hidden sm:inline"> Save</p>
					</div>

					<div className="post-icons">
						<BsThreeDots size={20} />
					</div>
				</div>
			</div>
		</div>
	);
};
