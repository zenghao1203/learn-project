/**
 * @description new 的模拟实现
 * 1、创建一个新对象
 * 2、将对象的原型设置为函数的 prototype 对象
 * 3、让函数的 this 指向这个函数
 * 4、判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象
 */

function objectFactory() {
  let obj = null;
  let constructor = [].prototype.shift.call(arguments)
  let result = null
  if(typeof constructor !== 'function') {
    return
  }
  // 创建一个空对象，对象的原型为构造函数的 prototype 对象
  obj = Object.create(constructor.prototype)
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(obj, arguments)
  // 判断返回对象
  let flag = result && (typeof result === 'object' || typeof result === 'function')

  return flag ? result : obj
}
