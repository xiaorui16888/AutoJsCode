'ui';
ui.layout(
  <vertical id='脚本列表页'>
    <text id='脚本列表页的用户名' text="未登录"   ellipsize='end' lines="1"   margin='6 6 6 6' />
    <scroll>
      <vertical>
        <list id='scripts'>
          <horizontal w='*' margin='6 6 6 6'>
            <frame layout_weight="1" >
              <horizontal>
                <text text='脚本名字: {{this.name}}  '       ></text>
                <text text='脚本价格: {{this.price}}  '      ></text>
              </horizontal>
            </frame>
            <button  id='run' text='运行' layout_gravity="right|bottom"></button>
          </horizontal>
        </list>
      </vertical>
    </scroll>
  </vertical>
)
var 脚本列表=
[ { '编号': '0000', name: '脚本0', price: '0元' },
  { '编号': '0001', name: '脚本1', price: '1元' },
  { '编号': '0002', name: '脚本2', price: '2元' },
  { '编号': '0003', name: '脚本3', price: '3元' },
  { '编号': '0004', name: '脚本4', price: '4元' },
  { '编号': '0005', name: '脚本5', price: '5元' },
  { '编号': '0006', name: '脚本6', price: '6元' },
  { '编号': '0007', name: '脚本7', price: '7元' },
  { '编号': '0008', name: '脚本8', price: '8元' },
  { '编号': '0009', name: '脚本9', price: '9元' },
  { '编号': '0010', name: '脚本10', price: '10元' },
  { '编号': '0011', name: '脚本11', price: '11元' },
  { '编号': '0012', name: '脚本12', price: '12元' },
  { '编号': '0013', name: '脚本13', price: '13元' },
  { '编号': '0014', name: '脚本14', price: '14元' },
  { '编号': '0015', name: '脚本15', price: '15元' },
  { '编号': '0016', name: '脚本16', price: '16元' },
  { '编号': '0017', name: '脚本17', price: '17元' },
  { '编号': '0018', name: '脚本18', price: '18元' },
  { '编号': '0019', name: '脚本19', price: '19元' },
  { '编号': '0020', name: '脚本20', price: '20元' },
  { '编号': '0021', name: '脚本21', price: '21元' },
  { '编号': '0022', name: '脚本22', price: '22元' },
  { '编号': '0023', name: '脚本23', price: '23元' },
  { '编号': '0024', name: '脚本24', price: '24元' },
  { '编号': '0025', name: '脚本25', price: '25元' },
  { '编号': '0026', name: '脚本26', price: '26元' },
  { '编号': '0027', name: '脚本27', price: '27元' },
  { '编号': '0028', name: '脚本28', price: '28元' },
  { '编号': '0029', name: '脚本29', price: '29元' } ]

ui.scripts.setDataSource(脚本列表)


ui.post(
  function(){
    // 查找所有文本控件
    var textViews=遍历查找指定类型的子控件(ui.脚本列表页,'android.widget.TextView')
    textViews.map(
      (textView)=>{
        ui.run(
          function(){
            textView.attr('bg','#ff0000')
          }
        )
      }
    )
  }
)
function 遍历查找指定类型的子控件(parentView,sonType,sonViewArr){
  log(parentView.accessibilityClassName)
  // log(view.accessibilityClassName)

  // android.widget.TextView 文本控件
  // android.widget.ImageView 图片控件
  // android.widget.Button 按钮控件
  // android.widget.EditText 输入框控件
  // android.widget.AbsListView 列表控件
  // android.widget.LinearLayout 线性布局
  // android.widget.FrameLayout 帧布局
  // android.widget.RelativeLayout 相对布局
  // android.widget.RelativeLayout 相对布局
  // android.support.v7.widget.RecyclerView 通常也是列表控件
  var sonViewArr=sonViewArr || []
  if(parentView instanceof android.view.ViewGroup){
    log('是viewGroup')
    log(parentView.accessibilityClassName)
    var childCount=parentView.childCount
    if(childCount && childCount>0){
      for(var i=0;i<childCount;i++){
        var childView=parentView.getChildAt(i)
        var childViewType=childView.accessibilityClassName
        log(childViewType)
        if(childViewType === sonType){
          sonViewArr.push(childView)
        }
        if(childView instanceof android.view.ViewGroup){

          log('for 内'+childView+'是'+'ViewGroup')
          sonViewArr=遍历查找指定类型的子控件(childView,sonType,sonViewArr)
        }

      }
      return sonViewArr
    }else{
      return sonViewArr
    }
  }else{
    log('不是viewGroup')
    var parentViewType=parentView.accessibilityClassName
    if(parentViewType===sonType){
      sonViewArr.push(parentView)
    }
    return sonViewArr
  }
}
