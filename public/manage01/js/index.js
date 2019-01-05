

$(function(){

    //左边的柱形图

    // 基于准备好的dom，初始化echarts实例
    var echarts_left = echarts.init(document.querySelector('.echarts_left'));

     // 指定图表的配置项和数据
     var option = {
         //大标题
        title: {  
            text: '2019年注册人数' //副标题
        },
        tooltip: {}, //提示框组件
        legend: {
            data:['销量','人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [20, 60, 10, 40, 30, 20]
        },{
            name: '人数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 40]
        }]
    };
     // 使用刚指定的配置项和数据显示图表。
     echarts_left.setOption(option);



 // 基于准备好的dom，初始化echarts实例
 var echarts_right = echarts.init(document.querySelector('.echarts_right'));
  var option = {
    title : {
        text: '热门品牌销售',
        subtext: '2019年1月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','老奶奶','老爹爹','特步']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'老奶奶'},
                {value:135, name:'老爹爹'},
                {value:1548, name:'特步'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
 };

 // 使用刚指定的配置项和数据显示图表。
 echarts_right.setOption(option);

})