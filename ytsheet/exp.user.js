// ==UserScript==
// @name         YTSheet Old Exp
// @namespace    https://github.com/yurkth/userscripts
// @version      0.2.0
// @description  ゆとシート(DX3rd)の経験点表示を「+N」から「M」(M=130+N)に戻すスクリプト
// @author       torin
// @match        https://yutorize.2-d.jp/ytsheet/dx3rd/?id=*
// @match        https://yutorize.2-d.jp/ytsheet/dx3rd/?mode=mylist
// @match        https://yutorize.2-d.jp/ytsheet/dx3rd/?group=*
// @updateURL    https://github.com/yurkth/userscripts/raw/master/ytsheet/exp.user.js
// @downloadURL  https://github.com/yurkth/userscripts/raw/master/ytsheet/exp.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yutorize.2-d.jp
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  if (window.location.search.slice(1).split("=")[0] == "id") { // キャラシ
    replaceEvalExp(document.querySelector("section#exp>dl>dd"));
  } else { // キャラシ一覧
    document.querySelectorAll("td.exp").forEach(td => {
      replaceEvalExp(td);
    });
  }
})();

function replaceEvalExp(elem) {
  console.log(elem);
  if (elem.textContent[0] == "+") {
    elem.textContent = eval(`130${elem.textContent}`);
  }
}
