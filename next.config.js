/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = {
	images: {
		domains: ["avatars.dicebear.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
};
