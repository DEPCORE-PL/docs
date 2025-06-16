# Content Manager - Documentation

## Overview

Content Manager is a comprehensive plugin for OctoberCMS that enhances the content management capabilities of your website. It provides advanced tools for content editing, media management, versioning, and data import/export functionality.

## Features

- Advanced WYSIWYG editor
- Media management system
- Content versioning
- Data import/export
- Dynamic content blocks
- Structured content types
- Multi-language support
- Advanced search capabilities

## Installation

### Via Composer
```bash
composer require depcore/oc-content-manager-plugin
php artisan october:up
```

### Manual Installation
1. Download the plugin package from DEPCORE repository
2. Extract to `plugins/depcore/content-manager` directory
3. Run migrations:
```bash
php artisan plugin:refresh Depcore.ContentManager
```

## System Requirements

- OctoberCMS 3.0 or higher
- PHP 7.4 or higher
- MySQL 5.7 or MariaDB 10.2 or higher
- Required PHP extensions:
  - fileinfo
  - json
  - mbstring
  - PDO
  - zip

## Configuration

### Basic Configuration

```php
// config/depcore/content-manager.php
return [
    'editor' => [
        'toolbar' => ['bold', 'italic', 'link', 'image'],
        'height' => 400,
        'plugins' => ['table', 'code', 'media']
    ],
    'media' => [
        'max_file_size' => '10MB',
        'allowed_types' => ['jpg', 'png', 'pdf', 'doc'],
        'storage_path' => 'uploads/content'
    ],
    'versioning' => [
        'enabled' => true,
        'max_versions' => 10
    ],
    'search' => [
        'enabled' => true,
        'min_length' => 3
    ]
];
```

## Components

### Content Editor

```php
[contentEditor]
==
{% component 'contentEditor' %}
```

Component properties:
```php
public function defineProperties()
{
    return [
        'content' => [
            'title' => 'Content ID',
            'type' => 'string'
        ],
        'toolbar' => [
            'title' => 'Toolbar Configuration',
            'type' => 'string',
            'default' => 'full'
        ]
    ];
}
```

### Media Manager

```php
[mediaManager]
==
{% component 'mediaManager' %}
```

Usage in templates:
```twig
{% put scripts %}
    <script src="{{ 'plugins/depcore/content-manager/assets/js/media-manager.js'|theme }}"></script>
{% endput %}

<div class="media-browser" data-control="mediabrowser">
    {{ component('mediaManager') }}
</div>
```

## API Reference

### Content Management

```php
use Depcore\ContentManager\Classes\ContentRepository;

// Create content
$content = ContentRepository::create([
    'title' => 'My Content',
    'body' => $html_content,
    'type' => 'page'
]);

// Update content
ContentRepository::update($id, [
    'title' => 'Updated Title'
]);

// Get content version
$version = ContentRepository::getVersion($id, $version_number);
```

### Media Management

```php
use Depcore\ContentManager\Classes\MediaLibrary;

// Upload file
$file = MediaLibrary::upload($uploaded_file, [
    'directory' => 'images',
    'filename' => 'custom-name'
]);

// Get file information
$info = MediaLibrary::getFileInfo($path);

// Generate thumbnails
$thumb = MediaLibrary::createThumbnail($path, [
    'width' => 300,
    'height' => 200,
    'mode' => 'crop'
]);
```

### Import/Export

```php
use Depcore\ContentManager\Classes\DataManager;

// Export content
$data = DataManager::export([
    'type' => 'pages',
    'format' => 'json'
]);

// Import content
DataManager::import($data, [
    'overwrite' => false,
    'validate' => true
]);
```

## Events

### Content Events

```php
// Before content save
Event::listen('depcore.content.beforeSave', function($content) {
    // Modify content before saving
});

// After content publish
Event::listen('depcore.content.afterPublish', function($content) {
    // Handle published content
});
```

### Media Events

```php
// Before file upload
Event::listen('depcore.media.beforeUpload', function($file) {
    // Validate or modify file
});

// After file process
Event::listen('depcore.media.afterProcess', function($file) {
    // Handle processed file
});
```

## Console Commands

### Content Management

```bash
# Export content
php artisan content:export {type} {destination}

# Import content
php artisan content:import {source}

# Clean versions
php artisan content:clean-versions
```

### Media Management

```bash
# Regenerate thumbnails
php artisan media:regenerate-thumbnails

# Clean unused media
php artisan media:clean-unused

# Sync media files
php artisan media:sync
```

## Best Practices

1. Content Structure
   - Use meaningful content types
   - Implement proper content hierarchy
   - Define clear content workflows
   - Use content templates

2. Media Management
   - Organize media in directories
   - Use proper file naming conventions
   - Implement image optimization
   - Regular cleanup of unused files

3. Performance
   - Enable caching when possible
   - Optimize database queries
   - Use proper indexing
   - Implement lazy loading

4. Security
   - Validate user permissions
   - Sanitize uploaded content
   - Implement proper file type restrictions
   - Regular security audits

## Troubleshooting

### Common Issues

1. **Upload Problems**
   - Check file permissions
   - Verify PHP upload limits
   - Check allowed file types
   - Monitor disk space

2. **Editor Issues**
   - Clear browser cache
   - Check JavaScript errors
   - Verify plugin dependencies
   - Update editor configuration

3. **Version Control**
   - Monitor database size
   - Check version limits
   - Verify storage configuration
   - Regular cleanup old versions

### Debugging

Enable debug mode in .env:
```
APP_DEBUG=true
DEPCORE_CONTENT_DEBUG=true
```

Check logs in:
- storage/logs/content-manager.log
- storage/logs/system.log

## Support

For technical support and custom development:
- Email: biuro@depcore.pl
- Phone: +48 783 342 094
