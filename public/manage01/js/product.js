
$(function(){
    // var currentId;//记录当前用户的id
    // var isStatus; //记录当前用户的状态
//发送 ajax 动态渲染页面
//声明一个全局变量   用来记录当前页数
var currentPage = 1;
//声明一个全局变量   用来记录当前页共有多少条数
var pageSize = 2;

//存放所有图片的对象(图片名称,图片地址)
var picArr = [ ];

//一进入页面就渲染一次
render();
function render(){
    $.ajax({
        type:'get',
        url:'/product/queryProductDetailList',
        data:{
            page:currentPage,
            pageSize:pageSize

        },
        datatype:'json',
        success:function(info){
            // console.log(info);
            var htmlstr = template('productTpl',info);
            $('tbody').html(htmlstr);


            //分页初始化
            $('#paginator').bootstrapPaginator({
                //版本号
                bootstrapMajorVersion:3,
                //当前页数
                currentPage:info.page,
                //总页数
                totalPages:Math.ceil(info.total/info.size),

                //点击分页事件
                onPageClicked:function(a,b,c,page){
                    // console.log(page);
                    //当前页和被点击的页数同步
                    currentPage = page;
                    //重新渲染
                    render();
                }
            })
        }

    })
}



//给操作栏的每一按钮注册点击事件  ,动态渲染的 ,需要事件委托

// $('tbody').on('click','.btn',function(){
//     //获取id
//     currentId = $(this).parent().data('id');
//     isStatus === 1? '下架':'上架';
//     console.log(currentId);
//     //发送ajax请求
//     $.ajax({
//         type:'post',
//         url:'/product/queryProductDetailList',
//         data:{
//             id:currentId,
//             st:isStatus
//         },
//         datatype:'json',
//         success:function(info){
//             console.log(info);
//         }
//     })
// })



    // 2  给添加按钮注册事件
    $('.addBtn').click(function(){
        //展示模态框
        $('#addModal').modal('show');

        //一点击按钮,发送  ajax 请求,获取二级分类的所有数据
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            //假设有需要这些条数据,没有的话,返回所有的数据,实际工作中,让后台给个接口即可
            data:{
                page:1,
                pageSize:100
            },
            datatype:'json',
            success:function(info){
                // console.log(info);
                var htmlStr = template('secondTpl',info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })


    // 3 给二级分类的 a  注册事件 ,把a  里面的文本赋值给  按钮
    //事件委托
        $('.dropdown-menu').on('click','a',function(){
            //点击a 获取 自身的文本
            var txt = $(this).text();
            //赋值给按钮文本
            $('#dropdownText').text(txt);
            //获取id 
            var id = $(this).data('id');
            $('[name="brandId"]').val(id);

            //更新校验字段的状态
            $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
        })




        //配置多文件上传
        $('#fileupload').fileupload({
            dataType:"json",
             //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
             done:function(e,data){
                //  console.log(data);

                 //后台返回的图片对象(图片名称和图片地址)
                 var picObj = data.result;
                //  console.log(picObj);
                //添加到数组的最前面
                picArr.unshift(picObj);
                // console.log(picArr);
                 var url = data.result.picAddr;
                //  console.log(url);

                 //把url路径赋值给img src
                 $('.img-box').prepend('<img style="width:100px;" src="'+ url +'" alt="">')

               //判断如果数组的长度 >3 时,让数组的最后一个图片删除
               if(picArr.length >3){
                   //删除数组的最后一项
                   picArr.pop();
                   //找到最后一个  img 类型的图片,让其自杀
                   $('.img-box img:last-of-type').remove();
               }
           
               //把隐藏域的状态更新
               $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID')

             }
        })







        //配置表单校验
        $('#form').bootstrapValidator({
            //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
            //默认是隐藏,但此时 需要对隐藏域进行校验,将其删除即可
            excluded: [],

            //2. 指定校验时的图标显示，默认是bootstrap风格
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            //校验字段
            fields:{
                brandId:{
                    validators:{
                        notEmpty:{
                            message:'请输入二级分类'
                        }
                    }
                },
                proName:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品名称'
                        }
                    }
                },
                proDesc:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品描述'
                        }
                    }
                },
                num:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品库存'
                        },
                        // 商品库存格式, 必须是非零开头的数字
          // 需要添加正则校验
          // 正则校验
          // 1,  11,  111,  1111, .....
          /*
          *   \d 表示数字 0-9
          *   +     表示出现1次或多次
          *   ?     表示出现0次或1次
          *   *     表示出现0次或多次
          *   {n}   表示出现 n 次
          *   {n,m} 表示出现 n 到 m 次
          * */
                        // 商品库存格式, 必须是非零开头的数字
                        regexp: {
                            regexp: /^[1-9]\d*$/,
                            message: '商品库存格式, 必须是非零开头的数字'
                          }
                    }
                },
                size:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品尺码'
                        },
                        // 必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44
                        regexp: {
                            regexp: /^\d{2}-\d{2}$/,
                            message: '必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44'
                        }
                    }
                },
                oldPrice:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品原价'
                        }
                    }
                },
                price:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品现价'
                        }
                    }
                },
                picStatus:{
                    validators:{
                        notEmpty:{
                            message:'请上传三张图片'
                        }
                    }
                }
                
            }
        })



        // console.log(picArr);


        //校验成功事件
        $('#form').on('success.form.bv',function(e){
            //阻止默认提交
            e.preventDefault();

            //还要拼接上图片的数据
           var paramsStr = $('#form').serialize();
           paramsStr += "&picArr=" + JSON.stringify(picArr);
            // console.log(paramsStr);


            //发送ajax 请求
            $.ajax({
                url:'/product/addProduct',
                type:'post',
                data:paramsStr,
                datatype:'json',
                success:function(info){
                    // console.log(info);
                    if(info.success){
                        //关闭模态框  重新渲染第一页
                        $('#addModal').modal('hide');
                        currentPage = 1;
                        render();
                    }
                }
            })
        })






})