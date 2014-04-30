/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';

    // our file uploader
    var uploadUrl = '/uploader/upload.php';
    config.filebrowserUploadUrl = uploadUrl + '?Type=File';
    config.filebrowserImageUploadUrl = uploadUrl + '?Type=Image';

// Add the plugin!!!
    config.extraPlugins = 'simpleuploads';

    // Restrict uploads to the extensions that are allowed in this file uploader
    config.simpleuploads_acceptedExtensions = '7z|avi|csv|doc|docx|flv|gif|gz|gzip|jpeg|jpg|mov|mp3|mp4|mpc|mpeg|mpg|ods|odt|pdf|png|ppt|pxd|rar|rtf|tar|tgz|txt|vsd|wav|wma|wmv|xls|xml|zip';

    // we want the demo text to look better even if the buttons aren't included
    config.extraAllowedContent = "h3 blockquote ul li";

};
