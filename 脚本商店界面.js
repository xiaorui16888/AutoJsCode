'ui';

var 脚本列表=
[ { name: '脚本0', price: '0元' },
  { name: '脚本1', price: '1元' },
  { name: '脚本2', price: '2元' },
  { name: '脚本3', price: '3元' },
  { name: '脚本4', price: '4元' },
  { name: '脚本5', price: '5元' },
  { name: '脚本6', price: '6元' },
  { name: '脚本7', price: '7元' },
  { name: '脚本8', price: '8元' },
  { name: '脚本9', price: '9元' },
  { name: '脚本10', price: '10元' },
  { name: '脚本11', price: '11元' },
  { name: '脚本12', price: '12元' },
  { name: '脚本13', price: '13元' },
  { name: '脚本14', price: '14元' },
  { name: '脚本15', price: '15元' },
  { name: '脚本16', price: '16元' },
  { name: '脚本17', price: '17元' },
  { name: '脚本18', price: '18元' },
  { name: '脚本19', price: '19元' },
  { name: '脚本20', price: '20元' },
  { name: '脚本21', price: '21元' },
  { name: '脚本22', price: '22元' },
  { name: '脚本23', price: '23元' },
  { name: '脚本24', price: '24元' },
  { name: '脚本25', price: '25元' },
  { name: '脚本26', price: '26元' },
  { name: '脚本27', price: '27元' },
  { name: '脚本28', price: '28元' },
  { name: '脚本29', price: '29元' } ]

  ui.layout(
    <vertical>
      <text gravity='center' textSize='20sp' >这是头部</text>
      <scroll>
        <vertical>
          <list id='scripts'>
            <horizontal>
              <frame   layout_width="0dp" layout_weight="4" >
              <horizontal margin='6'>
                <text text='脚本名字: {{this.name}}  '     textColor='#66CC66' ></text>
                <text text='脚本价格: {{this.price}}  '   textColor='#663300'></text>
              </horizontal>
              </frame>
              <frame   layout_width="0dp" layout_weight="2" >
              <horizontal>
                <button text='购买' layout_width="0dp" layout_weight="1" ></button>
                <button text='运行' layout_width="0dp" layout_weight="1" ></button>
              </horizontal>
              </frame>
            </horizontal>
          </list>
        </vertical>
      </scroll>
    </vertical>
  )
  // 脚本名字 脚本价格 购买 运行
  ui.scripts.setDataSource(脚本列表)
