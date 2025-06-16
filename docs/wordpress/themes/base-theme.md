# Base Theme - Dokumentacja

## Opis

Base Theme to podstawowy motyw WordPress zaprojektowany jako fundament dla projektów tworzonych przez DEPCORE. Zapewnia solidną podstawę z wsparciem dla nowoczesnych technologii i najlepszych praktyk web developmentu.

## Instalacja

1. Pobierz pakiet motywu z repozytorium DEPCORE
2. Przejdź do WordPress Admin > Wygląd > Motywy
3. Kliknij "Dodaj nową" a następnie "Wyślij motyw"
4. Aktywuj motyw

## Struktura Motywu

```plaintext
base-theme/
├── assets/           # Zasoby (CSS, JS, obrazy)
├── inc/             # Funkcje PHP motywu
├── template-parts/  # Części szablonów
├── templates/       # Szablony stron
├── functions.php    # Główny plik funkcji
└── style.css       # Główny arkusz stylów
```

## Funkcje

### Gutenberg Blocks
- Custom blocks gallery
- Team members block
- Testimonials block
- Portfolio block

### Custom Post Types
- Portfolio
- Team
- Testimonials
- Services

### Advanced Custom Fields
- Predefiniowane pola dla CPT
- Opcje motywu
- Flexible Content

## Customizacja

### Opcje Motywu
```php
// Dodawanie własnych opcji
add_filter('depcore_theme_options', function($options) {
    $options['custom_option'] = [
        'type' => 'text',
        'default' => '',
        'label' => 'Custom Option'
    ];
    return $options;
});
```

### Kolory i Style
```scss
// assets/scss/_variables.scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$font-family-base: 'Arial', sans-serif;
```

### Szablony
```php
// templates/custom-template.php
<?php
/*
Template Name: Custom Template
*/

get_header();
?>

<div class="custom-template">
    <!-- Zawartość szablonu -->
</div>

<?php
get_footer();
```

## Hooks i Filtry

### Akcje
```php
// Po inicjalizacji motywu
do_action('depcore_theme_init');

// Przed renderowaniem header
do_action('depcore_before_header');

// Po renderowaniu footer
do_action('depcore_after_footer');
```

### Filtry
```php
// Modyfikacja klas body
add_filter('depcore_body_classes', function($classes) {
    return $classes;
});

// Dostosowanie opcji motywu
add_filter('depcore_theme_options', function($options) {
    return $options;
});
```

## Komponenty

### Navigation
```php
// Rejestracja menu
register_nav_menus([
    'primary' => __('Primary Menu', 'depcore'),
    'footer' => __('Footer Menu', 'depcore')
]);

// Wyświetlanie menu
wp_nav_menu([
    'theme_location' => 'primary',
    'container' => 'nav',
    'container_class' => 'main-navigation'
]);
```

### Sidebars
```php
// Rejestracja sidebara
register_sidebar([
    'name' => __('Main Sidebar', 'depcore'),
    'id' => 'sidebar-main',
    'description' => __('Main sidebar appears on all pages', 'depcore'),
    'before_widget' => '<div id="%1$s" class="widget %2$s">',
    'after_widget' => '</div>'
]);
```

## Optymalizacja

### Cache
```php
// Włączanie cache dla zasobów
add_filter('depcore_cache_assets', '__return_true');

// Customowa długość cache
add_filter('depcore_cache_expiration', function() {
    return WEEK_IN_SECONDS;
});
```

### Lazy Loading
```php
// Włączanie lazy loading dla obrazów
add_filter('depcore_lazy_loading', '__return_true');

// Customowy placeholder
add_filter('depcore_lazy_placeholder', function() {
    return 'data:image/gif;base64,...';
});
```

## Rozwiązywanie Problemów

### Debugowanie
1. Włącz tryb debug w wp-config.php:
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('DEPCORE_THEME_DEBUG', true);
```

2. Sprawdź logi w wp-content/debug.log

### Typowe Problemy

#### Problemy ze Stylami
1. Sprawdź czy assets zostały prawidłowo skompilowane
2. Wyczyść cache przeglądarki
3. Sprawdź kolejność ładowania styli

#### JavaScript nie działa
1. Sprawdź console.log w przeglądarce
2. Upewnij się, że jQuery jest załadowane
3. Sprawdź konflikty z innymi skryptami

## CLI Commands

```bash
# Kompilacja assets
wp depcore-theme compile

# Czyszczenie cache
wp depcore-theme cache clear

# Generowanie custom post types
wp depcore-theme generate cpt nazwa_cpt
```
