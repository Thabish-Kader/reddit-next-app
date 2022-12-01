import React from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import TimeAgo from "react-timeago";
import { BsChatDots, BsThreeDots, BsSave } from "react-icons/bs";
import { AiOutlineGift, AiOutlineShareAlt } from "react-icons/ai";
import { UserIcon } from "./UserIcon";
import Image from "next/image";

import Link from "next/link";

type Props = {
	post: Post;
};

export const Post = ({ post }: Props) => {
	return (
		<div className="flex bg-white">
			{/* voteing side */}
			<div className="flex flex-col items-center p-5 space-y-2  bg-gray-100">
				<FiArrowUp className="vote-icons" />
				<p className="font-bold">0</p>
				<FiArrowDown className="vote-icons" />
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
						date={post.created_at}
					/>
				</div>
				{/* post info */}
				<div className="flex flex-col m-2">
					<p className="text-xl font-bold">{post?.title}</p>
					<p>{post.body}</p>
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
						<p>{post.comment.length} Comments</p>
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
