function sifter(id1,id2){
    var num;
    $(function(){
        id2.append("<div id='dice_mask'></div>");//加遮罩
        id1.attr("class","dice");//清除上次动画后的点数
        id1.css('cursor','default');
        var nums = Math.floor(Math.random()*6+1);//产生随机数1-6
        num=nums;
        id1.animate({left: '+2px'}, 100,function(){
            id1.addClass("dice_t");
        })
        .delay(160).animate({top:'-2px'},100,function(){
            id1.removeClass("dice_t").addClass("dice_s");
        })
        .delay(160).animate({opacity: 'show'},600,function(){
            id1.removeClass("dice_s").addClass("dice_e");
        })
        .delay(160).animate({left:'-2px',top:'2px'},130,function(){
            id1.removeClass("dice_e").addClass("dice_"+nums);
            id1.css('cursor','pointer');
            $("#dice_mask").remove();//移除遮罩
        });
    });
    return num;
}

function listhenShake(shakeProtect){
    var SHAKE_THRESHOLD = 5400;//原值为4000
    var SHAKE_STOP = 1000;
    //运动事件监听
    if (window.DeviceMotionEvent) {
        if (shakeProtect==true) 
        {   //alert("o");
            window.addEventListener('devicemotion',deviceMotionHandler,false);
        }
    }
    else {
        alert('抱歉，本设备不支持摇一摇功能，请使用按钮投掷骰子');
    }

    //获取加速度信息
    //通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
    //而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
    var last_update = 0;
    var x, y, z, last_x = 0, last_y = 0, last_z = 0;
    function deviceMotionHandler(eventData) {
        var acceleration =eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime-last_update)> 10) {
            var speeds = [];
            var diffTime = curTime -last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
            if (speed > SHAKE_THRESHOLD) {
                window.removeEventListener('devicemotion',deviceMotionHandler,false);
                speed=0;
                //alert(speed);
                setTimeout(function(){
                    shakeShow(shakeProtect);
                }),200;
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
    }

    function shakeShow(shakeProtect) {
        shakeProtect=false;
        //window.removeEventListener('devicemotion',deviceMotionHandler,false);
        var sum= new Array(6);
        var num=new Array(6);

        $("#main").fadeIn(2000);     //骰子显示
        $("#img-top").animate({
            position: "relative",
            top:"-1200px",
            opacity:"0.5"       //蒙版效果仅支持chrome
        },1000);
        $("#img-bottom").animate({
            position: "relative",
            top:"1200px"
        },1000,function(){
            $(this).fadeOut(1000);
        });
        //添加骰子摇动的声音

        $("input").attr("disabled","disabled");//禁止重摇骰子

        var sum = Array(6);
        var num = Array(6);
        num[1] = sifter($("#dice1"),$("#wrap1"));
        num[2] = sifter($("#dice2"),$("#wrap2"));
        num[3] = sifter($("#dice3"),$("#wrap3"));
        num[4] = sifter($("#dice4"),$("#wrap4"));
        num[5] = sifter($("#dice5"),$("#wrap5"));

        for(var i=1;i<7;i++)
        {
            sum[i]=0;
        }
        
        for(var i=1;i<6;i++)
        {
            switch(num[i])
            {
                case 1: sum[1]++; break;
                case 2: sum[2]++; break;
                case 3: sum[3]++; break;
                case 4: sum[4]++; break;
                case 5: sum[5]++; break;
                case 6: sum[6]++; break;
            }
        }

        $("#sum1").html("");
        $("#sum2").html("");
        $("#sum3").html("");
        $("#sum4").html("");
        $("#sum5").html("");
        $("#sum6").html("");//清空上一局骰子个数的显示

        var k = 1;
        for(var j=1;j<7;j++)
        {
            if(sum[j]!=0)
            {
                var p = "#sum" + k;
                k++;
                $(p).html(j+"点的个数是<span>"+sum[j]+"</span>");//智能显示骰子个数
            }
        }
        $('.des') 
        .delay(0) 
        .queue(function(){$(this).hide().dequeue();}) 
        .delay(1200) 
        .show(1); //延迟显示骰子点数
    }

}

$(document).ready(function(){
    setTimeout(function(){
        //alert("one");
        var shakeProtect=true;
        listhenShake(shakeProtect);
    },600);
    $("#img-top").delay(1000).click(function(){
        $("#main").fadeOut(0);      //骰子消失
        $("#img-bottom").fadeIn(0);
        $("#img-top").animate({
            position: "relative",
            top:"0px"
        },800);
        $("#img-bottom").animate({
            position: "relative",
            top:"0px"
        },800,function(){
            $("#img-top").removeClass("top-mask");
        });
        $("#button1").delay(800).removeAttr("disabled");//允许重摇骰子
        //shakeProtect=true;
        var shakeProtect=true;
        listhenShake(shakeProtect);
    })
})




