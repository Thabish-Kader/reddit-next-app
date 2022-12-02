import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { Post } from "../../components/Post";
import { GET_POST_BY_ID } from "../../graphQl/queries";
import { useForm, SubmitHandler } from "react-hook-form";
import { ADD_COMMENT } from "../../graphQl/mutations";
import { toast } from "react-hot-toast";
import { UserIcon } from "../../components/UserIcon";
import ReactTimeago from "react-timeago";

type FormInput = {
	comment: string;
};

const PostPage = () => {
	const {
		query: { Id },
	} = useRouter();

	const { data } = useQuery(GET_POST_BY_ID, {
		variables: {
			id: Id,
		},
	});
	const post: Post = data?.getPostById;
	const { data: session } = useSession();
	const [addComment] = useMutation(ADD_COMMENT, {
		refetchQueries: [GET_POST_BY_ID, "getPostById"],
	});

	// fetching comment

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormInput>();
	const onSubmit: SubmitHandler<FormInput> = async (formData) => {
		const notification = toast.loading("Posting Comment");
		try {
			await addComment({
				variables: {
					post_id: post.id,
					username: session?.user?.name,
					text: formData.comment,
				},
			});
			setValue("comment", "");
			toast.success("Comment Posted", {
				id: notification,
			});
			console.log(`Comment Posted ${formData.comment}`);
		} catch (error) {
			console.log("Error submitting comment " + error);
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="mt-3 mx-auto max-w-5xl ">
			<Post post={post} />

			{/* comment section */}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex px-20 flex-col bg-white space-y-2 pb-3 "
			>
				<p className="text-lg font-semibold">
					Comment as{" "}
					<span className="text-blue-500">{session?.user?.name}</span>
				</p>
				<textarea
					{...register("comment")}
					className="border border-black rounded-md p-2 outline-none"
					placeholder="Comment here..."
				/>

				<button
					disabled={!session}
					type="submit"
					className={`bg-orange-500 font-semibold p-2 rounded-lg ${
						!session && "bg-orange-200"
					}`}
				>
					{session ? "Comment" : "Sign in to Comment"}
				</button>
			</form>

			{post?.comment?.map((singleComment) => (
				<div
					className="bg-white relative flex items-center pl-20 pb-5"
					key={singleComment.id}
				>
					<hr className="h-5 absolute border-black top-14 left-[110px] border" />
					<UserIcon name={singleComment.username} />
					<div className="flex flex-col justify-center">
						<div className="flex items-center space-x-2">
							<p className="font-semibold">
								{singleComment.username}
							</p>
							<p className="text-gray-500 text-sm">
								<ReactTimeago date={singleComment.created_at} />
							</p>
						</div>
						<p>{singleComment.text}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default PostPage;
