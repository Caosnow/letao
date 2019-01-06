
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



// 2 给添加按钮 注册点击事件

$('#addBtn').click(function(){
    //展示模态框
    $('#addModal').modal('show');

    //显示模态框,like发送ajax请求,获取一级分类的所有数据,动态渲染 
    //通过配置 page:1, pageSize:100 获取所有的一级分类
    //通过配置 page:1,pageSize:100 获取所有的一级分类
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page:1,
            pageSize:100
        },
        datatype:'json',
        success:function(info){
            console.log(info);
            //利用引擎模板渲染数据
            var htmlStr = template('addTal',info);
            $('.dropdown-menu').html(htmlStr);
        }
    })




    // 3 校验规则  
    $('#form').bootstrapValidator({
        //校验字段
        fields:{
            categoryId:{
                 validators:{
                    notEmpty:{
                        message:'二级分类名称不能为空'
                    }
                }
            }
        }
    })


 // 4 给所有的  a 注册点击事件  让a 的值赋值给 一级分类的文本  
  //由于是动态渲染  需要事件委托
    $('.dropdown-menu').on('click','a',function(){
        //获取自己的文本
        var txt = $(this).text();
        //把a 的文本  赋值给  一级分类
        $('#dropdownText').text(txt);
    })





     // 5 配置  fileupload 文件初始化
     $('#fileupload').fileupload({
         datatype:'json',
         //文件上传完成的回调函数
         //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
         //data 图片上传后的对象,通过data.resulit.picAddr可以获取上传后的图片地址
         done:function(e,data){
            // console.log(data);
            var url = data.result.picAddr;
            // console.log(url);
            $('.img-box img').attr('src',url);
         }
     })









})














})