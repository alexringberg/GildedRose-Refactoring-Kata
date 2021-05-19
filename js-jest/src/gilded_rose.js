class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function isCheese(item) {
  return item.name === 'Aged Brie';
}

function isConcertTicket(item) {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert';
}

function isLegendary(item) {
  return item.name === 'Sulfuras, Hand of Ragnaros';
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    let MAX_QUALITY = 50;
    let MIN_QUALITY = 0;

    this.items.forEach(item => {
      if (!isCheese(item) && !isConcertTicket(item)) {
        if (item.quality > 0) {
          if (!isLegendary(item)) {
            item.quality = item.quality - 1;
          }
        }
      } else {

        if (item.quality < MAX_QUALITY) {
          item.quality = item.quality + 1;
          if (isConcertTicket(item)) {
            if (item.sellIn < 11) {
              if (item.quality < MAX_QUALITY) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < MAX_QUALITY) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (!isLegendary(item)) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < MIN_QUALITY) {
        if (!isCheese(item)) {
          if (!isConcertTicket(item)) {
            if (item.quality > MIN_QUALITY) {
              if (!isLegendary(item)) {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < MAX_QUALITY) {
            item.quality = item.quality + 1;
          }
        }
      }
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
