// サンプルデータ（複数パターン）
const SAMPLE_DATA_ARRAY = [
    {
        title: '新サービス「プレスリリース ラクラク」をリリース',
        purpose: 'tool-announcement',
        companyName: '株式会社サンプル',
        companyUrl: 'https://example.com',
        content: `AIを活用したプレスリリース作成ツールをリリースしました。タイトルと簡単な内容を入力するだけで、高品質なプレスリリースが自動生成されます。PR担当者の作業時間を大幅に短縮できます。`
    },
    {
        title: '新規事業「AIマーケティング支援サービス」を開始',
        purpose: 'company-announcement',
        companyName: '株式会社テックイノベーション',
        companyUrl: 'https://tech-innovation.co.jp',
        content: `中小企業向けのAIマーケティング支援サービスを新規事業として開始しました。人工知能を活用して、マーケティング戦略の立案から実行までをサポートします。`
    },
    {
        title: 'オンラインセミナー「デジタルマーケティング最新トレンド」を開催',
        purpose: 'event-announcement',
        companyName: 'マーケティングアカデミー',
        companyUrl: 'https://marketing-academy.jp',
        content: `デジタルマーケティングの最新トレンドを解説する無料オンラインセミナーを開催します。実践的なノウハウを学べる内容となっており、初心者から上級者まで幅広く参加できます。`
    },
    {
        title: '新製品「スマートホームデバイス」を発売',
        purpose: 'product-launch',
        companyName: '株式会社ホームテック',
        companyUrl: 'https://hometech.jp',
        content: `音声認識とAIを搭載したスマートホームデバイスを発売しました。家電の操作から情報検索まで、自然な会話で操作できます。生活の利便性を大幅に向上させます。`
    },
    {
        title: 'ECサイト「ショッピングモール」の新機能リリース',
        purpose: 'conversion',
        companyName: '株式会社ECプラットフォーム',
        companyUrl: 'https://ec-platform.com',
        content: `ECサイトにAIレコメンド機能とワンクリック決済機能を追加しました。ユーザーの購買体験を向上させ、コンバージョン率の向上を目指します。`
    },
    {
        title: '大手企業とAI開発でパートナーシップ締結',
        purpose: 'partnership',
        companyName: '株式会社AIソリューション',
        companyUrl: 'https://ai-solution.co.jp',
        content: `大手IT企業とAI技術の共同開発に関するパートナーシップを締結しました。両社の技術力を結集し、革新的なAIソリューションの開発を進めます。`
    },
    {
        title: 'クラウド会計ソフト「会計クラウド」の新バージョンリリース',
        purpose: 'tool-announcement',
        companyName: '株式会社会計システム',
        companyUrl: 'https://kaikei-system.jp',
        content: `クラウド会計ソフトの新バージョンをリリースしました。自動仕訳機能の精度向上と、モバイルアプリの操作性改善を実現しました。`
    },
    {
        title: '新規事業部を設立し、DX支援サービスを開始',
        purpose: 'company-announcement',
        companyName: '株式会社ビジネスコンサル',
        companyUrl: 'https://business-consult.co.jp',
        content: `デジタルトランスフォーメーション支援を専門とする新規事業部を設立しました。企業のDX推進を包括的にサポートするサービスを提供します。`
    },
    {
        title: '無料ウェビナー「スタートアップの資金調達戦略」を開催',
        purpose: 'event-announcement',
        companyName: 'スタートアップ支援機構',
        companyUrl: 'https://startup-support.org',
        content: `スタートアップ企業向けに資金調達戦略を解説する無料ウェビナーを開催します。ベンチャーキャピタルの専門家が実践的なアドバイスを提供します。`
    },
    {
        title: '新商品「オーガニックコスメ」シリーズを発売',
        purpose: 'product-launch',
        companyName: '株式会社ナチュラルビューティー',
        companyUrl: 'https://natural-beauty.jp',
        content: `100%オーガニック原料を使用したコスメシリーズを発売しました。肌に優しく、環境にも配慮した製品です。敏感肌の方にもおすすめです。`
    }
];

// ランダムにサンプルデータを取得する関数
function getRandomSampleData() {
    const randomIndex = Math.floor(Math.random() * SAMPLE_DATA_ARRAY.length);
    return SAMPLE_DATA_ARRAY[randomIndex];
}

