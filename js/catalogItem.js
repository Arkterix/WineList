/**
 * This prototypal object definition defines a generic catalog item.
 *
 * TODO: You are free to add any additional helper methods and properties here
 * to help in your implementation.
 *
 * @class CatalogItem
 * @param id {String} The unique id for this item.
 * @param category {String} The item category.
 * @param name {String} The item name.
 * @param volume {String} The description of the item's volume.
 * @param price {String} The price of this item.
 * @param country {String} The country code for this item's origin.
 * @param producer {String} The producer of this item.
 */
function CatalogItem(id, category, name, volume, price, country, producer) {
    // declare these as private variables
    var id = id;
    var category = category;
    var name = name;
    var volume = volume;
    var price = price;
    var country = country;
    var producer = producer;

    // simple getter methods
    this.getId = function() { return id; }
    this.getCategory = function() { return category; }
    this.getName = function() { return name; }
    this.getVolume = function() { return volume; }
    this.getPrice = function() { return parseFloat(price.slice(1)); }
    this.getCountry = function() { return country; }
    this.getProducer = function() { return producer; }

    /* TODO: Implement additional helpers here */
}
