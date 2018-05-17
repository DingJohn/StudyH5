/**
 * 格式化指定的时间
 * @param dt 指定的需要格式化的事件
 * @returns {string} 格式化后的时间格式
 */
function formatDate(dt) {
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var hour = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();

    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return year + "年" + month + "月" + date + "日 " + hour + ":" + minutes + ":" + seconds;
}