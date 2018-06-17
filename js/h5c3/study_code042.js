$(function () {
    $(document).ready(function () {
        $('#fullpage').fullpage({
            // 设置每屏的背景颜色
            sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
            // 设置指示器
            navigation: true,
            verticalCentered: false,
            afterLoad: function (anchorLink, index) {
                // 页面滚动到某一屏是的回调
                $('.section:eq(' + (index - 1) + ')').addClass('now');
                if (index == 7) {
                    $('.section07 .star img').each(function (index) {
                        $(this).delay(index * 0.5 * 1000).css('opacity', '1');
                    });
                }
                if (index == 8) {
                    $('.section08 .btn').on('mouseenter', function () {
                        $('.section08 .btn img:first-child').css('opacity', '0');
                    });
                    $('.section08 .btn').on('mouseleave', function () {
                        $('.section08 .btn img:first-child').css('opacity', '1');
                    });
                    $('.section08').on('mousemove', function (e) {
                        console.log(e);
                        $('.section08 .hand img').css({left: e.clientX - 140, top: e.clientY + 60});
                    });
                    $('.section08 .again').on('click', function () {
                        $('.now , .leave').removeClass('.now').removeClass('.leave');
                        $('.content [style]').removeAttr('style');
                        $.fn.fullpage.moveTo(1);
                    });
                }
            },
            afterRender: function () {
                $('.more').on('click', function () {
                    // 页面生成完成后才可点击
                    $.fn.fullpage.moveSectionDown();
                });
            },
            onLeave: function (index, nextIndex, direction) {
                if (index == 2 && nextIndex == 3 ||
                    (index == 3 && nextIndex == 4) ||
                    (index == 5 && nextIndex == 6)) {
                    $('.section:eq(' + (index - 1) + ')').addClass('leave');
                }
            }
        });
    });
});