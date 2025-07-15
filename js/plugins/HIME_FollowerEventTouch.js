/*:
-------------------------------------------------------------------------
@title Follower Event Touch
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.1
@date May 13, 2016
@filename HIME_FollowerEventTouch.js
@url http://himeworks.com/2016/01/follower-event-touch-mv/

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
@plugindesc v1.1 - when an event touches a follower, the event will be
triggered as if it touched the player.
@help 
-------------------------------------------------------------------------------
== Description ==

In RPG Maker, the "event touch" trigger allows you to create events that will
execute when they touch the player.

"Touch" means when they try to move in a certain direction, but are unable to
move because there is something blocking the way. In this case, the only 
object they check for is the player.

If one of the player's followers is in the way, they will not be able to move,
but they won't run their commands either.

With this plugin, you can have events triggered when they touch either the
player or the player's followers.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.1 - May 13, 2016
 * Added support for checking which follower is touched
1.0 - Jan 1, 2016
 - initial release

== Usage ==

To have an event triggered when they touch a follower, set their trigger type
to "event touch", and then create a comment and write

  <follower touch>

Whenever the event touches a *visible* follower, the event will also run.

-- Checking who is touched --

When an event is triggered, you may be able to access properties of the
touched follower, assuming a follower was touched.

In your events, you can access the currently touched follower using

  this.touchedFollower()
  
Which will either return a reference to a follower, or null.
If a follower exists, you can then check the properties of the follower.

For example, to check if the follower is facing down if one exists, you
can use this script in a conditional branch:

  var f = this.touchedFollower(); f && f.direction() == 2

-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_FollowerEventTouch = 1;
TH.FollowerEventTouch = TH.FollowerEventTouch || {};

(function ($) {

  var TH_GameEvent_checkEventTriggerTouch = Game_Event.prototype.checkEventTriggerTouch;
  Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
    TH_GameEvent_checkEventTriggerTouch.call(this, x, y);    
    this.checkFollowerEventTouch(x, y);    
  };
  
  Game_Event.prototype.checkFollowerEventTouch = function(x, y) {
    if (!$gameMap.isEventRunning()) {
      if (this._trigger === 2 && this._followerTouch) {
        var followers = $gamePlayer.followers().visibleFollowers();
        for (var i = 0; i < followers.length; i++) {
          if (followers[i].pos(x, y)) {
            this.onFollowerTouch(followers[i]);
          }
        }
      }
    }
  };
  
  Game_Event.prototype.onFollowerTouch = function(follower) {    
    if (!this.isJumping() && this.isNormalPriority()) {
      this.start();
    }
  };
  
  var TH_GameEvent_setupPageSettings = Game_Event.prototype.setupPageSettings;
  Game_Event.prototype.setupPageSettings = function() {
    TH_GameEvent_setupPageSettings.call(this);
    var page = this.page();
    var list = page.list;
    for (var i = 0; i < list.length; i++) {
      var cmd = list[i];
      
      if (cmd.code === 108 && cmd.parameters[0].contains("<follower touch>")) {
        this._followerTouch = true;
        break;
      }
    }
  };
  
  var TH_GameEvent_clearPageSettings = Game_Event.prototype.clearPageSettings;
  Game_Event.prototype.clearPageSettings = function() {
    TH_GameEvent_clearPageSettings.call(this);
    this._followerTouch = false;
  };
    
  var TH_GameEvent_onFollowerTouch = Game_Event.prototype.onFollowerTouch;
  Game_Event.prototype.onFollowerTouch = function(follower) {    
    TH_GameEvent_onFollowerTouch.call(this, follower);
    this._touchedFollower = follower;
  };
  
  Game_Event.prototype.touchedFollower = function() {
    return this._touchedFollower;
  };
  
  Game_Event.prototype.clearTouchedFollower = function() {
    this._touchedFollower = null;
  };  
  
  var TH_GameInterpreter_setup = Game_Interpreter.prototype.setup;
  Game_Interpreter.prototype.setup = function(list, eventId) {
    TH_GameInterpreter_setup.call(this, list, eventId);
    var event = $gameMap.event(eventId);
    if (event) {
      this._touchedFollower = event.touchedFollower();
      event.clearTouchedFollower()
    }
  };
  
  Game_Interpreter.prototype.touchedFollower = function() {
    return this._touchedFollower;
  };
})(TH.FollowerEventTouch);