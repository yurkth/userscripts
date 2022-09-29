// ==UserScript==
// @name         Daycord Blank Column Switcher
// @namespace    https://github.com/yurkth/userscripts
// @version      0.1.0
// @description  デイコードで日程を入力していない人の列を非表示にするトグルを追加する
// @author       torin
// @match        https://character-sheets.appspot.com/schedule/list?key=*
// @updateURL    https://github.com/yurkth/userscripts/raw/master/daycord/blank.user.js
// @downloadURL  https://github.com/yurkth/userscripts/raw/master/daycord/blank.user.js
// @license      MIT License
// @resource     bulma-switch-control https://cdn.jsdelivr.net/npm/bulma-switch-control@1.2.2/css/main.min.css
// @grant        GM.getResourceText
// @grant        GM.addStyle
// ==/UserScript==

(async function () {
  'use strict';

  // トグルを表示する用のCSSを取得
  await GM.addStyle(await GM.getResourceText("bulma-switch-control"));

  // 上部のボタンに並べてトグルを置く
  let topButtons = document.querySelector("div.topbuttons");
  topButtons.insertAdjacentHTML("beforeend", `<div class="field" style="display:inline-flex;">
  <label class="switch is-rounded is-outlined is-medium">
    <input type="checkbox">
    <span class="check" style="height:30px;"></span>
    <span class="control-label" style="font-size:.75rem;">未入力を非表示</span>
  </label>
</div>`);
  topButtons.querySelector(".switch > input[type=checkbox]").addEventListener("change", event => {
    switchDisplayAll(!event.target.checked);
  });
})();

function switchDisplay(isDisplay) {
  return isDisplay ?
    item => {
      item.style.display = "table-cell";
    } :
    item => {
      item.style.display = "none";
    };
}

function switchDisplayAll(isDisplay) {
  // 名前が入ったセルを取得
  let members = document.querySelectorAll("th:not([rowspan]):has(.namelink)");
  let blankColumnCount = 0;

  // それぞれの列について、すべてのセルが未入力なら非表示にする
  members.forEach((head, index) => {
    let column = document.querySelectorAll(`tbody > tr > td:nth-last-child(${members.length - index})`);
    let isBlankColumn = Array.from(column).every(cell => cell.firstElementChild.textContent == '－');
    if (isBlankColumn) {
      switchDisplay(isDisplay)(head);
      column.forEach(switchDisplay(isDisplay));
      blankColumnCount += 1;
    }
  });

  // 未入力の値を調整
  document.querySelectorAll(`tbody > tr > td:nth-last-child(${members.length + 1})`).forEach(item => {
    item.firstElementChild.textContent -= blankColumnCount * (isDisplay ? -1 : 1);
  });
}
