# Tworzenie Motywów WordPress

## Wprowadzenie

Ten poradnik przeprowadzi Cię przez proces tworzenia profesjonalnego motywu WordPress. Poznasz podstawową strukturę, niezbędne pliki oraz zaawansowane techniki tworzenia motywów.

## Struktura Motywu

Podstawowa struktura motywu WordPress:

```
moj-motyw/
├── style.css
├── index.php
├── header.php
├── footer.php
├── functions.php
├── sidebar.php
├── single.php
├── page.php
├── archive.php
├── 404.php
├── search.php
├── screenshot.png
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── template-parts/
    ├── content.php
    ├── content-page.php
    └── content-search.php
```

## Podstawowe Pliki

### style.css
```css
/*
Theme Name: Mój Motyw
Theme URI: https://example.com/moj-motyw
Author: DEPCORE
Author URI: https://depcore.pl
Description: Opis mojego motywu
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: moj-motyw
*/
```

### functions.php
```php
<?php
// Rejestracja menu
function zarejestruj_menu() {
    register_nav_menus(array(
        'primary' => __('Menu główne', 'moj-motyw'),
        'footer' => __('Menu w stopce', 'moj-motyw')
    ));
}
add_action('init', 'zarejestruj_menu');

// Wsparcie dla funkcji motywu
function konfiguracja_motywu() {
    // Dodaj wsparcie dla miniatur
    add_theme_support('post-thumbnails');
    
    // Dodaj wsparcie dla tytułu
    add_theme_support('title-tag');
    
    // Dodaj wsparcie dla HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption'
    ));
}
add_action('after_setup_theme', 'konfiguracja_motywu');
```

## Template Hierarchy

WordPress używa określonej hierarchii szablonów do wyświetlania różnych typów treści:

1. index.php (domyślny szablon)
2. home.php (strona z wpisami)
3. single.php (pojedynczy wpis)
4. page.php (strona)
5. archive.php (archiwum)
6. category.php (kategoria)
7. tag.php (tag)
8. author.php (autor)
9. date.php (data)
10. search.php (wyniki wyszukiwania)
11. 404.php (strona błędu)

## The Loop

Podstawowa pętla WordPress:
```php
if (have_posts()) :
    while (have_posts()) : the_post();
        get_template_part('template-parts/content', get_post_type());
    endwhile;
    
    the_posts_navigation();
else :
    get_template_part('template-parts/content', 'none');
endif;
```

## Customizer API

### Dodawanie Ustawień do Customizera
```php
function dodaj_ustawienia_customizer($wp_customize) {
    // Dodaj sekcję
    $wp_customize->add_section('moja_sekcja', array(
        'title' => __('Moje ustawienia', 'moj-motyw'),
        'priority' => 30
    ));
    
    // Dodaj ustawienie
    $wp_customize->add_setting('kolor_tla', array(
        'default' => '#ffffff',
        'sanitize_callback' => 'sanitize_hex_color'
    ));
    
    // Dodaj kontrolkę
    $wp_customize->add_control(new WP_Customize_Color_Control(
        $wp_customize,
        'kolor_tla',
        array(
            'label' => __('Kolor tła', 'moj-motyw'),
            'section' => 'moja_sekcja'
        )
    ));
}
add_action('customize_register', 'dodaj_ustawienia_customizer');
```

## Widgety

### Rejestracja Obszaru Widgetów
```php
function zarejestruj_sidebary() {
    register_sidebar(array(
        'name' => __('Sidebar główny', 'moj-motyw'),
        'id' => 'sidebar-1',
        'description' => __('Dodaj widgety tutaj', 'moj-motyw'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h2 class="widget-title">',
        'after_title' => '</h2>'
    ));
}
add_action('widgets_init', 'zarejestruj_sidebary');
```

## Enqueue Scripts & Styles

### Dodawanie Skryptów i Styli
```php
function zaladuj_style_i_skrypty() {
    // Style
    wp_enqueue_style(
        'moj-motyw-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get('Version')
    );
    
    // Skrypty
    wp_enqueue_script(
        'moj-motyw-navigation',
        get_template_directory_uri() . '/assets/js/navigation.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );
}
add_action('wp_enqueue_scripts', 'zaladuj_style_i_skrypty');
```

## Custom Templates

### Tworzenie Własnego Szablonu Strony
```php
<?php
/*
Template Name: Mój Szablon
*/

get_header();
?>

<main id="primary" class="site-main">
    <?php
    while (have_posts()) :
        the_post();
        get_template_part('template-parts/content', 'page');
    endwhile;
    ?>
</main>

<?php
get_sidebar();
get_footer();
```

## Responsywność

### Media Queries
```css
/* Tablet */
@media screen and (max-width: 768px) {
    /* Style dla tabletów */
}

/* Mobile */
@media screen and (max-width: 480px) {
    /* Style dla urządzeń mobilnych */
}
```

## Optymalizacja

1. Minimalizuj ilość zapytań do bazy danych
2. Używaj wp_enqueue_script/style
3. Optymalizuj obrazy
4. Implementuj lazy loading
5. Używaj cachowania

## SEO

1. Prawidłowa struktura nagłówków
2. Optymalizacja meta tagów
3. Schema.org markup
4. Optymalizacja obrazów
5. Przyjazne URL-e

## Bezpieczeństwo

1. Walidacja danych wejściowych
2. Escapowanie danych wyjściowych
3. Używanie prefixów
4. Aktualizacje zależności
5. Testowanie zabezpieczeń

## Testowanie

1. Sprawdzanie na różnych przeglądarkach
2. Testowanie responsywności
3. Walidacja kodu
4. Testy wydajności
5. Sprawdzanie dostępności

## Deployment

1. Minifikacja plików
2. Optymalizacja obrazów
3. Dokumentacja
4. Instrukcja instalacji
5. Zgodność z WordPress Coding Standards

## Wsparcie

Jeśli potrzebujesz pomocy w tworzeniu motywów WordPress:
- Email: biuro@depcore.pl
- Telefon: +48 783 342 094
