# 新入生情報Web 2025 フロントエンド

![GitHub License](https://img.shields.io/github/license/ZDK-UTsukuba/hello2025-frontend)

2025年度版筑波大学の学生宿舎に入居する新入生向けの情報ポータル（春からつくばで新生活を始めるあなたに2025）のフロントエンド

## 開発環境セットアップ

0. 環境変数の設定を行う

- `.env.example`ファイルをコピーし、`.env`ファイルを作成する
- `.env`ファイルを開く
- 以下の設定を行う
  - `ESA_ENDPOINT` - [esa APIのエンドポイント](https://docs.esa.io/posts/102#%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88)を指定する
  - `ESA_TOKEN` - esaのアクセストークンを指定する
  - `ESA_POST_CATEGORY` - 取得するesaの記事が存在するesa上のディレクトリを指定する
  - `ESA_FAQ_NUMBER` - FAQページのみ異なる処理を行っているため、FAQページのpostナンバーを指定する

1. git、Node.js、npmを使用できる環境を用意する
2. `git clone`をする
3. `npm install`をする
4. `npm run dev`が動作することを確認する
5. （機能を追加する場合は）Issueを立て、それに対応したブランチを生やし開発する

- Issueを立てる際は対応を行う人を適宜アサインし、誰が対応しているのかを分かりやすくする
- ラベルなどを追加するとなお良い

6. 追加し終わったら（基本的には）`master`ブランチに対するPRを立て、レビューを受けた上でマージする
7. 適宜`git fetch`及び`git pull`を行う

## ルーティング

- `/` トップページ
  - `/faq` 質疑応答ページ
  - `/[id]` 個別記事ページ
