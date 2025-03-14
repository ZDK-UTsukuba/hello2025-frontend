# 新入生情報Web 2025 フロントエンド

![GitHub License](https://img.shields.io/github/license/ZDK-UTsukuba/hello2025-frontend)

2025年度版筑波大学の学生宿舎に入居する新入生向けの情報ポータルのフロントエンド

## 開発環境セットアップ

0. （必要ならば）[バックエンド](https://github.com/ZDK-UTsukuba/hello2025-backend)を立てる
   - 環境変数を追加する
   - `NEXT_PUBLIC_BACKEND_HOST`: hello2025-backendのURL
   - `NEXT_PUBLIC_FRONTEND_HOST`: hello2025-frontendのURL
1. git、Node.js、npmを使用できる環境を用意する
2. `git clone`をする
3. `npm install`をする
4. `npm run dev`が動作することを確認する
5. （機能を追加する場合は）Issueを立て、それに対応したブランチを生やし開発する
6. 追加し終わったら`develop`ブランチに対するPRを立て、レビューを受けた上でマージする

## ルーティング

- `/` トップページ
  - `/faq` 質疑応答ページ
  - `/all` 記事一覧
    暫定で作っただけなのでトップページとマージした方がよかったらそうして欲しい
  - `/[id]` 個別記事ページ
