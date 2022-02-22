importPackage(android.graphics);
log(new Canvas());

var matrix= new Matrix();
        log(matrix);
        matrix.setTranslate(100,100);
        //矩阵坐标移动(x偏移,y偏移)
        log(matrix);
        matrix.postScale(0.5,0.5);
        //矩阵缩放(sx,sy,x…,y…);
        log(matrix);
        matrix.postRotate(30);
        //矩阵旋转(Y,x…,y…)
        log(matrix);
        matrix.postSkew(1,2);
        //错切(x,y,x…,y…)
        log(matrix);
        log(matrix.toShortString());
        //{name:"getValues",type:"function",string:"function getValues() {/*void getValues(float[])*/}"}
//var buffer = java.lang.reflect.Array.newInstance(		java.lang.Float.TYPE, 3);
var ary=util.java.array("float", 8);

      //  var ary=[1.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0];
        matrix.mapPoints(ary,ary);
        log(ary);
        /*
{name:
"mapPoints",
type:
"function",
string:
"function mapPoints() {
void mapPoints(float[],float[])
void mapPoints(float[],int,float[],int,int)
void mapPoints(float[])
}
"}
*/

/*
Matrix matrix1 = new Matrix();
    Matrix matrix2 = new Matrix();
    matrix1.setTranslate(1,2);
    matrix2.setTranslate(2,2);
    // 输出：matrix1 == matrix2:false
    System.out.println("matrix1 == matrix2:" + matrix1.equals(matrix2));

*/
/*Matrix matrix = new Matrix();
    
    // 输出：+号相连：Matrix{[1.0, 0.0, 0.0][0.0, 1.0, 0.0][0.0, 0.0, 1.0]}
    System.out.println("+号相连：" + matrix);
    // 输出：Matrix{[1.0, 0.0, 0.0][0.0, 1.0, 0.0][0.0, 0.0, 1.0]}
    System.out.println("toString：" + matrix.toString());
    // 输出：[1.0, 0.0, 0.0][0.0, 1.0, 0.0][0.0, 0.0, 1.0]
    System.out.println("toShortString：" + matrix.toShortString());
*/


/*
public static final int MSCALE_X = 0;   //!< use with getValues/setValues
public static final int MSKEW_X  = 1;   //!< use with getValues/setValues
public static final int MTRANS_X = 2;   //!< use with getValues/setValues
public static final int MSKEW_Y  = 3;   //!< use with getValues/setValues
public static final int MSCALE_Y = 4;   //!< use with getValues/setValues
public static final int MTRANS_Y = 5;   //!< use with getValues/setValues
public static final int MPERSP_0 = 6;   //!< use with getValues/setValues
public static final int MPERSP_1 = 7;   //!< use with getValues/setValues
public static final int MPERSP_2 = 8;   //!< use with getValues/setValues
方法示例：

    Matrix matrix = new Matrix();
    
    // matrix = [1.0, 0.0, 0.0][0.0, 1.0, 0.0][0.0, 0.0, 1.0]
    System.out.println("matrix = " + matrix.toShortString());

    float[] values = new float[9];
    matrix.getValues(values);
    
    // matrix转换成数组后 = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]
    System.out.println("matrix转换成数组后 = " + Arrays.toString(values));

    // 为matrix赋值
    values [Matrix.MTRANS_X] = 2;
    values [Matrix.MTRANS_Y] = 3;
    matrix.setValues(values);

    // matrix = [1.0, 0.0, 2.0][0.0, 1.0, 3.0][0.0, 0.0, 1.0]
    System.out.println("matrix = " + matrix.toShortString());

*/



/*
    // [1.0, 0.0, 0.0]
    // [0.0, 1.0, 0.0]
    // [0.0, 0.0, 1.0]
    Matrix matrix = new Matrix();
    Matrix matrix1 = new Matrix();
    Matrix matrix2 = new Matrix();

    // [1.0, 0.0, 0.0]    [2.0, 3.0, 4.0]
    // [0.0, 1.0, 0.0] -> [2.0, 0.0, 0.0]
    // [0.0, 0.0, 1.0]    [1.0, 1.0, 1.0]
    matrix1.setValues(new float[]{2.0f,3.0f, 4.0f,
                                 2.0f,0.0f, 0.0f,
                                 1.0f,1.0f,1.0f});

    // [1.0, 0.0, 0.0]    [2.0, 5.0, 4.0]
    // [0.0, 1.0, 0.0] -> [3.0, 0.0, 0.0]
    // [0.0, 0.0, 1.0]    [1.0, 2.0, 1.0]
    matrix2.setValues(new float[]{2.0f,5.0f, 4.0f,
                                 3.0f,0.0f, 0.0f,
                                 1.0f,2.0f,1.0f});

    // [2.0, 3.0, 4.0]            [2.0, 5.0, 4.0]            [17.0, 18.0, 12.0]
    // [2.0, 2.0, 0.0](matrix1) * [3.0, 0.0, 0.0](matrix2) = [4.0,  10.0, 8.0 ] (matrix)
    // [1.0, 1.0, 1.0]            [1.0, 2.0, 1.0]            [6.0,  7.0,  5.0 ]
    matrix.setConcat(matrix1,matrix2);

*/


