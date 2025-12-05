import OpenAI from 'openai';

// Vercelサーバーレス関数
export default async function handler(req, res) {
    // CORS設定
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { 
            yourCompany, 
            yourName, 
            yourEmail, 
            targetCompany, 
            exclusionKeywords, 
            tone = 'polite',
            variation = 0 
        } = req.body;

        // バリデーション
        if (!yourCompany || !yourName || !yourEmail || !targetCompany || !exclusionKeywords) {
            return res.status(400).json({ 
                error: 'すべての必須項目を入力してください' 
            });
        }

        // OpenAI APIキーの確認
        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ 
                error: 'OpenAI APIキーが設定されていません' 
            });
        }

        // キーワードリストに変換（改行区切り）
        const keywordList = exclusionKeywords
            .split('\n')
            .map(k => k.trim())
            .filter(k => k.length > 0);

        if (keywordList.length === 0) {
            return res.status(400).json({ 
                error: '除外キーワードを1つ以上入力してください' 
            });
        }

        // トーンの設定
        const toneSettings = {
            'polite': {
                greeting: 'フォームより失礼いたします。',
                closing: '何卒よろしくお願いいたします。',
                style: '丁寧で礼儀正しい'
            },
            'very-polite': {
                greeting: '突然のご連絡となり恐縮ですが、フォームより失礼いたします。',
                closing: 'お忙しい中恐縮ですが、ご検討いただけますと幸いです。何卒よろしくお願い申し上げます。',
                style: '非常に丁寧で謙虚な'
            },
            'business': {
                greeting: 'フォームよりご連絡申し上げます。',
                closing: 'ご検討のほど、よろしくお願いいたします。',
                style: 'ビジネスライクで簡潔な'
            },
            'friendly': {
                greeting: 'フォームよりご連絡いたします。',
                closing: 'ご対応いただけますと幸いです。よろしくお願いいたします。',
                style: '親しみやすく丁寧な'
            }
        };

        const selectedTone = toneSettings[tone] || toneSettings['polite'];

        // プロンプトを作成
        const prompt = `あなたは企業間のビジネスコミュニケーションの専門家です。
以下の情報を元に、${selectedTone.style}広告除外依頼の文章を作成してください。

【あなたの会社名】
${yourCompany}

【あなたの名前】
${yourName}

【あなたのメールアドレス】
${yourEmail}

【対象企業名】
${targetCompany}

【除外したいキーワード】
${keywordList.map((k, i) => `・${k}`).join('\n')}

【要件】
以下の構造で依頼文章を作成してください：

1. 件名/宛先: 「マーケティングご担当者様」

2. 挨拶: ${selectedTone.greeting}
   - 「${yourCompany}の${yourName}と申します。」
   - 「(${yourEmail})」

3. 依頼の説明:
   - 対象企業が出稿しているリスティング広告について、一部キーワードでの除外設定を検討いただきたい旨
   - 検索エンジンで当社名や関連キーワードで検索した際、対象企業の広告が表示されている状況を確認した旨
   - おそらく意図せず配信されている（インテントマッチ／部分一致など）ものと推察する旨
   - 除外対応は対象企業の判断によるものと理解している旨
   - 当社名で検索しているユーザーの可能性が高く、当社としてはそのユーザーと適切に接点を持ちたい旨
   - 対象企業にとっても必ずしも求めるユーザー層ではない可能性がある旨
   - 該当キーワードの除外設定を検討いただければ幸いな旨
   - 代理店に運用を委託されている場合は、キーワードを「フレーズ一致除外」にて対応可能か確認いただければ幸いな旨
   - ${selectedTone.greeting}

4. 結び: ${selectedTone.closing}

5. 該当メディアセクション:
   - 対象企業が出稿している以下の媒体にて除外いただければ幸いです。
   - ・Google
   - ・Yahoo！
   - ・Microsoft

6. 除外登録いただきたいキーワードセクション:
   以下のキーワードをリスト形式で記載：
   ${keywordList.map(k => `   - ${k}`).join('\n')}

7. マッチタイプ:
   - フレーズ一致

【重要な注意事項】
- 礼儀正しく、丁寧な表現を使用してください
- 強制的なトーンではなく、依頼の形を保ってください
- 具体的で明確な文章にしてください
- 参考文の構造と形式に従ってください
- 自然な日本語で読みやすくしてください

依頼文章を作成してください：`;

        // OpenAIクライアントの初期化
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        // OpenAI APIを呼び出し
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'あなたは企業間のビジネスコミュニケーションの専門家です。提供された情報から、礼儀正しく丁寧な広告除外依頼文章を作成してください。'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7 + (variation * 0.1),
            max_tokens: 2000
        });

        const generatedText = completion.choices[0].message.content;

        // 生成された文章を整形
        const formattedText = formatExclusionRequest(generatedText, yourCompany, yourName, yourEmail, targetCompany, keywordList);

        res.json({
            body: formattedText,
            keywords: keywordList
        });

    } catch (error) {
        console.error('依頼文章生成エラー:', error);
        res.status(500).json({ 
            error: '依頼文章の生成に失敗しました',
            message: error.message 
        });
    }
}

// 生成された文章を整形する関数
function formatExclusionRequest(text, yourCompany, yourName, yourEmail, targetCompany, keywords) {
    // 基本的な整形処理
    let formatted = text.trim();
    
    // セクションを明確に分ける
    formatted = formatted.replace(/\n\n+/g, '\n\n');
    
    // キーワードリストの部分を整形
    const keywordSection = `<除外登録いただきたいキーワード>\n${keywords.map(k => `・${k}`).join('\n')}\n\n<マッチタイプ>\nフレーズ一致`;
    
    // 既存のキーワードセクションを置換
    const keywordPattern = /(?:除外登録|キーワード)[^]*?(?:フレーズ一致|マッチタイプ)/i;
    if (keywordPattern.test(formatted)) {
        formatted = formatted.replace(keywordPattern, keywordSection);
    } else {
        formatted += `\n\n${keywordSection}`;
    }
    
    return formatted;
}

