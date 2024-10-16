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

Default `disallowedTags` are `'SCRIPT', 'STYLE', 'LINK', 'OBJECT', 'EMBED', 'IFRAME', 'FRAME', 'HTML', 'BASE', 'META'`

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

satitizeHTML('<form><button formaction=javascript&colon;alert(1)>CLICKME');
// '<form><button>CLICKME</button></form>',

satitizeHTML('<a href=" &#14;  javascript:alert(\'XSS\');">Click Me</a>');
// '<a>Click Me</a>',
```

## Security
simple-sanitize-html was created to avoid vulnerabilities listed on the [OWASP Cheat Sheet about XSS](https://cheatsheetseries.owasp.org/cheatsheets/XSS_Filter_Evasion_Cheat_Sheet.html)
