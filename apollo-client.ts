import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "https://guaimaro.stepzen.net/api/worn-uakari/__graphql",
	headers: {
		Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`,
	},
	cache: new InMemoryCache(),
});
