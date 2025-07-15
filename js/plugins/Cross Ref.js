//=============================================================================
// CrossReferenceTool.js
// by Shaz
// last updated 2016.12.22
//=============================================================================
 
/*:
 * @plugindesc Shows database references throughout your project.
 * @author Shaz
 *
 * @help This plugin does not provide plugin commands.
 *
 * This plugin adds a new option to the Title Screen to list all references
 * to all database items throughout your project.
 *
 * The first time you run it when launching the game there will be a delay
 * as the list is built.
 *
 * This tool looks for the \v[#] escape code in all names, descriptions and
 * text that could be displayed, as well as text boxes.  It also looks for
 * the v[#] escape code in damage formulae.
 *
 * This tool does NOT look for any other escape codes, and will not pick up
 * anything introduced by other plugins, or any plugin or script calls, or
 * any other reference in damage formulae.  If you have plugins that introduce
 * new esacpe codes and you want to modify or create an add-on for this plugin
 * to handle them, the functions you should look at are:
 *    XRefManager.scanDbText
 *    XRefManager.scanDmg
 *
 * If the Change Equipment command is used with slot 2, both the weapon and
 * armor with that id will be referenced, as the actor (or class) may or may
 * not have a dual wield trait at the time the command is run.
 *
 */
 
 
// XRef Classes
function Event_Ref() {
  this.initialize.apply(this, arguments);
};
 
Event_Ref.prototype.initialize = function(id, name, page, line) {
  this._id = id;
  this._name = name;
  this._page = page;
  this._line = line;
};
 
function Reference() {
  this.initialize.apply(this, arguments);
};
 
Reference.prototype.initialize = function(objType, objId, srcType, srcId, evt, ref, seq) {
  this._objType = objType;
  this._objId = objId;
  this._srcType = srcType;
  this._srcId = srcId;
  this._evt = evt;
  this._ref = ref;
  this._seq = seq;
};
 
function References() {
  this.initialize.apply(this, arguments);
};
 
References.prototype.initialize = function() {
  this._references = [];
};
 
References.prototype.add = function(ref) {
  this._references.push(ref);
};
 
References.prototype.refs = function() {
  return this._references;
};
 
function Referenced_Objects() {
  this.initialize.apply(this, arguments);
};
 
Referenced_Objects.prototype.initialize = function() {
  this._objects = {};
};
 
Referenced_Objects.prototype.add = function(ref) {
  if (!this._objects[ref._objId]) {
    this._objects[ref._objId] = new References();
  }
  this._objects[ref._objId].add(ref);
};
 
Referenced_Objects.prototype.ids = function() {
  return Object.keys(this._objects);
};
 
Referenced_Objects.prototype.xrefs = function(id) {
  return this._objects[id] ? this._objects[id].refs() : [];
}
 
function Cross_References() {
  this.initialize.apply(this, arguments);
};
 
Cross_References.prototype.initialize = function() {
  this._referencedObjects = {};
};
 
Cross_References.prototype.add = function(ref) {
  if (!this._referencedObjects[ref._objType]) {
    this._referencedObjects[ref._objType] = new Referenced_Objects();
  }
  this._referencedObjects[ref._objType].add(ref);
};
 
Cross_References.prototype.xrefs = function(type, id) {
  return this._referencedObjects[type] ? this._referencedObjects[type].xrefs(id) : [];
};
 
Cross_References.prototype.xrefIds = function(type) {
  return this._referencedObjects[type] ? this._referencedObjects[type].ids() : [];
};
 
Cross_References.prototype.xrefTypes = function() {
  return Object.keys(this._referencedObjects);
};
 
// XRef Manager
function XRefManager() {
  throw new Error('This is a static class');
};
 
XRefManager._crossReferences = new Cross_References();
XRefManager._isLoaded = false;
XRefManager._cmdCode = null;
XRefManager._eventId = null;
XRefManager._eventName = null;
XRefManager._eventPage = null;
XRefManager._eventLine = null;
XRefManager._srcType = null;
XRefManager._srcId = null;
 
XRefManager.dataSources = function(sym) {
  switch (sym) {
    case 'switch' :      return $dataSystem.switches;    break;
    case 'variable' :    return $dataSystem.variables;   break;
    case 'commonEvent' : return $dataCommonEvents;       break;
    case 'actor' :       return $dataActors;             break;
    case 'class' :       return $dataClasses;            break;
    case 'skill' :       return $dataSkills;             break;
    case 'item' :        return $dataItems;              break;
    case 'weapon' :      return $dataWeapons;            break;
    case 'armor' :       return $dataArmors;             break;
    case 'enemy' :       return $dataEnemies;            break;
    case 'troop' :       return $dataTroops;             break;
    case 'state' :       return $dataStates;             break;
    case 'animation' :   return $dataAnimations;         break;
    case 'map' :         return $dataMapInfos;           break;
  }
};
 
XRefManager.dataTitles = function(sym) {
  switch (sym) {
    case 'switch' :      return 'Switch';        break;
    case 'variable' :    return 'Variable';      break;
    case 'commonEvent' : return 'Common Event';  break;
    case 'actor' :       return 'Actor';         break;
    case 'class' :       return 'Class';         break;
    case 'skill' :       return 'Skill';         break;
    case 'item' :        return 'Item';          break;
    case 'weapon' :      return 'Weapon';        break;
    case 'armor' :       return 'Armor';         break;
    case 'enemy' :       return 'Enemy';         break;
    case 'troop' :       return 'Troop';         break;
    case 'state' :       return 'State';         break;
    case 'animation' :   return 'Animation';     break;
    case 'map' :         return 'Map';           break;
  }
};
 
