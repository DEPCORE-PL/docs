# OctoberCMS - Dokumentacja Techniczna

## Przegląd Platformy

OctoberCMS to system zarządzania treścią oparty na Laravel, wykorzystujący PHP 7.4+ i architekturę MVC. Ten dokument zawiera szczegółowe informacje o komponentach i wtyczkach DEPCORE dla OctoberCMS.

## Wymagania Techniczne

### Serwer
- PHP 7.4 lub nowszy
- Composer 2.0+
- MySQL 5.7+ lub MariaDB 10.2+
- Wymagane rozszerzenia PHP:
  - PDO PHP Extension
  - cURL PHP Extension
  - OpenSSL PHP Extension
  - Mbstring PHP Extension
  - ZipArchive PHP Extension
  - GD PHP Extension

### Rekomendowana Konfiguracja PHP
```ini
memory_limit = 512M
max_execution_time = 600
post_max_size = 128M
upload_max_filesize = 128M
```

## Struktura Projektu
```plaintext
octobercms/
├── plugins/           # Wtyczki
│   └── depcore/      # Nasze wtyczki
├── themes/           # Motywy
│   └── depcore/      # Nasze motywy
├── modules/          # Moduły systemu
├── storage/          # Pliki cache, logi
└── config/           # Konfiguracja

## Dostępne Komponenty DEPCORE

### Wtyczki

#### Core Extensions
Rozszerzenie podstawowych funkcjonalności:
- Zaawansowane komponenty formularzy
- System powiadomień
- Integracje API
- Narzędzia deweloperskie

[Dokumentacja Core Extensions](plugins/core-extensions.md)

#### Content Manager
System zarządzania treścią:
- Edytor wizualny WYSIWYG
- Zarządzanie mediami
- System wersjonowania
- Import/Export danych

[Dokumentacja Content Manager](plugins/content-manager.md)

#### Security Pack
Zabezpieczenia i optymalizacja:
- Firewall aplikacyjny
- System cache'owania
- Kompresja zasobów
- Monitorowanie bezpieczeństwa

[Dokumentacja Security Pack](plugins/security-pack.md)

### Motywy

#### Base Theme
Podstawowy motyw z wsparciem dla:
- Responsywnego designu
- Custom layouts
- Dynamic pages
- SCSS framework

[Dokumentacja Base Theme](themes/base-theme.md)

## Instalacja i Konfiguracja

### Instalacja przez Composer
```bash
composer require depcore/plugin-name
php artisan october:up
```

### Instalacja Ręczna
```bash
# W katalogu plugins/depcore
unzip plugin-package.zip
php artisan plugin:refresh Depcore.PluginName
```

### Podstawowa Konfiguracja
```php
// config/depcore/plugin-name.php
return [
    'api_key' => env('PLUGIN_API_KEY'),
    'cache_enabled' => true,
    'debug_mode' => false
];
```

## API i Rozszerzenia

### Przykład Wykorzystania API
```php
use Depcore\PluginName\Classes\ApiClient;

$client = new ApiClient();
$result = $client->processData($input);
```

### Hooks i Events
```php
// Rejestracja event listenera
Event::listen('depcore.plugin.event', function($data) {
    // Obsługa eventu
});
```

## Rozwiązywanie Problemów

### Debugowanie
```php
// W .env
DEPCORE_DEBUG=true
DEPCORE_LOG_LEVEL=debug
```

### Typowe Problemy
1. Problem z cache - wyczyść cache:
```bash
php artisan cache:clear
```

2. Problem z migracjami:
```bash
php artisan october:down
php artisan october:up
```

[Dokumentacja Rozwiązywania Problemów](troubleshooting.md)


