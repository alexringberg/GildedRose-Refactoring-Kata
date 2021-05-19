function isCheese(item) {
    const cheeses = ['Aged Brie'];
    return cheeses.includes(item.name);
}

function isTicket(item) {
    const tickets = ['Backstage passes to a TAFKAL80ETC concert'];
    return tickets.includes(item.name);
}

function isLegendary(item) {
    const legendaryItems = ['Sulfuras, Hand of Ragnaros']
    return legendaryItems.includes(item.name);
}

function isConjured(item) {
    const conjuredItems = ['Conjured']
    return conjuredItems.includes(item.name);
}

module.exports = {
    isCheese,
    isTicket,
    isLegendary,
    isConjured
}