XRefManager.command = function(code) {
  switch (code) {
    case 401 : return 'Show Text';              break;
    case 102 : return 'Show Choices';           break;
    case 103 : return 'Input Number';           break;
    case 104 : return 'Select Item';            break;
    case 405 : return 'Show Scrolling Text';    break;
    case 111 : return 'Conditional Branch';     break;
    case 119 : return 'Common Event';           break;
    case 121 : return 'Control Switches';       break;
    case 122 : return 'Control Variables';      break;
    case 125 : return 'Change Gold';            break;
    case 126 : return 'Change Items';           break;
    case 127 : return 'Change Weapons';         break;
    case 128 : return 'Change Armors';          break;
    case 129 : return 'Change Party Member';    break;
    case 201 : return 'Transfer Player';        break;
    case 202 : return 'Set Vehicle Location';   break;
    case 203 : return 'Set Event Location';     break;
    case 505 : return 'Set Movement Route';     break;
    case 212 : return 'Show Animation';         break;
    case 231 : return 'Show Picture';           break;
    case 232 : return 'Move Picture';           break;
    case 285 : return 'Get Location Info';      break;
    case 301 : return 'Battle Processing';      break;
    case 302 :
    case 605 : return 'Shop Processing';        break;
    case 303 : return 'Name Input Processing';  break;
    case 311 : return 'Change HP';              break;
    case 312 : return 'Change MP';              break;
    case 326 : return 'Change TP';              break;
    case 313 : return 'Change State';           break;
    case 314 : return 'Recover All';            break;
    case 315 : return 'Change EXP';             break;
    case 316 : return 'Change Level';           break;
    case 317 : return 'Change Parameter';       break;
    case 318 : return 'Change Skill';           break;
    case 319 : return 'Change Equipment';       break;
    case 320 : return 'Change Name';            break;
    case 321 : return 'Change Class';           break;
    case 322 : return 'Change Actor Images';    break;
    case 324 : return 'Change Nickname';        break;
    case 325 : return 'Change Profile';         break;
    case 331 : return 'Change Enemy HP';        break;
    case 332 : return 'Change Enemy MP';        break;
    case 342 : return 'Change Enemy TP';        break;
    case 333 : return 'Change Enemy State';     break;
    case 336 : return 'Enemy Transform';        break;
    case 337 : return 'Show Battle Animation';  break;
    case 339 : return 'Force Action';           break;
    default : return code;
  }
};
 
XRefManager.objName = function(objType, objId) {
  switch (objType) {
    case 'switch':
    case 'variable':
      return this.dataSources(objType)[objId];
      break;
    default:
      return this.dataSources(objType)[objId] ? this.dataSources(objType)[objId].name : '';
  }
};
 
XRefManager.objTypes = function() {
  return this._crossReferences.xrefTypes();
};
 
XRefManager.refs = function(objType, objId) {
  return this._crossReferences.xrefs(objType, objId);
};
 
XRefManager.loadReferences = function() {
  if (this._isLoaded) return;
 
  console.log('Building list of cross references.  Back in a sec ...');
 
  $dataActors.forEach(function(actor) {             this.buildActorXRefs(actor); }.bind(this));
  $dataClasses.forEach(function(cls) {              this.buildClassXRefs(cls); }.bind(this));
  $dataSkills.forEach(function(skill) {             this.buildSkillXRefs(skill); }.bind(this));
  $dataItems.forEach(function(item) {               this.buildItemXRefs(item); }.bind(this));
  $dataWeapons.forEach(function(weapon) {           this.buildWeaponXRefs(weapon); }.bind(this));
  $dataArmors.forEach(function(armor) {             this.buildArmorXRefs(armor); }.bind(this));
  $dataEnemies.forEach(function(enemy) {            this.buildEnemyXRefs(enemy); }.bind(this));
  $dataTroops.forEach(function(troop) {             this.buildTroopXRefs(troop); }.bind(this));
  $dataStates.forEach(function(state) {             this.buildStateXRefs(state); }.bind(this));
  $dataCommonEvents.forEach(function(commonEvent) { this.buildCommonEventXRefs(commonEvent); }.bind(this));
  $dataMapInfos.forEach(function(mapInfo) {         this.buildMapXRefs(mapInfo); }.bind(this));
 
  this._isLoaded = true;
};
 
XRefManager.save = function(objType, objId, ref, seq) {
  ref = ref || this._cmdCode;
  seq = seq || null;
  var evt = null;
  if (this._eventId || this._eventPage || this._eventLine) {
    evt = new Event_Ref(this._eventId, this._eventName, this._eventPage, this._eventLine);
  }
 
  var xref = new Reference(objType, objId, this._srcType, this._srcId, evt, ref, seq);
  this._crossReferences.add(xref);
};
 
