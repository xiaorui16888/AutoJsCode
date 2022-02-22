function 平面预判(x1, y1, x2, y2, v1, v2, fx, fy) {
    //1号追击2号，已知2号的方向f和两者的速度。
    //求两者相遇的位置。


    let V1 = v1;
    let V2 = v2;
    let VC = V2 / (V1 - V2);
    let V1S = V1 / (V2 + V1);
    let V2S = V2 / (V2 + V1);


    let S = weiyi([x2 - x1, y2 - y1]);
    let S0 = VC * S;
    let S1 = V1S * S;
    let S2 = V2S * S;
    let R = (S0 + S2) / 2;
    let OB = R + S1;
    let O_ary = getsd(OB, [x2 - x1, y2 - y1]);
    let OX = x1 + O_ary[0];
    let OY = y1 + O_ary[1];
    let AB_ary = XYTOAB(x2, y2, fx, fy);
    return {
        ox: OX,
        oy: OY,
        r: R,
        pos: SolvePos(OX, OY, R, AB_ary[0], AB_ary[1])
    };

    function getsd(s, ary) {
        var sum = weiyi(ary);
        var S = s / sum;
        for (var i = 0; i < ary.length; i++) {
            ary[i] = ary[i] * S;
        };
        return ary;
    };

    function weiyi(ary) {
        var sum = 0;
        for (var i = 0; i < ary.length; i++) {
            sum += Math.pow(ary[i], 2);
        };
        return Math.sqrt(sum);
    };

    function XYTOAB(x, y, fx, fy) {
        var A = fy / fx;
        var B = y - A * x;
        return [A, B];
    };

    function SolvePos(a, b, r, k, c) {
        //圆与直线的交点
        //圆心坐标。a,b。半径r
        //直线表达方式为。y=kx+c;
        let a1 = k * k + 1;
        let b1 = 2 * k * (c - b) - 2 * a;
        let c1 = a * a + (c - b) * (c - b) - r * r;
        let delta = b1 * b1 - 4 * a1 * c1;
        let result = [];
        if (delta == 0) {
            let x0 = Math.sqrt(delta);
            let x1 = -b1 / (2 * a1);
            let y1 = k * x1 + c;
            result.push(x1, y1);
        } else if (delta > 0) {
            let x0 = Math.sqrt(delta);
            let x1 = (-b1 - x0) / (2 * a1);
            let y1 = k * x1 + c;
            result.push(x1, y1);
            let x2 = (-b1 + x0) / (2 * a1);
            let y2 = k * x2 + c;
            result.push(x2, y2);
        }
        return result;
    };


};
