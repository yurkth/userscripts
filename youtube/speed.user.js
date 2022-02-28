// ==UserScript==
// @name         YouTube Speed Controller
// @namespace    https://github.com/yurkth/userscripts
// @version      0.1.2
// @description  YouTubeの動画に速度調整のボタンを追加する
// @author       torin
// @match        https://www.youtube.com/*
// @updateURL    https://github.com/yurkth/userscripts/raw/master/youtube/speed.user.js
// @downloadURL  https://github.com/yurkth/userscripts/raw/master/youtube/speed.user.js
// @license      MIT License
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

(async function () {
  'use strict';
  new MutationObserver((mutations, observer) => {
    let video = document.querySelector("video");
    if (video) {
      addPlaybackRateButton(video);

      // 別のビデオに遷移したら実行
      new MutationObserver((mutations, observer) => {
        if (video.src) {
          addPlaybackRateButton(video);
        }
      }).observe(video, { attributes: true, attributeFilter: ['src'] });

      observer.disconnect();
    }
  }).observe(document, { childList: true, subtree: true });

})();

async function addPlaybackRateButton(video) {
  if (!document.querySelector("div.speed-controller")) {
    let controls = document.querySelector("div.ytp-right-controls");
    controls.insertAdjacentHTML("afterbegin", `
<style>
  .speed-controller {
    user-select: none;
    line-height: 20px;
    font-size: 125%;
    text-align: center;
  }

  .playback-rate {
    margin-top: 4px;
  }

  .speed-down,
  .speed-up {
    color: black;
    font-weight: bold;
    width: 20px;
    border-radius: 4px;
    background-color: white;
  }

  .speed-down {
    float: left;
    margin-left: 2px;
  }

  .speed-up {
    float: right;
    margin-right: 2px;
  }
</style>

<div class="ytp-button speed-controller">
  <div class="playback-rate">×1.0</div>
  <div class="speed-down">－</div>
  <div class="speed-up">＋</div>
</div>`);

    // 倍率をクリックしてリセット
    document.querySelector("div.playback-rate").addEventListener("click", () => {
      setPlaybackRate(video, 1.0);
    });
    // -ボタンをクリックして減速
    document.querySelector("div.speed-down").addEventListener("click", () => {
      setPlaybackRate(video, Math.round((video.playbackRate - 0.2) * 10) / 10);
    });
    // +ボタンをクリックして加速
    document.querySelector("div.speed-up").addEventListener("click", () => {
      setPlaybackRate(video, Math.round((video.playbackRate + 0.2) * 10) / 10);
    });
  }

  setPlaybackRate(video, await GM.getValue("playbackRate", 1.0));
}

async function setPlaybackRate(video, playbackRate) {
  if (0 <= playbackRate && playbackRate <= 16) {
    video.playbackRate = playbackRate;
    document.querySelector("div.playback-rate").textContent = `×${playbackRate}`;
    await GM.setValue("playbackRate", playbackRate);
  }
}
