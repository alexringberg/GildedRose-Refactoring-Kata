const {isTicket, isConjured, isLegendary, isCheese} = require("./item_checker");

function handleQualityUpdate(item) {
    let quality = item.quality;

    if (isLegendary(item)) {
        return 80;
    }

    if (isTicket(item)) {
        if (item.sellIn <= 10 && item.sellIn > 5) {
            quality += 2;
        }
        if (item.sellIn <= 5 && item.sellIn > 0) {
            quality += 3;
        }
        if (item.sellIn === 0) {
            quality = 0;
        }
    }

    if (isCheese(item)) {
        quality += 1;
    }

    if(isConjured(item)){
        if(item.sellIn === 0){
            quality -= 4;
        } else {
            quality -= 2;
        }
    }

    if (quality > 50) {
        quality = 50;
    }

    if(quality < 0){
        quality = 0;
    }

    return quality;
}

module.exports = {
    handleQualityUpdate
}