/*
//距离
    // 一个半径为100.0f的圆，放大1倍后，半径也将增大一倍。据说用在画布中的圆随画布大小变化时
    float radius = 100.0f;
    float radiusAfterMatrix;
    Matrix matrixRadius = new Matrix();
    matrixRadius.setScale(2,2);
    radiusAfterMatrix = matrixRadius.mapRadius(radius);
    // 输出：radius=200.0
    System.out.println("radius=" + radiusAfterMatrix);

*/

/*
    // =======================
    // mapPoints(float[] pts)
    // =======================
    // 运算后的结果会保存在pts数组中，原pts数组中的内容会被覆盖

    // 1.《点的移动》,对于任意点(Xn,Yn),x轴方向平移dx,y轴方向平移dy后有：
    //  Xn = Xn + dx
    //  Yn = Yn + dy
    float[] ptsTrans = {6,2};
    Matrix matrixTrans = new Matrix();
    matrixTrans.setTranslate(-2,2);
    matrixTrans.mapPoints(ptsTrans);
    // 输出：trans=[4.0, 4.0]
    System.out.println("trans=" + Arrays.toString(ptsTrans));

    // 2.《点的放大》，对于任意点(Xn,Yn),绕点(px,py)x轴、y轴方向分别放大sx倍、sy倍后，有：
    //  Xn = Xn * sx + (px - px * sx)
    //  Yn = Yn * sy + (py - sy * py)
    float[] ptsScale = {2,3};
    Matrix matrixScale = new Matrix();
    matrixScale.setScale(3,6,2,2);
    matrixScale.mapPoints(ptsScale);
    // 输出：scale=[2.0, 8.0]
    System.out.println("scale=" + Arrays.toString(ptsScale));

    // 3.《点的旋转》，对于任意点(Xn,Yn),绕点(px,py)旋转a度后，有：
    //  Xn = (Xn - px) * cos(a) - (Yn - py) * sin(a) + px
    //  Yn = (Xn - px) * sin(a) + (Yn - py) * cos(a) + py
    float[] ptsRotate = {6,6};
    Matrix matrixRotate = new Matrix();
    matrixRotate.preRotate(90,2,3);
    matrixRotate.mapPoints(ptsRotate);
    // 输出：rotate=[-1.0,7.0]
    System.out.println("rotate=" + Arrays.toString(ptsRotate));

    // 4.《点的错切》,对于任意点(Xn,Yn),绕点(px,py)x轴、y轴方向分别错切kx、ky后，有：
    //  Xn = Xn + kx(Yn - py)
    //  Yn = Yn + ky(Xn - px)
    float[] ptsSkew = {3,2};
    Matrix matrixSkew = new Matrix();
    matrixSkew.setSkew(2,3,6,8);
    matrixSkew.mapPoints(ptsSkew);
    // 输出：skew=[-9.0,-7.0]
    System.out.println("skew=" + Arrays.toString(ptsSkew));

    // ===================================
    // mapPoints(float[] dst, float[] src)
    // ===================================
    // 运算后的结果保存在dst数组中，原src数组中的内容会保留

    float[] src = {2,3,3,3};
    float[] dst = new float[src.length];
    Matrix matrixDstSrc = new Matrix();
    matrixDstSrc.setTranslate(2,3);
    matrixDstSrc.mapPoints(dst,src);

    // 输出：dst=[4.0,6.0,5.0,6.0]
    System.out.println("dst=" + Arrays.toString(dst));
    // 输出：src=[2.0,3.0,3.0,3.0]
    System.out.println("src=" + Arrays.toString(src));

    // ==============================================================================
    // mapPoints(float[] dst,   ---- 计算结果存放数组
    //           int dstIndex,  ---- dst数组存放计算结果时起始下标
    //           float[] src,   ---- 计算的源数组
    //           int srcIndex,  ---- 源数组计算时起始下标
    //           int pointCount ---- 从起始下标开始一共要计算多少个点
    //           )
    // ==============================================================================
    // 运算后的结果保存在dst数组中

    float[] src1 = {2,3,3,3,2,3};
    float[] dst1 = new float[]{6,6,6,6,6,6};
    Matrix matrixDstSrc1 = new Matrix();
    matrixDstSrc1.setTranslate(1,1);

    // 1）从src1下标为2的位置开始计算，计算1个点，注意，是一个点，不是一个长度；计算的结果只保存计算的点，未计算的点将舍弃，即结果为：[4.0,4.0]
    // 2）将src1计算后的结果，从dst1下标为2的位置开始放置
    // 注意，从存放数组开始的位置存放计算结果时，如果长度不够，将抛出 ArrayIndexOutOfBoundsException 异常
    matrixDstSrc1.mapPoints(dst1,5,src1,2,1);

    // 输出：dst=[0.0,0.0,2.0,3.0,4.0,4.0]
    System.out.println("dst1=" + Arrays.toString(dst1));
    // 输出：src=[2.0,3.0,3.0,3.0,2.0,3.0]
    System.out.println("src1=" + Arrays.toString(src1));

*/
/*
    // ============================================
    // mapRect(RectF rect)
    // ============================================
    // 结果存放在rect中，原rect将被覆盖
    RectF rectF = new RectF(100,100,200,200);
    // 输出：rectFbefore = RectF(100.0, 100.0, 200.0, 200.0)
    System.out.println("rectFbefore = " + rectF);
    Matrix matrixRectF = new Matrix();
    matrixRectF.setScale(2,2);
    matrixRectF.mapRect(rectF);
    // 输出：rectFafter = RectF(200.0, 200.0, 400.0, 400.0)
    System.out.println("rectFafter = " + rectF);

    // ============================================
    // mapRect(RectF dst,RectF src)
    // ============================================
    // 结果存放在dst中，原src会保留。其它与mapRect(RectF rect)方法相同

*/
/*
//变换数组中的点坐标原点不移动。
    float[] vector = {2,3};
    float[] point = {2,3};
    Matrix matrixTranslate = new Matrix();
    matrixTranslate.setTranslate(2,3);
    matrixTranslate.mapVectors(vector);
    matrixTranslate.mapPoints(point);

    // 输出：vector = [2.0,3.0]
    System.out.println("vector = " + Arrays.toString(vector));
    // 输出：point = [4.0,6.0]
    System.out.println("point = " + Arrays.toString(point));

*/

