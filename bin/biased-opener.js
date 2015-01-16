#!/usr/bin/env node

var biasedOpener = require('../index');
var argv = require('minimist')(process.argv.slice(2));

function printUsage() {
    console.error("Usage: biased-opener <url>");
    console.error("       biased-opener [--browsers|-b] 'chrome, chromium, opera' <url>");
    console.error("       biased-opener [--verbose|-v] -- <url>");
    console.error("       biased-opener [--help|-h]");
    process.exit(1);
}

/**
 * @param {String|null} browsers Comma-separated string with browser names
 * @return {Array<String>|null}
 */
function processBrowsers (browsers) {
    if (!browsers) {
        return null;
    }

    // allow "a,b,c" and "a, b, c" with spaces
    return browsers.replace(/ /g, '').split(',');
}

function main () {

    var help = argv['help'] || argv['h'];
    var verbose = argv['verbose'] || argv['v'];
    var url = argv._[0];
    var preferredBrowsers = processBrowsers(argv['browsers'] || argv['b']) || ['chrome'];

    if (help || !url) {
        printUsage();
        return;
    }

    biasedOpener(url, {
        verbose: verbose,
        preferredBrowsers: preferredBrowsers
    });
}

main();