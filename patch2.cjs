const fs = require('fs');
let h = fs.readFileSync('src/index.html', 'utf8');

h = h.replace('<span>ダウンロード開始</span>', '<span data-i18n="sync.download_start">ダウンロード開始</span>');
h = h.replace('ダウンロード開始', '<span data-i18n="sync.download_start">ダウンロード開始</span>'); // btnの中など
h = h.replace('<span>コンソール (同期)</span>', '<span data-i18n="console.sync">コンソール (同期)</span>');
h = h.replace('<span>コンソール (ダウンロード)</span>', '<span data-i18n="console.sync">コンソール (同期)</span>'); // 旧名対応

h = h.replace('<span>待機中</span>', '<span data-i18n="status.idle">待機中</span>');
h = h.replace('<span class="progress-label" id="progress-label">待機中</span>', '<span class="progress-label" id="progress-label" data-i18n="status.idle">待機中</span>');
h = h.replace('<span class="log-msg">マニフェストファイルを読み込み、「チェック」を押してください。</span>', '<span class="log-msg" data-i18n="console.initial_sync">マニフェストファイルを読み込み、「チェック」を押してください。</span>');
h = h.replace('<span class="log-msg">ゲームディレクトリを指定してスキャンを開始してください。</span>', '<span class="log-msg" data-i18n="console.initial_scan">ゲームディレクトリを指定してスキャンを開始してください。</span>');

h = h.replace('<th>ディレクトリ</th>', '<th data-i18n="results.col.dir">ディレクトリ</th>');
h = h.replace('<th>アクション</th>', '<th data-i18n="results.col.action">アクション</th>');
h = h.replace('<th>ファイル名</th>', '<th data-i18n="results.col.filename">ファイル名</th>');
h = h.replace('<th>ステータス</th>', '<th data-i18n="results.col.status">ステータス</th>');
h = h.replace('<th>ソース</th>', '<th data-i18n="results.col.source">ソース</th>');
h = h.replace('<th>プロジェクト名</th>', '<th data-i18n="results.col.project">プロジェクト名</th>');
h = h.replace('<th>DL URL</th>', '<th data-i18n="results.col.url">DL URL</th>');

// R2ガイド文の詳細
h = h.replace('<p>2. <b>「バケットの作成」</b>', '<p><span data-i18n="settings.r2.step2">2. <b>「バケットの作成」</b> から好きな名前 (例: <code>my-mod-repo</code>) で作成します。これが <b>Bucket Name</b> になります。</span></p>');
h = h.replace('から好きな名前 (例: <code>my-mod-repo</code>) で作成します。これが <b>Bucket Name</b> になります。</p>', '');
h = h.replace('3. 作成したバケットの設定から <b>R2.dev サブドメイン</b> を「許可」にします。<br>', '<span data-i18n="settings.r2.step3">3. 作成したバケットの設定から <b>R2.dev サブドメイン</b> を「許可」にします。</span><br>');
h = h.replace('<span style="color: #ef4444; font-weight: bold;">※ 注意: これを許可すると、URLを知っている全員がMODをダウンロード可能になります。プライベートなファイルは置かないでください。</span><br>', '<span style="color: #ef4444; font-weight: bold;" data-i18n="settings.r2.step3_warn">※ 注意: これを許可すると、URLを知っている全員がMODをダウンロード可能になります。プライベートなファイルは置かないでください。</span><br>');
h = h.replace('表示されたパブリックURL (<code>https://pub-xxxx.r2.dev</code> 等) が <b>Public URL</b> になります。', '<span data-i18n="settings.r2.step3_url">表示されたパブリックURL (<code>https://pub-xxxx.r2.dev</code> 等) が <b>Public URL</b> になります。</span>');
h = h.replace('4. (重要) 設定画面の <b>CORS ポリシー</b> で「CORS ポリシーの追加」から以下を設定してください。これがないと他の人がダウンロードできません。<br>', '<span data-i18n="settings.r2.step4">4. (重要) 設定画面の <b>CORS ポリシー</b> で「CORS ポリシーの追加」から以下を設定してください。これがないと他の人がダウンロードできません。</span><br>');
h = h.replace('・許可されるオリジン: <code>*</code> または <code>tauri://localhost</code><br>', '<span data-i18n="settings.r2.step4_origin">・許可されるオリジン: <code>*</code> または <code>tauri://localhost</code></span><br>');
h = h.replace('・許可されるメソッド: <code>GET</code>', '<span data-i18n="settings.r2.step4_method">・許可されるメソッド: <code>GET</code></span>');
h = h.replace('<p>5. R2トップページ右上の <b>R2 API トークンの管理</b> から「API トークンの作成」をします。</p>', '<p data-i18n="settings.r2.step5">5. R2トップページ右上の <b>R2 API トークンの管理</b> から「API トークンの作成」をします。</p>');
h = h.replace('<p>6. 「オブジェクト 読み取りと書き込み」権限で作成します。<br>表示された <b>アクセスキー ID</b> を <b>アクセスキー</b> の欄にコピーしてね。</p>', '<p data-i18n="settings.r2.step6">6. 「オブジェクト 読み取りと書き込み」権限で作成します。<br>表示された <b>アクセスキー ID</b> を <b>アクセスキー</b> の欄にコピーしてね。</p>');
h = h.replace('<p>7. 同様に <b>シークレットアクセスキー</b> をコピーして一番上の欄に貼り付けます。</p>', '<p data-i18n="settings.r2.step7">7. 同様に <b>シークレットアクセスキー</b> をコピーして一番上の欄に貼り付けます。</p>');

