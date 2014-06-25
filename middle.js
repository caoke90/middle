
var middle=function(){
    var next=function(func1,func2){
        return function(){
            var arg=Array.prototype.slice.call(arguments)
            var arr=[].concat(arg)
            arg.push(function(){
                func2.apply(this,arr)
            })
            return func1.apply(this,arg);
        }
    }
    var arg=Array.prototype.slice.call(arguments)
    var func=arg[arg.length-1]
    for(var i=arg.length-2;i>=0;i--){
        func=next(arg[i],func)
    }
    return func
}

function use(func,name){
    func("参数1","参数2")
    console.log(name)
}
//原始
use(function(req,res){
    console.log(1)
    console.log(req)
},"第二个参数")
//使用中间件
use(middle(function(req,res,next){
    console.log(1)
    console.log(res)
    next()
},function(req,res,next){
    console.log(2)
    console.log(req)
    next()
},function(req,res,next){
    console.log(3)
    console.log(req)
    next()
},function(req,res,next){
    console.log(4)
    console.log(req)

}),"第二个参数")