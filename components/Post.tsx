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
	const totalUpvote = 0;
	// vote query and mutation
	const { data } = useQuery(GET_VOTE_BY_ID, {
		variables: {
			post_id: post?.id,
		},
	});
	const votes: Vote[] = data?.getVoteListById;

	const [addVote] = useMutation(ADD_UPVOTE);

	if (!post)
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				{" "}
				<Pinwheel size={35} lineWeight={3.5} speed={1} color="black" />
				<p>One moment.....</p>
			</div>
		);

	// upvote logic
	const vote = async (isUpVote: boolean) => {
		if (!session) {
			toast("You need to sign in to vote");
		}

		// check wether the user has voted
		if (voted && isUpVote) return;
		if (voted === false && !isUpVote) return;

		await addVote({
			variables: {
				username: session?.user?.name,
				post_id: post?.id,
				upvote: isUpVote,
			},
		});
		console.log(`${session?.user?.name} sucessfuly voted`);

		// add / subtract the votes and give the sum (use reducer)
		const totalUpvote = votes.reduce(
			(total, votes) => (votes.upvote ? (total += 1) : (total -= 1)),
			0
		);
		console.log(`Total upvote is ${totalUpvote}`);
	};

	useEffect(() => {
		const vote = votes?.find(
			(vote) => vote?.username == session?.user?.name
		)?.upvote;

		setVoted(vote);
	}, [data]);

	const displayVotes = (data : any) {
		const displayNumber = votes?.reduce((total, vote) => vote.upvote ? (total +=1): (total -=1), 0)
	}

	return (
		<div
			onClick={() => router.push(`/post/${post.id}`)}
			className="flex bg-white hover:border cursor-pointer border-black"
		>
			{/* voteing side */}
			<div className="flex flex-col items-center p-5 space-y-2  bg-gray-100">
				<FiArrowUp onClick={() => vote(true)} className="vote-icons" />
				<p className="font-bold">{votes.length}</p>
				<FiArrowDown
					onClick={() => vote(false)}
					className="vote-icons"
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
					<div className="relative min-w-[900px] h-[500px]">
						<Image
							src={post?.image}
							alt=""
							fill
							className="object-contain"
						/>
					</div>
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
