var
	speedKind = require('./SpeedTest');

var
	kind = require('enyo/kind');

var
	Control = require('enyo/Control'),
	Component = require('enyo/Component');

var
	utils = require('enyo/utils');

var SuperInheritanceTest = speedKind({
	name: "enyoBench.SuperInheritanceTest",
	kind: "enyoBench.SpeedTest",
	testName: "Call 100,000 methods with 5 levels of sup.apply",
	view: Control,
	runTest: function() {
		var Kind1 = kind({
			kind: Component,
			foo: function() {
				if (this.levels !== 4) {
					throw "Wrong number of levels";
				}
			}
		});
		var Kind2 = kind({
			kind: Kind1,
			foo: kind.inherit(function(sup) {
				return function() {
					this.levels++;
					sup.apply(this, arguments);
				};
			})
		});
		var Kind3 = kind({
			kind: Kind2,
			foo: kind.inherit(function(sup) {
				return function() {
					this.levels++;
					sup.apply(this, arguments);
				};
			})
		});
		var Kind4 = kind({
			kind: Kind3,
			foo: kind.inherit(function(sup) {
				return function() {
					this.levels++;
					sup.apply(this, arguments);
				};
			})
		});
		var Kind5 = kind({
			kind: Kind4,
			foo: kind.inherit(function(sup) {
				return function() {
					this.levels = 1;
					sup.apply(this, arguments);
				};
			})
		});
		var obj = new Kind5();
		// TEST TIMING START
		this.inherited(arguments);
		for (var i = 0; i < 100000; ++i) {
			obj.foo();
		}
		this.testComplete();
		// TEST TIMING COMPLETE
		obj.destroy();
	}
});

module.exports = SuperInheritanceTest;