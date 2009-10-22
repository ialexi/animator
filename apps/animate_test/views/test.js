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
	transitionLayout: {
		left: {duration: 10000},
		top: {duration: 10000},
		centerX: {duration: 5000}, 	// I will be testing with these later...
		centerY: {duration:5000} 	// ...
	},
	layout: { left: 0, top: 0, width: 200, height: 18 },
	textAlign: SC.ALIGN_CENTER,
	tagName: "h1", 
	value: "Test Label Here"
});
