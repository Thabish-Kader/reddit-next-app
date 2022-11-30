import React, { useState } from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import { AiOutlineLink } from "react-icons/ai";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_POSTS_BY_ORDER, GET_SUBREDDIT } from "../graphQl/queries";
import { ADD_POST, CREAT_SUBREDDIT } from "../graphQl/mutations";
import { client } from "../apollo-client";
import toast from "react-hot-toast";
import { UserIcon } from "./UserIcon";

type Inputs = {
	postTitle: string;
	postBody: string;
	subReddit: string;
	image: string;
};

export const PostInput = () => {
	const [imageInput, setImageInput] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<Inputs>();
	const { data: session } = useSession();

	// Apollo
	const [addSubreddit] = useMutation(CREAT_SUBREDDIT);
	const [newPost] = useMutation(ADD_POST, {
		refetchQueries: [{ query: ALL_POSTS_BY_ORDER }, "getPostListByOrder"],
	});

	const onSubmit: SubmitHandler<Inputs> = async (formData) => {
		const notification = toast.loading("Createing a Post....");

		try {
			const {
				data: { getSubreddiByTopic },
			} = await client.query({
				query: GET_SUBREDDIT,
				variables: {
					topic: formData.subReddit,
				},
			});
			// check wether subreddit exists
			if (getSubreddiByTopic.length === 0) {
				// if does not exits create subreddit
				console.log("Create new Subreddit -> ", formData.subReddit);
				const {
					data: { insertSubreddit },
				} = await addSubreddit({
					variables: {
						topic: formData.subReddit,
					},
				});
				console.log("Create new post for", formData.subReddit);
				console.log(insertSubreddit);
				// create new post for the new subreddit
				await newPost({
					variables: {
						body: formData.postBody,
						image: formData.image || "",
						subreddit_id: insertSubreddit.id,
						title: formData.postTitle,
						username: session?.user?.name,
					},
				});
				console.log(`Post create for -> ${formData.subReddit}`);
			} else {
				// if exists take the subreddit  id and post
				console.log(
					`Subreddit exists -> add new Post ${formData.postTitle}`
				);
				await newPost({
					variables: {
						body: formData.postBody,
						image: formData.image || "",
						subreddit_id: getSubreddiByTopic[0].id,
						title: formData.postTitle,
						username: session?.user?.name,
					},
				});
				console.log(`new post created for existing subreddit`);
			}

			// reset input fields
			setValue("image", "");
			setValue("postBody", "");
			setValue("postTitle", "");
			setValue("subReddit", "");
			toast.success("Post Created", {
				id: notification,
			});
		} catch (error) {
			toast.error("Something went wrong");
			console.log(`Error : ${error}`);
		}
	};

	// todo add functionality so that only authenticated users can post
	return (
		<section className="sticky top-12 z-20 bg-white rounded-md mb-4 shadow-sm border border-gray-200">
			<form
				className="flex flex-col space-y-3"
				onSubmit={handleSubmit(onSubmit)}
			>
				{/* User Icon and Post title Input */}
				<div className="flex items-center">
					{/* <div className="relative h-14 w-14 lg:h-16 lg:w-16 ">
						<Image
							src={`https://avatars.dicebear.com/api/open-peeps/${session?.user?.name}.svg`}
							alt="avatar"
							fill
							className="object-cover rounded-full"
						/>
					</div> */}
					<UserIcon name={session?.user?.name as string} />

					<input
						{...register("postTitle", { required: true })}
						disabled={!session}
						type="text"
						className="mx-3 flex-1 p-2 outline-none rounded-md bg-gray-100"
						placeholder="Enter Post Title"
					/>

					<div className="flex items-center space-x-2">
						<BiPhotoAlbum
							onClick={() => setImageInput(!imageInput)}
							size={25}
							className={
								imageInput
									? "text-blue-500 cursor-pointer"
									: "cursor-pointer"
							}
						/>
						<AiOutlineLink size={25} />
					</div>
				</div>

				{!!watch("postTitle") && (
					<div className="flex flex-col space-y-3 ">
						{/* Post Body input */}
						<div className="flex items-center">
							<p className="min-w-[100px] px-3">Body</p>
							<input
								{...register("postBody", { required: true })}
								type="text"
								placeholder="Enter Post Body"
								className="bg-blue-50 flex-grow p-2 rounded-md outline-none mr-10"
							/>
						</div>

						{/* Post Subrredit input */}
						<div className="flex items-center">
							<p className="min-w-[90px] px-3">SubReddit</p>
							<input
								{...register("subReddit", { required: true })}
								type="text"
								placeholder="Enter Subreddit"
								className="bg-blue-50 flex-grow p-2 rounded-md outline-none mr-10"
							/>
						</div>

						{imageInput && (
							<>
								{/* Post Image input */}
								<div className="flex items-center">
									<p className="min-w-[100px] px-3">
										Image Url
									</p>
									<input
										{...register("image")}
										type="text"
										placeholder="Enter Url"
										className="bg-blue-50 flex-grow p-2 rounded-md outline-none mr-10"
									/>
								</div>
							</>
						)}

						<button className="bg-red-400 p-2 rounded-md font-bold ml-24 mr-10 text-white">
							Post
						</button>
						<div>
							{errors.subReddit?.type === "required" && (
								<p className="text-2xl text-center   text-red-500 font-bold">
									Enter SubReddit !!!!
								</p>
							)}

							{errors.postBody?.type === "required" && (
								<p className="text-2xl text-center   text-red-500 font-bold">
									Enter Body !!!!
								</p>
							)}
						</div>
					</div>
				)}
			</form>
		</section>
	);
};
