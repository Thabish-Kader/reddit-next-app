/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = {
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
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
