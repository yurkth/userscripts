// ==UserScript==
// @name         YTSheet Initializer
// @namespace    https://github.com/yurkth/userscripts
// @version      0.1.0
// @description  ゆとシートでDX3rdのキャラシを新規作成するときにいい感じにしてくれる
// @author       torin
// @match        https://yutorize.2-d.jp/ytsheet/dx3rd/?mode=blanksheet
// @updateURL    https://github.com/yurkth/userscripts/raw/master/ytsheet/init.user.js
// @downloadURL  https://github.com/yurkth/userscripts/raw/master/ytsheet/init.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yutorize.2-d.jp
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // 非公開
  document.querySelector("select[name=hide]").selectedIndex = 1;
  // 作成レギュレーション
  document.querySelector("input[name=stage]").value = "基本ステージ";
  document.querySelector("input[name=history0Exp]").value = 134;
  // 閉じてるメニューを開く
  ["status", "lois", "effect", "combo", "items"].forEach(v => { document.querySelector(`details#${v}`).open = true; });
  // 侵蝕率効果表
  document.querySelector("input[name=encroachEaOn]").click();
  // Dロイス
  document.querySelector("input[name=lois1Relation]").value = "Dロイス";
  document.querySelector("input[name=lois1Note]").value = "LM p.";

  // コンセントレイト
  let concentrate = {
    "Name": "コンセントレイト: ",
    "Lv": 3,
    "Timing": "メジャー",
    "Skill": "シンドローム",
    "Dfclty": "―",
    "Target": "―",
    "Range": "―",
    "Encroach": "2",
    "Restrict": "―",
    "Note": "EA p.129: C値を-Lvする（下限値7）"
  };
  Object.keys(concentrate).forEach(key => { document.querySelector(`input[name=effect3${key}]`).value = concentrate[key]; });

  // イージーエフェクト
  for (let i = 0; i < 2; i++) addEffect();
  let effectCount = document.querySelectorAll("tbody[id^=effect]").length;
  for (let i = 0; i < 2; i++) {
    document.querySelector(`input[name=effect${effectCount - i}Lv]`).value = 1;
    document.querySelector(`select[name=effect${effectCount - i}Type]`).selectedIndex = 3;
  }
  calcEffect();
})();
