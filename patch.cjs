const fs = require('fs');
let h = fs.readFileSync('src/index.html', 'utf8');

// 既存の日本語を data-i18n に置換
h = h.replace(/<span id="theme-text">.*?<\/span>/, '<span id="theme-text" data-i18n="nav.theme.light">ライトモード</span>');

// placeholderとtitleの置換 (一部)
h = h.replace('placeholder="例: C:\\Users\\user\\AppData\\Roaming\\.minecraft"', 'placeholder="例: C:\\Users\\user\\AppData\\Roaming\\.minecraft" data-i18n="common.game_dir_placeholder" data-i18n-attr="placeholder"');
h = h.replace('title="フォルダを選択"', 'title="フォルダを選択" data-i18n="common.browse" data-i18n-attr="title"');

h = h.replace('placeholder="$2a$10$... (任意・未入力でもOK)"', 'placeholder="$2a$10$... (任意・未入力でもOK)" data-i18n="settings.cf_key_placeholder" data-i18n-attr="placeholder"');
h = h.replace('id="cf-key-save-btn" title="保存"', 'id="cf-key-save-btn" title="保存" data-i18n="common.save" data-i18n-attr="title"');
h = h.replace('id="cf-key-clear-btn" title="クリア"', 'id="cf-key-clear-btn" title="クリア" data-i18n="common.clear" data-i18n-attr="title"');

// CurseForgeテキスト
h = h.replace('Modrinth は常に使用されます。CurseForge は API キーを入力した場合のみ有効になります。', '<span data-i18n="settings.cf_key_hint">Modrinth は常に使用されます。CurseForge は API キーを入力した場合のみ有効になります。</span>');
h = h.replace('キーは <a class="url-link"', '<span data-i18n="settings.cf_key_link_prefix">キーは </span><a class="url-link"');
h = h.replace('for Studios</a> で取得できます。', 'for Studios</a> <span data-i18n="settings.cf_key_link_suffix">で取得できます。</span>');

// R2設定パネルのラベル
h = h.replace('Cloudflare R2 (非公式MODアップロード用)', '<span data-i18n="settings.r2.title">Cloudflare R2 (非公式MODアップロード用)</span>');
h = h.replace('💡 初心者向けセットアップガイド（ここをクリックして開く）', '<span data-i18n="settings.r2.guide_title">💡 初心者向けセットアップガイド（ここをクリックして開く）</span>');

// R2ガイド手順 (step1 ~ step7)
h = h.replace('<p>1. <a', '<p><span data-i18n="settings.r2.step1">1. Cloudflare ダッシュボードにログインし、「R2」を開きます。</span> <a');
h = h.replace('にログインし、「R2」を開きます。</p>', '</p>'); // 上の置換で残る部分を消す...正規表現のほうがいい

// R2 placeholder & title
h = h.replace('placeholder="Cloudflareダッシュボード右下の アカウント ID を入力"', 'placeholder="Cloudflareダッシュボード右下の アカウント ID を入力" data-i18n="settings.r2.account_id_placeholder" data-i18n-attr="placeholder"');
h = h.replace('placeholder="例: my-mod-repo"', 'placeholder="例: my-mod-repo" data-i18n="settings.r2.bucket_placeholder" data-i18n-attr="placeholder"');
h = h.replace('placeholder="例: a1b2c3d4e5f6g7h8..."', 'placeholder="例: a1b2c3d4e5f6g7h8..." data-i18n="settings.r2.access_key_placeholder" data-i18n-attr="placeholder"');
h = h.replace('placeholder="例: z9y8x7w6v5u4t3s2..."', 'placeholder="例: z9y8x7w6v5u4t3s2..." data-i18n="settings.r2.secret_key_placeholder" data-i18n-attr="placeholder"');
h = h.replace('placeholder="Public URL (例: https://pub-xxxx.r2.dev)"', 'placeholder="Public URL (例: https://pub-xxxx.r2.dev)" data-i18n="settings.r2.public_url_placeholder" data-i18n-attr="placeholder"');
h = h.replace('id="r2-save-btn" title="保存"', 'id="r2-save-btn" title="保存" data-i18n="common.save" data-i18n-attr="title"');
h = h.replace('id="r2-clear-btn" title="クリア"', 'id="r2-clear-btn" title="クリア" data-i18n="common.clear" data-i18n-attr="title"');

