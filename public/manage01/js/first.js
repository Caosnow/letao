
//已进入页面  动态渲染数据
$(function(){

    //全局声明一个当前页数
    var currentPage = 1;
    //全局声明   当前页显示的几条数据
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            datatype:'json',
            success:function(info){
                console.log(info);
                var htmlstr = template('firstTpl',info);
                $('tbody').html(htmlstr);
    
                //分页 初始化
                $('#paginator').bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion:3,
                    //显示的当前页数
                    currentPage:info.page,
                    //总的页数
                    totalPages:Math.ceil(info.total/info.size),
                    //为按钮绑定点击事件,页数被点击的时候触发
                    onPageClicked:function(a,b,c,page){
                        // console.log(page);
                        //把点击的页数,赋值给当前页数,同步
                        currentPage = page;
                        //重新渲染页面
                        render();
                    }
    
                })
            }
        })
    }

})