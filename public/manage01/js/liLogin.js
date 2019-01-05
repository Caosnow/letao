/* 需求: 登陆拦截, 如果当前用户未登录, 拦截到登陆页
 *  由于前端不知道用户的登录状态, 但是后端知道, 所以发送请求询问即可
 * */
$.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    datatype:'json',
    success:function(info){
        // console.log(info);
        if(info.error == 400){
            //未登录   去登录
            location.href = "login1.html";
        }
        //可写可不写
        if(info.success){
            console.log('当前用户已登录');
        }
    }
})
