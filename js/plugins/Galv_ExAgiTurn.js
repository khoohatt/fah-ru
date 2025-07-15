//-----------------------------------------------------------------------------
//  Galv's Extra Agility Turn
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_ExAgiTurn.js
//-----------------------------------------------------------------------------
//  2017-08-18 - Version 1.1 - fixed a bug when ending battle during ex turn
//  2016-10-09 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_ExAgiTurn = true;

var Galv = Galv || {};                  // Galv's main object
Galv.EXTURN = Galv.EXTURN || {};        // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.1) Have battlers gain an additional turn if they have much higher agility
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Agi Percent
 * @desc The percent amount a battler's agility is ABOVE the average opponent agi to get ex turn
 * @default 50
 *
 * @param Ex Turn Image
 * @desc Image used for EX turn notification located in /img/system/
 * @default exturn
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param Image Fade Speed
 * @desc The speed the Ex Turn Image fades in and out
 * @default 25
 *
 * @param Image X
 * @desc The x position of the Ex Turn Image
 * @default 20
 *
 * @param Image Y
 * @desc The y position of the Ex Turn Image
 * @default 400
 *
 * @param Ex Turn Name Color
 * @desc The change of color for Ex Turn actor names in default battle status
 * @default #fff
 *
 * @param Non Ex Turn Name Color
 * @desc The change of color for slow actor's names in an Ex Turn for default battle status
 * @default #666
 *
 * @help
 *   Galv's Extra Agility Turn
 * ----------------------------------------------------------------------------
 * This plugin enables battlers who have a higher AGI than the opposing team's
 * agility average to act in 'Extra Turns'. These extra turns will happen
 * between normal turns (provided battler agi remains high enough) and do not
 * advance the state turn counters or regen/poison tick effects.
 * This is designed to make agi a more important stat in RPG Maker games and
 * is similar to Breath of Fire 3's EX Turn system.
 *
 * When an EX Turn happens, an image is displayed to inform the user (located
 * in /img/system/ folder using filename set in the plugin settings).
 *
 * This is not compatible with plugins that modify the turn based combat such
 * as ATB battle systems or immediate action battle systems.
 * ----------------------------------------------------------------------------
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {
	
Galv.EXTURN.active = null;
Galv.EXTURN.percent = Number(PluginManager.parameters('Galv_ExAgiTurn')["Agi Percent"]) * 0.01;
Galv.EXTURN.image = PluginManager.parameters('Galv_ExAgiTurn')["Ex Turn Image"];
Galv.EXTURN.x = Number(PluginManager.parameters('Galv_ExAgiTurn')["Image X"]);
Galv.EXTURN.y = Number(PluginManager.parameters('Galv_ExAgiTurn')["Image Y"]);
Galv.EXTURN.fade = Number(PluginManager.parameters('Galv_ExAgiTurn')["Image Fade Speed"]);

Galv.EXTURN.colActive = PluginManager.parameters('Galv_ExAgiTurn')["Ex Turn Name Color"];
Galv.EXTURN.colInActive = PluginManager.parameters('Galv_ExAgiTurn')["Non Ex Turn Name Color"];



//-----------------------------------------------------------------------------
// GAME UNIT
//-----------------------------------------------------------------------------

Galv.EXTURN.Game_Unit_onBattleEnd = Game_Unit.prototype.onBattleEnd;
Game_Unit.prototype.onBattleEnd = function() {
	Galv.EXTURN.Game_Unit_onBattleEnd.call(this);
	Galv.EXTURN.active = null;
};


//-----------------------------------------------------------------------------
// BATTLER BASE
//-----------------------------------------------------------------------------

Galv.EXTURN.Game_BattlerBase_canInput = Game_BattlerBase.prototype.canInput;
Game_BattlerBase.prototype.canInput = function() {
	if (Galv.EXTURN.active && !this._exTurn) return false;
    return Galv.EXTURN.Game_BattlerBase_canInput.call(this);
};

Galv.EXTURN.Game_BattlerBase_canMove = Game_BattlerBase.prototype.canMove;
Game_BattlerBase.prototype.canMove = function() {
	if (Galv.EXTURN.active && !this._exTurn) return false;
	return Galv.EXTURN.Game_BattlerBase_canMove.call(this);
};

Galv.EXTURN.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
	Galv.EXTURN.Game_Battler_onBattleEnd.call(this);
	this._exTurn = false;
};


//-----------------------------------------------------------------------------
// SPRITESET BATTLE
//-----------------------------------------------------------------------------

Galv.EXTURN.Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
	Galv.EXTURN.Scene_Battle_createDisplayObjects.call(this);
	this.createExTurnImg();
};

Scene_Battle.prototype.createExTurnImg = function() {
	this._exTurnImg = new Sprite_ExTurn();
	this.addChild(this._exTurnImg);
};


//-----------------------------------------------------------------------------
// BATTLE MANAGER
//-----------------------------------------------------------------------------


Galv.EXTURN.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
	Galv.EXTURN.active = null;  // set to null to start so first turn cannot be ex turn
	Galv.EXTURN.BattleManager_startBattle.call(this);
};

Galv.EXTURN.BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
	this.setupExTurn();
	Galv.EXTURN.BattleManager_startInput.call(this);
};


