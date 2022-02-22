var txtt;

if(!("libs_inthis" in this)) throw "请用CreateJS加载";

libs_inthis.useEZ();
libs_inthis.clearCallBack("JS")
libs_inthis.addCallBack("JS",function(obj){
 var s = obj[0]+""
 var ctx
 switch(s){
     case "onCreate":
        ctx = obj[1]
        onCreate(ctx)
     break;
     }
}).startNewOne();

function onCreate(ctx){
    ctx.setContentView(CR.layout.layout_for_js)
        var toolbar = ctx.findViewById(CR.id.toolbar)
        ctx.setSupportActionBar(toolbar)
        ctx.getSupportActionBar().setTitle("CreateJS");
        var root = ctx.findViewById(CR.id.root_layout)
        var tv = new android.widget.TextView(ctx)
        tv.setTextSize(5)
        procCmd("Hello World !");
        tv.setText(txtt)
        root.addView(tv)
    }







function procCmd(str){
    txtt = new java.lang.StringBuilder();
getpix(string2bit(str))
}
function getpix(bit){
var pixels = [];//保存像素信息
var x=[]//保存宽
var y=[]//保存高 
var mx,my
for(var a = 0;a<bit.getHeight();a++){
    
    for(var b = 0;b<bit.getWidth();b++){
        if(b>130)break;
    var red = (bit.getPixel(b,a) & 0x00ff0000) >> 16; 
    	if(red ==0){
            txtt.append("■");
            }
            else{
                txtt.append("□");
                }
    }
    txtt.append("\n");
}

}



function string2bit(text){
var textPaint = new android.text.TextPaint();
var familyName = "宋体";  
var font = android.graphics.Typeface.create(familyName, android.graphics.Typeface.NORMAL);  
		textPaint.setTypeface(font); 
		// textPaint.setARGB(0x31, 0x31, 0x31, 0);
		textPaint.setColor(android.graphics.Color.BLACK);

		textPaint.setTextSize(18);

		var layout = new android.text.StaticLayout(text, textPaint, 450,		android.text.Layout.Alignment.ALIGN_NORMAL, 0.8, 0.0, true);
		var bitmap = android.graphics.Bitmap.createBitmap(layout.getWidth() + 20,
											layout.getHeight() + 20, android.graphics.Bitmap.Config.ARGB_8888);
	  var canvas = new android.graphics.Canvas(bitmap);
		canvas.translate(10, 10);
		canvas.drawColor(android.graphics.Color.WHITE);

		layout.draw(canvas);
				return bitmap;
}


