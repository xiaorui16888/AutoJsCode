// 定义抽象类===============开始=============
var Car = function () { }
Car.prototype = {
  getPrice: function () {
    return new Error('抽象方法不能调用')
  },
  getSpeed: function () {
    return new Error('抽象方法不能调用')
  }
}

var VehicleFactory = function (subType, superType) {
  // 判断抽象工厂钟是否有该类抽象
  if (typeof VehicleFactory[superType] === 'function') {
    // 缓存类
    function F() { }
    F.prototype = new VehicleFactory[superType]()
    // 将子类constructor 指向子类
    subType.constructor = subType
    // 子类原型继承 父类
    subType.prototype = new F()
  } else {
    // 不存在该抽象类抛出错误
    throw new Error('未创建该抽象类')
  }
}
// 小汽车抽象类
VehicleFactory.Car = function () {
  this.type = 'car'
}
VehicleFactory.Car.prototype = {
  getPrice: function () {
    return new Error('抽象方法不能调用')
  },
  getSpeed: function () {
    return new Error('抽象方法不能调用')
  }
}
// 公交车抽象类
VehicleFactory.Bus = function () {
  this.type = 'bus'
}
VehicleFactory.Bus.prototype = {
  getPrice: function () {
    return new Error('抽象方法不能调用')
  },
  getSpeed: function () {
    return new Error('抽象方法不能调用')
  }
}
// 货车抽象类
VehicleFactory.Truck = function () {
  this.type = 'truck'
}
VehicleFactory.Truck.prototype = {
  getPrice: function () {
    return new Error('抽象方法不能调用')
  },
  getSpeed: function () {
    return new Error('抽象方法不能调用')
  }
}

// 定义抽象类===============结束=============


// 抽象类继承 =============开始=============
// 宝马汽车子类
var BMW = function (price, speed) {
  this.price = price
  this.speed = speed
}
// 抽象工厂实现对 Car 抽象类的继承
VehicleFactory(BMW, 'Car')
BMW.prototype.getPrice = function () {
  return this.price;
}
BMW.prototype.getSpeed = function () {
  return this.speed
}
// 兰博基尼汽车子类
var Lamborghini = function (price, speed) {
  this.price = price
  this.speed = speed
}
// 抽象工厂实现对 Car 抽象类的继承
VehicleFactory(Lamborghini, 'Car')
Lamborghini.prototype.getPrice = function () {
  return this.price;
}
Lamborghini.prototype.getSpeed = function () {
  return this.speed
}
// 宇通汽车子类
var YUTONG = function (price, speed) {
  this.price = price
  this.speed = speed
}
// 抽象工厂实现对 Car 抽象类的继承
VehicleFactory(YUTONG, 'Car')
YUTONG.prototype.getPrice = function () {
  return this.price;
}
YUTONG.prototype.getSpeed = function () {
  return this.speed
}
// 奔驰汽车子类
var BenzTruck = function (price, speed) {
  this.price = price
  this.speed = speed
}
// 抽象工厂实现对 Car 抽象类的继承
VehicleFactory(BenzTruck, 'Car')
BenzTruck.prototype.getPrice = function () {
  return this.price;
}
BenzTruck.prototype.getSpeed = function () {
  return this.speed
}

// 抽象类继承 =============结束=============





// 测试代码  =============开始============= 
var truck = new BMW(1000000, 100)
console.log(truck.getPrice())
console.log(truck.type)



// 测试代码  =============结束============= 





















































































