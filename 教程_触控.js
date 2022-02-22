1，MotionEvent

对于 MotionEvent 官网是如此定义的：

Motion events describe movements in terms of an action code and a set of axis values. The action code specifies the state change that occurred such as a pointer going down or up. The axis values describe the position and other movement properties.
译：

运动事件描述了动作的动作代码和一些列的坐标值。动作代码表明了当触点按下或者弹起等引起的状态变化。坐标值描述了位置信息以及以他的运动属性。
官网对于MotionEvent的描述相当准确，但是过于抽象，不要紧，请随我来......

1.1 获取点击事件具体坐标

我在《【Android 控件架构】详解Android控件架构与常用坐标系》第二节【视图坐标系】中有详细描述，这里不再赘述。

贴一张图，答案尽在不言中。



1.2 事件类型

从源码中可以看到，MotionEvent封装了如下事件类型。

    public static final int ACTION_DOWN             = 0;
    public static final int ACTION_UP               = 1;
    public static final int ACTION_MOVE             = 2;
    public static final int ACTION_CANCEL           = 3;
    public static final int ACTION_OUTSIDE          = 4;
    public static final int ACTION_POINTER_DOWN     = 5;
    public static final int ACTION_POINTER_UP       = 6;

类型	说明
ACTION_DOWN	标志着第一个手指按下
ACTION_UP	最后一个手指抬起
ACTION_MOVE	按住一点手指开始移动
ACTION_CANCEL	表示手势被取消了，不再接受后续事件
ACTION_OUTSIDE	标志着用户触碰到了正常的UI边界
ACTION_POINTER_DOWN	代表用户又使用一个手指触摸到屏幕上，也就是说，在已经有一个触摸点的情况下，又新出现了一个触摸点。
ACTION_POINTER_UP	非最后一个手指抬起
对于ACTION_CANCEL我要特殊说明一下，要很好的理解它就不得不说到 ViewGroup的事件分发机制了。一般来说，一个View接收了其父View/ViewGroup分发而来的ACTION_DOWN事件，那么接下来与ACTION_DOWN相关的事件流都会分发给此View处理，但是如果对于某一个事件，其父View/ViewGroup想要拦截并自行处理，那么父View/ViewGroup就会给子视图一个ACTION_CANCEL事件。对于事件分发的内容我会在以后的文章中作出详细解答。这里先留一个悬念。

多指手势操作和Pointers多点触摸时，我们怎么知道这个一个MotionEvent是哪一个触控点触发的呢，所以Android就引入了 pointers 的概念，多点触控时每一个触控点都会产生一个运动轨迹，而引发这个运动轨迹的手指或者物体（如触控笔等）被称为 pointers。

关于Pointers的一些特性总结

一个MotionEtvent对象中可存储多个 pointer
每个pointer都有自己的事件类型，也有自己的坐标值。
每个pointer都会有一个自己的id和index（下面的内容会提到）
pointer的id在整个事件流中是不会发生变化的，但是index会发生变化。所以，当我们要记录一个触摸点的事件流时，就只需要保存其id,然后使用findPointerIndex(int)来获得其index值，然后再获得其他信息。
MotionEvent类中的很多方法都是可以传入一个int值作为参数的，其实传入的就是pointer的index值。比如getX(pointerIndex)和getY(pointerIndex)，此时，它们返回的就是index所代表的触摸点相关事件坐标值。
案例讲解

用户先两个手指先后接触屏幕，同时滑动，然后在先后离开。这一套动作所产生的事件流是什么样的呢？？？

常用事件
与单点触发一样，多点触发的相关信息也存储在 onTouchEvent方法的MotinoEvent中：

int getPointerCount() //手势操作所包含的点的个数
int findPointerIndex(int pointerId) //根据pointerId找到pointer在MotionEvent中的index
int getPointerId(int pointerIndex) //根据MotionEvent中的index返回pointer的唯一标识
float getX(int pointerIndex) //返回手势操作点的x坐标
float getY(int pointerIndex) //返回手势操作点的y坐标
final int getActionMasked () //获取特殊点的action 
/*
 *  用来获取当前按下／抬起的点的标识,
 *   如果当前没有任何点抬起／按下，该函数返回0。比如事件类型为ACTION_MOVE时，该值始终为  0。
 */
