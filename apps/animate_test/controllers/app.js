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
	fps: "FPS: 0",
	fpsFromAnimateBinding: "Animate.lastFPS",
	cc: 0,
	
	// calculateFPS: just gets the current FPS from the animator and formats it a bit.
	calculateFPS: function()
	{
		this.set("fps", Math.round(Animate.lastFPS * 10) / 10 + " / 100 (" + (this.cc++) + ")");
	}.observes("fpsFromAnimate")
}) ;