XRefManager.scanDbText = function(text, ref) {
  ref = ref || this._cmdCode;
  seq = 0;
  var regExp = /\\v\[(\d+)\]/gim;
  for (;;) {
    var array = regExp.exec(text);
    if (array) {
      this.save('variable', array[1], ref, seq);
      seq++;
    } else {
      break;
    }
  }
};
 
XRefManager.scanDmg = function(dmg, ref) {
  seq = 0;
  var regExp = /v\[(\d+)\]/gim;
  for (;;) {
    var array = regExp.exec(dmg);
    if (array) {
      this.save('variable', array[1], ref, seq);
      seq++;
    } else {
      break;
    }
  }
}
 
XRefManager.scanTraits = function(traits) {
  traits.forEach(function(trait, index) {
    switch (trait.code) {
      case Game_BattlerBase.TRAIT_STATE_RATE:
      case Game_BattlerBase.TRAIT_STATE_RESIST:
      case Game_BattlerBase.TRAIT_ATTACK_STATE:
        this.save('state', trait.dataId, 'trait', index);
        break;
      case Game_BattlerBase.TRAIT_SKILL_ADD:
      case Game_BattlerBase.TRAIT_SKILL_SEAL:
        this.save('skill', trait.dataId, 'trait', index);
        break;
    }
  }.bind(this));
};
 
XRefManager.scanEffects = function(effects) {
  effects.forEach(function(effect, index) {
    switch(effect.code) {
      case Game_Action.EFFECT_ADD_STATE:
      case Game_Action.EFFECT_REMOVE_STATE:
        this.save('state', effect.dataId, 'effect', index);
        break;
      case Game_Action.EFFECT_LEARN_SKILL:
        this.save('skill', effect.dataId, 'effect', index);
        break;
      case Game_Action.EFFECT_COMMON_EVENT:
        this.save('commonEvent', effect.dataId, 'effect', index);
        break;
    }
  }.bind(this));
}
 
XRefManager.buildActorXRefs = function(actor) {
  if (!actor) return;
 
  this._srcType = 'actor';
  this._srcId = actor.id;
 
  // text fields
  this.scanDbText(actor.name, 'name');
  this.scanDbText(actor.nickname, 'nickname');
  this.scanDbText(actor.profile, 'profile');
 
  // class
  this.save('class', actor.classId, 'class');
 
  // starting equipment
  actor.equips.forEach(function(equip, slot) {
    if (equip !== 0) {
      if (slot === 0 ||
        (slot === 1 && actor.traits.concat($dataClasses[actor.classId].traits).some(function(trait) {
          return trait.code === Game_BattlerBase.TRAIT_SLOT_TYPE && trait.dataId === 1; // dual wield
        }.bind(this)))) {
        this.save('weapon', equip, 'equip', slot);
      } else {
        this.save('armor', equip, 'equip', slot);
      }
    }
  }.bind(this));
 
  // traits
  this.scanTraits(actor.traits);
};
 
XRefManager.buildClassXRefs = function(cls) {
  if (!cls) return;
 
  this._srcType = 'class';
  this._srcId = cls.id;
 
  // text fields
  this.scanDbText(cls.name, 'name');
 
  // learnings
  cls.learnings.forEach(function(learning, index) {
    if (learning.skillId) {
      this.save('skill', learning.skillId, 'learnings', index);
    }
  }.bind(this));
 
  // traits
  this.scanTraits(cls.traits);
};
 
XRefManager.buildSkillXRefs = function(skill) {
  if (!skill) return;
 
  this._srcType = 'skill';
  this._srcId = skill.id;
 
  // text fields
  this.scanDbText(skill.name, 'name');
  this.scanDbText(skill.description, 'description');
  this.scanDbText(skill.message1, 'message1');
  this.scanDbText(skill.message2, 'message2');
 
  // damage formula
  this.scanDmg(skill.damage.formula, 'damage');
 
  // animation
  if (skill.animationId !== 0) {
    this.save('animation', skill.animationId, 'animation');
  }
 
  // effects
  this.scanEffects(skill.effects);
};
 
XRefManager.buildItemXRefs = function(item) {
  if (!item) return;
 
  this._srcType = 'item';
  this._srcId = item.id;
 
  // text fields
  this.scanDbText(item.name, 'name');
  this.scanDbText(item.description, 'description');
 
  // damage formula
  this.scanDmg(item.damage.formula, 'damage');
 
  // animation
  if (item.animationId !== 0) {
    this.save('animation', item.animationId, 'animation');
  }
 
  // effects
  this.scanEffects(item.effects);
};
 
XRefManager.buildWeaponXRefs = function(weapon) {
  if (!weapon) return;
 
  this._srcType = 'weapon';
  this._srcId = weapon.id;
 
  // text fields
  this.scanDbText(weapon.name, 'name');
  this.scanDbText(weapon.description, 'description');
 
  // animation
  if (weapon.animationId !== 0) {
    this.save('animation', weapon.animationId, 'animation');
  }
 
  // traits
  this.scanTraits(weapon.traits);
}
 
XRefManager.buildArmorXRefs = function(armor) {
  if (!armor) return;
 
  this._srcType = 'armor';
  this._srcId = armor.id;
 
  // text fields
  this.scanDbText(armor.name, 'name');
  this.scanDbText(armor.description, 'description');
 
  //traits
  this.scanTraits(armor.traits);
};
 
