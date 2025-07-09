//=============================================================================
// Olivia Engine - Meta Controls - for RPG Maker MV version 1.6.1
// Olivia_MetaControls.js
//=============================================================================
 /*:
 * @plugindesc <MetaControls> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV plugin that lets you control switches and variables
 * that last across a meta level on a game. A switch or variable designated to
 * function as a meta switch or meta variable can persist across different save
 * files. To assist in controlling meta properties of the game some more, the
 * developer can assign common events to run at the start of a new game or when
 * a game is loaded. Saving the game can also register map data to variables.
 *
 *
 *
 * ------------
 * Instructions
 * ------------
 *
 * <Global Meta>
 * - Place this in the name of a switch or variable that you want to have its
 * data persist across different saves and even new games. This does not have to
 * be the full name. It can be just a part of the switch or variable's name.
 *
 * <Local Meta>
 * - Place this in the name of a switch or variable that you want to have its
 * data persist across only related saves. This does not have to be the full
 * name. It can be a part of the switch or variable's name.
 *
 *
 *
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * Common Event on New Game: Run this common event when a new game is started.
 * Leave as 0 to not use this function.
 *
 * Common Event on Load: Run this common event when a game is loaded. Leave as
 * 0 to not use this function.
 *
 * Variables on Save: If any of these are set to variables, then those variables
 * will acquire the Map ID, Map X position, or Map Y position whenever the
 * player makes a save.
 *
 *
 *
 * ------------------------------------------
 * Which Saves Are Affected By <Local Meta> ?
 * ------------------------------------------
 *
 * Let's say you create three new games A, B, and C.
 *
 * If in playthrough A, you save in files 1 and 2, then <Local Meta> data will
 * affect both files 1 and 2. They will not affect the saves from playthroughs
 * B and C. To affect playthroughs B and C, it will have to be <Global Meta>.
 *
 * In playthrough B, you save in files 3, 4, 5. The saves made in playthroughs
 * A and C will not be affected by the <Local Meta> data made during playthrough
 * B and its saves. To affect them all, use <Global Meta>.
 *
 * For playthrough C, save files 6, 7, 8, 9, 10 are used. All other playthroughs
 * are completely unaffected by the <Local Meta> data used in playthrough C.
 * To affect other playthroughs, <Global Meta> has to be used.
 *
 * But there is a warning: <Local Meta> will not affect related playthroughs
 * for save files made before installing this plugin. This is due to the lack
 * proper linking across those saves to be used for meta data.
 *
 *
 *
 * -------------------
 * W A R N I N G ! ! !
 * -------------------
 *
 * This plugin is made for RPG Maker MV versions 1.6.1 and below. If you update
 * RPG Maker MV past that and this plugin breaks, I am NOT responsible for it.
 *
 *
 *
 * ------------
 * Terms of Use
 * ------------
 * 
 * 1. These plugins may be used in free or commercial games.
 * 2. 'Fallen Angel Olivia' must be given credit in your games.
 * 3. You are allowed to edit the code.
 * 4. Do NOT change the filename, parameters, and information of the plugin.
 * 5. You are NOT allowed to redistribute these Plugins.
 * 6. You may NOT take code for your own released Plugins without credit.
 *
 *
 *
 * -------
 * Credits
 * -------
 *
 * If you are using this plugin, credit the following people:
 * 
 * - Fallen Angel Olivia
 *
 * @param 
 * @param 
 * @param ATTENTION!!!
 * @default READ THE HELP FILE
 * @param 
 * @param 
 *
 * @param Common Event on New Game
 * @type common_event
 * @desc Run this common event when a new game is started. Leave as 0 to not use this function.
 * @default 0
 *
 * @param Common Event on Load
 * @type common_event
 * @desc Run this common event when a game is loaded. Leave as 0 to not use this function.
 * @default 0
 *
 * @param Variables on Save
 *
 * @param Map ID
 * @parent Variables on Save
 * @type variable
 * @desc Save the Map ID to this variable whenever the player saves. Recommended to be used with the <Local Meta> nametag.
 * @default 0
 *
 * @param Map X
 * @parent Variables on Save
 * @type variable
 * @desc Save the Map ID to this variable whenever the player saves. Recommended to be used with the <Local Meta> nametag.
 * @default 0
 *
 * @param Map Y
 * @parent Variables on Save
 * @type variable
 * @desc Save the Map ID to this variable whenever the player saves. Recommended to be used with the <Local Meta> nametag.
 * @default 0
 *
 */
//=============================================================================

