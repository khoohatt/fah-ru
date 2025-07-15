//=============================================================================
// Arisu's Dollhouse - WASD - for RPG Maker MV version 1.6.1
// Arisu_WASD.js
//=============================================================================
 /*:
 * @plugindesc <WASD> created by Arisu's Dollhouse
 * @author Arisu's Dollhouse
 *
 * @help
 * == Introduction ==
 *
 * Some players prefer playing with WASD to move the player character (or if
 * they want to play the game with one hand for some reason). This plugin lets
 * you add WASD movement to your game. It does not remove arrow movement, but
 * still adds the WASD keys to also move up, left, down, right respectively. 
 *
 * The E button has been remapped to support a "Page Down" function which was
 * previously on the W key before.
 *
 * The R button is given a new function to toggle between Always Dash and
 * regular walking mode on the map screen.
 *
 * == Instructions ==
 *
 * # Install this plugin into your RPG Maker MV project's js/plugin folder.
 * # Open your game project in RPG Maker MV and open up the Plugin Manager.
 * # Add a new plugin and place this plugin beneath all Yanfly plugins present.
 * # Adjust any Plugin Parameter settings to this plugin.
 * # Read through plugin help file to understand how to use plugin.
 * # When testing this plugin, save first.
 *
 * == Warning ==
 *
 * This plugin is made for RPG Maker MV versions 1.6.1 and below. If you update
 * RPG Maker MV past that and this plugin breaks, I am NOT responsible for it.
 *
 * This plugin is NOT made to be compatible with YEP_KeyboardConfig but instead
 * as an alternative to it for those who want WASD controls in their game.
 *
 * == Terms of Use ==
 *
 * # For Free and Commercial Use.
 * # Put "Arisu's Dollhouse" in your game's credits.
 * # Do not redistribute this plugin without permission.
 * # Do not take code from this plugin without permission.
 * # Edit of code is allowed as long as it's within plugin file.
 * # I do not support changes made to code edit.
 *
 * == Changelog ==
 * 
 * * None
 *
 * @param 
 * @param 
 * @param ATTENTION!!!
 * @default READ THE HELP FILE
 * @param 
 * @param 
 *
 */
//=============================================================================

var _0x39ce=['onKeyDown','altKey','Arisu_WASD','ctrlKey','exit','The\x20Arisu_WASD\x20plugin\x20is\x20for\x20RPG\x20Maker\x20MV\x20only.','left','_scene','WASD','keyMapper','pagedown','keyCode','right','alwaysDash','The\x20Arisu_WASD\x20plugin\x20is\x20not\x20compatible\x20with\x20YEP_KeyboardConfig!','toggleAutoDash','down'];(function(_0xfd5208,_0x39ce79){var _0x309c22=function(_0x210ceb){while(--_0x210ceb){_0xfd5208['push'](_0xfd5208['shift']());}};_0x309c22(++_0x39ce79);}(_0x39ce,0xa6));var _0x309c=function(_0xfd5208,_0x39ce79){_0xfd5208=_0xfd5208-0x0;var _0x309c22=_0x39ce[_0xfd5208];return _0x309c22;};var Imported=Imported||{};Imported[_0x309c('0x6')]=!![];if(Imported['YEP_KeyboardConfig']){alert(_0x309c('0x1'));SceneManager[_0x309c('0x8')]();}var Arisu=Arisu||{};Arisu['WASD']=Arisu[_0x309c('0xc')]||{};(()=>{Input[_0x309c('0xd')]['87']='up';Input[_0x309c('0xd')]['65']=_0x309c('0xa');Input[_0x309c('0xd')]['83']=_0x309c('0x3');Input[_0x309c('0xd')]['68']=_0x309c('0x10');Input[_0x309c('0xd')]['69']=_0x309c('0xe');ConfigManager[_0x309c('0x2')]=function(){this[_0x309c('0x0')]=!this['alwaysDash'];this['save']();};const _0x1947c1=SceneManager[_0x309c('0x4')];SceneManager[_0x309c('0x4')]=function(_0x16acd5){if(!_0x16acd5[_0x309c('0x7')]&&!_0x16acd5[_0x309c('0x5')]){if(_0x16acd5[_0x309c('0xf')]===0x52&&this[_0x309c('0xb')]['constructor']===Scene_Map){ConfigManager[_0x309c('0x2')]();}}_0x1947c1['apply'](this,arguments);};})();if(Utils['RPGMAKER_NAME']!=='MV'){alert(_0x309c('0x9'));SceneManager['exit']();}