XRefManager.buildEnemyXRefs = function(enemy) {
  if (!enemy) return;
 
  this._srcType = 'enemy';
  this._srcId = enemy.id;
 
  // text fields
  this.scanDbText(enemy.name, 'name');
 
  // drop items
  enemy.dropItems.forEach(function(dropItem, index) {
    if (dropItem.kind !== 0) {
      var kind = ['', 'item', 'weapon', 'armor'][dropItem.kind];
      this.save(kind, dropItem.dataId, 'dropItem', index);
    }
  }.bind(this));
 
  // action patterns
  enemy.actions.forEach(function(action, index) {
    this.save('skill', action.skillId, 'actionPattern', index);
    switch (action.conditionType) {
      case 4:
        this.save('state', action.conditionParam1, 'actionPattern', index);
        break;
      case 6:
        this.save('switch', action.conditionParam1, 'actionPattern', index);
        break;
    }
  }.bind(this));
 
  // traits
  this.scanTraits(enemy.traits);
};
 
XRefManager.buildTroopXRefs = function(troop) {
  if (!troop) return;
 
  this._srcType = 'troop';
  this._srcId = troop.id;
  this._eventName = null;
 
  // text fields
  this.scanDbText(troop.name, 'name');
 
  // members
  troop.members.forEach(function(enemy, index) {
    this.save('enemy', enemy.enemyId, 'members', index);
  }.bind(this));
 
  // pages
  troop.pages.forEach(function(page, index) {
    this._eventPage = index + 1;
    this._eventLine = 0;
 
    // page conditions
    if (page.conditions.actorValid) {
      this.save('actor', page.conditions.actorId, 'conditions', this._eventPage);
    }
    if (page.conditions.switchValid) {
      this.save('switch', page.conditions.switchId, 'conditions', this._eventPage);
    }
 
    // event commands
    this.buildEventXRefs(page.list);
 
    this._eventPage = null;
    this._eventLine = null;
  }.bind(this));
};
 
XRefManager.buildStateXRefs = function(state) {
  if (!state) return;
 
  this._srcType = 'state';
  this._srcId = state.id;
 
  // text fields
  this.scanDbText(state.name, 'name');
  this.scanDbText(state.message1, 'message1');
  this.scanDbText(state.message2, 'message2');
  this.scanDbText(state.message3, 'message3');
  this.scanDbText(state.message4, 'message4');
 
  // traits
  this.scanTraits(state.traits);
};
 
XRefManager.buildCommonEventXRefs = function(commonEvent) {
  if (!commonEvent) return;
 
  this._srcType = 'commonEvent';
  this._srcId = commonEvent.id;
  this._eventPage = 1;
  this._eventLine = 0;
  this._eventName = null;
 
  // conditions
  if (commonEvent.trigger !== 0) {
    this.save('switch', commonEvent.switchId, 'conditions');
  }
 
  // event commands
  this.buildEventXRefs(commonEvent.list);
 
  this._eventPage = null;
  this._eventLine = null;
};
 
XRefManager.buildMapXRefs = function(mapInfo) {
  if (!mapInfo) return;
 
  this._srcType = 'map';
  this._srcId = mapInfo.id;
  this._eventId = null;
  this._eventName = null;
  this._eventPage = null;
  this._eventLine = null;
 
  var filename = 'data/Map%1.json'.format(mapInfo.id.padZero(3));
  var fs = require('fs');
  var path = require('path');
  var base = path.dirname(process.mainModule.filename);
  path = path.join(base, filename);
  var map = JSON.parse(fs.readFileSync(path));
 
  // text fields
  this.scanDbText(mapInfo.name, 'name');
  this.scanDbText(map.displayName, 'displayName');
 
  // encounter list
  map.encounterList.forEach(function(troop, index) {
    this.save('troop', troop.troopId, 'encounters', index);
  }.bind(this));
 
  // events
  map.events.forEach(function(event) {
    if (event && event.pages.length > 0) {
      this._eventId = event.id;
      this._eventName = event.name;
      this._eventPage = 0;
      this._eventLine = 0;
 
      // text fields
      this.scanDbText(event.name, 'name');
 
      // pages
      event.pages.forEach(function(page, index) {
        this._eventPage = index + 1;
        this._eventLine = 0;
 
        // conditions
        var cond = page.conditions;
        if (cond.actorValid) {
          this.save('actor', cond.actorId, 'conditions', this._eventPage);
        }
        if (cond.itemValid) {
          this.save('item', cond.itemId, 'conditions', this._eventPage);
        }
        if (cond.switch1Valid) {
          this.save('switch', cond.switch1Id, 'conditions', this._eventPage);
        }
        if (cond.switch2Valid) {
          this.save('switch', cond.switch2Id, 'conditions', this._eventPage);
        }
        if (cond.variableValid) {
          this.save('variable', cond.variableId, 'conditions', this._eventPage);
        }
 
        // event commands
        this.buildEventXRefs(page.list);
 
        this._eventPage = null;
        this._eventLine = null;
      }.bind(this));
    }
  }.bind(this));
};
 
XRefManager.buildEventXRefs = function(list) {
  if (!list) return;
 
  list.forEach(function(command, index) {
    this._eventLine = index + 1;
 
    if (command) {
      this._params = command.parameters;
      this._cmdCode = command.code;
      var methodName = 'command' + command.code;
      if (typeof this[methodName] === 'function') {
        this[methodName]();
      }
    }
  }.bind(this));
};
 
