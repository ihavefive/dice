//图片top添加蒙版
/*
$(document).ready(function(){
    $("input").click(function(){
        document.getElementById("img-top").className="top-mask";
    });
})
*/
//图片分离
$(document).ready(function(){  
    $("input").click(function(){
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
    });     
});

//图片重合
$(function(){
    $("#img-top").click(function(){
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
        $("input").delay(800).removeAttr("disabled");//允许重摇骰子
    })
})