// 目的の説明
const PURPOSE_DESCRIPTIONS = {
    'company-announcement': '新規事業、組織変更、経営方針などの会社発表',
    'event-announcement': 'セミナー、展示会、ウェビナーなどのイベント告知',
    'tool-announcement': '新サービス、アプリ、ソフトウェアのリリース',
    'conversion': '商品・サービスの購入・登録を促進する記事',
    'product-launch': '新製品の発売・リリース告知',
    'partnership': '他社との提携・協業の発表',
    'other': '上記以外の目的'
};

// 目的のラベル
const PURPOSE_LABELS = {
    'company-announcement': '会社の発表',
    'event-announcement': 'イベント告知',
    'tool-announcement': 'ツール発表',
    'conversion': 'コンバージョン目的',
    'product-launch': '製品リリース',
    'partnership': 'パートナーシップ',
    'other': 'その他'
};

// DOM要素の取得
const formSection = document.getElementById('form-section');
const previewSection = document.getElementById('preview-section');
const guideSection = document.getElementById('guide-section');
const articleForm = document.getElementById('article-form');
const trySampleBtn = document.getElementById('try-sample-btn');
const titleInput = document.getElementById('title');
const purposeSelect = document.getElementById('purpose');
const companyNameInput = document.getElementById('company-name');
const companyUrlInput = document.getElementById('company-url');
const contentTextarea = document.getElementById('content');
const contentLength = document.getElementById('content-length');
const purposeHint = document.getElementById('purpose-hint');
const generateBtn = document.getElementById('generate-btn');
const loadingDiv = document.getElementById('loading');
const previewLoadingDiv = document.getElementById('preview-loading');
const regenerateBtn = document.getElementById('regenerate-btn');
const copyBtn = document.getElementById('copy-btn');
const resetBtn = document.getElementById('reset-btn');
const previewTitle = document.getElementById('preview-title');
const previewSummary = document.getElementById('preview-summary');
const previewBody = document.getElementById('preview-body');
const previewKeywords = document.getElementById('preview-keywords');

// 文字数カウント
contentTextarea.addEventListener('input', () => {
    contentLength.textContent = contentTextarea.value.length;
});

// 目的の説明を表示
purposeSelect.addEventListener('change', () => {
    const purpose = purposeSelect.value;
    purposeHint.textContent = PURPOSE_DESCRIPTIONS[purpose] || '';
});

// 初期表示
purposeHint.textContent = PURPOSE_DESCRIPTIONS[purposeSelect.value];

// お試しボタン
trySampleBtn.addEventListener('click', () => {
    // ランダムにサンプルデータを取得
    const sampleData = getRandomSampleData();
    
    titleInput.value = sampleData.title;
    purposeSelect.value = sampleData.purpose;
    companyNameInput.value = sampleData.companyName;
    companyUrlInput.value = sampleData.companyUrl || '';
    contentTextarea.value = sampleData.content;
    contentLength.textContent = sampleData.content.length;
    purposeHint.textContent = PURPOSE_DESCRIPTIONS[sampleData.purpose];
    
    // フォームの先頭にスクロール
    titleInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    titleInput.focus();
});

// プログレスバーを初期化する関数
function initializeProgress(isRegenerating = false) {
    const progressCircle = document.querySelector(isRegenerating 
        ? '#preview-loading .progress-ring-circle' 
        : '#loading .progress-ring-circle');
    
    if (progressCircle) {
        const circumference = 2 * Math.PI * 54; // 半径54
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = circumference;
    }
}

