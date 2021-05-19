const {handleQualityUpdate} = require("../src/handle_quality_update");
const {isLegendary} = require("../src/item_checker");

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(item => {
      if (!isLegendary(item) && item.sellIn > 0) {
        item.sellIn = item.sellIn - 1;
      }
      item.quality = handleQualityUpdate(item);
    });
    return this.items;
  }
}

module.exports ={
  Item,
  Shop
}
