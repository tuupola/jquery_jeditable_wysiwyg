/*
 * Wysiwyg input for Jeditable
 *
 * Copyright (c) 2008 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 * 
 * Depends on jWYSIWYG plugin by Juan M Martínez:
 *   http://projects.bundleweb.com.ar/jWYSIWYG/
 *
 * Project home:
 *   http://www.appelsiini.net/projects/jeditable
 *
 * Revision: $Id$
 *
 */
 
$.editable.addInputType('wysiwyg', {
    /* Use default textarea instead of writing code here again. */
    element : $.editable.types.textarea.element,
    content : function(string, settings, original) { 
        /* jWYSIWYG plugin uses .text() instead of .val()        */
        /* For some reason it did not work work with generated   */
        /* textareas so I am forcing the value here with .text() */
        $('textarea', this).text(string);
    },
    plugin : function(settings, original) {
        var self = this;
        /* Force autosave off to avoid "element.contentWindow has no properties" */
        // settings.wysiwyg = $.extend({autoSave: false}, settings.wysiwyg);
        if (settings.wysiwyg) {
            setTimeout(function() { $('textarea', self).wysiwyg(settings.wysiwyg); }, 0);
        } else {
            setTimeout(function() { $('textarea', self).wysiwyg(); }, 0);
        }
    }
});
