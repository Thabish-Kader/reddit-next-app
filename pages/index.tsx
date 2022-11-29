import Head from "next/head";
import Image from "next/image";
import { Header } from "../components/Header";
import { PostInput } from "../components/PostInput";

export default function Home() {
	return (
		<div className="max-w-screen-lg mx-auto my-7 ">
			<Head>
				<title>Reddit Demo</title>
			</Head>

			<PostInput />
		</div>
	);
}
