import React from "react";
import Image from "next/image";
import reddit from "../public/assets/reddit.png";
import redditOutline from "../public/assets/reddit-outline.png";
import {
	AiFillHome,
	AiOutlineDown,
	AiOutlineSearch,
	AiOutlineBell,
	AiOutlinePlus,
	AiOutlineVideoCamera,
	AiOutlineMenu,
	AiOutlineGlobal,
	AiOutlineHome,
} from "react-icons/ai";
import { BsBell, BsChatDots, BsGlobe, BsSearch } from "react-icons/bs";
import { HiOutlineSparkles, HiSpeakerphone } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
type Props = {};

export const Header = (props: Props) => {
	const { data: session } = useSession();

	return (
		<section className="flex items-center w-full bg-white p-1">
			{/* Left side */}
			<div className="flex items-center p-2 px-3 lg:min-w-[300px]">
				<Link href="/">
					<Image
						src={reddit}
						alt="reddit logo"
						className="h-10 w-20 object-cover cursor-pointer mr-5"
					/>
				</Link>
				<Link className="flex space-x-2" href="/">
					<div className="flex items-center">
						<AiOutlineHome size={30} />
						<p className="hidden lg:flex lg:flex-grow mx-1">Home</p>
					</div>
					<AiOutlineDown size={30} />
				</Link>
			</div>

			{/* Search componenet */}
			<div className="flex flex-grow flex-shrink rounded-lg items-center bg-gray-300 space-x-2 p-2">
				<BsSearch size={30} />
				<input
					type="text"
					placeholder="Search Reddit"
					className="bg-transparent flex-grow outline-none"
				/>
			</div>

			{/* Right side (Logos) */}
			<div className="md:flex items-center space-x-2 px-3  p-1 hidden">
				<HiOutlineSparkles className="nav-icons" />
				<AiOutlineGlobal className="nav-icons" />
				<AiOutlineVideoCamera className="nav-icons" />
				<hr className=" border-gray-200 border h-10 " />
				<BsChatDots className="nav-icons" />
				<AiOutlineBell className="nav-icons" />
				<HiSpeakerphone className="nav-icons" />
			</div>

			{/* sign in / sign out */}
			{session ? (
				<div
					onClick={() => signOut()}
					className="flex items-center space-x-2 group rounded-sm hover:bg-gray-300 p-2 cursor-pointer "
				>
					<Image
						src={redditOutline}
						alt="/reddit "
						className="h-6 w-6 "
					/>
					<div className="flex flex-col items-center">
						<p>{session.user?.name}</p>
						<p className="group-hover:text-red-500">Sign Out</p>
					</div>
				</div>
			) : (
				<div
					onClick={() => signIn()}
					className="flex items-center space-x-2 group rounded-sm hover:bg-gray-300 p-2 cursor-pointer "
				>
					<Image
						src={redditOutline}
						alt="/reddit "
						className="h-6 w-6 "
					/>
					<p className="group-hover:text-red-500 hidden lg:inline">
						Sign In
					</p>
				</div>
			)}
		</section>
	);
};
