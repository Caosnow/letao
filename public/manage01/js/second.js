
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
            // console.log(info);
            //利用引擎模板渲染数据
            var htmlStr = template('addTal',info);
            $('.dropdown-menu').html(htmlStr);

            
        }
    })

    // 3 给所有的  a 注册点击事件  让a 的值赋值给 一级分类的文本  
  //由于是动态渲染  需要事件委托
    $('.dropdown-menu').on('click','a',function(){
    //获取自己的文本
    var txt = $(this).text();
    //把a 的文本  赋值给  一级分类
    $('#dropdownText').text(txt);

    //获取 id 
    var id = $(this).data('id');
    // console.log(id);
    //设置给隐藏域的val()
    $('[name="categoryId"]').val(id);

        //由于对隐藏域进行了赋值, 所以需要将隐藏域校验状态改成成功
        //由于对隐藏域进行了赋值,所以要将隐藏域校验状态改成成功
        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
    })



    // 4 配置  fileupload 文件初始化
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

           //将地址赋值给隐藏域,
           $('[name="brandLogo"]').val(url);

           //由于对隐藏域进行了赋值,所以要将隐藏域的校验状态改成成功
           $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    })





    // 5 校验规则  
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        //注意这里需要对隐藏域校验
        excluded: [ ],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // //校验字段
        fields:{
            categoryId:{
                 validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },
            brandName:{
                validators:{
                   notEmpty:{
                       message:'请输入二级分类'
                   }
               }
           },
           brandLogo:{
            validators:{
               notEmpty:{
                   message:'请选择图片'
               }
           }
       }
        }
    });
    // 校验成功之后,添加校验成功事件,阻止默认提交 //发送ajax请求
    $('#form').on('success.form.bv',function(e){
        //阻止默认提交
        e.preventDefault();

        //发送ajax请求
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('#form').serialize(),
            datatype:'json',
            success:function(info){
                // console.log(info);
                if(info.success){
                    //关闭模态框  重新渲染第一页数据
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();

                    //重置模态框里面的内容
                    $('#form').data('bootstrapValidator').resetForm(true);
                    //手动重置一级分类 的文本 和 图片 的路径
                    $('#dropdownText').text('请选择一级分类');
                    $('.img-box img').attr('src','./images/none.png');


                }
            }
        })
    })


 





     









})














})