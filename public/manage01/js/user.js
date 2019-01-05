
//已进入页面发送ajax请求,利用引擎模板,动态渲染数据

$(function(){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        datatype:'json',
        success:function(info){
            console.log(info);
        }
    })
})













