// Generate remaining locale files based on translations
import { writeFileSync } from 'fs';

const locales = {
  "es": {
    "nav.download": "Descarga", "nav.generate": "Generar Manifiesto", "nav.settings": "Configuración API",
    "nav.theme.dark": "Modo Oscuro", "nav.theme.light": "Modo Claro", "status.idle": "En espera",
    "header.sync": "Sincronización de descarga de MODs", "header.generate": "Generación de Manifiesto", "header.settings": "Configuración API y otros",
    "common.game_dir": "Directorio del juego (.minecraft, etc.)", "common.browse": "Seleccionar carpeta",
    "sync.manifest_file": "Archivo de manifiesto (JSON)", "sync.manifest_placeholder": "Ningún archivo seleccionado", "sync.check_diff": "Verificar diferencias",
    "generate.desc": "Escanear archivos locales y comparar con las APIs de Modrinth + CurseForge para crear un manifiesto.", "generate.start": "Iniciar escaneo",
    "console.clear": "Limpiar", "console.initial": "Especifique un directorio de juego e inicie una operación.", "progress.idle": "En espera",
    "results.title": "Manifiesto generado", "results.save": "Guardar", "results.copy": "Copiar",
    "settings.language": "Idioma / Language",
    "r2_upload.title": "¿Subir MODs no encontrados a R2?", "r2_upload.btn": "Subir a R2 ({0} archivos)", "r2_upload.go_settings": "Abrir configuración"
  },
  "fr": {
    "nav.download": "Téléchargement", "nav.generate": "Générer le Manifeste", "nav.settings": "Paramètres API",
    "nav.theme.dark": "Mode Sombre", "nav.theme.light": "Mode Clair", "status.idle": "En attente",
    "header.sync": "Synchronisation des téléchargements de MODs", "header.generate": "Génération du Manifeste", "header.settings": "Paramètres API et autres",
    "common.game_dir": "Répertoire du jeu (.minecraft, etc.)", "common.browse": "Sélectionner un dossier",
    "sync.manifest_file": "Fichier manifeste (JSON)", "sync.manifest_placeholder": "Aucun fichier sélectionné", "sync.check_diff": "Vérifier les différences",
    "generate.desc": "Scanner les fichiers locaux et les comparer avec les APIs Modrinth + CurseForge pour créer un manifeste.", "generate.start": "Lancer le scan",
    "console.clear": "Effacer", "console.initial": "Spécifiez un répertoire de jeu et lancez une opération.", "progress.idle": "En attente",
    "results.title": "Manifeste généré", "results.save": "Enregistrer", "results.copy": "Copier",
    "settings.language": "Langue / Language",
    "r2_upload.title": "Téléverser les MODs non trouvés vers R2 ?", "r2_upload.btn": "Téléverser vers R2 ({0} fichiers)", "r2_upload.go_settings": "Ouvrir les paramètres"
  },
  "de": {
    "nav.download": "Download", "nav.generate": "Manifest Erstellen", "nav.settings": "API-Einstellungen",
    "nav.theme.dark": "Dunkelmodus", "nav.theme.light": "Hellmodus", "status.idle": "Bereit",
    "header.sync": "MOD-Download-Synchronisation", "header.generate": "Manifest-Generierung", "header.settings": "API-Einstellungen & Sonstiges",
    "common.game_dir": "Spielverzeichnis (.minecraft usw.)", "common.browse": "Ordner auswählen",
    "generate.desc": "Lokale Dateien scannen und mit Modrinth + CurseForge APIs abgleichen, um ein Manifest zu erstellen.", "generate.start": "Scan starten",
    "console.clear": "Löschen", "progress.idle": "Bereit",
    "results.title": "Generiertes Manifest", "results.save": "Speichern", "results.copy": "Kopieren",
    "settings.language": "Sprache / Language",
    "r2_upload.title": "Nicht zugeordnete MODs zu R2 hochladen?", "r2_upload.btn": "Zu R2 hochladen ({0} Dateien)", "r2_upload.go_settings": "Einstellungen öffnen"
  },
  "it": {
    "nav.download": "Download", "nav.generate": "Genera Manifesto", "nav.settings": "Impostazioni API",
    "nav.theme.dark": "Modalità Scura", "nav.theme.light": "Modalità Chiara", "status.idle": "In attesa",
    "header.sync": "Sincronizzazione Download MOD", "header.generate": "Generazione Manifesto", "header.settings": "Impostazioni API e altro",
    "common.game_dir": "Directory del gioco (.minecraft, ecc.)", "common.browse": "Seleziona cartella",
    "generate.start": "Avvia scansione", "console.clear": "Cancella", "progress.idle": "In attesa",
    "results.title": "Manifesto generato", "results.save": "Salva", "results.copy": "Copia",
    "settings.language": "Lingua / Language",
    "r2_upload.title": "Caricare MOD non trovati su R2?", "r2_upload.btn": "Carica su R2 ({0} file)", "r2_upload.go_settings": "Apri impostazioni"
  },
  "pt-BR": {
    "nav.download": "Download", "nav.generate": "Gerar Manifesto", "nav.settings": "Configurações da API",
    "nav.theme.dark": "Modo Escuro", "nav.theme.light": "Modo Claro", "status.idle": "Aguardando",
    "header.sync": "Sincronização de Download de MODs", "header.generate": "Geração de Manifesto", "header.settings": "Configurações da API e outros",
    "common.game_dir": "Diretório do jogo (.minecraft, etc.)", "common.browse": "Selecionar pasta",
    "generate.start": "Iniciar varredura", "console.clear": "Limpar", "progress.idle": "Aguardando",
    "results.title": "Manifesto gerado", "results.save": "Salvar", "results.copy": "Copiar",
    "settings.language": "Idioma / Language",
    "r2_upload.title": "Enviar MODs não encontrados para o R2?", "r2_upload.btn": "Enviar para R2 ({0} arquivos)", "r2_upload.go_settings": "Abrir configurações"
  },
  "ru": {
    "nav.download": "Загрузка", "nav.generate": "Создать Манифест", "nav.settings": "Настройки API",
    "nav.theme.dark": "Тёмная тема", "nav.theme.light": "Светлая тема", "status.idle": "Ожидание",
    "header.sync": "Синхронизация загрузки модов", "header.generate": "Генерация манифеста", "header.settings": "Настройки API и другое",
    "common.game_dir": "Каталог игры (.minecraft и т.д.)", "common.browse": "Выбрать папку",
    "generate.start": "Начать сканирование", "console.clear": "Очистить", "progress.idle": "Ожидание",
    "results.title": "Сгенерированный манифест", "results.save": "Сохранить", "results.copy": "Копировать",
    "settings.language": "Язык / Language",
    "r2_upload.title": "Загрузить ненайденные моды в R2?", "r2_upload.btn": "Загрузить в R2 ({0} файлов)", "r2_upload.go_settings": "Открыть настройки"
  },
  "pl": {
    "nav.download": "Pobieranie", "nav.generate": "Generuj Manifest", "nav.settings": "Ustawienia API",
    "nav.theme.dark": "Tryb Ciemny", "nav.theme.light": "Tryb Jasny", "status.idle": "Oczekiwanie",
    "common.game_dir": "Katalog gry (.minecraft itp.)", "common.browse": "Wybierz folder",
    "generate.start": "Rozpocznij skanowanie", "console.clear": "Wyczyść", "progress.idle": "Oczekiwanie",
    "results.title": "Wygenerowany manifest", "results.save": "Zapisz", "results.copy": "Kopiuj",
    "settings.language": "Język / Language",
    "r2_upload.title": "Przesłać niedopasowane mody do R2?", "r2_upload.btn": "Prześlij do R2 ({0} plików)", "r2_upload.go_settings": "Otwórz ustawienia"
  },
  "nl": {
    "nav.download": "Download", "nav.generate": "Manifest Genereren", "nav.settings": "API-instellingen",
    "nav.theme.dark": "Donkere Modus", "nav.theme.light": "Lichte Modus", "status.idle": "Wachten",
    "common.game_dir": "Spelmap (.minecraft etc.)", "common.browse": "Map selecteren",
    "generate.start": "Scan starten", "console.clear": "Wissen", "progress.idle": "Wachten",
    "results.title": "Gegenereerd manifest", "results.save": "Opslaan", "results.copy": "Kopiëren",
    "settings.language": "Taal / Language",
    "r2_upload.title": "Niet-gevonden mods uploaden naar R2?", "r2_upload.btn": "Uploaden naar R2 ({0} bestanden)", "r2_upload.go_settings": "Instellingen openen"
  },
  "tr": {
    "nav.download": "İndirme", "nav.generate": "Manifest Oluştur", "nav.settings": "API Ayarları",
    "nav.theme.dark": "Karanlık Mod", "nav.theme.light": "Aydınlık Mod", "status.idle": "Beklemede",
    "common.game_dir": "Oyun Dizini (.minecraft vb.)", "common.browse": "Klasör Seç",
    "generate.start": "Taramayı Başlat", "console.clear": "Temizle", "progress.idle": "Beklemede",
    "results.title": "Oluşturulan Manifest", "results.save": "Kaydet", "results.copy": "Kopyala",
    "settings.language": "Dil / Language",
    "r2_upload.title": "Eşleşmeyen modları R2'ye yüklensin mi?", "r2_upload.btn": "R2'ye yükle ({0} dosya)", "r2_upload.go_settings": "Ayarları aç"
  },
  "th": {
    "nav.download": "ดาวน์โหลด", "nav.generate": "สร้างรายการ", "nav.settings": "ตั้งค่า API",
    "nav.theme.dark": "โหมดมืด", "nav.theme.light": "โหมดสว่าง", "status.idle": "รอ",
    "common.game_dir": "ไดเรกทอรีเกม (.minecraft ฯลฯ)", "common.browse": "เลือกโฟลเดอร์",
    "generate.start": "เริ่มสแกน", "console.clear": "ล้าง", "progress.idle": "รอ",
    "results.title": "รายการที่สร้าง", "results.save": "บันทึก", "results.copy": "คัดลอก",
    "settings.language": "ภาษา / Language",
    "r2_upload.title": "อัปโหลด MOD ที่ไม่พบไปยัง R2?", "r2_upload.btn": "อัปโหลดไปยัง R2 ({0} ไฟล์)", "r2_upload.go_settings": "เปิดการตั้งค่า"
  },
  "vi": {
    "nav.download": "Tải về", "nav.generate": "Tạo Manifest", "nav.settings": "Cài đặt API",
    "nav.theme.dark": "Chế độ tối", "nav.theme.light": "Chế độ sáng", "status.idle": "Đang chờ",
    "common.game_dir": "Thư mục game (.minecraft, v.v.)", "common.browse": "Chọn thư mục",
    "generate.start": "Bắt đầu quét", "console.clear": "Xóa", "progress.idle": "Đang chờ",
    "results.title": "Manifest đã tạo", "results.save": "Lưu", "results.copy": "Sao chép",
    "settings.language": "Ngôn ngữ / Language",
    "r2_upload.title": "Tải lên MOD không tìm thấy lên R2?", "r2_upload.btn": "Tải lên R2 ({0} tệp)", "r2_upload.go_settings": "Mở cài đặt"
  },
  "uk": {
    "nav.download": "Завантаження", "nav.generate": "Створити Маніфест", "nav.settings": "Налаштування API",
    "nav.theme.dark": "Темна тема", "nav.theme.light": "Світла тема", "status.idle": "Очікування",
    "common.game_dir": "Каталог гри (.minecraft тощо)", "common.browse": "Вибрати папку",
    "generate.start": "Почати сканування", "console.clear": "Очистити", "progress.idle": "Очікування",
    "results.title": "Згенерований маніфест", "results.save": "Зберегти", "results.copy": "Копіювати",
    "settings.language": "Мова / Language",
    "r2_upload.title": "Завантажити ненайдені моди в R2?", "r2_upload.btn": "Завантажити в R2 ({0} файлів)", "r2_upload.go_settings": "Відкрити налаштування"
  },
  "cs": {
    "nav.download": "Stahování", "nav.generate": "Generovat Manifest", "nav.settings": "Nastavení API",
    "nav.theme.dark": "Tmavý režim", "nav.theme.light": "Světlý režim", "status.idle": "Čeká se",
    "common.game_dir": "Herní adresář (.minecraft atd.)", "common.browse": "Vybrat složku",
    "generate.start": "Zahájit skenování", "console.clear": "Vymazat", "progress.idle": "Čeká se",
    "results.title": "Vygenerovaný manifest", "results.save": "Uložit", "results.copy": "Kopírovat",
    "settings.language": "Jazyk / Language",
    "r2_upload.title": "Nahrát nenalezené mody do R2?", "r2_upload.btn": "Nahrát do R2 ({0} souborů)", "r2_upload.go_settings": "Otevřít nastavení"
  },
  "sv": {
    "nav.download": "Nedladdning", "nav.generate": "Generera Manifest", "nav.settings": "API-inställningar",
    "nav.theme.dark": "Mörkt läge", "nav.theme.light": "Ljust läge", "status.idle": "Väntar",
    "common.game_dir": "Spelkatalog (.minecraft osv.)", "common.browse": "Välj mapp",
    "generate.start": "Starta skanning", "console.clear": "Rensa", "progress.idle": "Väntar",
    "results.title": "Genererat manifest", "results.save": "Spara", "results.copy": "Kopiera",
    "settings.language": "Språk / Language",
    "r2_upload.title": "Ladda upp omatchade mods till R2?", "r2_upload.btn": "Ladda upp till R2 ({0} filer)", "r2_upload.go_settings": "Öppna inställningar"
  },
  "id": {
    "nav.download": "Unduhan", "nav.generate": "Buat Manifes", "nav.settings": "Pengaturan API",
    "nav.theme.dark": "Mode Gelap", "nav.theme.light": "Mode Terang", "status.idle": "Menunggu",
    "common.game_dir": "Direktori Game (.minecraft dll.)", "common.browse": "Pilih Folder",
    "generate.start": "Mulai Pindai", "console.clear": "Hapus", "progress.idle": "Menunggu",
    "results.title": "Manifes yang Dihasilkan", "results.save": "Simpan", "results.copy": "Salin",
    "settings.language": "Bahasa / Language",
    "r2_upload.title": "Unggah MOD yang tidak cocok ke R2?", "r2_upload.btn": "Unggah ke R2 ({0} file)", "r2_upload.go_settings": "Buka pengaturan"
  }
};

// Add common keys to all locales
const common = { "app.title": "ModLinker", "app.version": "V0.3.0" };

for (const [code, dict] of Object.entries(locales)) {
  const full = { ...common, ...dict };
  const path = `src/i18n/${code}.json`;
  writeFileSync(path, JSON.stringify(full, null, 2) + "\n", "utf-8");
  console.log(`Created ${path}`);
}
