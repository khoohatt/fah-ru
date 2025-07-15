/*:
-------------------------------------------------------------------------------
@title Guest Followers
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.3
@date Mar 25, 2016
@filename HIME_GuestFollowers.js
@url http://himeworks.com/2016/03/guest-followers/

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
@plugindesc v1.2 - Allow non-battle actors to follow your party as guests.
@help 
-------------------------------------------------------------------------------
== Description ==

Video: https://www.youtube.com/watch?v=5ZJM4KXd19U

In RPG Maker, you have a party of actors.

You can add actors to the party, or remove actors from the party at anytime.
However, by default, all of the actors in the party can be interacted with
in the menu, and may participate in battle.

There may be situations where you just want an actor to "appear" as if they
are part of the the party, but aren't actually in the party. For example,
let's say an NPC asked you to accompany them through a cave, and you wanted
the player to see that the NPC is following them, but you didn't want them
to actually use the NPC in battle.

With this plugin, you can add actors as "guests", which would simply allow
them to show up as non-party followers.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.3 - Mar 26, 2016
 * fixed bug where plugin command fails
1.2 - Mar 25, 2016
 * added support for guest follower move route mode
1.1 - Mar 22, 2016
 * Fixed bug where plugin crashes if player has no followers
1.0 - Mar 21, 2016
 * Initial release

== Usage ==

-- Adding Guest Actors to Party --

To add guest actors to the party, use the script call

  PARTY.addGuestActor( ACTOR_ID );
  
Where the PARTY is a valid Game_Party reference, and ACTOR_ID is the ID of
the actor that you want to add as a guest.

For example, to add actor 4 as a guest to the current party, you can write

  $gameParty.addGuestActor(4);

You can only add the same guest actor to your party once. If you attempt to
add the same guest actor multiple times, it will do nothing.

-- Removing Guest Actors from Party --

To remove guest actors from a party, use the script call

  PARTY.removeGuestActor( ACTOR_ID );
  
For example, to remove actor 4 as a guest from the current party, you can write

  $gameParty.removeGuestActor(4);
  
-- Checking if Guest Actor is in Party --

To check if a certain guest actor is in the party, use the script call

  PARTY.hasGuestActor( ACTOR_ID );
  
For example, to check if actor 4 is a guest to the current party, in your
conditional branches you can write

  $gameParty.hasGuestActor(4);
  
Which will return true if actor 4 is a guest in the party.

-- Controlling Guest Followers in Move Routes --

You can use a move route to control guest followers if necessary.
To move a guest, start by writing a plugin command

  guest_move_route ID
  
Followed by a move route command.
The ID means the ID of the actor guest. So if you wanted to move the guest
whose actor ID was 4, you would just write 

  guest_move_route 4
  
Followed by a move route command.

-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_GuestFollowers = 1;
TH.GuestFollowers = TH.GuestFollowers || {};

function Game_GuestFollower() {
  this.initialize.apply(this, arguments);
};

Game_GuestFollower.prototype = Object.create(Game_Follower.prototype);
Game_GuestFollower.prototype.constructor = Game_GuestFollower;

(function ($) {

  var TH_GameParty_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    TH_GameParty_initialize.call(this);
    this._guestActors = []
  };

  Game_Party.prototype.guestActors = function() {
    return this._guestActors;
  };
  
  Game_Party.prototype.addGuestActor = function(actorId) {
    if (!this._guestActors.contains(actorId)) {
      this._guestActors.push(actorId)
      $gamePlayer.addGuestFollower(actorId);
      $gamePlayer.refresh();     
      $gameMap.requestRefresh();
    }
  };
  
  Game_Party.prototype.removeGuestActor = function(actorId) {
    if (this._guestActors.contains(actorId)) {
      var index = this._guestActors.indexOf(actorId);
      this._guestActors.splice(index, 1);
      $gamePlayer.removeGuestFollower(actorId);
      $gamePlayer.refresh();
      $gameMap.requestRefresh();
    }
  };
  
  Game_Party.prototype.hasGuestActor = function(actorId) {
    return this._guestActors.contains(actorId);
  };
  
  /***************************************************************************/
  
  Game_Player.prototype.addGuestFollower = function(actorId) {
    this._followers.addGuestFollower(actorId);
  };
  
  Game_Player.prototype.removeGuestFollower = function(actorId) {
    this._followers.removeGuestFollower(actorId);
  };
  
  /***************************************************************************/
  
  var TH_GameFollowers_initialize = Game_Followers.prototype.initialize;
  Game_Followers.prototype.initialize = function() {
    TH_GameFollowers_initialize.call(this);
    this._guests = {};
  };
  
  Game_Followers.prototype.guests = function() {
    return this._guests;
  };
  
  Game_Followers.prototype.guest = function(actorId) {
    return this._guests[actorId];
  };
  
  Game_Followers.prototype.addGuestFollower = function(actorId) {
    var follower = new Game_GuestFollower(actorId);    
    var visibles = this.visibleFollowers();
    var leader = visibles[visibles.length-1];
    if (!leader) {
      leader = $gamePlayer;
    }
    follower.locate(leader.x, leader.y);
    follower.setDirection(leader.direction());
    this._data.push(follower);
    this._guests[actorId] = follower;
    follower.refresh()
    
    // Hack
    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene._spriteset.createFollower(follower)
    }
  };
  
  Game_Followers.prototype.removeGuestFollower = function(actorId) {
    for (var i = 0; i < this._data.length; i++) {
      var follower = this._data[i];
      if (follower instanceof Game_GuestFollower && follower.actor().actorId() === actorId) {
        this._data.splice(i, 1);               
        if (SceneManager._scene instanceof Scene_Map) {
          SceneManager._scene._spriteset.deleteFollower(follower)
        }
        break;
      }
    }
    delete this._guests[actorId];
  };
  
  /* Overwrite. We want to follow the last visible person, but
   * we also want the invisible followers to follow along
   */
  Game_Followers.prototype.updateMove = function() {      
    // the next visible follower. Should be the second last follower.
    var visibles = this.visibleFollowers();        
    var index = Math.max(visibles.length - 2, 1)
    for (var i = this._data.length - 1; i >= 0; i--) {                  
      
      // next visible follower is current follower? Update index
      if (visibles[index] === this._data[i]) {
        index--;
      }
      var precedingCharacter = (i > 0 ? visibles[index] : $gamePlayer);
      if (!precedingCharacter) {
        precedingCharacter = $gamePlayer;
      }
      this._data[i].chaseCharacter(precedingCharacter);
    }
  };
  
  /***************************************************************************/
  
  Game_GuestFollower.prototype.initialize = function(actorId) {
    Game_Follower.prototype.initialize.call(this);
    this._actorId = actorId;
    this.setTransparent($dataSystem.optTransparent);
    this.setThrough(true);    
  };
  
  Game_GuestFollower.prototype.actor = function() {
    return $gameActors.actor(this._actorId);
  };
  /***************************************************************************/
  
  Spriteset_Map.prototype.createFollower = function(follower) {
    var spr = new Sprite_Character(follower);
    this._characterSprites.push(spr);
    this._tilemap.addChild(spr);
  };
  
  Spriteset_Map.prototype.deleteFollower = function(follower) {
    var sprites = this._characterSprites;
    for (var i = 0; i < sprites.length; i++) {
      var spr = sprites[i];
      if (spr._character === follower) {
        this._characterSprites.splice(i, 1);
        this._tilemap.removeChild(spr);
        break;
      }
    }
  };
  
  /* Some guest follower move route functionality */
  var TH_GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if (command.toLowerCase() === "guest_move_route") {
      var nextCmd = this._list[this._index+1];
      if (nextCmd.code === 205) {
        nextCmd.parameters[0] = "guest" + Math.floor(args[0]);
      }
    }
    else {
      TH_GameInterpreter_pluginCommand.call(this, command, args);
    }
  };
  
  var TH_GameInterpreter_character = Game_Interpreter.prototype.character;
  Game_Interpreter.prototype.character = function(param) {
    if (isNaN(param) && param.startsWith("guest")) {
      var id = Math.floor(param.slice(5))
      return $gamePlayer.followers().guest(id);
    }
    else {
      return TH_GameInterpreter_character.call(this, param);
    }
  };

})(TH.GuestFollowers);