// プログレスバーを更新する関数
function updateProgress(percent, isRegenerating = false) {
    const progressCircle = document.querySelector(isRegenerating 
        ? '#preview-loading .progress-ring-circle' 
        : '#loading .progress-ring-circle');
    const progressPercent = document.querySelector(isRegenerating 
        ? '#preview-loading .progress-percent' 
        : '#loading .progress-percent');
    
    if (progressCircle && progressPercent) {
        const circumference = 2 * Math.PI * 54; // 半径54
        const offset = circumference - (percent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressPercent.textContent = Math.min(Math.floor(percent), 100);
    }
}

// プログレスアニメーションを開始
function startProgressAnimation(isRegenerating = false) {
    // 初期化
    initializeProgress(isRegenerating);
    updateProgress(0, isRegenerating);
    
    let progress = 0;
    const targetProgress = 95; // 95%まで進める（実際の完了は100%に）
    const duration = 25000; // 25秒で95%まで（より自然な速度）
    const interval = 50; // 50msごとに更新
    const increment = (targetProgress / duration) * interval;
    
    const progressInterval = setInterval(() => {
        progress += increment;
        if (progress < targetProgress) {
            updateProgress(progress, isRegenerating);
        } else {
            updateProgress(targetProgress, isRegenerating);
            clearInterval(progressInterval);
        }
    }, interval);
    
    return progressInterval;
}

// 記事生成（共通関数）
async function generateArticleFromForm(variation = 0, isRegenerating = false) {
    const formData = {
        title: titleInput.value.trim(),
        purpose: purposeSelect.value,
        companyName: companyNameInput ? companyNameInput.value.trim() : '',
        companyUrl: companyUrlInput ? companyUrlInput.value.trim() : '',
        content: contentTextarea.value.trim()
    };
    
    if (!formData.title || !formData.content || !formData.companyName) {
        alert('タイトル、会社名、内容を入力してください。');
        return null;
    }
    
    // ローディング表示
    let progressInterval;
    if (isRegenerating) {
        // 再生成時はプレビューセクションにローディングを表示
        if (previewLoadingDiv) {
            previewLoadingDiv.classList.add('active');
            // 少し待ってからアニメーション開始（表示が確実にされるように）
            setTimeout(() => {
                progressInterval = startProgressAnimation(true);
            }, 100);
        }
        if (regenerateBtn) {
            regenerateBtn.disabled = true;
            regenerateBtn.textContent = '🔄 再生成中...';
        }
    } else {
        // 初回生成時はフォーム下にローディングを表示
        generateBtn.disabled = true;
        generateBtn.textContent = '✨ 生成中...';
        if (regenerateBtn) regenerateBtn.disabled = true;
        if (loadingDiv) {
            loadingDiv.style.display = 'block';
            // 少し待ってからアニメーション開始
            setTimeout(() => {
                progressInterval = startProgressAnimation(false);
            }, 100);
        }
    }
    
    try {
        // バックエンドAPIを使用（常にAI生成）
        let article;
        try {
            article = await generateArticleWithAI(formData, variation);
            // 完了時に100%に設定
            if (progressInterval) clearInterval(progressInterval);
            updateProgress(100, isRegenerating);
            // 完了アニメーションを少し表示
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (apiError) {
            console.warn('バックエンドAPIエラー、テンプレートベースにフォールバック:', apiError);
            if (progressInterval) clearInterval(progressInterval);
            updateProgress(100, isRegenerating);
            await new Promise(resolve => setTimeout(resolve, 500));
            // バックエンドが利用できない場合はテンプレートベースにフォールバック
            article = generateArticle(formData, variation);
        }
        
        displayArticle(article);
        
        // フォームデータを保存（再生成用）
        window.lastFormData = formData;
        
        if (!isRegenerating) {
            // プレビューセクションにスクロール
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } catch (error) {
        console.error('記事生成エラー:', error);
        if (progressInterval) clearInterval(progressInterval);
        alert('記事の生成に失敗しました。APIキーが正しいか確認してください。\n\nエラー: ' + error.message);
        
        // エラー時はテンプレートベースにフォールバック
        const article = generateArticle(formData, variation);
        displayArticle(article);
    } finally {
        // ローディング非表示
        if (isRegenerating) {
            if (previewLoadingDiv) {
                previewLoadingDiv.classList.remove('active');
            }
            if (regenerateBtn) {
                regenerateBtn.disabled = false;
                regenerateBtn.textContent = '🔄 再生成';
            }
        } else {
            if (loadingDiv) loadingDiv.style.display = 'none';
            generateBtn.disabled = false;
            generateBtn.textContent = '✨ 記事を生成する';
            if (regenerateBtn) regenerateBtn.disabled = false;
        }
    }
}

// バックエンドAPIを使用した記事生成
async function generateArticleWithAI(formData, variation = 0) {
    // バックエンドサーバーのURL
    // 本番環境ではVercelのURL、開発環境ではlocalhost
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const API_URL = isLocalhost 
        ? 'http://localhost:3000/api/generate'
        : '/api/generate';
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: formData.title,
            purpose: formData.purpose,
            companyName: formData.companyName,
            companyUrl: formData.companyUrl,
            content: formData.content,
            variation: variation
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

// 記事生成
articleForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    generateArticleFromForm(0);
});

// 再生成ボタン
if (regenerateBtn) {
    regenerateBtn.addEventListener('click', async () => {
        // ボタンを無効化して即座にローディング表示
        regenerateBtn.disabled = true;
        regenerateBtn.textContent = '🔄 再生成中...';
        
        // プレビューセクションが表示されていることを確認
        if (previewSection && previewSection.style.display === 'none') {
            previewSection.style.display = 'block';
        }
        
        // ローディングを即座に表示
        if (previewLoadingDiv) {
            previewLoadingDiv.classList.add('active');
        }
        
        // 少し待ってから生成開始（ローディング表示を確実に）
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (window.lastFormData) {
            // バリエーションを変えて再生成（1-3のランダム）
            const variation = Math.floor(Math.random() * 3) + 1;
            generateArticleFromForm(variation, true); // 再生成フラグをtrueに
        } else {
            // フォームから再生成
            generateArticleFromForm(Math.floor(Math.random() * 3) + 1, true); // 再生成フラグをtrueに
        }
    });
}

// 記事生成関数 - より詳細で魅力的な記事を生成
function generateArticle(formData, variation = 0) {
    const purposeLabel = PURPOSE_LABELS[formData.purpose] || 'リリース';
    const lines = formData.content.split('\n').filter(line => line.trim());
    const leadParagraph = lines[0] || formData.title;
    
    // 入力内容から情報を抽出
    const extractedInfo = extractInfo(formData.content);
    
    // 本文を構築（より詳細で魅力的に）
    let body = `【${purposeLabel}】\n\n`;
    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    body += `${formData.title}\n`;
    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // 会社情報を最初に入れる
    body += `${formData.companyName}`;
    if (formData.companyUrl) {
        body += `（${formData.companyUrl}）`;
    }
    body += `は、`;
    
    // リード文（魅力的に、バリエーション対応）
    body += `${enhanceLeadParagraph(leadParagraph, formData.purpose, variation)}\n\n`;
    
    // 背景・課題（バリエーション対応）
    body += `■ 背景・課題\n`;
    body += `${generateBackground(formData.purpose, extractedInfo, variation)}\n\n`;
    
    // 詳細内容（バリエーション対応）
    body += `■ 詳細\n`;
    if (lines.length > 1) {
        body += `${enhanceContent(lines.slice(1).join('\n\n'), formData.purpose, variation)}\n\n`;
    } else {
        body += `${enhanceContent(formData.content, formData.purpose, variation)}\n\n`;
    }
    
    // 特徴・メリット（より具体的に、空欄を減らす）
    body += `■ 主な特徴・メリット\n`;
    body += `${generateFeatures(formData.purpose, extractedInfo, variation, formData.content)}\n\n`;
    
    // 今後の展開（バリエーション対応）
    body += `■ 今後の展開・展望\n`;
    body += `${generateFuturePlans(formData.purpose, variation)}\n\n`;
    
    // キーワードを抽出
    const keywords = extractKeywords(formData.title + ' ' + formData.content);
    
    // サマリーを生成（より魅力的に）
    const summary = enhanceLeadParagraph(leadParagraph, formData.purpose, variation);
    const summaryText = summary.length > 200 
        ? summary.substring(0, 200) + '...'
        : summary;
    
    return {
        title: formData.title,
        body: body,
        summary: summaryText,
        keywords: keywords
    };
}

// リード文を強化（バリエーション対応）
function enhanceLeadParagraph(lead, purpose, variation = 0) {
    const enhancements = {
        'company-announcement': [
            'この発表は、当社の成長戦略における重要なマイルストーンとなります。',
            '本発表により、当社は新たな成長段階へと進むこととなります。',
            'この取り組みは、当社のビジョンを実現するための重要な一歩となります。'
        ],
        'event-announcement': [
            '本イベントは、参加者にとって貴重な学びとネットワーキングの機会を提供します。',
            'このイベントを通じて、参加者の皆様に最新の知見と実践的なスキルをお届けします。',
            '本イベントは、業界の専門家と参加者が直接交流できる貴重な場となります。'
        ],
        'tool-announcement': [
            '本ツールは、ユーザーの課題を解決し、業務効率を大幅に向上させる革新的なソリューションです。',
            'このツールにより、ユーザーはより効率的に業務を遂行できるようになります。',
            '本ツールは、最新技術を活用し、ユーザーの生産性向上を実現します。'
        ],
        'conversion': [
            '本サービスは、お客様の成功をサポートし、より良い成果を実現するための包括的なソリューションです。',
            'このサービスにより、お客様は目標達成への最短ルートを見つけることができます。',
            '本サービスは、お客様のビジネス成長を加速させる強力なツールです。'
        ],
        'product-launch': [
            '本製品は、市場のニーズに応えるべく、最新技術とユーザーフィードバックを反映した設計となっています。',
            'この製品は、ユーザーの声を反映し、より使いやすく、より高機能になりました。',
            '本製品は、業界の最新トレンドを取り入れ、革新的な価値を提供します。'
        ],
        'partnership': [
            '本パートナーシップにより、両社の強みを活かした相乗効果が期待されます。',
            'この協業により、両社は新たな価値創造と市場拡大を実現します。',
            '本パートナーシップは、両社のリソースを結集し、より大きな成果を生み出します。'
        ],
        'other': [
            '本取り組みは、業界に新たな価値を提供する重要なステップとなります。',
            'この取り組みにより、より良い未来を創造していきます。',
            '本取り組みは、継続的な改善とイノベーションを通じて、価値を提供します。'
        ]
    };
    
    const options = enhancements[purpose] || enhancements['other'];
    const selected = options[variation % options.length];
    return `${lead} ${selected}`;
}

// 背景・課題を生成（バリエーション対応）
function generateBackground(purpose, info, variation = 0) {
    const backgrounds = {
        'company-announcement': [
            `現在のビジネス環境は急速に変化しており、企業は常に新しい価値を創造し続ける必要があります。このような状況下において、当社は戦略的な意思決定のもと、新たな取り組みを開始いたします。`,
            `市場環境の変化に対応し、持続的な成長を実現するため、当社は新たな戦略を展開いたします。`,
            `お客様により良い価値を提供するため、当社は組織体制を強化し、新たな取り組みを推進いたします。`
        ],
        'event-announcement': [
            `業界の専門知識や最新トレンドを共有し、参加者同士の交流を促進する場として、本イベントを企画いたしました。`,
            `参加者の皆様に実践的な知識とスキルを提供し、ネットワーキングの機会を創出するため、本イベントを開催いたします。`,
            `業界の第一線で活躍する専門家による知見を共有し、参加者の成長を支援する場として、本イベントを企画いたしました。`
        ],
        'tool-announcement': [
            `多くのユーザーから、より効率的で使いやすいツールへの要望が寄せられていました。このような声に応えるべく、本ツールを開発いたしました。`,
            `ユーザーの課題を解決し、業務効率を向上させるため、最新技術を活用した本ツールを開発いたしました。`,
            `市場のニーズとユーザーフィードバックを踏まえ、より使いやすく、より強力な機能を備えた本ツールをリリースいたします。`
        ],
        'conversion': [
            `お客様の課題解決と成功を支援するため、より効果的なアプローチを追求してまいりました。`,
            `お客様のビジネス成長を加速させるため、実績に基づいた最適なソリューションを提供いたします。`,
            `お客様の目標達成をサポートするため、専門的な知識と経験を活かしたサービスを展開いたします。`
        ],
        'product-launch': [
            `市場のニーズと技術の進歩を踏まえ、より優れた製品を提供するため、本製品を開発いたしました。`,
            `ユーザーの声を反映し、より使いやすく、より高品質な製品を実現するため、本製品を開発いたしました。`,
            `最新技術とデザイン思考を取り入れ、ユーザーに新たな価値を提供する製品として、本製品を開発いたします。`
        ],
        'partnership': [
            `両社の強みを組み合わせることで、より大きな価値を創造できると考え、本パートナーシップを締結いたしました。`,
            `お客様により良いサービスを提供するため、両社のリソースとノウハウを結集し、本パートナーシップを開始いたします。`,
            `市場拡大とイノベーション創出を目指し、両社の専門性を活かした協業として、本パートナーシップを締結いたしました。`
        ],
        'other': [
            `継続的な改善とイノベーションを通じて、より良いサービスを提供するため、本取り組みを実施いたします。`,
            `ステークホルダーの皆様に価値を提供するため、戦略的なアプローチのもと、本取り組みを推進いたします。`,
            `持続的な成長と価値創造を実現するため、新たな取り組みとして、本施策を実施いたします。`
        ]
    };
    
    const options = backgrounds[purpose] || backgrounds['other'];
    return options[variation % options.length];
}

// コンテンツを強化（バリエーション対応）
function enhanceContent(content, purpose, variation = 0) {
    // 箇条書きを検出して強化
    const lines = content.split('\n');
    let enhanced = '';
    let inList = false;
    
    lines.forEach((line, index) => {
        const trimmed = line.trim();
        
        // 箇条書きの検出
        if (trimmed.match(/^[-•・]\s/) || trimmed.match(/^\d+[\.\)]\s/)) {
            if (!inList) {
                enhanced += '\n';
                inList = true;
            }
            // 箇条書きを強化
            const item = trimmed.replace(/^[-•・]\s/, '').replace(/^\d+[\.\)]\s/, '');
            enhanced += `・${item}\n`;
        } else if (trimmed.length > 0) {
            if (inList) {
                enhanced += '\n';
                inList = false;
            }
            enhanced += `${line}\n`;
        } else {
            if (inList) {
                enhanced += '\n';
                inList = false;
            }
            enhanced += '\n';
        }
    });
    
    return enhanced.trim();
}

