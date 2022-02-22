
function 获取当前页面信息(){
  const ROOT_NODE_NAME = 'FrameLayout';
  const TIMEOUT_FOR_LOOKUP_NODE = 250;

  // 获取当前应用的包名
  const getCurrentPackage = function getPackageNameOfTheForegroundApplication(timeout) {
    const node = getRootNode(timeout);
    return node !== null ? node.packageName() : currentPackage();
  };

  // 获取 FrameLayout 根节点
  const getRootNode = function getFrameLayoutNode(timeout) {
    return className(ROOT_NODE_NAME).findOne(timeout || TIMEOUT_FOR_LOOKUP_NODE);
  };

  // 获取所有指定节点及其子节点的描述内容和文本内容
  const getAllTextualContent = function getAllDescriptionAndTextUnderNodeRecursively(node) {
    let items = [];
    const getDescAndText = function(node) {
      if (node !== null) {
        items.push(node.desc());
        items.push(node.text());

        for (let len = node.childCount(), i = 0; i < len; i++) {
          getDescAndText(node.child(i));
        }
      }
    };

    getDescAndText(node || getRootNode());
    return items.filter(item => item !== '' && item !== null);
  };

  return {
    getCurrentPackage: getCurrentPackage,
    getAllTextualContent: getAllTextualContent,
  };
}
当前页面信息= 获取当前页面信息()
log(当前页面信息)
getCurrentPackage=当前页面信息.getCurrentPackage()
getAllTextualContent=当前页面信息.getAllTextualContent()
log('getCurrentPackage=',getCurrentPackage)
log('getAllTextualContent=',getAllTextualContent)
