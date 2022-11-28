import React from "react";
import Image from "next/image";
import reddit from "../public/assets/reddit.png";
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
type Props = {};

export const Header = (props: Props) => {
	return (
		<section className="flex items-center w-full">
			{/* Left side */}
			<div className="flex items-center p-2 px-3 lg:min-w-[300px]">
				<Image
					src={reddit}
					alt="reddit logo"
					className="h-10 w-20 object-cover cursor-pointer mr-5"
				/>
				<AiOutlineHome size={30} />
				<p className="hidden lg:flex lg:flex-grow mx-1">Home</p>
				<AiOutlineDown size={30} />
			</div>

			{/* Search componenet */}
			<div className="flex flex-grow flex-shrink rounded-sm items-center bg-gray-300 space-x-2 p-2">
				<BsSearch size={30} />
				<input
					type="text"
					placeholder="Search Reddit"
					className="bg-transparent flex-grow outline-none"
				/>
			</div>

			{/* Right side (Logos) */}
			<div className="flex items-center space-x-2 ">
				<HiOutlineSparkles size={20} className="nav-icons" />
				<AiOutlineGlobal size={20} className="nav-icons" />
				<AiOutlineVideoCamera size={20} className="nav-icons" />
				<hr className=" border-gray-200 border h-10 " />
				<BsChatDots size={20} className="nav-icons" />
				<AiOutlineBell size={20} className="nav-icons" />
				<HiSpeakerphone size={20} className="nav-icons" />
			</div>
		</section>
	);
};