// 特徴・メリットを生成（より具体的に、空欄を減らす）
function generateFeatures(purpose, info, variation = 0, content = '') {
    // 入力内容から特徴を抽出
    const contentLower = content.toLowerCase();
    const extractedFeatures = [];
    
    // 入力内容から特徴を推測
    if (contentLower.includes('ai') || contentLower.includes('人工知能')) {
        extractedFeatures.push('AI技術を活用した高度な機能');
    }
    if (contentLower.includes('効率') || contentLower.includes('時間') || contentLower.includes('短縮')) {
        extractedFeatures.push('業務効率の大幅な向上');
    }
    if (contentLower.includes('簡単') || contentLower.includes('使いやすい') || contentLower.includes('直感的')) {
        extractedFeatures.push('直感的で使いやすいインターフェース');
    }
    if (contentLower.includes('無料') || contentLower.includes('free')) {
        extractedFeatures.push('無料で利用可能');
    }
    
    const baseFeatures = {
        'company-announcement': [
            `・戦略的な成長機会の創出により、新たな市場への展開が可能になります\n・組織力の強化と人材育成を通じて、持続的な成長基盤を構築します\n・市場における競争優位性の確立により、業界での地位を向上させます\n・ステークホルダーへの価値提供を通じて、長期的な信頼関係を構築します`,
            `・新規事業の展開により、収益基盤の多角化を実現します\n・組織体制の強化により、より迅速な意思決定と実行が可能になります\n・市場シェアの拡大により、ブランド価値の向上を目指します\n・お客様へのより良いサービス提供により、満足度の向上を実現します`
        ],
        'event-announcement': [
            `・業界の専門家による最新情報の提供により、実践的な知識を習得できます\n・参加者同士のネットワーキング機会により、新たなビジネスチャンスが生まれます\n・質疑応答による深い理解の促進により、具体的な課題解決策を見つけられます\n・実践的なワークショップにより、即座に活用できるスキルを身につけられます`,
            `・第一線で活躍する専門家による講演により、最新トレンドを把握できます\n・参加者同士の交流により、業界内のネットワークを拡大できます\n・ケーススタディの共有により、成功事例から学ぶことができます\n・継続的な学習機会により、スキルアップを実現できます`
        ],
        'tool-announcement': [
            `・直感的で使いやすいユーザーインターフェースにより、誰でも簡単に操作できます\n・高度な機能と柔軟なカスタマイズ性により、様々な用途に対応できます\n・迅速なサポートと充実したドキュメントにより、安心してご利用いただけます\n・継続的なアップデートと機能追加により、常に最新の機能を利用できます`,
            `・最新技術を活用した高機能なツールにより、業務効率が大幅に向上します\n・シンプルな操作により、学習コストを最小限に抑えられます\n・24時間365日のサポート体制により、いつでも安心してご利用いただけます\n・定期的な機能改善により、より使いやすく、より強力になります`
        ],
        'conversion': [
            `・明確な成果と効果の実感により、投資対効果を実感できます\n・専門的なサポートとコンサルティングにより、最適な戦略を立案できます\n・継続的な改善と最適化により、成果を最大化できます\n・長期的なパートナーシップにより、持続的な成長を実現できます`,
            `・実績に基づいたアプローチにより、確実な成果を実現できます\n・個別最適化されたソリューションにより、お客様の課題を解決します\n・データドリブンな改善により、継続的にパフォーマンスを向上させます\n・専任担当によるサポートにより、迅速な対応が可能です`
        ],
        'product-launch': [
            `・最新技術を活用した高品質な製品により、優れたパフォーマンスを実現します\n・ユーザーフレンドリーな設計により、ストレスなくご利用いただけます\n・信頼性と安全性の確保により、安心してご利用いただけます\n・充実したアフターサポートにより、長期的にご満足いただけます`,
            `・革新的な機能により、従来の製品では実現できなかった価値を提供します\n・直感的な操作性により、すぐに使いこなすことができます\n・高い品質基準により、長期間にわたってご利用いただけます\n・専門的なサポートにより、最適な活用方法をご提案します`
        ],
        'partnership': [
            `・両社の強みを活かした相乗効果により、新たな価値を創造します\n・新たな市場機会の創出により、事業拡大を実現します\n・顧客へのより良い価値提供により、満足度の向上を目指します\n・イノベーションの加速により、業界をリードする取り組みを推進します`,
            `・両社のリソースとノウハウの結集により、より強力なソリューションを提供します\n・共同開発により、お客様のニーズに最適化されたサービスを実現します\n・市場シェアの拡大により、より多くのお客様に価値を提供します\n・継続的な協業により、長期的な成長を実現します`
        ],
        'other': [
            `・明確な目標と戦略的なアプローチにより、確実な成果を実現します\n・継続的な改善と最適化により、常に最良の状態を維持します\n・ステークホルダーへの価値提供により、長期的な信頼関係を構築します\n・長期的な成功の基盤構築により、持続的な成長を実現します`
        ]
    };
    
    const options = baseFeatures[purpose] || baseFeatures['other'];
    let features = options[variation % options.length];
    
    // 抽出した特徴があれば追加
    if (extractedFeatures.length > 0) {
        const additionalFeatures = extractedFeatures.map(f => `・${f}`).join('\n');
        features = additionalFeatures + '\n' + features;
    }
    
    return features;
}

