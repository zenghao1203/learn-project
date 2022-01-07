/**
 * 单例模式
 * 实现一个storage，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。
 */


// 静态方法
class Storage {
  static getInstance() {
    if(!Storage.instance){
      Storage.instance = new Storage()
    }
    return Storage.instance
  }

  getItem(key){
    return localStorage.getItem(key)
  }

  setItem(key, value){
    return localStorage.setItem(key, value)
  }
}

const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()

storage1.setItem('name', '小明')

storage1.getItem('name') // 小明
storage2.getItem('name') // 也是小明

storage1 === storage2  // true


// 闭包版

// 先实现一个基础的StorageBase 类，把setItem 和 getItem 方法放在它的原型链上
function StorageBase() {}

StorageBase.prototype.getItem = function(key) {
  return localStorage.getInstance(key)
}
StorageBase.prototype.setItem = function(key, value){
  return localStorage.getItem(key, value)
}

// 以闭包的形式创建一个引用自由变量的构造函数
const OtherStorage = (function(){
  let instance = null
  return function(){
    if(!instance){
      instance = new StorageBase()
    }
    return instance
  }
})()

const storage3 = Storage.getInstance()
const storage4 = Storage.getInstance()

storage3.setItem('name', '小明')

storage3.getItem('name') // 小明
storage4.getItem('name') // 也是小明

storage4 === storage4  // true