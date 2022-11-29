import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Header } from "../components/Header";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { client } from "../apollo-client";
export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<ApolloProvider client={client}>
			<SessionProvider session={session}>
				<div className="bg-slate-300 h-screen">
					<Header />
					<Component {...pageProps} />
				</div>
			</SessionProvider>
		</ApolloProvider>
	);
}
