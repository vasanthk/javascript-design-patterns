/**
 * Decorator Pattern
 *
 * Dynamically add functionality to JavaScript objects at runtime.
 * Decorators provide a flexible alternative to subclassing for extending functionality.
 *
 * A convenient feature of the decorator pattern is the customization and configuration of the expected behavior.
 * You start with your plain object, which has some basic functionality.
 * Then you pick and choose from an available pool of decorators which ones you want to use to enhance your plain object and in which order, if the order is important.
 *
 * @Reference:
 * http://www.drdobbs.com/web-development/decorator-pattern-in-javascript/232200406
 * http://www.dofactory.com/javascript/decorator-design-pattern
 * http://nickmeldrum.com/blog/decorators-in-javascript-using-monkey-patching-closures-prototypes-proxies-and-middleware
 * https://miguelmota.com/blog/exploring-decorators-in-javascript/
 * https://www.safaribooksonline.com/library/view/learning-javascript-design/9781449334840/ch09s14.html
 * http://stackoverflow.com/questions/2707401/please-help-me-understand-the-decorator-pattern-with-a-real-world-example
 */

// Use case: To support something like this
var sale = new Sale(100);       // the price is 100 dollars
sale = sale.decorate('fedtax'); // add federal tax
sale = sale.decorate('quebec'); // add provincial tax
sale = sale.decorate('money');  // format like money
sale.getPrice();                // "$112.88"

/**
 * Implementation - Using Inheritance
 */
function Sale(price) {
  this.price = price || 100;
}

Sale.prototype.getPrice = function () {
  return this.price;
};


Sale.decorators = {};

Sale.decorators.fedtax = {
  getPrice: function () {
    var price = this.uber.getPrice();
    price += price * 5 / 100;
    return price;
  }
};

Sale.decorators.quebec = {
  getPrice: function () {
    var price = this.uber.getPrice();
    price += price * 7.5 / 100;
    return price;
  }
};

Sale.decorators.money = {
  getPrice: function () {
    return "$" + this.uber.getPrice().toFixed(2);
  }
};

Sale.decorators.cdn = {
  getPrice: function () {
    return "CDN$ " + this.uber.getPrice().toFixed(2);
  }
};

// Finally, let's see the "magic" method called decorate() that ties all the pieces together
Sale.prototype.decorate = function (decorator) {
  var F = function () {};
  var overrides = this.constructor.decorators[decorator];
  var i;
  var newobj;

  // Prototypical inheritance
  F.prototype = this;
  newobj = new F();
  newobj.uber = F.prototype;

  for (i in overrides) {
    if (overrides.hasOwnProperty(i)) {
      newobj[i] = overrides[i];
    }
  }
  return newobj;
};


// Call
sale = sale.decorate('fedtax');

/**
 * Implementation - Using Lists (No inheritance - Simpler)
 * Such implementation could also allow for easy undecorating or undoing a decoration, which means simply removing an item from the list of decorators.
 */

var sale = new Sale(100); // the price is 100 dollars
sale.decorate('fedtax');  // add federal tax
sale.decorate('quebec');  // add provincial tax
sale.decorate('money');   // format like money
sale.getPrice();          // "$112.88"

function Sale(price) {
  this.price = (price > 0) || 100;
  this.decorators_list = [];
}

Sale.decorators = {};

Sale.decorators.fedtax = {
  getPrice: function (price) {
    return price + price * 5 / 100;
  }
};

Sale.decorators.quebec = {
  getPrice: function (price) {
    return price + price * 7.5 / 100;
  }
};

Sale.decorators.money = {
  getPrice: function (price) {
    return "$" + price.toFixed(2);
  }
};

Sale.prototype.decorate = function (decorator) {
  this.decorators_list.push(decorator);
};

Sale.prototype.getPrice = function () {
  var price = this.price;
  var i;
  var max = this.decorators_list.length;
  var name;

  for (i = 0; i < max; i += 1) {
    name = this.decorators_list[i];
    price = Sale.decorators[name].getPrice(price);
  }
  return price;
};