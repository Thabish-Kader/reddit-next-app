import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Props = {
	name: string;
};

export const UserIcon = ({ name }: Props) => {
	return (
		<div className="relative h-14 w-14 lg:h-16 lg:w-16 ">
			<Image
				src={`https://avatars.dicebear.com/api/open-peeps/${name}.svg`}
				alt="avatar"
				fill
				className="object-cover rounded-full"
			/>
		</div>
	);
};
