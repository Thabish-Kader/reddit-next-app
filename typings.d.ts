type Post = {
	body: string;
	created_at: string;
	id: number;
	image: string;
	subreddit_id: number;
	title: string;
	username: string;
	subreddit: Subreddit[];
	comment: Comments[];
	vote: Vote[];
};

type Comments = {
	created_at: string;
	id: number;
	post_id: number;
	text: string;
	username: string;
};

type Subreddit = {
	created_at: string;
	id: string;
	topic: string;
};

type Vote = {
	created_at: string;
	id: number;
	post_id: number;
	upvote: boolean;
	username: string;
};
