function set(key, value) {
    localStorage.setItem(key, value);
}

function get(key) {
    return localStorage.getItem(key);
}

function isset(key) {
    return localStorage.get(key) ?? true | false;
}

export { set, get, isset };