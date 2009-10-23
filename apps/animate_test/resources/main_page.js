// ==========================================================================
// Project:   AnimateTest - mainPage
// Copyright: ©2009 Alex Iskander and TPSi
// ==========================================================================
/*globals AnimateTest */


// a bit hacky. 
// what we have is a view which generates a fixed amount of sub-views
// it then calls, every 12 seconds, relayoutChildren.
// Really hacky in that I keep changing the relayoutChildren function to lay out
// the children in a form that more suits my monitor (it lays them out in a simple grid).
// Each run, relayoutChildren shifts the first element off of the children array and pushes
// it onto the end; this makes _every_ view animate, many of them very slightly.
//
// as I am not trying to test the rendering engine, but instead, the performance of the
// JavaScript animator, the fact that many of the views will end up only barely moving
// does not matter; the same amount of iterations are processed in JavaScript; the same
// amount of communication between the DOM and JavaScript occurs; just less on-screen movement.
AnimateTest.mainPage = SC.Page.design({
	numberToCreate: 100,
	mainPane: SC.MainPane.design({
		childViews: 'toolbar animationContainer'.w(),
		toolbar: SC.ToolbarView.design({
			layout: { top: 0, right: 0, left: 0, height: 32 },
			childViews: ["fpsLabel"],
			
			// frames per second
			fpsLabel: SC.LabelView.design({
				layout: {left: 10, height: 24, width: 150, centerY: 0},
				value: "Hi",
				valueBinding: "AnimateTest.appController.fps"
			})
		}),
		
		animationContainer: SC.View.design({
			layout: { left: 0, right: 0, top: 32, bottom: 0 },
			backgroundColor: "#555",
			
			
			init: function()
			{	
				// now, continue.
				sc_super();
				var self = this;
				setTimeout(function(){ 
					self.relayoutChildren();
					var timer = SC.Timer.schedule({ 
						target:self, 
						action: function(){
							this.relayoutChildren();
						}, 
						interval: 8000,
						repeats: YES
					}); 
				}, 1000);
			},
			
			createChildViews: function()
			{
				var childViews = [];

				for (var i = 0; i < AnimateTest.mainPage.numberToCreate; i++)
				{
					var view = this.createChildView(AnimateTest.TestView, {value: "" + i})
					childViews.push(view);
				}

				this.set("childViews", childViews);
				this.relayoutChildren();
			},
			
			relayoutChildren: function()
			{
				var ch = this.get("childViews");

				// juggle slightly
				var first = ch.shift();
				ch.push(first);
				
				// get the length
				var cl = ch.length;
				var x = 0, y = 0;
				for (var i = 0; i < cl; i++)
				{
					// get the child
					var c = ch[i];
					
					// set the new layout
					c.set("layout", {left:x, top:y, width:30, height:18});
					
					// right now: 30px per column
					x += 30;
					
					// 20px per row.
					if (x > 1500)
						x = 0, y += 20;
				}
			}

		})
	})

});
