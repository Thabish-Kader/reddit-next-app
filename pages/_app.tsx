import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Header } from "../components/Header";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo-client";
import { Toaster } from "react-hot-toast";
export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<ApolloProvider client={client}>
			<SessionProvider session={session}>
				<Toaster />
				<div className="bg-slate-300 h-screen overflow-y-scroll">
					<Header />
					<Component {...pageProps} />
				</div>
			</SessionProvider>
		</ApolloProvider>
	);
}
