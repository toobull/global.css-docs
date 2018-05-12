// utils

export function getElementById(id) {
    return document.getElementById(id)
}

export function appendHtml(el, html_st) {
    el.insertAdjacentHTML('beforeend', html_st)
}