// 今後の展開を生成（バリエーション対応）
function generateFuturePlans(purpose, variation = 0) {
    const plans = {
        'company-announcement': [
            `今後も、市場の変化に柔軟に対応しながら、持続可能な成長を実現してまいります。お客様やパートナー企業の皆様と共に、新たな価値を創造してまいります。`,
            `今後も、戦略的な投資とイノベーションを通じて、業界をリードする企業として成長を続けてまいります。お客様に最高の価値を提供するため、常に最善を尽くしてまいります。`,
            `今後も、お客様第一の姿勢を貫き、継続的な改善と新たな取り組みを推進してまいります。ステークホルダーの皆様と共に、より良い未来を創造してまいります。`
        ],
        'event-announcement': [
            `今後も、定期的に同様のイベントを開催し、コミュニティの活性化と知識共有を促進してまいります。次回のイベントにもぜひご参加ください。`,
            `今後も、参加者の皆様に価値ある学びの機会を提供するため、継続的にイベントを開催してまいります。次回もより充実した内容でお届けいたします。`,
            `今後も、業界の最新トレンドをお届けするイベントを継続的に開催してまいります。参加者の皆様の成長をサポートする場として、進化し続けてまいります。`
        ],
        'tool-announcement': [
            `今後も、ユーザーのフィードバックを反映しながら、継続的に機能を改善・追加してまいります。より多くの方にご利用いただけるよう、積極的に開発を進めてまいります。`,
            `今後も、最新技術を取り入れながら、ユーザーのニーズに応える機能を追加してまいります。常に進化し続けるツールとして、お客様の成功をサポートしてまいります。`,
            `今後も、ユーザーの声を大切にしながら、使いやすさと機能性を向上させてまいります。より多くのお客様にご利用いただけるよう、継続的に改善を実施してまいります。`
        ],
        'conversion': [
            `今後も、お客様の成功を第一に考え、継続的なサポートと改善を実施してまいります。より良い成果を実現するため、常に最善を尽くしてまいります。`,
            `今後も、お客様のビジネス成長をサポートするため、最新の手法とノウハウを取り入れてまいります。成果を最大化するため、継続的に最適化を実施してまいります。`,
            `今後も、お客様との長期的なパートナーシップを大切にしながら、より良いサービスを提供してまいります。お客様の成功が私たちの成功と考え、全力でサポートしてまいります。`
        ],
        'product-launch': [
            `今後も、市場のニーズに応えるべく、継続的な改善と新機能の追加を実施してまいります。お客様の声を大切にしながら、より良い製品を提供してまいります。`,
            `今後も、お客様のフィードバックを反映しながら、製品の品質向上と機能拡充を進めてまいります。常に進化し続ける製品として、お客様に価値を提供してまいります。`,
            `今後も、最新技術とお客様のニーズを融合させながら、より優れた製品を開発してまいります。お客様に愛される製品を目指し、継続的に改善を実施してまいります。`
        ],
        'partnership': [
            `今後も、パートナー企業との協力関係を深めながら、新たな価値創造に取り組んでまいります。両社の強みを活かした相乗効果を最大化してまいります。`,
            `今後も、パートナー企業と共に、お客様により良い価値を提供するため、協業を深化させてまいります。共同でのイノベーションを通じて、新たな可能性を追求してまいります。`,
            `今後も、パートナー企業との強固な関係を基盤に、新たな事業機会を創出してまいります。両社のリソースを結集し、より大きな成果を実現してまいります。`
        ],
        'other': [
            `今後も、継続的な改善とイノベーションを通じて、より良いサービスを提供してまいります。お客様やステークホルダーの皆様と共に、成長してまいります。`,
            `今後も、お客様第一の姿勢を貫き、継続的な価値創造に取り組んでまいります。ステークホルダーの皆様と共に、持続的な成長を実現してまいります。`
        ]
    };
    
    const options = plans[purpose] || plans['other'];
    return options[variation % options.length];
}

