export const fetchGraphQL = async <T>(query: string, variables: Record<string, any> = {}): Promise<T> => {
  const response = await fetch('https://hub.snapshot.org/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors.map((err: { message: string }) => err.message).join(', '));
  }

  return result.data;
};
