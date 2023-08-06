import { ApolloClient, InMemoryCache } from "@apollo/client";

import { useAppSelector } from "./redux";

const useGraphqlClient = () => {
  const token = useAppSelector((state) => state.user);

  console.log("in the client of graphql ");
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
    headers: {
      "gwislab-user-locale": "en",
      authorization: `Bearer ${token}`
    }
  });

  return client;
};

export default useGraphqlClient;
