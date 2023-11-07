import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://fe-coding-test-o6yezgstiq-km.a.run.app/graphql",
});

const authLink = setContext((_, { headers }) => {
  // Add the x-token header to the request
  return {
    headers: {
      ...headers,
      "x-token": "fe-test-2023",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
