
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

$(document).ready(function(){ 
    var dice1 = $("#dice1");
    var dice2 = $("#dice2");
    var dice3 = $("#dice3");
    var dice4 = $("#dice4");
    var dice5 = $("#dice5");
    var sum = Array(6);
    var num = Array(6);
    
    $("#button1").click(function(){
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

    });
});