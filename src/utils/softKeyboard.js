var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

import { Toast } from 'mint-ui'

let blur = () =>{
  if (isiOS) {
    document.body.scrollTop = 0;
  }
};

let focusInput = () => {
  var node = document.activeElement;
  // const height = document.documentElement.clientHeight;
  if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
    window.addEventListener("resize", function () {
      if (node.tagName == "INPUT" || node.tagName == "TEXTAREA") {
        // document.getElementById('app').style.height = `${height}px`;
        window.setTimeout(function () {
          // document.activeElement.scrollIntoView(false);
          document.activeElement.scrollIntoViewIfNeeded();
        }, 0);
      }
    })
  }
  if (isiOS) {
    //页面有多个输入框----计算滚动位置（待优化）
    let clientHeight = document.documentElement.clientHeight;
    let offsetTop = node.offsetTop;
    let scrollH = offsetTop - clientHeight;
    let scrollTop = document.getElementById('viewBox').scrollTop;
    // Toast({
    //   message: JSON.stringify(offsetTop)+'---->'+JSON.stringify(scrollTop)+'---->'+JSON.stringify(clientHeight)+'---->'+JSON.stringify(scrollH),
    //   duration: -1,
    // });
    let distance = Math.abs(scrollH);
    if (clientHeight - offsetTop < 0) { // 不再可视区的处理
      setTimeout(() => {
        document.body.scrollTop = scrollTop < 100 ? scrollTop*3 + distance : distance;
      },150)
    } else {
      setTimeout(() => {
        if (scrollTop < 100) {
          scrollTop = (scrollTop+80)*5;
          if (distance < 100) {
            distance = (distance+80)*5 > 400 ? 400 : (distance+80)*5;
          }
          document.body.scrollTop = Math.abs(distance+scrollTop);
        } else {
          scrollTop = scrollTop > 100 ? 100 : scrollTop;
          distance = distance > 100 ? 100 : distance;
          document.body.scrollTop = Math.abs(distance-scrollTop);
        }
      },150)
    }
  }
};

export default {
  blur,
  focusInput,
};

