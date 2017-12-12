/**
 * @fileOverView: #
 * @author: xuejian.xu
 * @date: 2017/11/30.
 */

/**
 * 获取url上的参数
 * @param name
 * @returns {null}
 */
export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