final int getActionIndex()
       
获取事件类型 getAction 和 getActionMasked

先贴上一段源码：

    /**
     *  action码的位掩码部分就是action本身
     */
    public static final int ACTION_MASK             = 0xff;

    /**
     *  返回action的类型,考虑使用getActionMasked()和getActionIndex()来获得单独的经过掩码的action和触控点的索引.
     * @return action例如ACTION_DOWN或者ACTION_POINTER_DOWN与转换的触控点索引的合成值
     */
    public final int getAction() {
        return nativeGetAction(mNativePtr);
    }

    /**
      * 返回经过掩码的action,没有触控点索引信息.
      *  通过getActionIndex()来得到触控操作点的索引.
      *  @return action,例如ACTION_DOWN,ACTION_POINTER_DOWN
     */
    public final int getActionMasked() {
        return nativeGetAction(mNativePtr) & ACTION_MASK;
    }

查看源码发现getAction返回的是一个整数，这就说明了Android系统实质上使用一个32位的整形数表示一个TouchEvent事件，而这两个方法的差异就在于 getActionMasked()返回的是 getAction() 和 ACTION_MASK 进行&（按位与）操作后的结果。

ACTION_MASK

十进制为 255
ACTION_MASK二进制表示
到这里我们可以得知：

getActionMasked()返回的是 getAction() 低8位内容。
getAction() 的低8才是动作码，也就是说 getActionMasked() 返回的仅仅是动作码
ACTION_POINTER_INDEX_MASK

十进制为： 65280 (0x0000ff00)

    public static final int ACTION_POINTER_INDEX_MASK  = 0xff00;
 
    public static final int ACTION_POINTER_INDEX_SHIFT = 8;

    public final int getActionIndex() {
        return (nativeGetAction(mNativePtr) & ACTION_POINTER_INDEX_MASK)
                >> ACTION_POINTER_INDEX_SHIFT;
    }
ACTION_POINTER_INDEX_MASK二进制表示
到这里我们可以得知：

getAction() 的相对高8位，就是用于区分出发事件顺序的 index
小结

事件或方法	描述
getAction()	触摸动作的原始32位信息，包括事件的动作，触控点信息。32位中只有后16位被使用，其中相对高8位触控点信息，低8位为事件动作
getActionMask()	只包含触摸的动作,如按下，抬起，滑动，多点按下，多点抬起，如果想处理多点触摸炫需要使用 getActionMask() 与MotionEvent中的ACTION_POINTER_DOWN、ACTION_POINTER_UP 、ACTION_POINTER_1_DOWN等比对判断
单点触控	getAction() 和getActionMasked()返回的是值一样的,都只包含事件动作码
多点触控	getAction() 和getActionMasked()返回值不同,getAction() 比getActionMasked()多了触控点索引
总而言之：
对于单点触摸，使用这俩个方法谁都行，但是对于多点触控，推进getActionMask方法，可以直接获取ACTION_POINTER_DOWN等多点触控状态码。

为啥说推动使用 getActionMask 呢，因为getAction包含了全部信息，例如双指按下，如果使用getAction的话，这个值是261，如果使用getActionMasked这个值是5（ACTION_POINTER_DOWN =5），所以不闲麻烦，你完全可以使用 getAction方法 通过261硬编码的方式判断。
提问时间：

为什么Android不用两个字段表示呢？例如 mAction,mPointer mAction表示动作类型，mPointer表示第几个触控点。
答： 因为Action与Pointer都只需要256（0~255）个数就可以表示全，只要一个int字段（32位），否则需要两个字段(32*2=64位），即可以节约内存。又可以方便提高处理速度。不过通常我们都是以不同的字段来存储不同的信息。但是在计算机内部他们还是变成了0,1。计算机始终还是以位来存储信息的。如果我们多熟悉以 位 为基本单位来理解信息的存储。对于理解android中的很多变量是很有帮助的。因为他其中的很多东西使用的这样的节约内在的技巧。如onMeasure中的MeasureSpec，Color.argb()等方法也是如此。

其他

Android 将所有的输入事件都放在了 MotionEvent 中，随着安卓的不断发展壮大，MotionEvent 也开始变得越来越复杂，下面是我自己整理的 MotionEvent 大事记:

image.png
2