// ==UserScript==
// @name         kinopoisk_nono.games
// @namespace    KNPSK
// @version      0.1
// @match        *://*.kinopoisk.ru/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function styles() {
    return `
      .nono-button {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        z-index: 999999;
        top: 65px;
        left: 11px;
        width: 40px;
        height: 40px;
        background-color: white;
        border-radius: 8px;
        border: 1px solid #d9d9d9;
        padding: 0;
        padding-top: 4px;
        transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      }

      .nono-button:hover {
        transform: scale(1.1);
      }

      .nono-button__text {
        text-decoration: none;
        font-size: 25px;
      }
    `;
  }

  const FILM_PATH = 'film';
  const SERIES_PATH = 'series';

  const NONO_URL = 'https://nono.games/film/';

  function getContentId() {
    const path = window.location.pathname;
    const splittedPath = path.split('/');
    let pathIdx = null;

    if (splittedPath.includes(FILM_PATH)) {
      pathIdx = splittedPath.indexOf(FILM_PATH);
    }

    if (splittedPath.includes(SERIES_PATH)) {
      pathIdx = splittedPath.indexOf(SERIES_PATH);
    }

    if (pathIdx && pathIdx > -1 && splittedPath.length > pathIdx + 1) {
      const contentId = splittedPath[pathIdx + 1];

      return contentId;
    }

    return null;
  }

  function addButton(url, text) {
    const button = document.createElement('button');
    button.classList.add('nono-button');

    const link = document.createElement('a');
    link.classList.add('nono-button__text');
    link.setAttribute('target', '_blank');
    link.href = url;

    const textNode = document.createTextNode(text);

    link.appendChild(textNode);
    button.appendChild(link);
    document.body.appendChild(button);
  }

  function addStyles(styles) {
    const stylesNode = document.createElement('style');
    stylesNode.innerHTML = styles;

    document.head.appendChild(stylesNode);
  }

  function init() {
    const contendId = getContentId();

    if (contendId) {
      addStyles(styles());
      addButton(NONO_URL + contendId, '👀');
    }
  }

  init();
})();


