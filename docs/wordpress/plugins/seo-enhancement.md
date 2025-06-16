# SEO Enhancement - Dokumentacja

## Opis

SEO Enhancement to wtyczka WordPress rozszerzająca możliwości optymalizacji dla wyszukiwarek. Zapewnia zaawansowane narzędzia do zarządzania meta tagami, Schema.org i mapami witryn.

## Instalacja

1. Pobierz pakiet wtyczki z repozytorium DEPCORE
2. Przejdź do WordPress Admin > Wtyczki > Dodaj nową
3. Kliknij "Wyślij wtyczkę" i wybierz pobrany plik
4. Aktywuj wtyczkę

## Konfiguracja

### Podstawowe Ustawienia
```php
// Przykład konfiguracji w wp-config.php
define('DEPCORE_SEO_DEBUG', false);
define('DEPCORE_SEO_SITEMAP_LIMIT', 1000);
```

### Dostępne Filtry
```php
// Modyfikacja meta tagów
add_filter('depcore_seo_meta_tags', function($meta_tags) {
    // Modyfikacje
    return $meta_tags;
});

// Dostosowanie Schema.org
add_filter('depcore_seo_schema', function($schema) {
    // Modyfikacje
    return $schema;
});
```

## Funkcje

### Meta Tagi
- Automatyczna generacja title i description
- Customowe meta tagi per strona/post
- Open Graph i Twitter Cards
- Canonical URLs

### Schema.org
- Automatyczne markup dla artykułów
- Wsparcie dla Rich Snippets
- Local Business markup
- Breadcrumbs markup

### Mapy Witryn
- Automatyczna generacja sitemap.xml
- Wsparcie dla różnych typów treści
- Priorytezacja URL
- Integracja z Google Search Console

## API

### Pobieranie Meta Tagów
```php
$meta = DepCore\SEO\MetaTags::get($post_id);
echo $meta->getTitle();
echo $meta->getDescription();
```

### Modyfikacja Schema.org
```php
$schema = DepCore\SEO\Schema::get($post_id);
$schema->setType('Article');
$schema->addProperty('author', 'John Doe');
```

### Generowanie Mapy Witryn
```php
DepCore\SEO\Sitemap::generate([
    'post_types' => ['post', 'page', 'product'],
    'taxonomies' => ['category', 'post_tag']
]);
```

## Hooks

### Akcje
```php
// Po aktualizacji meta tagów
do_action('depcore_seo_meta_updated', $post_id, $meta);

// Przed generowaniem sitemap
do_action('depcore_seo_before_sitemap_generate');

// Po wygenerowaniu sitemap
do_action('depcore_seo_after_sitemap_generate');
```

### Filtry
```php
// Modyfikacja URL kanonicznych
add_filter('depcore_seo_canonical_url', function($url, $post) {
    return $url;
}, 10, 2);

// Dostosowanie priorytetów sitemap
add_filter('depcore_seo_sitemap_priority', function($priority, $post) {
    return $priority;
}, 10, 2);
```

## Rozwiązywanie Problemów

### Debugowanie
1. Włącz tryb debug w wp-config.php:
```php
define('DEPCORE_SEO_DEBUG', true);
```

2. Sprawdź logi w wp-content/debug.log

### Typowe Problemy

#### Meta tagi się nie generują
1. Sprawdź czy strona nie ma ręcznie ustawionych meta tagów
2. Sprawdź konflikty z innymi wtyczkami SEO
3. Wyczyść cache strony

#### Problemy z mapą witryn
1. Sprawdź uprawnienia pliku sitemap.xml
2. Wyczyść cache mapy witryn
3. Zregeneruj mapę ręcznie przez WP-CLI:
```bash
wp depcore-seo sitemap generate
```