// Show Text
XRefManager.command401 = function() {
  this.scanDbText(this._params[0]);
};
 
// Show Choices
XRefManager.command102 = function() {
  this._params[0].forEach(function(choice) {
    this.scanDbText(choice);
  }.bind(this));
};
 
// Input Number
XRefManager.command103 = function() {
  this.save('variable', this._params[0]);
};
 
// Select item
XRefManager.command104 = function() {
  this.save('variable', this._params[0]);
};
 
// Show Scrolling Text
XRefManager.command405 = function() {
  this.scanDbText(this._params[0]);
};
 
// Conditional Branch
XRefManager.command111 = function() {
  switch (this._params[0]) {
    case 0:
      this.save('switch', this._params[1]);
      break;
    case 1:
      this.save('variable', this._params[1]);
      if (this._params[2] !== 0) {
        this.save('variable', this._params[3]);
      }
      break;
    case 4:
      this.save('actor', this._params[1]);
      if (this._params[2] == 1) {
        this.scanDbText(this._params[3]);
      } else if (this._params[2] >= 2 && this._params[2] <= 6) {
        this.save(['', '', 'class', 'skill', 'weapon', 'armor', 'state'][this._params[2]], this._params[3]);
      }
      break;
    case 5:
      if (this._params[2] === 1) { // enemy state
        this.save('state', this._params[3]);
      }
      break;
    case 8:
      this.save('item', this._params[1]);
      break;
    case 9:
      this.save('weapon', this._params[1]);
      break;
    case 10:
      this.save('armor', this._params[1]);
      break;
  }
};
 
// Common Event
XRefManager.command117 = function() {
  this.save('commonEvent', this._params[0]);
};
 
// Control Switches
XRefManager.command121 = function() {
  for (var i = this._params[0]; i <= this._params[1]; i++) {
    this.save('switch', i);
  }
};
 
// Control Variables
XRefManager.command122 = function() {
  if (this._params[3] === 1) {
    this.save('variable', this._params[4]);
  } else if (this._params[3] === 3 && this._params[4] <= 3) {
    this.save(['item', 'weapon', 'armor', 'actor'][this._params[4]], this._params[5]);
  }
 
  for (var i = this._params[0]; i <= this._params[1]; i++) {
    this.save('variable', i);
  }
};
 
// Change Gold
XRefManager.command125 = function() {
  if (this._params[1] !== 0) {
    this.save('variable', this._params[2]);
  }
};
 
// Change Items
XRefManager.command126 = function() {
  this.save('item', this._params[0]);
  if (this._params[2] !== 0) {
    this.save('variable', this._params[3]);
  }
};
 
// Change Weapons
XRefManager.command127 = function() {
  this.save('weapon', this._params[0]);
  if (this._params[2] !== 0) {
    this.save('variable', this._params[3]);
  }
};
 
// Change Armors
XRefManager.command128 = function() {
  this.save('armor', this._params[0]);
  if (this._params[2] !== 0) {
    this.save('variable', this._params[3]);
  }
};
 
// Change Party Member
XRefManager.command129 = function() {
  this.save('actor', this._params[0]);
};
 
// Transfer Player
XRefManager.command201 = function() {
  if (this._params[0] !== 0) {
    this.save('variable', this._params[1]);
    this.save('variable', this._params[2]);
    this.save('variable', this._params[3]);
  }
};
 
// Set Vehicle Location
XRefManager.command202 = function() {
  if (this._params[1] !== 0) {
    this.save('variable', this._params[2]);
    this.save('variable', this._params[3]);
    this.save('variable', this._params[4]);
  }
};
 
// Set Event Location
XRefManager.command203 = function() {
  if (this._params[1] === 1) {
    this.save('variable', this._params[2]);
    this.save('variable', this._params[3]);
  }
};
 
// Set Movement Route (control switches)
XRefManager.command505 = function() {
  if (this._params[0].code === 27 || this._params[0].code === 28) {
    this.save('switch', this._params[0].parameters[0]);
  }
};
 
// Show Animation
XRefManager.command212 = function() {
  this.save('animation', this._params[1]);
};
 
// Show Picture
XRefManager.command231 = function() {
  if (this._params[3] !==  0) {
    this.save('variable', this._params[4]);
    this.save('variable', this._params[5]);
  }
};
 
// Move Picture
XRefManager.command232 = function() {
  if (this._params[3] !== 0) {
    this.save('variable', this._params[4]);
    this.save('variable', this._params[5]);
  }
};
 
// Get Location Info
XRefManager.command285 = function() {
  this.save('variable', this._params[0]);
  if (this._params[2] !== 0) {
    this.save('variable', this._params[3]);
    this.save('variable', this._params[4]);
  }
};
 
// Battle Processing
XRefManager.command301 = function() {
  if (this._params[0] === 0) {
    this.save('troop', this._params[1]);
  } else if (this._params[0] === 1) {
    this.save('variable', this._params[1]);
  }
};
 
// Shop Processing
XRefManager.command302 = function() {
  this.save(['item', 'weapon', 'armor'][this._params[0]], this._params[1]);
};
 
