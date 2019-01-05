

/*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  // 进行表单校验初始化

$(function(){
    //初始化表单校验插件
    $('#form').bootstrapValidator({

        //指定校验时的图标显示,默认是bootstrap风格
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        },

        //指定校验字段,什么是字段 ,form 表单要想提交必须要有
        //name属性
        fields:{
            //校验用户名  ,用户名不能为空
            username:{
                validators:{
                    //不能为空
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    //长度校验   用户名长度必须是2-6位
                    stringLength:{
                        min:2,
                        max:6,
                        message:"用户名长度必须是2-6位"
                    },
                    //callback 专门用于配置回调的提示
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            password:{
                //校验密码  不能为空
                validators:{
                    //不能为空
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    //长度校验   密码必须是6-12位
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码必须是6-12位"
                    },
                    //callback 专门用于配置回调的提示
                    callback:{
                        message:"密码错误"
                    }
                }
            }
        }
    })


    /*
  * 2. 我们需要用到插件的校验功能, 所以要用 submit 按钮
  *    所以需要注册表单校验成功事件, 在事件中, 阻止默认的提交(防止跳转),
  *  通过 ajax 提交即可
  * */

//2 我们需要用到插件的校验功能,所有要用submit按钮
//所以需要注册表单校验成功事件,在事件中,阻止默认的提交(防止跳转)

    $('#form').on('success.form.bv',function(e){
        //阻止submit的提交功能, 阻止跳转
        // e.stopPropagation();
        e.preventDefault();
        // console.log("阻止了");
        //发送请求 登录
        $.ajax({
            type:"post",
            //绝对路径的好处,即使文件上传到服务器还是可以访问到
            url:"/employee/employeeLogin",
            // username=root&password=123456 表单序列化
            data:$('#form').serialize(),
            datatype:"json",
            success:function(info){
                console.log(info);
                //成功就跳转到首页
                //判断
                if(info.error == 1000){
                    // alert('用户名不存在!!')
        // 调用插件实例方法, 更新校验状态成失败, 提示用户
          // updateStatus( field, status, validator );
          // 参数1: 校验字段
          // 参数2: 校验状态  NOT_VALIDATED, VALIDATING, 
          //INVALID or VALID
          // 参数3: 校验规则, 配置用于显示 message 提示
          //调用插件实例方法
                    //updateStatus(field,status,validator)
                    // 校验字段  校验状态,校验规则
                    $('#form').data('bootstrapValidator'). updateStatus("username","INVALID","callback");
                   return;

                }
                if(info.error == 1001){
                    // alert('密码错误')
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
                if(info.success){
                    //跳转首页
                    location.href = "index.html";
                }

            }
        })

    })



    //重置按钮 
    // 点击重置按钮,内容清空,隐藏所有的错误提示和图标
    $('[type="reset"]').click(function(){
        $('#form').data("bootstrapValidator").resetForm();
    })

})


















