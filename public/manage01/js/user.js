
//已进入页面发送ajax请求,利用引擎模板,动态渲染数据

$(function(){

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




   










})













