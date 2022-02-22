var result1 = SolvePos(4, 8, 3, 2)
log(result1)

function SolvePos(a, b, k, c) {
    //椭圆 (x^2)/(a^2) + (y^2)/(b^2)  = 1
    //直线 y = k*x + b
    //return x1，y1，x2，y2
    var Discriminant = Math.pow(a, 4) * Math.pow(b, 2) * Math.pow(k, 2) + Math.pow(a, 2) * Math.pow(b, 4) - a * a * b * b * c * c;
    if (Discriminant < 0) {
        return [];
    } else if (Discriminant == 0) {
        var RootNum = 1;
    } else {
        var RootNum = 2;
    }
    var result = [];
    var Xpos1 = (-a * a * c * k - Math.sqrt(Discriminant)) / (a * a * k * k + b * b);
    var Ypos1 = k * Xpos1 + c;
    result.push(Xpos1, Ypos1);
    if (RootNum == 2) {
        var Xpos2 = (-a * a * c * k + Math.sqrt(Discriminant)) / (a * a * k * k + b * b);
        var Ypos2 = k * Xpos2 + c;
        result.push(Xpos2, Ypos2);
    }
    return result;
}