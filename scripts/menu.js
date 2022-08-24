
$(function() {
    // a标签属性
    $(".main a").attr("target","_blank");

    // 页面加载时目录下拉
    $("li.now").children("ul").slideDown();
    $(".list > a").click(function() {
        $("li.now").children("ul").slideToggle();
    });

    // 互斥锁 
    var flag = true;

    // 鼠标滚动页面可以到相应目录区域
    $(window).scroll(function() {
        // 页面滚动到某个内容区域，导航中的li相应添加和删除current类名
        if (flag) {
            $(".show").each(function(i, ele) {
                if ($(document).scrollTop() > $(ele).offset().top) {
                    $(".list li").eq(i).addClass("current").siblings().removeClass();
                }else if ($(document).scrollTop() < 20) {
                    $(".list li").removeClass("current");
                }
            })
        }
        // 页面滚动到一定程度时，菜单栏上移或下移
        if ($(document).scrollTop() > 60) {
            $(".menu").css("top", "60px");
        }else {
            $(".menu").css("top", "120px");
        }
    });

    // 点击导航页面可以滚动到相应内容区域
    $(".list li").click(function() {
        flag = false;
        // 当我们每次点击li就计算出页面要去往的位置 
        // 选出对应索引号的内容区的盒子并计算它的.offset().top
        var current = $(".show").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current+1
        }, function() {
            flag = true;
        });
        // 点击之后，让当前的li添加current类名，兄弟移除current类名
        $(this).addClass("current").siblings().removeClass();
    });
})