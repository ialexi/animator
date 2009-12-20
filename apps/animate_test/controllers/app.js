// ==========================================================================
// Project:   AnimateTest
// Copyright: ©2009 Alex Iskander and TPSi.
// ==========================================================================
/*globals AnimateTest */

/** @class
	Some things need to bind to each other. That should use a controller. So there.
	@extends SC.Object
*/
AnimateTest.appController = SC.Object.create(
/** @scope AnimateTest.appController.prototype */ {
	lastFPSBinding: SC.Binding.oneWay("SC.Animatable.stats.lastFPS"),
	
	processCount: 0,
	
	fps: function(){
		return "FPS: " + Math.round(this.get("currentFPS") * 10) / 10 + " (test " + this.processCount + "/" + this.get("testCount") + ")";
	}.property("currentFPS", "testCount"),
	
	currentFPS: 0,
	
	running: NO, // YES if tests are running; NO otherwise.
	
	results: [], // an array of dictionaries... that hold an array
	_currentResults: [],
	
	toggleText: function(){
		if (this.get("running"))
			return "Stop";
		return "Run";
	}.property("running").cacheable(),
	
	numberToCreate: 100,
	
	testCount: 5,
	
	toggle: function()
	{
		if (!this.get("running"))
			this.start();
		else
			this.stop();
	},
	
	runAuto: function()
	{
		// this does start, but in autoMode. I still need to do this.
	},
	
	// starts testing process
	start: function()
	{
		this._currentResults = [];
		this.results.push({
			number: this.get("numberToCreate"),
			data: this._currentResults
		});
		
		this.set("running", YES);
		this.processCount = 0;
		AnimateTest.mainPage.getPath("mainPane.animationContainer").start();
		this.runTest();
	},
	
	// runs a single iteration
	runTest: function()
	{
		AnimateTest.mainPage.getPath("mainPane.animationContainer").runTest();
	},
	
	// stops testing process
	stop: function()
	{
		this.set("running", NO);
		AnimateTest.mainPage.getPath("mainPane.animationContainer").stop();
		
		// we could calculate statistics here... Or show a graph. Or something.
		this.calculateStats();
	},
	
	calculateStats: function()
	{
		var results = this._currentResults;
		
		// i hope this is right... :)
		var mean = 0, meanOfSquares = 0;
		for (var i = 0; i < results.length; i++)
		{
			mean += results[i] / results.length;
		}
		
		for (var i = 0; i < results.length; i++)
		{
			meanOfSquares += Math.pow(results[i] - mean, 2) / results.length;
		}
		
		var std_dev = Math.sqrt(meanOfSquares);
		
		// write out results
		console.log("Average: " + mean + "; sd: " + std_dev + "; 95% are within: " + (std_dev * 3));
	},
	
	// calculateFPS: just gets the current FPS from the animator and formats it a bit.
	// has to be an observer, not a property, because it changes processCount.
	// though _why_ that should make such a difference I don't quite get. Probably obvious, but I'm missing it.
	// If anyone knows please tell me (alexiskander)
	// -- causes a freeze if made into a property
	calculateFPS: function()
	{
		this.set("currentFPS", this.get("lastFPS"));
		if (this.get("lastFPS") == 0)
		{
			this.processCount = 0;
			return;
		}
		
		this.processCount++;
		console.log("Pass: " + this.processCount + "/" + this.get("testCount") + ". Count: " + this.get("numberToCreate") + ". FPS: " + this.get("lastFPS"));
		
		// add statistics
		this._currentResults.push(this.get("lastFPS"));
		
		if (this.get("running") && this.processCount < this.get("testCount"))
		{
			// do another.
			this.runTest();
		}
		else
		{
			this.stop();
		}
	}.observes("lastFPS")
}) ;
