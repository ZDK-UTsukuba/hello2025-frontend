/**
 * @see https://docs.esa.io/posts/102#GET%20/v1/teams/:team_name/posts
 * */
interface Post {
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
 * Markdown の h2 `##` を質問に、それに続く p タグを回答にする
 */
interface Faqs {
  questions: {
    question: string;
    answer: string;
  }[];
}
