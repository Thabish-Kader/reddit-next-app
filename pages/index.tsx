import Head from "next/head";
import Image from "next/image";
import { Feed } from "../components/Feed";
import { Header } from "../components/Header";
import { PostInput } from "../components/PostInput";
import { TopSubreddit } from "../components/TopSubreddit";

export default function Home() {
	return (
		<div className="max-w-screen-xl mx-auto my-7 ">
			<Head>
				<title>Reddit Demo</title>
			</Head>

			<PostInput />

			{/* Feed Component */}
			<div className="flex">
				<Feed />
				<div className="sticky top-36 mx-5  hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
					<p className="text-md mb-1 p-4 pb-3 font-bold">
						Top Communities
					</p>

					<TopSubreddit />
				</div>
			</div>
		</div>
	);
}