var _0x4e44=['switches','Common\x20Event\x20on\x20Load','loadMetaVariables','contains','description','match','___DataManager_setupNewGame___','___Game_Variables_setValue___','requestRefresh','value','Map\x20X','save','___ConfigManager_applyData___','call','makeData','saveGameMetaControls','setValue','___Game_Variables_value___','___DataManager_loadGame___','VariableMapY','___DataManager_saveGame___','setupNewGame','prototype','MetaControls','NewGameCommonEvent','loadMetaSwitchesVariables','_data','saveGame','Common\x20Event\x20on\x20New\x20Game','reserveCommonEvent','getMetaID','loadMetaSwitches','initializeMetaID','length','Map\x20ID','_metaID','variables','getMetaControlsData','___ConfigManager_makeData___','initialize','LoadGameCommonEvent','applyData','Olivia_MetaControls','parameters','now','___Game_Switches_setValue___','___Game_Switches_value___','number','VariableMapX','VariableMapID','MetaControlsData','___Game_System_initialize___','processMetaChange','Map\x20Y','loadGame'];(function(_0x4d4f83,_0x4e4417){var _0x18643c=function(_0xf564f6){while(--_0xf564f6){_0x4d4f83['push'](_0x4d4f83['shift']());}};_0x18643c(++_0x4e4417);}(_0x4e44,0x1a9));var _0x1864=function(_0x4d4f83,_0x4e4417){_0x4d4f83=_0x4d4f83-0x0;var _0x18643c=_0x4e44[_0x4d4f83];return _0x18643c;};var Imported=Imported||{};Imported[_0x1864('0x2')]=!![];var Olivia=Olivia||{};Olivia[_0x1864('0x26')]=Olivia[_0x1864('0x26')]||{};var parameters=$plugins['filter'](function(_0x5c039e){return _0x5c039e[_0x1864('0x13')][_0x1864('0x12')]('<MetaControls>');})[0x0][_0x1864('0x3')];Olivia[_0x1864('0x26')][_0x1864('0x27')]=parseInt(parameters[_0x1864('0x2b')]||0x0);Olivia[_0x1864('0x26')]['LoadGameCommonEvent']=parseInt(parameters[_0x1864('0x10')]||0x0);Olivia[_0x1864('0x26')][_0x1864('0x9')]=parseInt(parameters[_0x1864('0x31')]||0x0);Olivia[_0x1864('0x26')][_0x1864('0x8')]=parseInt(parameters[_0x1864('0x19')]||0x0);Olivia[_0x1864('0x26')][_0x1864('0x22')]=parseInt(parameters[_0x1864('0xd')]||0x0);Olivia['MetaControls'][_0x1864('0x15')]=DataManager[_0x1864('0x24')];DataManager[_0x1864('0x24')]=function(){Olivia[_0x1864('0x26')][_0x1864('0x15')][_0x1864('0x1c')](this);if(Olivia[_0x1864('0x26')][_0x1864('0x27')]>0x0){$gameTemp[_0x1864('0x2c')](Olivia[_0x1864('0x26')][_0x1864('0x27')]);}};Olivia[_0x1864('0x26')]['___DataManager_saveGame___']=DataManager['saveGame'];DataManager[_0x1864('0x2a')]=function(_0x5657f2){if(!!$gameVariables){this[_0x1864('0x1e')]();}return Olivia[_0x1864('0x26')][_0x1864('0x23')][_0x1864('0x1c')](this,_0x5657f2);};DataManager[_0x1864('0x1e')]=function(){if(Olivia[_0x1864('0x26')][_0x1864('0x9')]>0x0){$gameVariables[_0x1864('0x1f')](Olivia[_0x1864('0x26')][_0x1864('0x9')],$gameMap['mapId']());}if(Olivia['MetaControls']['VariableMapX']>0x0){$gameVariables[_0x1864('0x1f')](Olivia[_0x1864('0x26')][_0x1864('0x8')],$gamePlayer['x']);}if(Olivia['MetaControls'][_0x1864('0x22')]>0x0){$gameVariables[_0x1864('0x1f')](Olivia[_0x1864('0x26')]['VariableMapY'],$gamePlayer['y']);}};Olivia['MetaControls'][_0x1864('0x21')]=DataManager[_0x1864('0xe')];DataManager[_0x1864('0xe')]=function(_0x5dbbb7){var _0x59a886=Olivia[_0x1864('0x26')][_0x1864('0x21')][_0x1864('0x1c')](this,_0x5dbbb7);if(_0x59a886){$gameSystem[_0x1864('0x28')]();if(Olivia['MetaControls']['LoadGameCommonEvent']>0x0){$gameTemp['reserveCommonEvent'](Olivia[_0x1864('0x26')][_0x1864('0x0')]);}}return _0x59a886;};Olivia[_0x1864('0x26')]['___ConfigManager_makeData___']=ConfigManager[_0x1864('0x1d')];ConfigManager['makeData']=function(){var _0xd60bae=Olivia[_0x1864('0x26')][_0x1864('0x35')][_0x1864('0x1c')](this);_0xd60bae['MetaControlsData']=this[_0x1864('0xa')];return _0xd60bae;};Olivia[_0x1864('0x26')][_0x1864('0x1b')]=ConfigManager[_0x1864('0x1')];ConfigManager[_0x1864('0x1')]=function(_0x5d9bc7){Olivia[_0x1864('0x26')][_0x1864('0x1b')][_0x1864('0x1c')](this,_0x5d9bc7);this[_0x1864('0xa')]=_0x5d9bc7[_0x1864('0xa')]||{};};ConfigManager[_0x1864('0x34')]=function(_0x58535c){this[_0x1864('0xa')]=this['MetaControlsData']||{};this[_0x1864('0xa')][_0x58535c]=this[_0x1864('0xa')][_0x58535c]||{'switches':[0x0],'variables':[0x0]};return this['MetaControlsData'][_0x58535c];};Olivia[_0x1864('0x26')][_0x1864('0xb')]=Game_System[_0x1864('0x25')][_0x1864('0x36')];Game_System[_0x1864('0x25')]['initialize']=function(){Olivia[_0x1864('0x26')][_0x1864('0xb')][_0x1864('0x1c')](this);this[_0x1864('0x2f')]();};Game_System[_0x1864('0x25')][_0x1864('0x2f')]=function(){this[_0x1864('0x32')]=Date[_0x1864('0x4')]();this[_0x1864('0x28')]();};Game_System[_0x1864('0x25')]['getMetaID']=function(){if(this[_0x1864('0x32')]==undefined){this[_0x1864('0x2f')]();}return this[_0x1864('0x32')];};Game_System[_0x1864('0x25')][_0x1864('0x28')]=function(){this[_0x1864('0x2e')]();this['loadMetaVariables']();if(!!$gameMap){$gameMap[_0x1864('0x17')]();}};Game_System[_0x1864('0x25')][_0x1864('0x2e')]=function(){if(!!$gameSwitches){var _0x375bab=$dataSystem['switches'];for(var _0xb4def3=0x1;_0xb4def3<_0x375bab[_0x1864('0x30')];_0xb4def3++){if(_0x375bab[_0xb4def3][_0x1864('0x14')](/<(?:Global|Global Meta)>/i||/<(?:Local|Local Meta|Meta)>/i)){$gameSwitches[_0x1864('0x18')](_0xb4def3);}}}};Game_System['prototype'][_0x1864('0x11')]=function(){if(!!$gameVariables){var _0x2508c7=$dataSystem[_0x1864('0x33')];for(var _0x2ed1e6=0x1;_0x2ed1e6<_0x2508c7[_0x1864('0x30')];_0x2ed1e6++){if(_0x2508c7[_0x2ed1e6][_0x1864('0x14')](/<(?:Global|Global Meta)>/i||/<(?:Local|Local Meta|Meta)>/i)){$gameVariables[_0x1864('0x18')](_0x2ed1e6);}}}};Olivia[_0x1864('0x26')]['___Game_Switches_value___']=Game_Switches[_0x1864('0x25')][_0x1864('0x18')];Game_Switches[_0x1864('0x25')]['value']=function(_0x27e59f){if($dataSystem[_0x1864('0xf')][_0x27e59f][_0x1864('0x14')](/<(?:Global|Global Meta)>/i)){var _0x9fdd86=!!ConfigManager['getMetaControlsData'](0x0)[_0x1864('0xf')][_0x27e59f];this[_0x1864('0x29')][_0x27e59f]=_0x9fdd86;return _0x9fdd86;}else if($dataSystem[_0x1864('0xf')][_0x27e59f][_0x1864('0x14')](/<(?:Local|Local Meta|Meta)>/i)){var _0x9fdd86=!!ConfigManager[_0x1864('0x34')]($gameSystem[_0x1864('0x2d')]())[_0x1864('0xf')][_0x27e59f];this[_0x1864('0x29')][_0x27e59f]=_0x9fdd86;return _0x9fdd86;}else{return Olivia[_0x1864('0x26')][_0x1864('0x6')][_0x1864('0x1c')](this,_0x27e59f);}};Olivia[_0x1864('0x26')][_0x1864('0x5')]=Game_Switches['prototype'][_0x1864('0x1f')];Game_Switches[_0x1864('0x25')][_0x1864('0x1f')]=function(_0x2a9a2b,_0x1d3507){Olivia['MetaControls']['___Game_Switches_setValue___'][_0x1864('0x1c')](this,_0x2a9a2b,_0x1d3507);if(_0x2a9a2b>0x0&&_0x2a9a2b<$dataSystem['switches'][_0x1864('0x30')]){if($dataSystem[_0x1864('0xf')][_0x2a9a2b][_0x1864('0x14')](/<(?:Global|Global Meta)>/i)){this[_0x1864('0xc')](_0x2a9a2b,_0x1d3507,!![]);}else if($dataSystem[_0x1864('0xf')][_0x2a9a2b][_0x1864('0x14')](/<(?:Local|Local Meta|Meta)>/i)){this[_0x1864('0xc')](_0x2a9a2b,_0x1d3507,![]);}}};Game_Switches[_0x1864('0x25')]['processMetaChange']=function(_0x5880b2,_0x12cf0b,_0x587831){if(_0x587831){var _0x1571cd=ConfigManager['getMetaControlsData'](0x0);}else{var _0x1571cd=ConfigManager[_0x1864('0x34')]($gameSystem[_0x1864('0x2d')]());}_0x1571cd['switches'][_0x5880b2]=_0x12cf0b;this[_0x1864('0x29')][_0x5880b2]=_0x12cf0b;ConfigManager[_0x1864('0x1a')]();};Olivia[_0x1864('0x26')][_0x1864('0x20')]=Game_Variables[_0x1864('0x25')]['value'];Game_Variables[_0x1864('0x25')][_0x1864('0x18')]=function(_0x1fc040){if($dataSystem[_0x1864('0x33')][_0x1fc040][_0x1864('0x14')](/<(?:Global|Global Meta)>/i)){var _0x262fcb=ConfigManager[_0x1864('0x34')](0x0)[_0x1864('0x33')][_0x1fc040]||0x0;this[_0x1864('0x29')][_0x1fc040]=_0x262fcb;return _0x262fcb;}else if($dataSystem[_0x1864('0x33')][_0x1fc040][_0x1864('0x14')](/<(?:Local|Local Meta|Meta)>/i)){var _0x262fcb=ConfigManager[_0x1864('0x34')]($gameSystem[_0x1864('0x2d')]())[_0x1864('0x33')][_0x1fc040]||0x0;this[_0x1864('0x29')][_0x1fc040]=_0x262fcb;return _0x262fcb;}else{return Olivia[_0x1864('0x26')][_0x1864('0x20')][_0x1864('0x1c')](this,_0x1fc040);}};Olivia[_0x1864('0x26')][_0x1864('0x16')]=Game_Variables[_0x1864('0x25')][_0x1864('0x1f')];Game_Variables[_0x1864('0x25')][_0x1864('0x1f')]=function(_0x238073,_0x14a960){Olivia[_0x1864('0x26')]['___Game_Variables_setValue___'][_0x1864('0x1c')](this,_0x238073,_0x14a960);if(_0x238073>0x0&&_0x238073<$dataSystem[_0x1864('0x33')]['length']){if($dataSystem[_0x1864('0x33')][_0x238073][_0x1864('0x14')](/<(?:Global|Global Meta)>/i)){this['processMetaChange'](_0x238073,_0x14a960,!![]);}else if($dataSystem[_0x1864('0x33')][_0x238073][_0x1864('0x14')](/<(?:Local|Local Meta|Meta)>/i)){this['processMetaChange'](_0x238073,_0x14a960,![]);}}};Game_Variables[_0x1864('0x25')][_0x1864('0xc')]=function(_0x2dadf7,_0xcbcab8,_0x27e1ae){if(_0x27e1ae){var _0x35dcb9=ConfigManager[_0x1864('0x34')](0x0);}else{var _0x35dcb9=ConfigManager[_0x1864('0x34')]($gameSystem[_0x1864('0x2d')]());}if(typeof _0xcbcab8===_0x1864('0x7')){_0xcbcab8=Math['floor'](_0xcbcab8);}_0x35dcb9[_0x1864('0x33')][_0x2dadf7]=_0xcbcab8;this['_data'][_0x2dadf7]=_0xcbcab8;ConfigManager[_0x1864('0x1a')]();};