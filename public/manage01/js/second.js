
$(function(){

//已进入页面发送ajax 请求  ,渲染页面

//在全局  声明一个 当前页数 默认第一页
    var currentPage = 1;
// 默认当前页数有5条数据
     var pageSize = 5;

    render();

   function render(){
    $.ajax({
        url:'/category/querySecondCategoryPaging',
        type:'get',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        datatype:'json',
        success:function(info){
            // console.log(info);
            //利用引擎模板,引包 准备模板  
            var htmlStr = template('secondTpl',info);
            $('tbody').html(htmlStr);

            //分页 初始化 
            $('#paginator').bootstrapPaginator({
                //版本号
                bootstrapMajorVersion:3,
                //当前页数
                currentPage:info.page,
                //总页数
                totalPages:Math.ceil(info.total/info.size),
                //当页数被点击的时候,触发的事件  onPageClicked
                onPageClicked:function(a,b,c,page){
                    // console.log(page);
                    // 让当前页数 和 被点击的页数 一致 同步
                    currentPage = page;
                    //重新渲染
                    render();
                }
            })
        }
    })
   }


















})