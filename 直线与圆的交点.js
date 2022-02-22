var Result = SolvePos(1, 1, 2, 2, 1);
log(Result)

//圆心(a,b)，半径r
//直线y=kx+b
function SolvePos(a, b, r, k, c) {
    var Discriminant = Math.pow(2 * a + 2 * b * k - 2 * c * k, 2) - 4 * (Math.pow(k, 2) + 1) * (Math.pow(a, 2) + Math.pow(b, 2) - 2 * b * c + Math.pow(b, 2) - Math.pow(r, 2));
    if (Discriminant < 0) {
        return false;
    } else if (Discriminant == 0) {
        var EquationRootNum = 1;
    } else {
        var EquationRootNum = 2;
    }
    var Xpos1 = ((2 * a + 2 * b * k - 2 * c * k) + Math.sqrt(Discriminant)) / (2 * Math.pow(k, 2) + 2);
    var Ypos1 = k * Xpos1 + c;
    if (EquationRootNum == 2) {
        var Xpos2 = ((2 * a + 2 * b * k - 2 * c * k) - Math.sqrt(Discriminant)) / (2 * Math.pow(k, 2) + 2);
        var Ypos2 = k * Xpos2 + c;
        return [Xpos1, Ypos1, Xpos2, Ypos2];
    } else {
        return [Xpos1, Ypos1];
    }
}