// R2 input labels
h = h.replace('<span class="label-text">アカウント ID (Account ID)</span>', '<span class="label-text" data-i18n="settings.r2.account_id">アカウント ID (Account ID)</span>');
h = h.replace('<span class="label-text">Bucket Name</span>', '<span class="label-text" data-i18n="settings.r2.bucket">Bucket Name</span>');
h = h.replace('<span class="label-text">アクセスキー (Access Key ID)</span>', '<span class="label-text" data-i18n="settings.r2.access_key">アクセスキー (Access Key ID)</span>');
h = h.replace('<span class="label-text">シークレットキー (Secret Access Key)</span>', '<span class="label-text" data-i18n="settings.r2.secret_key">シークレットキー (Secret Access Key)</span>');
h = h.replace('<span class="label-text">Public URL (R2.dev URL)</span>', '<span class="label-text" data-i18n="settings.r2.public_url">Public URL (R2.dev URL)</span>');

// diff table header (another)
h = h.replace('<th>ディレクトリ</th>', '<th data-i18n="results.col.dir">ディレクトリ</th>');
h = h.replace('<th>アクション</th>', '<th data-i18n="results.col.action">アクション</th>');
h = h.replace('<th>ファイル名</th>', '<th data-i18n="results.col.filename">ファイル名</th>');
h = h.replace('<th>ステータス</th>', '<th data-i18n="results.col.status">ステータス</th>');
h = h.replace('<th>ソース</th>', '<th data-i18n="results.col.source">ソース</th>');
h = h.replace('<th>プロジェクト名</th>', '<th data-i18n="results.col.project">プロジェクト名</th>');
h = h.replace('<th>DL URL</th>', '<th data-i18n="results.col.url">DL URL</th>');

// btn-ghost のダウンロード開始対策
h = h.replace(/<button class="btn-primary" id="execute-download-btn">.*<\/button>/, '<button class="btn-primary" id="execute-download-btn" data-i18n="sync.download_start">ダウンロード開始</button>');

// title "ログをクリア" -> data-i18n-attr="title"
h = h.replace('id="clear-log-btn-sync" title="ログをクリア"', 'id="clear-log-btn-sync" title="ログをクリア" data-i18n-attr="title"');
h = h.replace('id="clear-log-btn-generate" title="ログをクリア"', 'id="clear-log-btn-generate" title="ログをクリア" data-i18n-attr="title"');

fs.writeFileSync('src/index.html', h);