// 情報を抽出（会社名、日付など）
function extractInfo(content) {
    const info = {
        companyName: '',
        date: '',
        location: ''
    };
    
    // 会社名の抽出（株式会社で始まる部分）
    const companyMatch = content.match(/株式会社[^\s（(]+/);
    if (companyMatch) {
        info.companyName = companyMatch[0];
    }
    
    // 日付の抽出
    const dateMatch = content.match(/\d{4}年\d{1,2}月\d{1,2}日/);
    if (dateMatch) {
        info.date = dateMatch[0];
    }
    
    // 場所の抽出
    const locationMatch = content.match(/（本社[：:][^）)]+）|（所在地[：:][^）)]+）/);
    if (locationMatch) {
        info.location = locationMatch[0];
    }
    
    return info;
}

// キーワード抽出
function extractKeywords(text) {
    const commonWords = ['の', 'を', 'に', 'は', 'が', 'と', 'で', 'も', 'から', 'まで', 'など', 'ため', 'こと', 'よう', 'する', 'ある', 'いる', 'なる'];
    const words = text
        .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 1 && !commonWords.includes(word));
    
    // 重複を除去し、上位5つを返す
    const uniqueWords = Array.from(new Set(words));
    return uniqueWords.slice(0, 5);
}

// 記事を表示
function displayArticle(article) {
    previewTitle.textContent = article.title;
    previewSummary.textContent = article.summary;
    previewBody.textContent = article.body;
    
    // キーワードを表示
    if (article.keywords.length > 0) {
        const keywordsList = previewKeywords.querySelector('.keywords-list');
        keywordsList.innerHTML = '';
        article.keywords.forEach(keyword => {
            const tag = document.createElement('span');
            tag.className = 'keyword-tag';
            tag.textContent = '#' + keyword;
            keywordsList.appendChild(tag);
        });
        previewKeywords.style.display = 'block';
    } else {
        previewKeywords.style.display = 'none';
    }
    
    // セクションを切り替え
    formSection.style.display = 'none';
    guideSection.style.display = 'none';
    previewSection.style.display = 'block';
    
    // 記事データを保存（コピー用）
    window.currentArticle = article;
}

