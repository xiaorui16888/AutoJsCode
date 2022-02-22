'ui';
ui.layout(
  <vertical>
    <scroll>
      <list id='myList'>
        <horizontal>
          <text id='myName' text='{{name}}' margin="8 8 8 8">
          </text>
          <checkbox id='myCheck' checked='{{checked}}' margin="8 8 8 8">
          </checkbox>
        </horizontal>
      </list>
    </scroll>
  </vertical>
)
var obj = {
  name: 'aaa',
  checked: 'false'
}
var r=JSON.stringify(obj)+','
r=new Array(66).join(r)
eval('checkList=['+r+']')
ui.myList.setDataSource(checkList);