// FUNCTIONS TO PREVENT IF EX TURN
Galv.EXTURN.Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
Game_Troop.prototype.increaseTurn = function() {
	if (Galv.EXTURN.active) return;
	Galv.EXTURN.Game_Troop_increaseTurn.call(this);
};

Galv.EXTURN.Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
	if (Galv.EXTURN.active) {
		this.clearResult();
		return;
	}
	Galv.EXTURN.Game_Battler_onTurnEnd.call(this);
};

Galv.EXTURN.BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
	if (Galv.EXTURN.active) {
		this._phase = 'turnEnd';
		return;
	}
	Galv.EXTURN.BattleManager_endTurn.call(this);
};

if (Imported.YEP_BattleEngineCore) {
	Galv.EXTURN.Game_Battler_onTurnStart = Game_Battler.prototype.onTurnStart;
	Game_Battler.prototype.onTurnStart = function() {
		if (Galv.EXTURN.active) return;
		Galv.EXTURN.Game_Battler_onTurnStart.call(this);
	};
}

/*
Galv.EXTURN.BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
	Galv.EXTURN.BattleManager_startTurn.call(this);
};
*/
//Galv.EXTURN.active

BattleManager.setExTurn = function(status) {
	if (status) {
		Galv.EXTURN.active = true;
	} else {
		Galv.EXTURN.active = false;
		var actors = $gameParty.members();
		for (var i = 0; i < actors.length; i++) {
			actors[i]._exTurn = false;
		}
	}
}

BattleManager.setupExTurn = function() {
	// freah exBattlers array
	this._exBattlers = [];

	if (Galv.EXTURN.active === null) {
		// If null, start of battle, so exturn is false
		this.setExTurn(false);
		return;
	}

	if (Galv.EXTURN.active) {
		// If last turn was an Ex turn, this turn is not.
		this.setExTurn(false);
	} else {
		// Get battlers quick enough to have an EX turn
		var actorAgi = $gameParty.agility();
		var enemyAgi = $gameTroop.agility();
		
		// check actors
		var actors = $gameParty.members();
		for (var i = 0; i < actors.length; i++) {
			if (actors[i].canMove() && actors[i].agi > (enemyAgi + enemyAgi * Galv.EXTURN.percent)) {
				actors[i]._exTurn = true;
				this._exBattlers.push(actors[i]);
			} else {
				actors[i]._exTurn = false;
			}
		}
		
		// check enemies
		var enemies = $gameTroop.members();
		for (var i = 0; i < enemies.length; i++) {
			if (enemies[i].canMove() && enemies[i].agi > (actorAgi + actorAgi * Galv.EXTURN.percent)) {
				enemies[i]._exTurn = true;
				this._exBattlers.push(enemies[i]);
			} else {
				enemies[i]._exTurn = false;
			}
		}
		
		// if battlers were found, activate ex turn
		if (this._exBattlers.length > 0) this.setExTurn(true);
	}
};

Galv.EXTURN.BattleManager_makeActionOrders = BattleManager.makeActionOrders;
BattleManager.makeActionOrders = function() {
	if (Galv.EXTURN.active) {
		// If EXTURN is active, make actions with ex battlers.
		var battlers = this._exBattlers;
		battlers.forEach(function(battler) {
			battler.makeSpeed();
		});
		battlers.sort(function(a, b) {
			return b.speed() - a.speed();
		});
		this._actionBattlers = battlers;
	} else {
		// if normal turn, do normal
		Galv.EXTURN.BattleManager_makeActionOrders.call(this);
	}
};


//-----------------------------------------------------------------------------
// WINDOW BASE
//-----------------------------------------------------------------------------

Galv.EXTURN.Window_Base_drawActorName = Window_Base.prototype.drawActorName;
Window_Base.prototype.drawActorName = function(actor, x, y, width) {
	this._setExTurnHpColor = true;
	Galv.EXTURN.Window_Base_drawActorName.call(this,actor,x,y,width);
	this._setExTurnHpColor = false;
};

Galv.EXTURN.Window_Base_hpColor = Window_Base.prototype.hpColor;
Window_Base.prototype.hpColor = function(actor) {
	if (!actor.isDead() && Galv.EXTURN.active && this._setExTurnHpColor) {
		return actor._exTurn ? Galv.EXTURN.colActive : Galv.EXTURN.colInActive;
	}
	return Galv.EXTURN.Window_Base_hpColor.call(this,actor);
};

})();


//-----------------------------------------------------------------------------
// SPRITE EXTURN
//-----------------------------------------------------------------------------

function Sprite_ExTurn() {
    this.initialize.apply(this, arguments);
}

Sprite_ExTurn.prototype = Object.create(Sprite.prototype);
Sprite_ExTurn.prototype.constructor = Sprite_ExTurn;

Sprite_ExTurn.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this.createBitmap();
};

Sprite_ExTurn.prototype.createBitmap = function() {
	this.bitmap = ImageManager.loadSystem(Galv.EXTURN.image);
	this.x = Galv.EXTURN.x;
	this.y = Galv.EXTURN.y;
	this.opacity = 0;
};

Sprite_ExTurn.prototype.update = function() {
	Sprite.prototype.update.call(this);
	this.opacity += Galv.EXTURN.active ? Galv.EXTURN.fade : -Galv.EXTURN.fade;
};