# 掲示板アプリ　フロントエンド

インターンで学んだことの学習成果として自作した掲示板アプリケーションのフロントエンドです。
Reactの基本であるコンポーネント化を意識して作成しました。

##  工夫した点
- **UXの向上**: 検索機能を実装し、膨大な投稿の中から関連する情報を即座に見つけられるようにしました。
- **プロフィールのパーソナライズ**: ユーザー情報の参照・変更機能を備え、自分専用のプロフィール設定を可能にしました。
- **Styled-componentsの活用**: スタイルをコンポーネント単位で管理し、CSSの干渉を防ぐとともに、直感的なスタイリングを行いました。

##  デモ動画
https://www.youtube.com/watch?v=MVRNGi4tJyc


##  使用した技術
- **Framework**　: React
- **Language** : TypeScript
- **Styling**　: Styled-components
- **API Client** : Axios

##  ディレクトリ構造

```text
src/
├── api/              # Axiosを用いたAPI通信の定義
├── components/       # UIコンポーネント
├── pages/            # 各画面のメインコンポーネント
├── provider/         # Context
├── styles/           # グローバルスタイル
├── app.tsx           # アプリのルートコンポーネント
├── index.tsx         # エントリーポイント
└── errorStatus.ts    # 共通エラーハンドリング



