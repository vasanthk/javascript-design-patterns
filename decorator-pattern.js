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

