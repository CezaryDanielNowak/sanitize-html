# simple-sanitize-html
Simple helper for HTML sanitization.
Browser only as for now.

## Features
- cleaning up HTML code. Unclosed tags are closed. Invalid markup is fixed.
- Library is small. No twisted regexps.
- It's secure. We are using browser to do all the magic for us.

## API
```
sanitizeHTMLString(htmlString, disallowedTags);
```


For invalid `htmlString` an error is thrown: 'Invalid template string value'

Default `disallowedTags` are `['SCRIPT', 'STYLE']``

## Installation
```
npm install simple-sanitize-html
```

## Usage
```
import satitizeHTML from 'simple-satnitize-html';

satitizeHTML('<test><script>alert("nope")</script></test>');
// '<test></test>',

satitizeHTML('<test onclick="() => {}"></test>');
// '<test></test>',

satitizeHTML('a<style>body { rotate3d(0, -14, 11, 53deg) }</style>b');
// 'ab',

satitizeHTML('<!--');
// '<!---->',

satitizeHTML('<test ONMOUSEOVER="() => {}"></test>');
// '<test></test>',

satitizeHTML('abc <strong onclick="alert(\'\')" onmouseover="alert(\'\')">strong</strong> xyz');
// 'abc <strong>strong</strong> xyz',
```