XRefManager.command605 = function() {
  this.save(['item', 'weapon', 'armor'][this._params[0]], this._params[1]);
};
 
// Name Input Processing
XRefManager.command303 = function() {
  this.save('actor', this._params[0]);
};
 
// Change HP
XRefManager.command311 = function() {
  this.save(['actor', 'variable'][this._params[0]], this._params[1]);
  if (this._params[3] !== 0) {
    this.save('variable', this._params[4]);
  }
};
 
// Change MP
XRefManager.command312 = function() {
  this.save(['actor', 'variable'][this._params[0]], this._params[1]);
  if (this._params[3] !== 0) {
    this.save('variable', this._params[4]);
  }
};
 
// Change TP
XRefManager.command326 = function() {
  this.save(['actor', 'variable'][this._params[0]], this._params[1]);
  if (this._params[3] !== 0) {
    this.save('variable', this._params[4]);
  }
};
 
// Change State
XRefManager.command313 = function() {
  this.save(['actor', 'variable'][this._params[0]], this._params[1]);
  this.save('state', this._params[3]);
};
 
// Recover All
XRefManager.command314 = function() {
  this.save(['actor', 'variable'][this._params[0]], this._params[1]);
};
 
// Change EXP
XRefManager.command315 = function() {
  this.save(['actor', 'variable'][this._params[0]], this._params[1]);
  if (this._params[3] !== 0) {
    this.save('variable', this._params[4]);
  }
};
 
// Change Level
XRefManager.command316 = function() {
  this.save(['actor', 'variable'][this._params[0]], this._params[1]);
  if (this._params[3] !== 0) {
    this.save('variable', this._params[4]);
  }
};
 
// Change Parameter
XRefManager.command317 = function() {
  this.save(['actor', 'variable'][this._params[0]], this._params[1]);
  if (this._params[4] !== 0) {
    this.save('variable', this._params[5]);
  }
};
 
// Change skill
XRefManager.command318 = function() {
  this.save('skill', this._params[3]);
  this.save(['actor', 'variable'][this._params[0]], this._params[1]);
};
 
// Change Equipment
XRefManager.command319 = function() {
  // Slot 1 could be either a weapon or an armor item, depending on whether
  // the actor has dual-wield ability.  This could change mid-game if their
  // class is changed, so slot 1 reports as both a weapon and an armor item
  this.save('actor', this._params[0]);
  if (this._params[1] < 3) { // slot 1 or 2
    this.save('weapon', this._params[2]);
  }
  if (this._params[1] > 1) { // slots 2, 3, 4 or 5
    this.save('armor', this._params[2]);
  }
};
 
// Change Name
XRefManager.command320 = function() {
  this.save('actor', this._params[0]);
  this.scanDbText(this._params[1], 'name');
};
 
// Change Class
XRefManager.command321 = function() {
  this.save('actor', this._params[0]);
  this.save('class', this._params[1]);
};
 
// Change Actor Images
XRefManager.command322 = function() {
  this.save('actor', this._params[0]);
};
 
// Change Nickname
XRefManager.command324 = function() {
  this.save('actor', this._params[0]);
  this.scanDbText(this._params[1], 'nickname');
};
 
// Change Profile
XRefManager.command325 = function() {
  this.save('actor', this._params[0]);
  this.scanDbText(this._params[1], 'profile');
};
 
// Change Enemy HP
XRefManager.command331 = function() {
  if (this._params[2] !== 0) {
    this.save('variable', this._params[3]);
  }
};
 
// Change Enemy MP
XRefManager.command332 = function() {
  if (this._params[2] !== 0) {
    this.save('variable', this._params[3]);
  }
};
 
// Change Enemy TP
XRefManager.command342 = function() {
  if (this._params[2] !== 0) {
    this.save('variable', this._params[3]);
  }
};
 
// Change Enemy State
XRefManager.command333 = function() {
  this.save('state', this._params[2]);
};
 
// Enemy Transform
XRefManager.command336 = function() {
  this.save('enemy', this._params[1]);
};
 
// Show Battle Animation
XRefManager.command337 = function() {
  this.save('animation', this._params[1]);
};
 
// Force Action
XRefManager.command339 = function() {
  this.save('skill', this._params[2]);
  if (this._params[0] !== 0) {
    this.save('actor', this._params[1]);
  }
};
 
 
 
 
 
// Title Screen
 
var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
  _Window_TitleCommand_makeCommandList.call(this);
  this.addCommand('XRef', 'xref', $gameTemp.isPlaytest());
};
 
var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
  _Scene_Title_createCommandWindow.call(this);
  this._commandWindow.setHandler('xref', this.commandXRef.bind(this));
};
 
Scene_Title.prototype.commandXRef = function() {
  XRefManager.loadReferences();
  SceneManager.push(Scene_XRef);
};
 
 
 
 
// XRef Command Window
 
function Window_XRefCommand() {
  this.initialize.apply(this, arguments);
}
 
Window_XRefCommand.prototype = Object.create(Window_Command.prototype);
Window_XRefCommand.prototype.construction = Window_XRefCommand;
 
Window_XRefCommand.prototype.initialize = function(x, y) {
  Window_Command.prototype.initialize.call(this, x, y);
  this.selectLast();
};
 
Window_XRefCommand._lastCommandSymbol = null;
 
