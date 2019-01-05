 // 进度条方法初体验
// 开启进度条
//NProgress.start();

//setTimeout(function() {
//  // 结束进度条
//  NProgress.done();
//}, 500)

// NProgress.start();
// setTimeout(function(){

//     NProgress.done();
// },500)


// 添加进度条效果:
// 1. 在第一个ajax开始发送时, 开启进度条
// 2. 在所有的ajax完成时, 结束进度条

// ajax 全局事件
// .ajaxComplete()   每个ajax完成时, 都会调用  (不管成功还是失败都调用)
// .ajaxSuccess()    每个成功的ajax, 都会调用
// .ajaxError()      每个失败的ajax, 都会调用
// .ajaxSend()       每个ajax准备发送时, 调用

// .ajaxStart()      第一个ajax发送时, 调用   (开启进度条)
// .ajaxStop()       当所有的ajax都完成时, 调用  (结束进度条)

// $(document).ajaxStart(function(){
//     //开启进度条
//     NProgress.start();
// })

// $(document).ajaxStop(function(){
//     // 模拟网络延迟
//     setTimeout(function(){
//         //结束进度条
//     NProgress.done();
//     },2000)
// })

    $(function(){
        $(document).ajaxStart(function() {
            // 开启进度条
            NProgress.start();
            })
            $(document).ajaxStop(function() {
            // 模拟网络延迟
             setTimeout(function() {
              // 结束进度条
              NProgress.done();
             }, 500)
            });
    })
  

//公共的功能
// 1 左侧二级菜单的切换功能
$(function(){
    $('.nav .category').click(function(){
        //切换下一个兄弟元素,显示隐藏
        $(this).next().slideToggle();
    })





    // 2  main 部分 左边侧边栏 显示隐藏效果   --> 左边侧边栏切换功能

    $('.icon_menu').click(function(){
        $('.lt-aside').toggleClass('hidemenu');
        $('.lt-main').toggleClass('hidemenu');
        $('.lt-main .topbar').toggleClass('hidemenu');
    })





    // 3 公共部分退出功能
    // 1) 显示模态框
    $('.icon_logout').click(function(){
        // $('#myModal').modal('show')
        $('#logoutModal').modal('show');
    })


    //// (2) 点击退出按钮, 发送退出请求, 实现退出
    $('#logoutBtn').click(function(){
        //思路 是发送一个ajax退出请求,让后台销毁session 数据  页面跳转到 登录页
        $.ajax({
            url:'/employee/employeeLogout',
            type:'get',
            datatype:'json',
            success:function(info){
                // console.log(info);
               if(info.success){
                    //退出成功,跳转登录页
                    location.href = "login1.html";
               }
            }
        })
    })


   





})























