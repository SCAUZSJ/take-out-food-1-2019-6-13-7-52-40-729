// 主函数 预计时间25分钟 实际时间 27分钟
function bestCharge(selectedItems) {
  let total = 0, free = 0, receipt = '';
  let items = loadAllItems();
  let halfPriceItems = [];
  receipt = addReceiptHead(receipt);
  selectedItems.forEach(item => {
    let arr = item.split(" x ");
    let itemObj = items.find((obj) => {
      return obj.id === arr[0];
    })
    total += itemObj.price * arr[1];
    if (isHalfPriceOfItem(itemObj.id)) {
      free += itemObj.price * arr[1] / 2;
      halfPriceItems.push(itemObj.name);
    }
    receipt = addReceiptItem(receipt,{
      name:itemObj.name,
      count:arr[1],
      prices:itemObj.price * arr[1]
    })
  });
  receipt = addReceiptSeparator(receipt);
  if ((total >= 30 && free > 6) || (total < 30 && free != 0)) {
    total -= free;
    receipt = addHalfDisInfo(receipt,{itemString:halfPriceItems.join('，'),free:free});
    receipt = addReceiptSeparator(receipt);
  } else if (total > 30 && free <= 6) {
    total -= 6;
    receipt = addReduceDisInfo(receipt);
    receipt = addReceiptSeparator(receipt);
  }
  
  receipt = addReceiptTotal(receipt,parseInt(total));
  receipt = addReceiptFoot(receipt);
  return receipt;
}

function addReceiptHead(receipt){
  return receipt+=`============= 订餐明细 =============\n`;
}
function addReceiptItem(receipt,item){
  return receipt +=`${item.name} x ${item.count} = ${item.prices}元\n`;
}
function addReceiptSeparator(receipt){
  return receipt += `-----------------------------------\n`;
}
function addHalfDisInfo(receipt,info){
  return receipt +=`使用优惠:\n指定菜品半价(${info.itemString})，省${info.free}元\n`;
}
function addReduceDisInfo(receipt,info){
  return receipt +=`使用优惠:\n满30减6元，省6元\n`;
}
function addReceiptTotal(receipt,total){
  return receipt += `总计：${total}元\n`
}
function addReceiptFoot(receipt){
  return receipt +=`===================================`;
}
//判断该菜是否有半价优惠  预计1分钟 实际1分钟
function isHalfPriceOfItem(id) {
  return loadPromotions()[1].items.includes(id);
}

