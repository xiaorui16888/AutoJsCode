auto();

let threshold_range = [0.6, 0.9];

requestScreenCapture();
sleep(200);
let init_capt = captureScreen();
sleep(200);
toast("正在尝试匹配...\n当前阈值范围: " + threshold_range[0] + " - " + threshold_range[1]);

let kw_security_text = text("安全验证");
let key_node = kw_security_text.findOnce().parent().parent().child(1);

let verifying_area_bounds = key_node.child(0).child(0).bounds();
let sample_bounds = key_node.child(1).child(1).child(0).child(0).bounds();

let i = 0,
    while_safe_limit = 20,
    vf_bounds = {};
    
while (while_safe_limit--) {
    let bounds = setBoundsFn(i, verifying_area_bounds);
    if (!bounds) break;
    vf_bounds[i] = {};
    vf_bounds[i].bounds = bounds;
    vf_bounds[i].img_clip = images.clip(init_capt, bounds.l, bounds.t, bounds.r - bounds.l, bounds.b - bounds.t);
    i += 1;
}

let sample_bounds_cx = sample_bounds.centerX(),
    sample_bounds_cy = sample_bounds.centerY(),
    thr_min = threshold_range[0],
    thr_max = threshold_range[1];

let scores = Array(Object.keys(vf_bounds).length + 1).join(0).split("");

while (thr_min <= thr_max) {
    let j = 0;
    while (++j <= 20) setClipCapture(j, thr_min);
    thr_min += 0.1;
    log(scores)
}
let result = scores.indexOf(Math.max.apply(null, scores));

// // //
result === 0 && !toast("左上") ||
result === 1 && !toast("右上") ||
result === 2 && !toast("左下") ||
result === 3 && !toast("右下");
sleep(1500);
if (confirm("YES?")) click(628 / 2 - 588 / 2 + 588, 470 / 2 - 426 / 2 + 426);
// // //


// tool function(s) //

function setBoundsFn(area_ident_num, bounds) {
    let left = bounds.left,
        top = bounds.top,
        right = bounds.right,
        bottom = bounds.bottom,
        cx = bounds.centerX(),
        cy = bounds.centerY();

    let bounds_arr = [
        {l: left, t: top, r: cx, b: cy}, // left-top area
        {l: cx, t: top, r: right, b: cy}, // right-top area
        {l: left, t: cy, r: cx, b: bottom}, // left-bottom area
        {l: cx, t: cy, r: right, b: bottom}, // right-bottom area
    ];

    return bounds_arr[area_ident_num];
}

function setClipCapture(num, threshold) {
    let sample_img_clip = images.clip(init_capt, sample_bounds_cx - num, sample_bounds_cy - num, num * 2, num * 2);
    Object.keys(vf_bounds).forEach((value, idx) => {
        if (images.findImage(vf_bounds[idx].img_clip, sample_img_clip, {threshold: threshold})) scores[idx]++;
    });
}