Window_XRefCommand.initCommandPosition = function() {
  this._lastCommandSymbol = null;
};
 
Window_XRefCommand.prototype.standardFontSize = function() {
  return 24;
}
 
Window_XRefCommand.prototype.windowWidth = function() {
  return 200;
};
 
Window_XRefCommand.prototype.numVisibleRows = function() {
  return this.maxItems();
};
 
Window_XRefCommand.prototype.makeCommandList = function() {
  this.addCommand('Switches',       'switch',       XRefManager.objTypes().contains('switch'));
  this.addCommand('Variables',      'variable',     XRefManager.objTypes().contains('variable'));
  this.addCommand('Actors',         'actor',        XRefManager.objTypes().contains('actor'));
  this.addCommand('Classes',        'class',        XRefManager.objTypes().contains('class'));
  this.addCommand('Skills',         'skill',        XRefManager.objTypes().contains('skill'));
  this.addCommand('Items',          'item',         XRefManager.objTypes().contains('item'));
  this.addCommand('Weapons',        'weapon',       XRefManager.objTypes().contains('weapon'));
  this.addCommand('Armors',         'armor',        XRefManager.objTypes().contains('armor'));
  this.addCommand('Enemies',        'enemy',        XRefManager.objTypes().contains('enemy'));
  this.addCommand('Troops',         'troop',        XRefManager.objTypes().contains('troop'));
  this.addCommand('States',         'state',        XRefManager.objTypes().contains('state'));
  this.addCommand('Animations',     'animation',    XRefManager.objTypes().contains('animation'));
  this.addCommand('Common Events',  'commonEvent',  XRefManager.objTypes().contains('commonEvent'));
};
 
Window_XRefCommand.prototype.update = function() {
  Window_Command.prototype.update.call(this);
  if (this._selectionWindow) {
    this._selectionWindow.setMode(this.currentSymbol());
  }
};
 
Window_XRefCommand.prototype.setSelectionWindow = function(selectionWindow) {
  this._selectionWindow = selectionWindow;
  this.update();
};
 
Window_XRefCommand.prototype.processOk = function() {
  Window_XRefCommand._lastCommandSymbol = this.currentSymbol();
  Window_MenuCommand.prototype.processOk.call(this);
};
 
Window_XRefCommand.prototype.selectLast = function() {
  this.selectSymbol(Window_XRefCommand._lastCommandSymbol);
};
 
 
// XRef Selection Window
 
function Window_XRefSelection() {
  this.initialize.apply(this, arguments);
}
 
Window_XRefSelection.prototype = Object.create(Window_Selectable.prototype);
Window_XRefSelection.prototype.constructor = Window_XRefSelection;
 
Window_XRefSelection.prototype.initialize = function(x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this._mode = 'none';
  this._data = [];
};
 
Window_XRefSelection.prototype.setMode = function(mode) {
  if (this._mode !== mode) {
    this._mode = mode;
    this.refresh();
    this.resetScroll();
  }
};
 
Window_XRefSelection.prototype.standardFontSize = function() {
  return 24;
}
 
Window_XRefSelection.prototype.maxCols = function() {
  return 2;
};
 
Window_XRefSelection.prototype.maxItems = function() {
  return this._data ? this._data.length : 0;
};
 
Window_XRefSelection.prototype.item = function() {
  var index = this.index();
  return this._data && index >= 0 ? this._data[index] : null;
};
 
Window_XRefSelection.prototype.makeItemList = function() {
  this._data = new Array(XRefManager.dataSources(this._mode).length - 1).join().split(',').map(function(item, index) { return ++index });
};
 
Window_XRefSelection.prototype.isCurrentItemEnabled = function() {
  return this.isEnabled(this.item());
};
 
Window_XRefSelection.prototype.isEnabled = function(item) {
  return XRefManager.refs(this._mode, item).length > 0
};
 
Window_XRefSelection.prototype.drawItem = function (index) {
  var item = this._data[index];
  if (item) {
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    var text = item.padZero(4) + ': ' + XRefManager.objName(this._mode, item);
    this.drawText(text, rect.x, rect.y, rect.width);
  }
};
 
Window_XRefSelection.prototype.setHelpWindow = function(helpWindow) {
  this._helpWindow = helpWindow;
};
 
Window_XRefSelection.prototype.updateHelp = function() {
  if (this._helpWindow && this.item()) {
    this._helpWindow.setText(XRefManager.dataTitles(this._mode) + ' ' +
      this.item().padZero(4) + ': ' + XRefManager.objName(this._mode, this.item()));
  }
};
 
Window_XRefSelection.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};
 
 
 
// XRef Results
 
function Window_XRefResults() {
  this.initialize.apply(this, arguments);
};
 
Window_XRefResults.prototype = Object.create(Window_Selectable.prototype);
Window_XRefResults.prototype.constructor = Window_XRefResults;
 
Window_XRefResults.prototype.initialize = function(x, y, width, height) {
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this._mode = 'none';
  this._data = [];
  this._selection = null;
};
 
Window_XRefResults.prototype.setMode = function(mode) {
  if (this._mode !== mode) {
    this._mode = mode;
  }
};
 
Window_XRefResults.prototype.setSelection = function(selection) {
  this._selection = selection;
};
 
Window_XRefResults.prototype.standardFontSize = function() {
  return 24;
}
 
