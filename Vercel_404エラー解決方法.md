# 🔧 Vercel 404エラー解決方法

Vercelで404エラーが表示される場合の解決方法です。

## 🔍 問題の原因

Vercelでは、サーバーレス関数を`api/`フォルダに配置する必要があります。
現在の設定では、`server/server.js`を直接参照しているため、正しく動作しません。

## ✅ 解決方法

### ステップ1: 設定ファイルを確認

`vercel.json`が正しく設定されているか確認してください。

### ステップ2: Vercelで再デプロイ

1. Vercelダッシュボードを開く
2. プロジェクトを選択
3. 「**Deployments**」タブを開く
4. 最新のデプロイの「**...**」をクリック
5. 「**Redeploy**」を選択

または、GitHubにプッシュすると自動的に再デプロイされます。

### ステップ3: 環境変数の確認

1. Vercelダッシュボードでプロジェクトを開く
2. 「**Settings**」→「**Environment Variables**」を開く
3. `OPENAI_API_KEY`が設定されているか確認

## 📋 正しいファイル構成

```
PRtimes_ラクラク/
├── index.html          # フロントエンド
├── app.js              # フロントエンドJavaScript
├── styles.css          # スタイル
├── api/                # Vercelサーバーレス関数
│   └── generate.js      # 記事生成API
├── vercel.json         # Vercel設定
└── server/             # ローカル開発用（Vercelでは使用しない）
    └── server.js
```

## 🔄 再デプロイ手順

### 方法1: GitHubから自動デプロイ

```bash
git add .
git commit -m "Vercel設定を修正"
git push
```

Vercelが自動的に再デプロイします。

### 方法2: Vercelダッシュボードから

1. プロジェクトを開く
2. 「**Deployments**」タブ
3. 「**Redeploy**」をクリック

## ⚠️ よくある問題

### 問題1: 404エラーが続く

**解決方法**:
- `vercel.json`の設定を確認
- `api/generate.js`ファイルが存在するか確認
- 再デプロイを実行

### 問題2: APIが動作しない

**解決方法**:
- 環境変数`OPENAI_API_KEY`が設定されているか確認
- デプロイログでエラーを確認

### 問題3: フロントエンドが表示されない

**解決方法**:
- `index.html`がルートディレクトリにあるか確認
- `vercel.json`のルーティング設定を確認

## 🎯 確認方法

デプロイが成功したら：

1. VercelのURLにアクセス
2. `index.html`が表示されるか確認
3. 記事生成機能をテスト

## 📝 現在の設定

- ✅ `api/generate.js` - サーバーレス関数
- ✅ `vercel.json` - 正しい設定
- ✅ 環境変数設定が必要

## 🚀 次のステップ

1. ファイルをGitHubにプッシュ
2. Vercelが自動的に再デプロイ
3. エラーが解消されることを確認


