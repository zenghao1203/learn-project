/**
 * @description call 实现
 * 1、判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况
 * 2、判断传入上下文对象是否存在，如果不存在，则设置为 window 
 * 3、处理传入的参数，截取第一个参数后的所有参数。
 * 4、将函数作为上下文对象的一个属性。
 * 5、使用上下文对象来调用这个方法，并保存返回结果。
 * 6、删除刚才新增的属性。
 * 7、返回结果
 */

Function.prototype.myCall = function(context){
  if(typeof this !== 'function'){
    console.error('type error')
    return
  }
  let agrs = [...arguments].slice(1)
  let result = null
  context = context || window
  context.fn = this
  result = context.fn(...agrs)
  delete context.fn
  return result
}

/**
 * @description apply 实现
 * 1、判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况
 * 2、判断传入上下文对象是否存在，如果不存在，则设置为 window 
 * 3、将函数作为上下文对象的一个属性。
 * 4、判断参数值是否传入
 * 5、使用上下文对象来调用这个方法，并保存返回结果。
 * 6、删除刚才新增的属性。
 * 7、返回结果
 */

Function.prototype.myApply = function(context){
  if(typeof this !== 'function'){
    console.error('type error')
    return
  }
  let result = null
  context = context || window
  context.fn = this
  if(arguments[1]){
    result = context.fn(...arguments[1])
  }else{
    result = context.fn()
  }
  delete context.fn
  return result
}

/**
 * @description bind 实现
 * 1、判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况
 * 2、保存当前函数的引用，获取其余传入参数值。
 * 3、创建一个函数返回
 * 4、函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。
 */

Function.prototype.myBind = function(context) {
  if(typeof this !== 'function'){
    console.error('type error')
    return
  }
  let agrs = [...arguments].slice(1)
  let fn = this
  return function Fn() {
    return fn.apply(this instanceof Fn ? this : context, agrs.concat(...arguments))
  }
}