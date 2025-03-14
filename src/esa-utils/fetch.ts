function fetchFromEsa(inputs: RequestInfo | URL) {
  return fetch(inputs, {
    headers: {
      Authorization: `Bearer ${import.meta.env.ESA_TOKEN}`,
    },
  });
}

interface PostsResponse {
  posts: Post[];
  total_count: number;
}

export async function fetchPosts(): Promise<PostsResponse> {
  const urlBase = import.meta.env.ESA_ENDPOINT;
  const category = import.meta.env.ESA_POST_CATEGORY;

  const url = new URL(`${urlBase}/posts`);
  url.searchParams.append("q", `in:${category}`);

  const response = await fetchFromEsa(url);
  return await response.json();
}

export async function fetchPost(postNumber: number): Promise<Post> {
  const urlBase = import.meta.env.ESA_ENDPOINT;

  const url = new URL(`${urlBase}/posts/${postNumber}`);

  const response = await fetchFromEsa(url);
  return response.json();
}
