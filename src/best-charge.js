// 主函数 时间 27分钟
function bestCharge(selectedItems) {
  let total = 0;
  let free = 0;
  let items = loadAllItems();
  let halfPriceItems = [];
  let receipt = `============= 订餐明细 =============\n`;
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
    receipt += `${itemObj.name} x ${arr[1]} = ${itemObj.price * arr[1]}元\n`;
  });
  receipt += `-----------------------------------\n`;
  if ((total >= 30 && free > 6) || (total < 30 && free != 0)) {
    total -= free;
    receipt += `使用优惠:\n指定菜品半价(${halfPriceItems.join('，')})，省${free}元\n-----------------------------------\n`
  } else if (total > 30 && free <= 6) {
    total -= 6;
    receipt += `使用优惠:\n满30减6元，省6元\n-----------------------------------\n`
  }
  receipt += `总计：${parseInt(total)}元\n===================================`
  return receipt;
}
//判断该菜是否有半价优惠   1分钟
function isHalfPriceOfItem(id) {
  return loadPromotions()[1].items.includes(id);
}
