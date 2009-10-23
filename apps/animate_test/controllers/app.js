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
	lastFPSBinding: SC.Binding.oneWay("Animate.lastFPS"),
	processCount: 0,
	
	fps: "FPS: 0",
	
	// calculateFPS: just gets the current FPS from the animator and formats it a bit.
	// has to be an observer, not a property, because it changes processCount.
	// though _why_ that should make such a difference I don't quite get. Probably obvious, but I'm missing it.
	// If anyone knows please tell me (alexiskander)
	// -- causes a freeze if made into a property
	calculateFPS: function()
	{
		this.set("fps", "FPS: " + Math.round(this.get("lastFPS") * 10) / 10 + " (" + this.processCount++ + ")");
	}.observes("lastFPS")
}) ;