// コピーボタン
copyBtn.addEventListener('click', async () => {
    if (!window.currentArticle) return;
    
    try {
        await navigator.clipboard.writeText(window.currentArticle.body);
        copyBtn.textContent = '✓ コピーしました';
        copyBtn.style.backgroundColor = '#4caf50';
        copyBtn.style.color = 'white';
        copyBtn.style.borderColor = '#4caf50';
        
        setTimeout(() => {
            copyBtn.textContent = '📋 コピー';
            copyBtn.style.backgroundColor = '';
            copyBtn.style.color = '';
            copyBtn.style.borderColor = '';
        }, 2000);
    } catch (err) {
        console.error('コピーに失敗しました:', err);
        alert('コピーに失敗しました。手動でコピーしてください。');
    }
});

// リセットボタン
resetBtn.addEventListener('click', () => {
    articleForm.reset();
    contentLength.textContent = '0';
    purposeHint.textContent = PURPOSE_DESCRIPTIONS[purposeSelect.value];
    
    formSection.style.display = 'block';
    guideSection.style.display = 'block';
    previewSection.style.display = 'none';
    
    window.currentArticle = null;
    window.lastFormData = null;
    
    // フォームセクションにスクロール
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// バックエンドサーバーの接続確認
// ページ読み込み時にプログレスバーを初期化
window.addEventListener('DOMContentLoaded', () => {
    initializeProgress(false);
    initializeProgress(true);
});

window.addEventListener('load', async () => {
    try {
        const response = await fetch('http://localhost:3000/health');
        if (response.ok) {
            console.log('✓ バックエンドサーバーに接続しました');
        }
    } catch (error) {
        console.warn('⚠ バックエンドサーバーに接続できません。テンプレートベースで動作します。');
        console.warn('サーバーを起動するには: cd server && npm install && npm start');
    }
});

