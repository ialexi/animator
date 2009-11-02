// ==========================================================================
// Project:   AnimateTest.TestLabel
// Copyright: ©2009 Alex Iskander and TPSi.
// ==========================================================================
/*globals AnimateTest */

/** @class
	A simple test view.
	@extends SC.View
*/
AnimateTest.TestView = SC.LabelView.extend(Animate.Animatable, {
	transitions: {
		left: 10, // a nice lengthy animation
		top: 10,
		centerX: 10, 	// I will be testing with these later...
		centerY: 10 	// ...
	},
	layout: { left: 0, top: 0, width: 200, height: 18 },
	textAlign: SC.ALIGN_CENTER,
	tagName: "h1", 
	value: "Test Label Here"
});
