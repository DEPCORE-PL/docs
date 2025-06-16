# Core Extensions - Dokumentacja

## Opis

Core Extensions to podstawowa wtyczka DEPCORE dla OctoberCMS, rozszerzająca możliwości systemu o zaawansowane komponenty, narzędzia deweloperskie i integracje API.

## Instalacja

### Przez Composer
```bash
composer require depcore/oc-core-extensions-plugin
php artisan october:up
```

### Ręczna Instalacja
1. Pobierz pakiet z repozytorium DEPCORE
2. Rozpakuj do katalogu plugins/depcore/core-extensions
3. Wykonaj migracje:
```bash
php artisan plugin:refresh Depcore.CoreExtensions
```

## Konfiguracja

### Podstawowa Konfiguracja
```php
// config/depcore/core-extensions.php
return [
    'api_key' => env('DEPCORE_API_KEY'),
    'cache_enabled' => true,
    'debug_mode' => false,
    'components' => [
        'forms' => true,
        'api' => true,
        'notifications' => true
    ]
];
```

## Komponenty

### Advanced Forms
```php
[advancedForm]
== 
{% component 'advancedForm' %}
```

Konfiguracja:
```php
public function defineProperties()
{
    return [
        'formHandler' => [
            'title' => 'Form Handler',
            'type' => 'string',
            'default' => 'DefaultHandler'
        ],
        'validation' => [
            'title' => 'Validation Rules',
            'type' => 'dictionary'
        ]
    ];
}
```

### API Integration
```php
use Depcore\CoreExtensions\Classes\ApiClient;

$client = new ApiClient();
$response = $client->request('GET', 'endpoint');
```

### Notification System
```php
use Depcore\CoreExtensions\Classes\Notification;

Notification::send($user, new WelcomeNotification($data));
```

## Events

### System Events
```php
// Before form processing
Event::listen('depcore.forms.beforeProcess', function($form) {
    // Custom logic
});

// After API request
Event::listen('depcore.api.afterRequest', function($response) {
    // Handle response
});
```

### Custom Events
```php
// Firing custom event
Event::fire('depcore.custom.event', [$data]);

// Listening for custom event
Event::listen('depcore.custom.event', function($data) {
    // Handle event
});
```

## Models

### Form Entry
```php
use Depcore\CoreExtensions\Models\FormEntry;

$entry = new FormEntry;
$entry->form_data = $data;
$entry->save();
```

### API Log
```php
use Depcore\CoreExtensions\Models\ApiLog;

$log = ApiLog::create([
    'endpoint' => $endpoint,
    'request' => $request,
    'response' => $response
]);
```

## Helpers

### Form Helper
```php
use Depcore\CoreExtensions\Classes\FormHelper;

$helper = new FormHelper();
$validated = $helper->validate($input, $rules);
```

### API Helper
```php
use Depcore\CoreExtensions\Classes\ApiHelper;

$helper = new ApiHelper();
$formatted = $helper->formatResponse($response);
```

## Middleware

### API Authentication
```php
protected $middleware = [
    'Depcore\CoreExtensions\Middleware\ApiAuth'
];
```

### Form Protection
```php
protected $middleware = [
    'Depcore\CoreExtensions\Middleware\FormProtection'
];
```

## Console Commands

### Cache Management
```bash
# Clear plugin cache
php artisan depcore:cache:clear

# Warm up cache
php artisan depcore:cache:warm
```

### API Tools
```bash
# Test API connection
php artisan depcore:api:test

# Generate API documentation
php artisan depcore:api:docs
```

## Rozwiązywanie Problemów

### Debugowanie

1. Włącz tryb debug w konfiguracji:
```php
'debug_mode' => true
```

2. Sprawdź logi w storage/logs/depcore.log

### Typowe Problemy

#### Problemy z Formularzami
1. Sprawdź konfigurację CSRF
2. Zweryfikuj reguły walidacji
3. Sprawdź uprawnienia do zapisu

#### Problemy z API
1. Sprawdź klucz API
2. Zweryfikuj połączenie internetowe
3. Sprawdź format requestów

## Hooks i Filtry

### Modyfikacja Formularzy
```php
// Przed walidacją
$this->bindEvent('forms.beforeValidate', function($data) {
    return $data;
});

// Po zapisie
$this->bindEvent('forms.afterSave', function($entry) {
    // Custom logic
});
```

### API Interceptors
```php
// Przed requestem
$this->bindEvent('api.beforeRequest', function($request) {
    return $request;
});

// Po odpowiedzi
$this->bindEvent('api.afterResponse', function($response) {
    return $response;
});
```
