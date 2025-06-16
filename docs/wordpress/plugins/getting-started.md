# Tworzenie Wtyczek WordPress

## Wprowadzenie

W tym poradniku dowiesz się jak stworzyć profesjonalną wtyczkę dla WordPress. Pokażemy krok po kroku proces tworzenia, od podstawowej struktury po zaawansowane funkcjonalności.

## Struktura Wtyczki

Podstawowa struktura wtyczki WordPress:

```
moja-wtyczka/
├── moja-wtyczka.php
├── includes/
│   ├── class-main.php
│   ├── class-admin.php
│   └── class-public.php
├── admin/
│   ├── css/
│   ├── js/
│   └── partials/
├── public/
│   ├── css/
│   ├── js/
│   └── partials/
└── languages/
```

## Plik Główny Wtyczki

Podstawowy plik wtyczki (`moja-wtyczka.php`):

```php
<?php
/**
 * Plugin Name: Moja Wtyczka
 * Plugin URI: https://example.com/moja-wtyczka
 * Description: Opis mojej wtyczki
 * Version: 1.0.0
 * Author: DEPCORE
 * Author URI: https://depcore.pl
 * License: GPL v2 or later
 * Text Domain: moja-wtyczka
 */

// Zabezpieczenie przed bezpośrednim dostępem
if (!defined('ABSPATH')) {
    exit;
}

// Definicje stałych
define('MOJA_WTYCZKA_VERSION', '1.0.0');
define('MOJA_WTYCZKA_PATH', plugin_dir_path(__FILE__));
define('MOJA_WTYCZKA_URL', plugin_dir_url(__FILE__));

// Ładowanie głównej klasy
require_once MOJA_WTYCZKA_PATH . 'includes/class-main.php';
```

## Hooks i Filters

### Actions (Akcje)
```php
// Rejestracja akcji
add_action('init', 'moja_funkcja_init');
add_action('admin_menu', 'dodaj_menu_admin');

// Przykładowa funkcja
function moja_funkcja_init() {
    // Kod wykonywany podczas inicjalizacji
}
```

### Filters (Filtry)
```php
// Rejestracja filtra
add_filter('the_content', 'modyfikuj_tresc');

// Przykładowa funkcja filtrująca
function modyfikuj_tresc($content) {
    // Modyfikacja treści
    return $content;
}
```

## AJAX w WordPress

### Rejestracja Endpointów AJAX
```php
// Dla zalogowanych użytkowników
add_action('wp_ajax_moja_akcja', 'obsluga_ajax');
// Dla niezalogowanych użytkowników
add_action('wp_ajax_nopriv_moja_akcja', 'obsluga_ajax');

function obsluga_ajax() {
    // Sprawdzenie nonce
    check_ajax_referer('moj_nonce', 'nonce');
    
    // Logika obsługi
    $response = array('success' => true);
    wp_send_json($response);
}
```

## Custom Post Types

### Rejestracja Custom Post Type
```php
function zarejestruj_custom_post_type() {
    $args = array(
        'labels' => array(
            'name' => 'Produkty',
            'singular_name' => 'Produkt'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-products'
    );
    
    register_post_type('produkt', $args);
}
add_action('init', 'zarejestruj_custom_post_type');
```

## Meta Boxes

### Dodawanie Meta Box
```php
function dodaj_meta_box() {
    add_meta_box(
        'moj_meta_box',
        'Dodatkowe informacje',
        'wyswietl_meta_box',
        'post',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'dodaj_meta_box');

function wyswietl_meta_box($post) {
    // Zabezpieczenie
    wp_nonce_field('moj_meta_box', 'moj_meta_box_nonce');
    
    // Pobierz zapisane dane
    $wartosc = get_post_meta($post->ID, '_moja_meta', true);
    
    // Wyświetl pole
    echo '<label for="moje_pole">Pole:</label>';
    echo '<input type="text" id="moje_pole" name="moje_pole" value="' . esc_attr($wartosc) . '">';
}
```

## Settings API

### Rejestracja Ustawień
```php
function zarejestruj_ustawienia() {
    register_setting(
        'moja_grupa_opcji',
        'moje_ustawienia'
    );
    
    add_settings_section(
        'moja_sekcja',
        'Ustawienia wtyczki',
        'wyswietl_sekcje',
        'moja-strona-opcji'
    );
    
    add_settings_field(
        'moje_pole',
        'Moje pole',
        'wyswietl_pole',
        'moja-strona-opcji',
        'moja_sekcja'
    );
}
add_action('admin_init', 'zarejestruj_ustawienia');
```

## Bezpieczeństwo

### Podstawowe Zasady
1. Zawsze sprawdzaj uprawnienia użytkownika
2. Sanityzuj dane wejściowe
3. Escapuj dane wyjściowe
4. Używaj nonce dla formularzy i AJAX
5. Nie ufaj danym użytkownika

### Przykład Zabezpieczeń
```php
// Sprawdzanie uprawnień
if (!current_user_can('manage_options')) {
    return;
}

// Sanityzacja danych
$dane = sanitize_text_field($_POST['dane']);

// Escapowanie wyjścia
echo esc_html($dane);

// Sprawdzanie nonce
if (!wp_verify_nonce($_POST['nonce'], 'moja_akcja')) {
    die('Błąd bezpieczeństwa');
}
```

## Internacjonalizacja

### Przygotowanie Tekstów
```php
// W kodzie
__('Tekst do tłumaczenia', 'moja-wtyczka');
_e('Tekst do wyświetlenia', 'moja-wtyczka');

// Ładowanie tłumaczeń
function zaladuj_tlumaczenia() {
    load_plugin_textdomain(
        'moja-wtyczka',
        false,
        dirname(plugin_basename(__FILE__)) . '/languages/'
    );
}
add_action('plugins_loaded', 'zaladuj_tlumaczenia');
```

## Dobre Praktyki

1. Używaj prefiksów dla funkcji i zmiennych
2. Stosuj standardy kodowania WordPress
3. Dokumentuj kod
4. Optymalizuj zapytania do bazy danych
5. Testuj kod na różnych wersjach WordPress
6. Regularnie aktualizuj wtyczkę

## Debugowanie

### WP_DEBUG
Dodaj do wp-config.php:
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

### Logowanie
```php
error_log('Debugowanie: ' . print_r($dane, true));
```

## Deployment

1. Przygotuj plik README.md
2. Stwórz plik .gitignore
3. Usuń niepotrzebne pliki
4. Sprawdź kompatybilność
5. Przetestuj instalację
6. Przygotuj dokumentację

## Wsparcie

W przypadku pytań lub problemów z rozwojem wtyczek WordPress, skontaktuj się z nami:
- Email: biuro@depcore.pl
- Telefon: +48 783 342 094
