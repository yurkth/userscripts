// ==UserScript==
// @name         YouTube Subtitle Selector
// @namespace    https://github.com/yurkth/userscripts
// @version      0.1.4
// @description  YouTubeの動画に日本語字幕があればそれを選択、なければ自動翻訳の日本語を選択する
// @author       torin
// @match        https://www.youtube.com/*
// @updateURL    https://github.com/yurkth/userscripts/raw/master/youtube/subtitle.user.js
// @downloadURL  https://github.com/yurkth/userscripts/raw/master/youtube/subtitle.user.js
// @license      MIT License
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  setSubtitleJapanese();

  // 別のビデオに遷移したら実行
  let video = document.querySelector("video");
  new MutationObserver((mutations, observer) => {
    if (video.src) {
      setSubtitleJapanese();
    }
  }).observe(video, { attributes: true, attributeFilter: ['src'] });
})();

function setSubtitleJapanese() {
  const config = { childList: true, subtree: true };

  // 動画に字幕が存在する場合に実行
  new MutationObserver((mutations, observer) => {
    let subtitlesButton = document.querySelector("button.ytp-subtitles-button");
    if (subtitlesButton && (subtitlesButton.title === "字幕（c）")) {

      // 設定ボタンが読み込まれたらクリック
      new MutationObserver((mutations, observer) => {
        let settingsButton = document.querySelector("button.ytp-settings-button");
        if (settingsButton) {
          settingsButton.click();

          observer.disconnect();
        }
      }).observe(document, config);

      // 字幕メニューが読み込まれたらクリック
      new MutationObserver((mutations, observer) => {
        let subtitlesMenu = [...document.querySelectorAll("div.ytp-menuitem-label")].find(e => e.textContent.includes("字幕"));
        if (subtitlesMenu) {
          subtitlesMenu.click();

          observer.disconnect();
        }
      }).observe(document, config);

      // 言語選択が読み込まれたらクリック
      new MutationObserver((mutations, observer) => {
        let languages = [...document.querySelectorAll("div.ytp-menuitem-label")];
        // 字幕に日本語が用意されている場合
        let japanese = languages.find(e => e.textContent === "日本語");
        if (japanese) {
          japanese.click();

          // メニューを閉じる
          let settingsButton = document.querySelector("button.ytp-settings-button");
          settingsButton.click();

          observer.disconnect();
          return;
        }

        // 字幕に日本語が用意されていない場合
        let autoTranslate = languages.find(e => e.textContent === "自動翻訳");
        if (autoTranslate) {
          autoTranslate.click();

          new MutationObserver((mutations, observer) => {
            let japanese = [...document.querySelectorAll("div.ytp-menuitem-label")].find(e => e.textContent === "日本語");
            if (japanese) {
              japanese.click();

              observer.disconnect();
            }
          }).observe(document, config);

          observer.disconnect();
          return;
        }

        let off = languages.find(e => e.textContent === "オフ");
        if (off) {
          off.click();

          // メニューを閉じる
          let settingsButton = document.querySelector("button.ytp-settings-button");
          settingsButton.click();

          observer.disconnect();
        }
      }).observe(document, config);

      observer.disconnect();
    }
  }).observe(document, config);
}
