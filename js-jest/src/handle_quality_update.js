const {isTicket, isConjured, isLegendary, isCheese} = require("./item_checker");

module.exports = {
    handleQualityUpdate
}

function handleQualityUpdate(item) {
    let quality = item.quality;

    if (isLegendary(item)) {
        return 80;
    }

    if (isTicket(item)) {
        quality = ticketQualityUpdate(item);
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
    quality = checkForUpperAndLowerLimits(quality);

    return quality;
}

function ticketQualityUpdate(item) {
    if (item.sellIn <= 10 && item.sellIn > 5) {
        return item.quality += 2;
    }
    if (item.sellIn <= 5 && item.sellIn > 0) {
        return item.quality += 3;
    }
    if (item.sellIn === 0) {
        return 0;
    }
    return item.quality -= 1;
}

function checkForUpperAndLowerLimits(quality) {
    if(quality <= 50 && quality >= 0){
        return quality;
    }
    if (quality > 50) {
        return 50;
    }
    return 0;
}

