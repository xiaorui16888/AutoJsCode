var DensityUtil={};
const scale=context.getResources().getDisplayMetrics().density;
DensityUtil.dp2px=function(dp){
    return Math.floor(dp*scale+0.5);
}
DensityUtil.px2dp=function(px){
    return Math.floor(px/scale+0.5);
}

module.exports=DensityUtil;