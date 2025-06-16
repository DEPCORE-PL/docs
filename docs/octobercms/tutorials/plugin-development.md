# Tworzenie Wtyczek OctoberCMS

## Wprowadzenie

Ten przewodnik pomoże Ci zrozumieć proces tworzenia wtyczek dla OctoberCMS. Poznasz strukturę, najlepsze praktyki i zaawansowane techniki programowania.

## Struktura Wtyczki

Podstawowa struktura wtyczki OctoberCMS:

```
plugins/
└── vendor/
    └── plugin/
        ├── Plugin.php
        ├── updates/
        │   └── version.yaml
        ├── models/
        │   ├── Model.php
        │   └── model/
        │       ├── columns.yaml
        │       └── fields.yaml
        ├── controllers/
        │   ├── Controller.php
        │   └── controller/
        │       ├── config_form.yaml
        │       └── config_list.yaml
        ├── components/
        │   └── Component.php
        ├── assets/
        │   ├── css/
        │   └── js/
        └── lang/
            ├── en/
            └── pl/
```

## Plugin.php

Podstawowy plik wtyczki:

```php
<?php namespace Vendor\Plugin;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public function pluginDetails()
    {
        return [
            'name'        => 'Plugin Name',
            'description' => 'Plugin description',
            'author'      => 'DEPCORE',
            'icon'        => 'icon-leaf'
        ];
    }

    public function registerComponents()
    {
        return [
            'Vendor\Plugin\Components\MyComponent' => 'myComponent',
        ];
    }

    public function registerPermissions()
    {
        return [
            'vendor.plugin.some_permission' => [
                'tab' => 'Plugin Name',
                'label' => 'Some permission'
            ],
        ];
    }

    public function registerNavigation()
    {
        return [
            'plugin' => [
                'label'       => 'Plugin Name',
                'url'         => \Backend::url('vendor/plugin/mycontroller'),
                'icon'        => 'icon-leaf',
                'permissions' => ['vendor.plugin.*'],
                'order'       => 500,
            ],
        ];
    }
}
```

## Models

### Definicja Modelu
```php
<?php namespace Vendor\Plugin\Models;

use Model;

class MyModel extends Model
{
    public $table = 'vendor_plugin_mytable';
    
    protected $fillable = [
        'name',
        'description'
    ];
    
    public $rules = [
        'name' => 'required|between:2,64',
        'description' => 'required'
    ];

    public $belongsTo = [
        'category' => ['Vendor\Plugin\Models\Category']
    ];

    public $hasMany = [
        'items' => ['Vendor\Plugin\Models\Item']
    ];
}
```

### Migracje

```php
<?php namespace Vendor\Plugin\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class CreateTables extends Migration
{
    public function up()
    {
        Schema::create('vendor_plugin_mytable', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('vendor_plugin_mytable');
    }
}
```

## Components

### Definicja Komponentu
```php
<?php namespace Vendor\Plugin\Components;

use Cms\Classes\ComponentBase;

class MyComponent extends ComponentBase
{
    public function componentDetails()
    {
        return [
            'name'        => 'My Component',
            'description' => 'Opis komponentu'
        ];
    }

    public function defineProperties()
    {
        return [
            'maxItems' => [
                'title'             => 'Max items',
                'description'       => 'Maksymalna ilość elementów',
                'type'             => 'string',
                'default'          => 10,
                'validationPattern' => '^[0-9]+$',
                'validationMessage' => 'Wartość musi być liczbą'
            ]
        ];
    }

    public function onRun()
    {
        $this->page['items'] = $this->loadItems();
    }

    protected function loadItems()
    {
        return MyModel::take($this->property('maxItems'))->get();
    }
}
```

## Controllers

### Backend Controller
```php
<?php namespace Vendor\Plugin\Controllers;

use Backend\Classes\Controller;
use BackendMenu;

class MyController extends Controller
{
    public $implement = [        
        'Backend\Behaviors\ListController',
        'Backend\Behaviors\FormController'
    ];
    
    public $listConfig = 'config_list.yaml';
    public $formConfig = 'config_form.yaml';

    public function __construct()
    {
        parent::__construct();
        BackendMenu::setContext('Vendor.Plugin', 'plugin', 'mycontroller');
    }
}
```

### Config Files

config_list.yaml:
```yaml
list: $/vendor/plugin/models/mymodel/columns.yaml
modelClass: Vendor\Plugin\Models\MyModel
title: Manage Items
noRecordsMessage: 'backend::lang.list.no_records'
recordsPerPage: 20
showSetup: true
showCheckboxes: true

toolbar:
    buttons: list_toolbar
    search:
        prompt: 'backend::lang.list.search_prompt'
```

config_form.yaml:
```yaml
name: MyModel
modelClass: Vendor\Plugin\Models\MyModel
form: $/vendor/plugin/models/mymodel/fields.yaml
defaultRedirect: vendor/plugin/mycontroller

create:
    title: Create Item
    redirect: vendor/plugin/mycontroller/update/:id
    redirectClose: vendor/plugin/mycontroller

update:
    title: Edit Item
    redirect: vendor/plugin/mycontroller
    redirectClose: vendor/plugin/mycontroller
```

## Events

### Rejestracja i Obsługa Zdarzeń
```php
public function boot()
{
    Event::listen('vendor.plugin.someEvent', function($arg) {
        // Obsługa zdarzenia
    });
}

// Wywołanie zdarzenia
Event::fire('vendor.plugin.someEvent', [$arg]);
```

## AJAX

### Backend AJAX
```php
public function onAction()
{
    if (Request::ajax()) {
        // Obsługa żądania AJAX
        return [
            'result' => 'success'
        ];
    }
}
```

### Frontend AJAX
```javascript
// W szablonie
{% framework extras %}

<script>
$(document).ready(function() {
    $('#myButton').on('click', function() {
        $(this).request('onAction', {
            data: {
                id: 1
            },
            success: function(response) {
                console.log(response);
            }
        });
    });
});
</script>
```

## Middleware

### Tworzenie Middleware
```php
<?php namespace Vendor\Plugin\Classes;

use Closure;

class MyMiddleware
{
    public function handle($request, Closure $next)
    {
        // Logika middleware
        return $next($request);
    }
}
```

## Najlepsze Praktyki

1. Używaj przestrzeni nazw
2. Stosuj konwencje nazewnicze OctoberCMS
3. Dokumentuj kod
4. Waliduj dane wejściowe
5. Stosuj zasady SOLID

## Bezpieczeństwo

1. Zawsze sprawdzaj uprawnienia
2. Sanityzuj dane wejściowe
3. Escapuj dane wyjściowe
4. Używaj CSRF protection
5. Implementuj walidację formularzy

## Deployment

1. Przygotuj dokumentację
2. Testuj na różnych środowiskach
3. Sprawdź kompatybilność
4. Stwórz instrukcję instalacji
5. Zweryfikuj bezpieczeństwo

## Wsparcie

Jeśli potrzebujesz pomocy w rozwoju wtyczek OctoberCMS:
- Email: biuro@depcore.pl
- Telefon: +48 783 342 094
