/**
 * Sanitize HTML elements in the template string
 * Removes <script>, <style> and html elements with event handler
 * Clears tags that are not properly closed
 *
 * @param   {string}  html  Text that contains html elements
 * @param   {Array<uppercase strings>}  disallowed tags.
 *
 * @return  {string}        Sanitized text with html elements
 */
const DISALLOWED_TAGS = [
  'SCRIPT', 'STYLE', 'LINK', 'OBJECT', 'EMBED', 'IFRAME', 'FRAME', 'HTML', 'BASE', 'META',
];
const DISALLOWED_SCRIPT_ATTRIBUTES = [
  'src', 'href', 'content', 'xlink:href', 'formaction', 'action',
];
module.exports = function sanitizeHTMLString(html, disallowedTags = DISALLOWED_TAGS) {
  if (!html) return '';
  if (typeof html !== 'string') throw Error('Invalid template string value');
  let result = html;

  if (html.includes('<')) {
    const div = document.createElement('div');
    div.innerHTML = html;

    [...div.querySelectorAll('*')].forEach((children) => {
      if (disallowedTags.includes(children.tagName)) {
        return children.remove();
      }

      children.getAttributeNames().forEach((attr) => {
        const hasJs = DISALLOWED_SCRIPT_ATTRIBUTES.includes(attr)
          && children
            .getAttribute(attr)
            .replace(/\s/g, '')
            .toLowerCase()
            .includes('javascript:'); // eslint-disable-line no-script-url
        const isListener = attr.startsWith('on');

        if (isListener || hasJs) {
          children.removeAttribute(attr);
        }
      })
    });

    result = div.innerHTML;
    div.remove();
  }

  return result;
};