// syncパネル
h = h.replace('マニフェストファイル (JSON)', '<span data-i18n="sync.manifest_file">マニフェストファイル (JSON)</span>');
h = h.replace('placeholder="ファイルが選択されていません"', 'placeholder="ファイルが選択されていません" data-i18n="sync.manifest_placeholder" data-i18n-attr="placeholder"');
h = h.replace('id="browse-manifest-btn" title="ファイルを選択"', 'id="browse-manifest-btn" title="ファイルを選択" data-i18n="common.select_file" data-i18n-attr="title"');
h = h.replace('<span>非公式リンク (R2等) からのDLをスキップする</span>', '<span data-i18n="sync.skip_r2">非公式リンク (R2等) からのDLをスキップする</span>');
h = h.replace('<span>差分をチェック</span>', '<span data-i18n="sync.check_diff">差分をチェック</span>');
h = h.replace('<span>ダウンロード対象プレビュー</span>', '<span data-i18n="sync.diff_preview">ダウンロード対象プレビュー</span>');
h = h.replace('<span>ダウンロード開始</span>', '<span data-i18n="sync.download_start">ダウンロード開始</span>');

// 手動ダウンロードMODセクション
h = h.replace('<span>⚠ 手動ダウンロードが必要なMOD</span>', '<span data-i18n="sync.manual_dl_title">⚠ 手動ダウンロードが必要なMOD</span>');
h = h.replace('以下のMODはAPIからの自動DLが許可されていないため、ブラウザで手動ダウンロードしてください。', '<span data-i18n="sync.manual_dl_desc">以下のMODはAPIからの自動DLが許可されていないため、ブラウザで手動ダウンロードしてください。</span>');

// generateパネル
h = h.replace('ローカルをスキャンし、Modrinth + CurseForge API と照合してマニフェストを作成します。', '<span data-i18n="generate.desc">ローカルをスキャンし、Modrinth + CurseForge API と照合してマニフェストを作成します。</span>');
h = h.replace('結果は <code style="color: var(--accent-primary);">modlinker-manifest.json</code> に自動保存されます。', '<span data-i18n="generate.auto_save_prefix">結果は </span><code style="color: var(--accent-primary);">modlinker-manifest.json</code><span data-i18n="generate.auto_save_suffix"> に自動保存されます。</span>');
h = h.replace('<span>スキャン開始</span>', '<span data-i18n="generate.start">スキャン開始</span>');

// コンソール等
h = h.replace('<span>コンソール (同期)</span>', '<span data-i18n="console.sync">コンソール (同期)</span>');
h = h.replace('<span>コンソール (スキャン)</span>', '<span data-i18n="console.scan">コンソール (スキャン)</span>');
h = h.replace('id="clear-log-btn-sync" title="ログをクリア">クリア', 'id="clear-log-btn-sync" title="ログをクリア" data-i18n="console.clear" data-i18n-attr="title">クリア'); // ※textContentの置換はJSでやらないと面倒なので一旦titleだけ、と思いきやtextContentも置換する。
h = h.replace('id="clear-log-btn-sync" title="ログをクリア" data-i18n="console.clear" data-i18n-attr="title">クリア</button>', 'id="clear-log-btn-sync" title="ログをクリア" data-i18n="console.clear" data-i18n-attr="title">クリア</button>'); // 失敗したので次で正規表現使う

h = h.replace(/<button class="btn-ghost" id="clear-log-btn-sync" title="ログをクリア">クリア<\/button>/, '<button class="btn-ghost" id="clear-log-btn-sync" title="ログをクリア" data-i18n="console.clear">クリア</button>');
h = h.replace(/<button class="btn-ghost" id="clear-log-btn-generate" title="ログをクリア">クリア<\/button>/, '<button class="btn-ghost" id="clear-log-btn-generate" title="ログをクリア" data-i18n="console.clear">クリア</button>');

h = h.replace('<span>生成されたマニフェスト</span>', '<span data-i18n="results.title">生成されたマニフェスト</span>');
h = h.replace(/id="save-manifest-btn" title="ファイルに保存">保存<\/button>/, 'id="save-manifest-btn" title="ファイルに保存" data-i18n="results.save">保存</button>');
h = h.replace(/id="export-manifest-btn" title="クリップボードにコピー">コピー<\/button>/, 'id="export-manifest-btn" title="クリップボードにコピー" data-i18n="results.copy">コピー</button>');

// テーブルヘッダ
h = h.replace('<th>ディレクトリ</th>', '<th data-i18n="results.col.dir">ディレクトリ</th>');
h = h.replace('<th>ソース</th>', '<th data-i18n="results.col.source">ソース</th>');
h = h.replace('<th>ファイル名</th>', '<th data-i18n="results.col.filename">ファイル名</th>');
h = h.replace('<th>プロジェクト名</th>', '<th data-i18n="results.col.project">プロジェクト名</th>');
h = h.replace('<th>DL URL</th>', '<th data-i18n="results.col.url">DL URL</th>');
h = h.replace('<th>アクション</th>', '<th data-i18n="results.col.action">アクション</th>');
h = h.replace('<th>ステータス</th>', '<th data-i18n="results.col.status">ステータス</th>');

fs.writeFileSync('src/index.html', h);
console.log('HTML patched successfully');
