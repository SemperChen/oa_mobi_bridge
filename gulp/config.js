var fallback = require('connect-history-api-fallback');
var log = require('connect-logger');
var src = "./src";
var dest = "./dist";
var srcAssets = src + "/assets";
var destAssets = dest + "/assets";
var srcScripts = srcAssets + "/scripts";
var destScripts = destAssets + "/scripts";
var srcFonts = srcAssets + "/fonts";
var destFonts = destAssets + "/fonts";
var srcImages = srcAssets + "/images";
var destImages = destAssets + "/images";
var srcStyles = srcAssets + "/styles";
var destStyles = destAssets + "/styles";
var srcLess = srcAssets + "/less";
var modules = "/node_modules";
var serverName = "sync-server";

module.exports = {
    dir: {
        src: src,
        dest: dest,
        srcAssets: srcAssets,
        destAssets: destAssets,
        srcScripts: srcScripts,
        destScripts: destScripts,
        srcFonts: srcFonts,
        destFonts: destFonts,
        srcImages: srcImages,
        destImages: destImages,
        srcStyles: srcStyles,
        destStyles: destStyles,
        srcLess: srcLess,
        modules: modules
    },
    server: {
        name: serverName,
        injectChanges: false,
        files: ['./**/*.{html,htm,css,js}'],
        watchOptions: {
            ignored: 'node_modules'
        },
        server: {
            baseDir: './src',
            middleware: [
                log({format: '%date %status %method %url'}),
                fallback({
                    index: '/index.html',
                    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
                })
            ]
        }
    }
}