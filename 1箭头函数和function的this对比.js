// 普通函数和箭头函数的对比
const luke={
  id:2,
  say:function (){
    setTimeout(function (){
      console.log('普通函数1 id: ',this.id)
    },500)
  },
  saySaveThis:function (){
    let that=this
    setTimeout(function (){
      console.log('普通函数2 id: ',that.id)
    },500)
  },
  sayWithArrow:function (){
    setTimeout(()=>{
      console.log('箭头函数 id: ',this.id)
    },1500)
  }
}

luke.say()
luke.saySaveThis()
luke.sayWithArrow()

