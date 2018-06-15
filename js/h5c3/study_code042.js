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
            },
            afterRender: function () {
                $('.more').on('click', function () {
                    // 页面生成完成后才可点击
                    $.fn.fullpage.moveSectionDown();
                });
            },
            onLeave: function (index, nextIndex, direction) {
                if (index == 2 && nextIndex == 3) {
                    $('.section:eq(' + (index - 1) + ')').addClass('leave');
                }
                if (index == 3 && nextIndex == 4) {
                    $('.section:eq(' + (index - 1) + ')').addClass('leave');
                }
            }
        });
    });
});