Window_XRefResults.prototype.maxItems = function() {
  return this._data ? this._data.length : 0;
}
 
Window_XRefResults.prototype.makeItemList = function() {
  this._data = XRefManager.refs(this._mode, this._selection);
};
 
Window_XRefResults.prototype.drawItem = function(index) {
  var item = this._data[index];
  var rect = this.itemRect(index);
  if (item) {
    var text = XRefManager.dataTitles(item._srcType) + ' ' + item._srcId + ': ' + XRefManager.objName(item._srcType, item._srcId);
    if (item._evt) {
      text += '     ';
      if (item._evt._id) { text += 'EV' + item._evt._id.padZero(3) + ': ' + item._evt._name; };
      text += '     ' + item._evt._page + ':' + item._evt._line;
    }
    text += '     ' + XRefManager.command(item._ref);
    this.drawText(text, 2, rect.y, this.contentsWidth() - this.textPadding() * 2);
  } else {
    this.drawText(rect, 'No references found');
  }
};
 
Window_XRefResults.prototype.refresh = function() {
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
};
 
 
 
// XRef Scene
 
function Scene_XRef() {
  this.initialize.apply(this, arguments);
};
 
Scene_XRef.prototype = Object.create(Scene_MenuBase.prototype);
Scene_XRef.prototype.constructor = Scene_XRef;
 
Scene_XRef.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};
 
Scene_XRef.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createCommandWindow();
  this.createSelectionWindow();
  this.createHelpWindow();
  this.createResultWindow();
};
 
Scene_XRef.prototype.createBackground = function() {
 
};
 
Scene_XRef.prototype.createCommandWindow = function() {
  this._commandWindow = new Window_XRefCommand(0, 0);
  this._commandWindow.setHandler('switch',        this.commandChoice.bind(this));
  this._commandWindow.setHandler('variable',      this.commandChoice.bind(this));
  this._commandWindow.setHandler('actor',         this.commandChoice.bind(this));
  this._commandWindow.setHandler('class',         this.commandChoice.bind(this));
  this._commandWindow.setHandler('skill',         this.commandChoice.bind(this));
  this._commandWindow.setHandler('item',          this.commandChoice.bind(this));
  this._commandWindow.setHandler('weapon',        this.commandChoice.bind(this));
  this._commandWindow.setHandler('armor',         this.commandChoice.bind(this));
  this._commandWindow.setHandler('enemy',         this.commandChoice.bind(this));
  this._commandWindow.setHandler('troop',         this.commandChoice.bind(this));
  this._commandWindow.setHandler('state',         this.commandChoice.bind(this));
  this._commandWindow.setHandler('animation',     this.commandChoice.bind(this));
  this._commandWindow.setHandler('commonEvent',   this.commandChoice.bind(this));
  this._commandWindow.setHandler('cancel',        this.popScene.bind(this));
  this.addWindow(this._commandWindow);
};
 
Scene_XRef.prototype.createSelectionWindow = function() {
  var wx = this._commandWindow.x + this._commandWindow.width;
  var ww = Graphics.width - wx;
  this._selectionWindow = new Window_XRefSelection(wx, 0, ww, Graphics.height);
  this._selectionWindow.setHandler('ok',          this.onSelectionOk.bind(this));
  this._selectionWindow.setHandler('cancel',      this.onSelectionCancel.bind(this));
  this._commandWindow.setSelectionWindow(this._selectionWindow);
  this.addWindow(this._selectionWindow);
};
 
Scene_XRef.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help(1);
    this._helpWindow.hide();
    this._selectionWindow.setHelpWindow(this._helpWindow);
    this.addWindow(this._helpWindow);
};
 
Scene_XRef.prototype.createResultWindow = function() {
  var wy = this._helpWindow.y + this._helpWindow.height;
  var wh = Graphics.height - wy;
  this._resultsWindow = new Window_XRefResults(0, wy, Graphics.width, wh);
  this._resultsWindow.setHandler('cancel',        this.onResultCancel.bind(this));
  this._resultsWindow.hide();
  this.addWindow(this._resultsWindow);
};
 
Scene_XRef.prototype.commandChoice = function() {
  this._selectionWindow.refresh();
  this._selectionWindow.activate();
  this._selectionWindow.select(0);
};
 
Scene_XRef.prototype.onSelectionOk = function() {
  this._lastSelection = this._selectionWindow.index();
  this._resultsWindow.setMode(this._commandWindow.currentSymbol());
  this._resultsWindow.setSelection(this._selectionWindow.item());
  this._resultsWindow.refresh();
  this._helpWindow.show();
  this._selectionWindow.updateHelp();
  this._selectionWindow.hide();
  this._selectionWindow.deselect();
  this._commandWindow.hide();
  this._resultsWindow.show();
  this._resultsWindow.activate();
};
 
Scene_XRef.prototype.onSelectionCancel = function() {
  this._selectionWindow.deselect();
  this._commandWindow.activate();
};
 
Scene_XRef.prototype.onResultCancel = function() {
  this._resultsWindow.hide();
  this._resultsWindow.deselect();
  this._helpWindow.hide();
  this._selectionWindow.show();
  this._selectionWindow.activate();
  this._selectionWindow.select(this._lastSelection);
  this._commandWindow.show();
};