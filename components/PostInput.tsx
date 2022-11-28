import React from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import { AiOutlineLink } from "react-icons/ai";
import Image from "next/image";
import { useSession } from "next-auth/react";
type Props = {};

export const PostInput = (props: Props) => {
	const { data: session } = useSession();
	return (
		<section className="bg-white">
			<form>
				<div className="flex items-center">
					<div className="relative h-14 w-14 lg:h-16 lg:w-16 ">
						<Image
							src={`https://avatars.dicebear.com/api/open-peeps/${session?.user?.name}.svg`}
							alt="avatar"
							fill
							className="object-cover rounded-full"
						/>
					</div>
					{/* input  */}
					<input
						type="text"
						className="flex-1 p-2 outline-none rounded-md bg-gray-100"
						placeholder="Enter Post Title"
					/>
					{/* image btn link btn */}
					<div className="flex items-center space-x-2">
						<BiPhotoAlbum size={25} />
						<AiOutlineLink size={25} />
					</div>
				</div>
			</form>
		</section>
	);
};
