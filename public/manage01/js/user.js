
//已进入页面发送ajax请求,利用引擎模板,动态渲染数据

$(function(){
    //当前操作用户的id 
    var currentId;
    //当前需要修改用户的状态
    var isDelete;

    // 在全局声明一个页数来记录
    var currentPage = 1;
    //一页有5条数据
    var pageSize = 5;

    render();

    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page: currentPage,
                pageSize:pageSize
            },
            datatype:'json',
            success:function(info){
                console.log(info);
                var htmlStr = template('usertpl',info);
                $('tbody').html( htmlStr);
    
    
    
                // 2 分页 插件  paginator  初始化
                $('#paginator').bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage:info.page,
    
                    //总页数
                    totalPages:Math.ceil(info.total/info.size),
                    // 给页码添加点击事件
                    onPageClicked:function(a,b,c,page){
                        // console.log(page);
                        // 把点击的当前页数,赋值给全局的currentpage ,让他们同步关联
                        currentPage = page;
                        //重新渲染页面
                        render();
                    }
                })
             }
    
    
    
    
             
        })
    }




            // // 2 分页 插件  paginator  初始化
            // $('#paginator').bootstrapPaginator({
            //     //版本号
            //     bootstrapMajorVersion:3,
            //     //当前页
            //     currentPage:1,

            //     //总页数
            //     totalPages:5,
            //     //给页码添加点击事件
            //     onPageClicked:function(a,b,c,page){
            //         console.log(page);
            //     }
            // })




   



        // 3  给所有的操作栏  按钮注册事件  ,由于是动态渲染的,所以要 使用  事件委托 注册事件

        $('tbody').on('click','.btn',function(){

            //点击按钮,显示模态框
            $('#usertModal').modal('show');
             //获取当前用户的id 
             currentId = $(this).parent().data("id");
             console.log(currentId);
             //当前需要修改用户的状态   // 获取将用户修改成什么状态  // 禁用按钮 ? 禁用状态 0 : 启用状态 1
            //如果是禁用,按钮是启用状态 1 ,如果是正常,按钮是禁用状态0
             isDelete = $(this).hasClass('btn-danger')? 0: 1;
        })


        // 4 给模态框  确认按钮 注册点击事件 
        //发送ajax请求,
        $('.submitBtn').click(function(){
           
            $.ajax({
                url:'/user/updateUser',
                type:'post',
                data:{
                    id:currentId,
                    isDelete:isDelete
                },
                datatype:'json',
                success:function(info){
                    console.log(info);
                    if(info.success){
                        //关闭模态框  ,就是隐藏模态框
                        $('#usertModal').modal('hide');
                        //重新渲染页面
                        render();
                    }
                }
            })
        })


})













