// サンプルデータ（複数パターン）
const SAMPLE_DATA_ARRAY = [
    {
        yourCompany: 'サンプル株式会社',
        yourName: '田中一郎',
        yourEmail: 't.tanaka@example.com',
        targetCompany: 'テスト広告株式会社',
        exclusionKeywords: 'サンプル株式会社\nSample Company\nサンプル株式会社 求人\nサンプル株式会社 サービス\nサンプル株式会社 広告',
        tone: 'polite'
    },
    {
        yourCompany: 'テストソリューションズ株式会社',
        yourName: '山田花子',
        yourEmail: 'hanako.yamada@example.com',
        targetCompany: 'デモ広告代理店株式会社',
        exclusionKeywords: 'テストソリューションズ\nTest Solutions\nテストソリューションズ 求人',
        tone: 'very-polite'
    },
    {
        yourCompany: 'デモマーケティング株式会社',
        yourName: '佐藤次郎',
        yourEmail: 'jiro.sato@example.com',
        targetCompany: 'サンプルマーケティング株式会社',
        exclusionKeywords: 'デモマーケティング\nDemo Marketing\nデモマーケティング 採用',
        tone: 'business'
    }
];

// ランダムにサンプルデータを取得する関数
function getRandomSampleData() {
    const randomIndex = Math.floor(Math.random() * SAMPLE_DATA_ARRAY.length);
    return SAMPLE_DATA_ARRAY[randomIndex];
}

// DOM要素の取得
const formSection = document.getElementById('form-section');
const previewSection = document.getElementById('preview-section');
const guideSection = document.getElementById('guide-section');
const requestForm = document.getElementById('request-form');
const trySampleBtn = document.getElementById('try-sample-btn');
const yourCompanyInput = document.getElementById('your-company');
const yourNameInput = document.getElementById('your-name');
const yourEmailInput = document.getElementById('your-email');
const targetCompanyInput = document.getElementById('target-company');
const exclusionKeywordsTextarea = document.getElementById('exclusion-keywords');
const toneSelect = document.getElementById('tone');
const generateBtn = document.getElementById('generate-btn');
const loadingDiv = document.getElementById('loading');
const previewLoadingDiv = document.getElementById('preview-loading');
const regenerateBtn = document.getElementById('regenerate-btn');
const copyBtn = document.getElementById('copy-btn');
const resetBtn = document.getElementById('reset-btn');
const previewBody = document.getElementById('preview-body');

