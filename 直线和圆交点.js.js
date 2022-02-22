log(t(2,1,2,2,1));

function t(a, b, r, k, c) {
    let a1 = k * k + 1;
    let b1 = 2 * k * (c - b) - 2 * a;
    let c1 = a * a + (c - b) * (c - b) - r * r;
    let delta = b1 * b1 - 4 * a1 * c1;
    let result = [];
    let num = delta < 0 ? 0 : (delta > 0 ? 2 : 1);
    while (num-- > 0) {
        let x0 = Math.sqrt(delta);
        let x1 = (-b1 + Math.pow(-1, num) * x0) / (2 * a1);
        let y1 = k * x1 + c;
        result.push([{
            x: x1,
            y: y1
        }]);
    }
    return result;
}