<?php

namespace QxCss\Rain;

use Flarum\Extend;
use Flarum\Frontend\Document;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/../js/forum.js')
        ->css(__DIR__.'/../less/forum.less'),
        
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/../js/admin.js'),
        
    new Extend\Locales(__DIR__.'/../locale'),
    
    (new Extend\Settings)
        ->serializeToForum('rainEnabled', 'qx-css.rain.enabled', 'boolval', true)
        ->serializeToForum('rainDensity', 'qx-css.rain.density', 'intval', 50)
        ->serializeToForum('rainSpeed', 'qx-css.rain.speed', 'intval', 10)
        ->serializeToForum('rainColor', 'qx-css.rain.color', 'strval', '#3498db')
        ->serializeToForum('rainOpacity', 'qx-css.rain.opacity', 'floatval', 0.6),
];