/*:
-------------------------------------------------------------------------
@title State Change Animations
@author Hime --> HimeWorks (http://himeworks.com)
@date Jan 9, 2016
@filename HIME_StateChangeAnimations.js
@url http://himeworks.com/2015/11/state-change-animations/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.1 - Plays an animation when a state is added or removed.
@help 
-------------------------------------------------------------------------------
== Description ==

Video: https://www.youtube.com/watch?v=3M769d9f0IA

Would you like to provide some visual indication that a state has been added
or removed?

This plugin gives you the tools to play some animations when your state
changes!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.1 - Jan 9, 2016
 * fixed bug where erasing state without having state plays erase animation
1.0 - Nov 24, 2015
 * initial release

== Usage ==

To have an animation play on the battler that has a new state added, 
note-tag states with

  <state add animation: ID />
  
Where the ID is the id of the animation to play.

To have an animation play on the battler that has a state removed,
note-tag states with

  <state remove animation: ID />
  
A single state can have both add and remove animations.

-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.StateChangeAnimations = 1;
TH.StateChangeAnimations = TH.StateChangeAnimations || {};

(function ($) {

  $.stateAddRegex = /<state[-_ ]add[-_ ]animation:\s*(\d+)\s*\/>/im
  $.stateRemoveRegex = /<state[-_ ]remove[-_ ]animation:\s*(\d+)\s*\/>/im
  
  $.stateAddAnimation = function(state) {
    if (state.stateAddAnimation === undefined) {
      data = {id: 0, mirror: false, delay: 0};
      var res = $.stateAddRegex.exec(state.note);
      if (res) {
        data.id = Math.floor(res[1]);
      }
      state.stateAddAnimation = data;
    }
    return state.stateAddAnimation;
  };
  
  $.stateRemoveAnimation = function(state) {
    if (state.stateRemoveAnimation === undefined) {
      data = {id: 0, mirror: false, delay: 0};
      var res = $.stateRemoveRegex.exec(state.note);
      if (res) {
        data.id = Math.floor(res[1]);
      }
      state.stateRemoveAnimation = data;
    }
    return state.stateRemoveAnimation;
  };

  var TH_GameBattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
  Game_BattlerBase.prototype.addNewState = function(stateId) {
    TH_GameBattlerBase_addNewState.call(this, stateId);
    this.playStateAddAnimation(stateId);
  };
  
  var TH_GameBattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
  Game_BattlerBase.prototype.eraseState = function(stateId) {
    if (this.isStateAffected(stateId)) {
      this.playEraseStateAnimation(stateId);
    }
    TH_GameBattlerBase_eraseState.call(this, stateId);    
  };
  
  Game_BattlerBase.prototype.playStateAddAnimation = function(stateId) {
    var state = $dataStates[stateId];
    var data = $.stateAddAnimation(state);
    if (data.id > 0) {
      this.startAnimation(data.id, data.mirror, data.delay);
    }
  };
  
  Game_BattlerBase.prototype.playEraseStateAnimation = function(stateId) {
    var state = $dataStates[stateId];
    var data = $.stateRemoveAnimation(state);
    if (data.id > 0) {
      this.startAnimation(data.id, data.mirror, data.delay);
    }
  };
})(TH.StateChangeAnimations);