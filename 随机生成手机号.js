/*
 *功能 随机生成手机号码
 *by Hyun Mai
 *QQ 2668649792
 */


log(getMoble())

function getMoble() {
    var QArray = new Array("130", "131", "132", "133", "135", "137", "138", "176", "187", "189");
    var Qi = parseInt(10 * Math.random());
    var Q = QArray[Qi];
    for (let i = 0; i < 8; i++) {
        Q = Q + Math.floor(Math.random() * 10);
    }
    return Q;
}