// お試しボタン
trySampleBtn.addEventListener('click', () => {
    const sampleData = getRandomSampleData();
    
    yourCompanyInput.value = sampleData.yourCompany;
    yourNameInput.value = sampleData.yourName;
    yourEmailInput.value = sampleData.yourEmail;
    targetCompanyInput.value = sampleData.targetCompany;
    exclusionKeywordsTextarea.value = sampleData.exclusionKeywords;
    toneSelect.value = sampleData.tone;
    
    // フォームの先頭にスクロール
    yourCompanyInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    yourCompanyInput.focus();
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
    initializeProgress(isRegenerating);
    updateProgress(0, isRegenerating);
    
    let progress = 0;
    const targetProgress = 95;
    const duration = 20000; // 20秒で95%まで
    const interval = 50;
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

// 依頼文章生成（共通関数）
async function generateRequestFromForm(variation = 0, isRegenerating = false) {
    const formData = {
        yourCompany: yourCompanyInput.value.trim(),
        yourName: yourNameInput.value.trim(),
        yourEmail: yourEmailInput.value.trim(),
        targetCompany: targetCompanyInput.value.trim(),
        exclusionKeywords: exclusionKeywordsTextarea.value.trim(),
        tone: toneSelect.value
    };
    
    // バリデーション
    if (!formData.yourCompany || !formData.yourName || !formData.yourEmail || 
        !formData.targetCompany || !formData.exclusionKeywords) {
        alert('すべての必須項目を入力してください。');
        return null;
    }

    // キーワードの検証
    const keywordList = formData.exclusionKeywords
        .split('\n')
        .map(k => k.trim())
        .filter(k => k.length > 0);
    
    if (keywordList.length === 0) {
        alert('除外キーワードを1つ以上入力してください。');
        return null;
    }
    
    // ローディング表示
    let progressInterval;
    if (isRegenerating) {
        if (previewLoadingDiv) {
            previewLoadingDiv.classList.add('active');
            setTimeout(() => {
                progressInterval = startProgressAnimation(true);
            }, 100);
        }
        if (regenerateBtn) {
            regenerateBtn.disabled = true;
            regenerateBtn.textContent = '🔄 再生成中...';
        }
    } else {
        generateBtn.disabled = true;
        generateBtn.textContent = '✨ 生成中...';
        if (regenerateBtn) regenerateBtn.disabled = true;
        if (loadingDiv) {
            loadingDiv.style.display = 'block';
            setTimeout(() => {
                progressInterval = startProgressAnimation(false);
            }, 100);
        }
    }
    
    try {
        let request;
        try {
            request = await generateRequestWithAI(formData, variation);
            if (progressInterval) clearInterval(progressInterval);
            updateProgress(100, isRegenerating);
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (apiError) {
            console.warn('バックエンドAPIエラー、テンプレートベースにフォールバック:', apiError);
            if (progressInterval) clearInterval(progressInterval);
            updateProgress(100, isRegenerating);
            await new Promise(resolve => setTimeout(resolve, 500));
            request = generateRequestTemplate(formData, variation);
        }
        
        displayRequest(request);
        
        // フォームデータを保存（再生成用）
        window.lastFormData = formData;
        
        if (!isRegenerating) {
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } catch (error) {
        console.error('依頼文章生成エラー:', error);
        if (progressInterval) clearInterval(progressInterval);
        alert('依頼文章の生成に失敗しました。APIキーが正しいか確認してください。\n\nエラー: ' + error.message);
        
        const request = generateRequestTemplate(formData, variation);
        displayRequest(request);
    } finally {
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
            generateBtn.textContent = '✨ 依頼文章を生成する';
            if (regenerateBtn) regenerateBtn.disabled = false;
        }
    }
}

// バックエンドAPIを使用した依頼文章生成
async function generateRequestWithAI(formData, variation = 0) {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const API_URL = isLocalhost 
        ? 'http://localhost:3000/api/generate-exclusion'
        : '/api/generate-exclusion';
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            yourCompany: formData.yourCompany,
            yourName: formData.yourName,
            yourEmail: formData.yourEmail,
            targetCompany: formData.targetCompany,
            exclusionKeywords: formData.exclusionKeywords,
            tone: formData.tone,
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

// テンプレートベースの依頼文章生成（フォールバック用）
function generateRequestTemplate(formData, variation = 0) {
    const keywordList = formData.exclusionKeywords
        .split('\n')
        .map(k => k.trim())
        .filter(k => k.length > 0);

    const toneSettings = {
        'polite': {
            greeting: 'フォームより失礼いたします。',
            closing: '何卒よろしくお願いいたします。'
        },
        'very-polite': {
            greeting: '突然のご連絡となり恐縮ですが、フォームより失礼いたします。',
            closing: 'お忙しい中恐縮ですが、ご検討いただけますと幸いです。何卒よろしくお願い申し上げます。'
        },
        'business': {
            greeting: 'フォームよりご連絡申し上げます。',
            closing: 'ご検討のほど、よろしくお願いいたします。'
        },
        'friendly': {
            greeting: 'フォームよりご連絡いたします。',
            closing: 'ご対応いただけますと幸いです。よろしくお願いいたします。'
        }
    };

    const selectedTone = toneSettings[formData.tone] || toneSettings['polite'];

    let body = `メッセージ:\n\n`;
    body += ` マーケティングご担当者様\n\n`;
    body += `${selectedTone.greeting}\n\n`;
    body += `${formData.yourCompany}の${formData.yourName}と申します。\n\n`;
    body += `(${formData.yourEmail})\n\n`;
    body += `貴社が出稿されているリスティング広告につきまして、一部キーワードでの除外設定をご検討いただきたくご連絡いたしました。\n\n`;
    body += `検索エンジンにて当社名「${formData.yourCompany}」に関連するキーワードで検索した際、貴社の広告が表示されている状況を確認いたしました。\n\n`;
    body += `おそらく意図せず配信されている（インテントマッチ／部分一致など）ものと存じます。\n\n`;
    body += `もちろん、除外対応については貴社のご判断によるものと理解しております。\n\n`;
    body += `しかしながら、本件は当社名で検索されているユーザーの可能性が高く、弊社としてはそのユーザーと適切に接点を持ちたい意図がございます。また、貴社にとっても必ずしも求めるユーザー層ではない可能性があると拝察しております。\n\n`;
    body += `そのため大変恐縮ですが、該当キーワードの除外設定をご検討いただけますと幸いです。\n\n`;
    body += `もし代理店様へ運用を委託されている場合は、以下のキーワードを「フレーズ一致除外」にてご対応可能かご確認いただければと存じます。\n\n`;
    body += `突然のご連絡となり恐縮ですが、お忙しい中ご確認いただけますと幸いです。\n\n`;
    body += `${selectedTone.closing}\n\n`;
    body += `〈該当メディア〉\n\n`;
    body += ` ※貴社が出稿している以下の媒体にて除外いただけますと幸いです。\n\n`;
    body += ` ・Google\n\n`;
    body += ` ・Yahoo！\n\n`;
    body += ` ・Microsoft\n\n`;
    body += `<除外登録いただきたいキーワード>\n\n`;
    keywordList.forEach(keyword => {
        body += ` ・${keyword}\n`;
    });
    body += `\n〈マッチタイプ〉\n\n`;
    body += ` フレーズ一致`;

    return {
        body: body,
        keywords: keywordList
    };
}

// フォーム送信
requestForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    generateRequestFromForm(0);
});

// 再生成ボタン
if (regenerateBtn) {
    regenerateBtn.addEventListener('click', async () => {
        regenerateBtn.disabled = true;
        regenerateBtn.textContent = '🔄 再生成中...';
        
        if (previewSection && previewSection.style.display === 'none') {
            previewSection.style.display = 'block';
        }
        
        if (previewLoadingDiv) {
            previewLoadingDiv.classList.add('active');
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (window.lastFormData) {
            const variation = Math.floor(Math.random() * 3) + 1;
            generateRequestFromForm(variation, true);
        } else {
            generateRequestFromForm(Math.floor(Math.random() * 3) + 1, true);
        }
    });
}

// 依頼文章を表示
function displayRequest(request) {
    previewBody.textContent = request.body;
    
    formSection.style.display = 'none';
    guideSection.style.display = 'none';
    previewSection.style.display = 'block';
    
    window.currentRequest = request;
}

// コピーボタン
copyBtn.addEventListener('click', async () => {
    if (!window.currentRequest) return;
    
    try {
        await navigator.clipboard.writeText(window.currentRequest.body);
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
    requestForm.reset();
    
    formSection.style.display = 'block';
    guideSection.style.display = 'block';
    previewSection.style.display = 'none';
    
    window.currentRequest = null;
    window.lastFormData = null;
    
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ページ読み込み時にプログレスバーを初期化
window.addEventListener('DOMContentLoaded', () => {
    initializeProgress(false);
    initializeProgress(true);
});

