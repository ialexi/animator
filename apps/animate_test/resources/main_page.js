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
			childViews: "fpsLabel autoButton runButton amountSlider amountText testCount".w(),
			
			// frames per second
			fpsLabel: SC.LabelView.design({
				layout: {left: 10, height: 24, width: 150, centerY: 0},
				value: "Hi",
				valueBinding: "AnimateTest.appController.fps"
			}),
			
			testCount: SC.SliderView.design({
				layout: { left: 170, width: 150, height: 24, centerY: 0 },
				minimum: 1,
				maximum: 20,
				step: 1,
				value: 1,
				valueBinding: "AnimateTest.appController.testCount"
			}),
			
			autoButton: SC.ButtonView.design({
				layout: { right: 10, height: 24, width: 150, centerY: 0 },
				title: "Auto"
			}),
			
			runButton: SC.ButtonView.design({
				layout: { right: 180, width: 150, height: 24, centerY: 0 },
				title: "Run",
				titleBinding: "AnimateTest.appController.toggleText",
				target: "AnimateTest.appController",
				action: "toggle"
			}),
			
			amountText: SC.LabelView.design({
				layout: { right: 560, width: 30, height: 24, centerY: 0 },
				valueBinding: "AnimateTest.appController.numberToCreate"
			}),
			
			amountSlider: SC.SliderView.design({
				layout: { right: 340, width: 200, height: 24, centerY: 0 },
				value: 100,
				valueBinding: "AnimateTest.appController.numberToCreate",
				step: 50,
				minimum: 0,
				maximum: 5000
			})
		}),
		
		animationContainer: SC.View.design({
			layout: { left: 0, right: 0, top: 32, bottom: 0 },
			backgroundColor: "#555",
			numberToCreateBinding: "AnimateTest.appController.numberToCreate",
			childViews: ["hello"],
			
			hello: SC.LabelView.design({
				layout: { centerX: 0, centerY: 0, width: 100, height: 24 },
				value: "Hello"
			}),
			
			init: function()
			{	
				// now, continue.
				sc_super();
			},
			
			start: function()
			{
				// create child views
				this.removeAllChildren();
				this.makeChildViews();
				this.relayoutChildren();
			},
			
			stop: function()
			{
				this.removeAllChildren();
			},
			
			runTest: function()
			{
				var t = SC.Timer.schedule({
					interval: 100, 
					target: this,
					action: function(){
						this.relayoutChildren();
					}
				});
			},
			
			makeChildViews: function()
			{
				for (var i = 0; i < this.get("numberToCreate"); i++)
				{
					var view = this.createChildView(AnimateTest.TestView, {value: "" + i})
					this.appendChild(view);
				}
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
					if (x >  1500)
						x = 0, y += 20;
				}
			}

		})
	})

});
