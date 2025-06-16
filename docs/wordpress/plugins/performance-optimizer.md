# Performance Optimizer - Documentation

## Overview

Performance Optimizer is a WordPress plugin designed to enhance your website's performance through various optimization techniques. It provides tools for image optimization, asset management, caching, and database optimization.

## Features

- Asset optimization (CSS/JS minification and combination)
- Image lazy loading and optimization
- Advanced caching system
- Database optimization tools
- GZIP compression support
- Browser caching management

## Installation

1. Download the plugin package from DEPCORE repository
2. Go to WordPress Admin > Plugins > Add New
3. Click "Upload Plugin" and choose the downloaded file
4. Activate the plugin after installation

## System Requirements

- WordPress 5.8 or higher
- PHP 7.4 or higher
- MySQL 5.6 or MariaDB 10.1 or higher
- mod_rewrite Apache module
- PHP extensions: gd, imagick (recommended)

## Configuration

### Basic Configuration

Navigate to WordPress Admin > Settings > Performance Optimizer to access the main settings panel. Here you can configure:

1. Asset Optimization
   - Enable/disable CSS minification
   - Enable/disable JavaScript minification
   - Combine CSS/JS files
   - Exclude specific files from optimization

2. Image Optimization
   - Enable lazy loading
   - Set image quality
   - Configure WebP conversion
   - Define image dimensions

3. Caching
   - Enable page caching
   - Set cache expiration time
   - Configure cache exclusions
   - Enable browser caching

4. Database Optimization
   - Clean post revisions
   - Remove spam comments
   - Optimize database tables
   - Schedule automatic cleanup

## API Reference

### Asset Management

```php
// Check if asset optimization is enabled
DepCore\Performance\AssetManager::isOptimizationEnabled();

// Exclude file from optimization
add_filter('depcore_performance_exclude_file', function($files) {
    $files[] = 'path/to/file.js';
    return $files;
});

// Modify cache expiration
add_filter('depcore_performance_cache_expiration', function() {
    return 86400; // 24 hours
});
```

### Image Optimization

```php
// Configure lazy loading
add_filter('depcore_performance_lazy_loading', function($config) {
    $config['threshold'] = 200;
    $config['placeholder'] = 'blur'; // blur, low-quality, or custom
    return $config;
});

// Custom image optimization
DepCore\Performance\ImageOptimizer::optimizeImage($path, [
    'quality' => 85,
    'convert_webp' => true,
    'max_width' => 1920
]);
```

### Caching

```php
// Clear all cache
DepCore\Performance\Cache::clearAll();

// Clear specific page cache
DepCore\Performance\Cache::clearPage($url);

// Add cache exclusion
add_filter('depcore_performance_cache_exclude', function($patterns) {
    $patterns[] = '/my-dynamic-page/*';
    return $patterns;
});
```

### Database Optimization

```php
// Run manual optimization
DepCore\Performance\Database::optimize();

// Schedule automatic optimization
DepCore\Performance\Database::scheduleOptimization([
    'frequency' => 'weekly',
    'tasks' => ['revisions', 'spam', 'tables']
]);
```

## Hooks and Filters

### Actions

```php
// Before cache generation
do_action('depcore_performance_before_cache');

// After asset optimization
do_action('depcore_performance_after_optimization');

// Before database cleanup
do_action('depcore_performance_before_db_cleanup');
```

### Filters

```php
// Modify optimization settings
add_filter('depcore_performance_settings', function($settings) {
    return $settings;
});

// Customize cache filename
add_filter('depcore_performance_cache_filename', function($filename, $url) {
    return $filename;
}, 10, 2);
```

## Best Practices

1. Start with default settings and adjust based on your needs
2. Use browser dev tools to verify optimizations
3. Test thoroughly after enabling new features
4. Keep backup before database optimization
5. Monitor server resources usage
6. Use staging environment for testing

## Troubleshooting

### Common Issues

1. **Cache Not Working**
   - Verify write permissions on cache directory
   - Check for cache exclusions
   - Ensure proper server configuration

2. **Asset Optimization Issues**
   - Check browser console for errors
   - Verify file paths
   - Check for JavaScript dependencies

3. **Image Optimization Problems**
   - Verify GD or ImageMagick installation
   - Check image file permissions
   - Monitor server memory limits

4. **Database Optimization Errors**
   - Ensure sufficient MySQL privileges
   - Check available disk space
   - Monitor timeout limits

### Debugging

Enable debug mode in wp-config.php:
```php
define('WP_DEBUG', true);
define('DEPCORE_PERFORMANCE_DEBUG', true);
```

Check debug log in wp-content/debug.log
