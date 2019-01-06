
//  1   已进入页面  动态渲染数据
$(function(){

    //全局声明一个当前页数
    var currentPage = 1;
    //全局声明   当前页显示的几条数据
    var pageSize = 5;
    //已进入页面就发送请求,渲染页面
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
                // console.log(info);
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





    //  2 点击添加按钮 功能
    $('#addBtn').click(function(){

        //展示模态框
        $('#addtModal').modal('show');
    })


    // 3 进行校验配置
    $('#form').bootstrapValidator({
         // 指定校验时的图标显示，默认是bootstrap风格
         feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },

         // 指定校验字段 一定要有name
         fields:{
             //名字
            categoryName:{
                //不为空
                validators:{
                    notEmpty:{
                        message:"请输入一级分类名称"
                    }
                }
            }
         }
    });

    // 4 当表单校验成功时,会触发success.form.bv  事件
    $('#form').on('success.form.bv',function(e){
        //阻止默认跳转
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data: $('#form').serialize(),
            datatype:'json',
            success:function(info){
                console.log(info);
                //关闭模态框
                $('#addtModal').modal('hide');
                //重新渲染页面
                //记住重新渲染第一页
                currentPage = 1;
                render();
            }
        })
    })






})