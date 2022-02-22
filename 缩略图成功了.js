

importClass(android.media.ThumbnailUtils)
importClass(android.graphics.BitmapFactory)
importClass(android.graphics.Bitmap)
importClass(java.io.File)
importClass(java.io.FileOutputStream)





// import android.content.Context;
// import android.graphics.Bitmap;
// import android.graphics.Bitmap.Config;
// import android.graphics.Paint.Style;
// import android.graphics.Canvas;
// import android.graphics.Color;
// import android.graphics.Paint;
// import android.util.AttributeSet;
// import android.view.View;

// import android.graphics.Bitmap;
// import android.graphics.BitmapFactory;
// import android.support.v7.app.AppCompatActivity;
// import android.os.Bundle;
// import android.widget.TextView;
// import android.widget.Toast;

// import android.content.ContentResolver;
// import android.content.Intent;
// import android.graphics.Bitmap;
// import android.graphics.BitmapFactory;
// import android.net.Uri;
// import android.os.Bundle;
// import android.os.Environment;
// import android.support.v7.app.AppCompatActivity;
// import android.util.Log;
// import android.view.View;
// import android.widget.Button;
// import android.widget.ImageView;

// import java.io.FileNotFoundException;
// import java.io.InputStream;
// import java.io.File;
// import java.io.FileOutputStream;





function getImageThumbnail(imagePath, width, height) {
    options = new BitmapFactory.Options();
    options.inJustDecodeBounds = true; //关于inJustDecodeBounds的作用将在下文叙述
    bitmap = BitmapFactory.decodeFile(imagePath, options);
    h = options.outHeight;//获取图片高度
    w = options.outWidth;//获取图片宽度
    scaleWidth = w / width; //计算宽度缩放比
    scaleHeight = h / height; //计算高度缩放比
    scale = 1;//初始缩放比
    if (scaleWidth < scaleHeight) {//选择合适的缩放比
        scale = scaleWidth;
    } else {
        scale = scaleHeight;
    }
    if (scale <= 0) {//判断缩放比是否符合条件
        be = 1;
    }
    options.inSampleSize = scale;
    // 重新读入图片，读取缩放后的bitmap，注意这次要把inJustDecodeBounds 设为 false
    options.inJustDecodeBounds = false;
    bitmap = BitmapFactory.decodeFile(imagePath, options);
    // 利用ThumbnailUtils来创建缩略图，这里要指定要缩放哪个Bitmap对象
    bitmap = ThumbnailUtils.extractThumbnail(bitmap, width, height,ThumbnailUtils.OPTIONS_RECYCLE_INPUT);
    return bitmap;
}

imagePath="/sdcard/666.jpg"
var src = images.read(imagePath);
var width=10
var height=10

result=getImageThumbnail(imagePath, width, height)
console.log(result)

function saveBitmapToSDCard(bitmap, path) {

  file = new File(path);
  if(file.exists()) {
      file.delete();
  }
  try {
      fileOutputStream = new FileOutputStream(file);
      bitmap.compress(Bitmap.CompressFormat.PNG, 100, (fileOutputStream));//设置PNG的话，透明区域不会变成黑色

      fileOutputStream.close();
      log("----------save success-------------------");
  }
  catch(e) {
      console.log(e)
  }

}

saveBitmapToSDCard(result, "/sdcard/1.jpg")
app.viewFile("/sdcard/1.jpg");
