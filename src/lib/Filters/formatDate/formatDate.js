export default (time, fmt, isSpecial) => {
  // isSpecial 这个字段主要是为了处理一些特殊格式用于判断
  fmt = fmt || 'yyyy-MM-dd';
  let date = new Date(parseInt(time));

  let minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
  let hour = minute * 60;
  let day = hour * 24;
  let now = new Date().getTime();
  let diffValue = now - time;
  if (diffValue < 0) return;
  if (isSpecial && diffValue < day) {
    fmt = '今日 '+fmt;
  }
  let o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      str = str.length > 1 ? str : 0 + str;
      fmt = fmt.replace(RegExp.$1, str);
    }
  }

  return fmt;
}
