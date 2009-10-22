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
	
	// what we do is simple: We set up a SproutCore timer (cause it's convenient)
	// to trigger every second or so. We also add a timer to the animation engine.
	// It would be easier to determine accurate times if I could figure out a way
	// to keep the views constantly moving, instead of transitioning the way
	// they do now. The problem is, giving them a new layout interrupts animation...
	init: function()
	{
		sc_super();
		
		this.ticksCounted = 0;
		this.startMeasure = Date.now();
		this.cc = 0;
		
		SC.Timer.schedule({
			interval: 1000, // increasing gives a better average... but given that the animation itself is
							// rather short (only 10 seconds or so), it makes it more tricky to judge,
							// as you have to pick a measurement from while the animation is in progress...
							// and I prefer more than one measurement.
							//
							// Also, perhaps because this timer itself slows down the app, for comparison,
							// you need to make sure that you keep this at the same rate between all tests.
			repeats: YES,
			target: this,
			action: this.calculateFPS
		});
		
		Animate.addTimer({action:this.tick, self:this})
	},
	
	// tick tock... this gets called from the actual animate loop. It tries to do as many of these as possible,
	// maxing out at about 1000fps, except that no browser really allows more than 10 timer calls per second,
	// so max speed (only on browsers really lax about it, like Google Chrome) tends to be ~100 fps.
	tick: function()
	{
		this.self.ticksCounted++;
		Animate.addTimer({action: this.self.tick, self: this.self });
	},
	
	// calculateFPS: just figures out how many ticks have occurred in the elapsed time.
	calculateFPS: function()
	{
		var m = this.startMeasure;
		var elapsed = Date.now() - m;
		
		this.set("fps", Math.round(this.ticksCounted / (elapsed / 1000), 2) + " / 100 (" + (this.cc++) + ")");
		this.ticksCounted = 0;
		this.startMeasure = Date.now();
	}
}) ;
