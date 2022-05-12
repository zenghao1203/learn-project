/**
 * @description 实现一个AJAX请求
 * 1、创建一个 XMLHttpRequest 对象。
 * 2、在这个对象上使用 open 方法创建一个 HTTP 请求
 * 3、在发起请求前，可以为这个对象添加一些信息和监听函数
 * 4、当对象的属性和监听函数设置完成后，最后调用 sent 方法来向服务器发起请求
 */

function createAjax(url) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true)
  xhr.onreadystatechange = function() {
    if (this.readyState !== 4) return;
    // 当请求成功时
    if (this.status === 200) {
      handle(this.response);
    } else {
      console.error(this.statusText);
    }
  }
  xhr.onerror = function() {
    console.error(this.statusText);
  }
  xhr.responseType = "json"
  xhr.setRequestHeader("Accept", 'application/json')
  xhr.send(null)
}

// promise 封装实现：
function createAjaxPromise(url) {
  // 创建一个 promise 对象
  let promise = new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    // 新建一个 http 请求
    xhr.open("GET", url, true);
    // 设置状态的监听函数
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4) return;
      // 当请求成功或失败时，改变 promise 的状态
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    // 设置错误监听函数
    xhr.onerror = function() {
      reject(new Error(this.statusText));
    };
    // 设置响应的数据类型
    xhr.responseType = "json";
    // 设置请求头信息
    xhr.setRequestHeader("Accept", "application/json");
    // 发送 http 请求
    xhr.send(null);
  });
  return promise;
}