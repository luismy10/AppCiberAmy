export function getCurrentDate() {
    let today = new Date();
    let formatted_date = today.getFullYear() + "-" + ((today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1)) + "-" + (today.getDate() > 9 ? today.getDate() : '0' + today.getDate());
    return formatted_date;
}

export function getCurrentTime() {
    let today = new Date();
    let formatted_time = (today.getHours() > 9 ? today.getHours() : '0' + today.getHours()) + ":" + (today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes()) + ":" + (today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds());
    return formatted_time;
}

export function timeForma24(value) {
    var hourEnd = value.indexOf(":");
    var H = +value.substr(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    return h + value.substr(hourEnd, 3) + ":" + value.substr(6, 2) + " " + ampm;
}

export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = "") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (negativeSign + (j ? i.substr(0, j) + thousands : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : ""));
    } catch (e) {
        return 0;
    }
}

export function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}