const {handleQualityUpdate} = require("../src/handle_quality_update");
const {isTicket, isCheese, isLegendary} = require("../src/item_checker");
const {Shop, Item} = require("../src/gilded_rose");

describe("updateQuality", () => {
  it("should not update sellin or quality if name doesn't match any categories", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe("foo");
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(0);
  });

  it("should update sellin and quality if name matches cheese", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 21)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].quality).toBe(22);
    expect(items[0].sellIn).toBe(0);
  });

  it("should decrease sellin 1 and increase quality by 3 if name matches ticket and sellin is 5", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 7)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].quality).toBe(10);
    expect(items[0].sellIn).toBe(4);
  });

  it("should decrease sellin 1 and increase quality by 2 if name matches ticket and sellin is 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 7)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].quality).toBe(9);
    expect(items[0].sellIn).toBe(9);
  });

  it("should decrease sellin 1 and set quality to 0 if name matches ticket and sellin is 1", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 7)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(0);
  });

  it("should decrease twice as fast if name matches conjured item", () => {
    const gildedRose = new Shop([new Item("Conjured", 0, 4)]);

    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe("Conjured");
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(0);
  });

  it("should not decrease quality past 0 if Conjured", () => {
    const conjured = new Shop([new Item("Conjured", 0, 3)]);

    const items = conjured.updateQuality();

    expect(items[0].name).toBe("Conjured");
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(0);
  });
});

describe("Legendary Check", () => {
  it("should return true if legendary", () => {
    const legendary = new Item("Sulfuras, Hand of Ragnaros", 1, 1);

    const response = isLegendary(legendary);

    expect(response).toBe(true);
  });

  it("Should return false if not in legendary list", () => {
    const notLegendary = new Item("NotLegendary", 1, 1);

    const response = isLegendary(notLegendary);

    expect(response).toBe(false);
  });
});

describe("Cheese Check", () => {
  it("should return true if cheese", () => {
    const cheese = new Item("Aged Brie", 1, 1);

    const response = isCheese(cheese);

    expect(response).toBe(true);
  });

  it("Should return false if not in cheese list", () => {
    const notCheese = new Item("not", 1, 1);

    const response = isCheese(notCheese);

    expect(response).toBe(false);
  });
});

describe("Ticket Check", () => {
  it("should return true if ticket", () => {
    const ticket = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 1);

    const response = isTicket(ticket);

    expect(response).toBe(true);
  });

  it("Should return false if not in ticket list", () => {
    const notTicket = new Item("not", 1, 1);

    const response = isTicket(notTicket);

    expect(response).toBe(false);
  });
});

describe("Quality Updater", () => {
  it("should increase quality if Cheese", () => {
    const gildedRose = new Item("Aged Brie", 1, 0);

    const response = handleQualityUpdate(gildedRose);

    expect(response).toBe(1);
  });

  it("should not increase quality if Cheese is max quality", () => {
    const cheese = new Item("Aged Brie", 1, 50);

    const response = handleQualityUpdate(cheese);

    expect(response).toBe(50);
  })

  it("should increase quality by 3 if ticket sellin is 5 or less", () => {
    const gildedRose = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0);

    const response = handleQualityUpdate(gildedRose);

    expect(response).toBe(3);
  });

  it("should increase quality by 2 if ticket sellin is 10 or less", () => {
    const gildedRose = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0);

    const response = handleQualityUpdate(gildedRose);

    expect(response).toBe(2);
  });

  it("should not increase above 50 if ticket", () => {
    const ticket = new Item("Backstage passes to a TAFKAL80ETC concert", 1, 48)

    const response = handleQualityUpdate(ticket);

    expect(response).toBe(50);
  })

  it("should have quality set to 0 if 0 days sellin for Ticket", () => {
    const gildedRose = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50);

    const response = handleQualityUpdate(gildedRose);

    expect(response).toBe(0);
  });

  it("should keep same quality if legendary", () => {
    const gildedRose = new Item("Sulfuras, Hand of Ragnaros", 1, 80);

    const response = handleQualityUpdate(gildedRose);

    expect(response).toBe(80);
  });

  it("should be 80 if legendary item quality not set", () => {
    const gildedRose = new Item("Sulfuras, Hand of Ragnaros", 1, 0);

    const response = handleQualityUpdate(gildedRose);

    expect(response).toBe(80);
  });
})
