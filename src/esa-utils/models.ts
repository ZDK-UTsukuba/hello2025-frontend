/**
 * esa の記事のデータ構造
 * @see https://docs.esa.io/posts/102#GET%20/v1/teams/:team_name/posts
 * */
export interface Post {
  number: number;
  name: string;
  full_name: string;
  wip: boolean;
  body_md: string;
  body_html: string;
  created_at: string;
  message: string;
  url: string;
  updated_at: string;
  tags: string[];
  category: string;
  revision_number: number;
  created_by: {
    myself: boolean;
    name: string;
    screen_name: string;
    icon: string;
  };
  updated_by: {
    myself: boolean;
    name: string;
    screen_name: string;
    icon: string;
  };
}

/**
 * Markdown の h2 `##` を質問にし、次の h2 まで・記事の終わりまでを回答とする
 */
export interface Faq {
  question: string;
  answerHtml: string;
}