/*
7、isIdentity

判断一个矩阵是否为单位矩阵

    Matrix matrix = new Matrix();

    // 输出：matrix is identity:true
    System.out.println("matrix is identity:" + matrix.isIdentity());

    matrix.setTranslate(1,2);

    // 输出：matrix is identity:false
    System.out.println("matrix is identity:" + matrix.isIdentity());


*/


/*
//反
    // ==========================================
    // 移动
    // ==========================================
    // [1.0, 0.0, Δx]            [1.0, 0.0, -Δx]
    // [0.0, 1.0, Δy]  invert -> [0.0, 1.0, -Δy]
    // [0.0, 0.0, 1.0]           [0.0, 0.0, 1.0]

    Matrix matrixTrans = new Matrix();
    matrixTrans.setTranslate(2,3);

    // [1.0, 0.0, 2.0]
    // [0.0, 1.0, 3.0]
    // [0.0, 0.0, 1.0]
    System.out.println("matrixTrans = " + matrixTrans);

    matrixTrans.invert(matrixTrans);

    // [1.0, 0.0, -2.0]
    // [0.0, 1.0, -3.0]
    // [0.0, 0.0,  1.0]
    System.out.println("matrixTrans = " + matrixTrans);

    // ==========================================
    // 缩放
    // ==========================================
    // [sx,   0,  -px]             [1/sx,    0,  px/2]
    // [0,   sy,  -py]  invert ->  [0,    1/sy,  py/2]
    // [0.0, 0.0, 1.0]             [0.0,   0.0,   1.0]

    Matrix matrixScale = new Matrix();
    matrixScale.setScale(2,2,12,7);

    // [2.0, 0.0, -12.0]
    // [0.0, 2.0, -7.0]
    // [0.0, 0.0, 1.0]
    System.out.println("matrixScale = " + matrixScale);

    matrixScale.invert(matrixScale);

    // [0.5, 0.0, 6.0]
    // [0.0, 0.5, 3.5]
    // [0.0, 0.0, 1.0]
    System.out.println("matrixScale = " + matrixScale);

*/



/*
var matrix= new Matrix();
var imgRect=new RectF(0,0,w,h);
        log(matrix);
        //matrix.postTranslate(-img.width/2,-img.height/2);
        //x=a+x;y=b+y;
        //矩阵坐标移动(x偏移,y偏移)
        log(matrix);
        //matrix.postScale(0.25,0.25);
        //x=a*x;y=b*y;
        //矩阵缩放(sx,sy,x…,y…);
        log(matrix);
        //matrix.postRotate(30);
        //矩阵旋转(Y,x…,y…)
        log(matrix);
        //matrix.postSkew(0,0);
        //x=x+a*y;y=y+b*x
        //错切(x,y,x…,y…)
        log(matrix);
        

*/



/*
在一个长方形中居中放置另外一个长方形。得到其坐标变换。
matrix = new Matrix();
rectFBig = new RectF(100,100,200,400);
 rectFSmall = new RectF(100,100,400,200);
    matrix.setRectToRect(rectFBig,rectFSmall, Matrix.ScaleToFit.CENTER);
    */
    