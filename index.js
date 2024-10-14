/**
 * Sanitize HTML elements in the template string
 * Removes <script>, <style> and html elements with event handler
 * Clears tags that are not properly closed
 *
 * @param   {string}  html  Text that contains html elements
 * @param   {Array<uppercase strings>}  disallowed tags. Default ['SCRIPT', 'STYLE']
 *
 * @return  {string}        Sanitized text with html elements
 */
module.exports = sanitizeHTMLString(html, disallowedTags = ['SCRIPT', 'STYLE']) {
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

      const attributes = children.getAttributeNames();
      attributes.forEach((attr) => {
        if (attr.startsWith('on')) {
          children.removeAttribute(attr);
        }
      })
    });

    result = div.innerHTML;
    div.remove();
  }

  return result;
};