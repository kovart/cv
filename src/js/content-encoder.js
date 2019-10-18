/**
 * Decode element
 * Based on "Base64" decoder
 * @param {Element|string} target
 */
function decode(target) {
    let el
    if(typeof target === 'string') {
        el = document.querySelector(target)
        if(!el) throw new Error('Cannot find element by query: ' + target)
    }
    else if(target instanceof Element) el = target
    else throw new Error('target type must be DOM Element or string')

    let value = el.dataset.encodedValue
    if(value) el.innerText = b64DecodeUnicode(value)

    let href = el.dataset.encodedHref
    if(href) el.href = b64DecodeUnicode(href)
}

// Currently unused
function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

if(module) {
    module.exports = decode
}
