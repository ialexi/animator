// ==========================================================================
// Project:   AnimateTest
// Copyright: ©2009 Alex Iskander and TPSi
// ==========================================================================
/*globals AnimateTest */

/** @namespace

  Tests the animate framework.
  
  @extends SC.Object
*/
AnimateTest = SC.Application.create(
  /** @scope AnimateTest.prototype */ {

  NAMESPACE: 'AnimateTest',
  VERSION: '0.1.0',

  // don't really think I need a store, unless I can automate it more and auto-
  // store the results, or something...
  store: SC.Store.create().from(SC.Record.fixtures)

}) ;
