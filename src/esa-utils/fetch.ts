import type { Post } from "./models";

/**
 * esa の認証トークンを付与した fetch
 */
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

/**
 * 記事一覧を取得する関数
 * @returns 記事一覧
 */
export async function fetchPosts(): Promise<PostsResponse> {
  const urlBase = import.meta.env.ESA_ENDPOINT;
  const category = import.meta.env.ESA_POST_CATEGORY;

  const url = new URL(`${urlBase}/posts`);
  url.searchParams.append("q", `in:${category}`);

  const response = await fetchFromEsa(url);
  return await response.json();
}

/**
 * 指定 id の記事を取得する関数
 * @param postNumber 取得する記事のid
 * @returns 記事データ
 */
export async function fetchPost(postNumber: number): Promise<Post> {
  const urlBase = import.meta.env.ESA_ENDPOINT;

  const url = new URL(`${urlBase}/posts/${postNumber}`);

  const response = await fetchFromEsa(url);
  return response.json();
}
