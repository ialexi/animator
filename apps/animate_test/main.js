// ==========================================================================
// Project:   AnimateTest
// Copyright: ©2009 Alex Iskander and TPSi
// ==========================================================================
/*globals AnimateTest */

// first, disable CSS transitions, as we cannot (accurately) measure them.
Animate.enableCSSTransitions = NO;


AnimateTest.main = function main() {
  AnimateTest.getPath('mainPage.mainPane').append() ;

  // I could connect some content to a controller here. I have a controller,
  // but no content to connect. How sad. :(
} ;

function main() { AnimateTest.main(); }
