// ==UserScript==
// @name         YTSheet Old Exp
// @namespace    https://github.com/yurkth/userscripts
// @version      0.1.0
// @description  ゆとシート(DX3rd)の経験点表示を「+N」から「M」(M=130+N)に戻すスクリプト
// @author       torin
// @match        https://yutorize.2-d.jp/ytsheet/dx3rd/?mode=mylist
// @match        https://yutorize.2-d.jp/ytsheet/dx3rd/?group=*
// @updateURL    https://github.com/yurkth/userscripts/raw/master/ytsheet/exp.user.js
// @downloadURL  https://github.com/yurkth/userscripts/raw/master/ytsheet/exp.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yutorize.2-d.jp
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  document.querySelectorAll("td.exp").forEach(td => {
    td.textContent = eval(`130${td.textContent}`);
  });
})();
