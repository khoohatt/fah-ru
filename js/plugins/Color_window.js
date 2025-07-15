/*:
-------------------------------------------------------------------------------
@title Window Background Colors
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.0
@date Apr 14, 2016
@video https://www.youtube.com/watch?v=KMArLErZCwQ
@filename HIME_WindowBackgroundColors.js
@url http://himeworks.com/2016/04/window-background-colors/

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
@plugindesc v1.0 - Allows you to customize the background window color and
opacity.
@help 
-------------------------------------------------------------------------------
== Description ==

By default, RPG Maker's window colors are determined by two things

1. The windowskin file called "Window" in the img/system folder
2. A standard background opacity

So for example, the default windows are dark colored with a semi-transparent
opacity.

However, what if you just wanted to have a nice solid color?
Using this plugin, you can quickly set up the colors for your windows.

This plugin overwrites the background color settings of the windowskin.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.0 - Apr 14, 2016
 * initial release

== Usage ==

In the plugin parameters, choose the color and opacity that you would like to
use for your windows. The plugin has been set up with the default window
colors.

These settings apply to all windows.

The opacity is a value between 0 and 255, where 0 is fully transparent,
and 255 is fully opaque.

The background color is a list of RGB values, specified as [R, G, B].
For example, if you wanted to have a red window, you would just write

[255, 0, 0]

You can use a color wheel to help you determine what your RGB value is.

Changing Color Options in-game

You can change the color of the windows during the game by using the following
script calls

$gameSystem.setWindowBackColor(R, G, B)
$gameSystem.setWindowBackOpacity(A)

Where R, G, B, and A are integers from 0 to 255.

-- Color Settings in the Option Menu --

Please note that this plugin doesn't add settings to the options menu as shown
in the video. If you would like such functionality contact me and we can look
at how it may be implemented for your project.

-------------------------------------------------------------------------------
@param Opacity
@desc Opacity for your window background. Between 0 and 255,
where 0 is transparent and 255 is fully opaque.
@default 192

@param Background Color
@desc Background color for your windows.
Format is RGB as [Red, Green, Blue]
@default [42, 37, 43]
-------------------------------------------------------------------------------
*/ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_WindowBackgroundColors = 1;
TH.WindowBackgroundColors = TH.WindowBackgroundColors || {};

(function ($) {

  $.params = PluginManager.parameters("HIME_WindowBackgroundColors");
  $.opacity = Math.floor($.params["Opacity"]);
  $.bgColor = eval($.params["Background Color"]);
  
  SceneManager.refreshWindowBackgrounds = function() {
    this._scene._windowLayer.refreshWindowBackgrounds();
  };
  
  WindowLayer.prototype.refreshWindowBackgrounds = function() {
    var wins = this.children;
    for (var i = 0; i < wins.length; i++) {
      var win = wins[i];
      if (win instanceof Window) {
        wins[i]._refreshBack();
        wins[i].updateBackOpacity();
      }
    }
  };
  
  /***************************************************************************/
  
  Game_System.prototype.setWindowBackColor = function(r,g,b) {
    this._windowBackColor = [r,g,b];
    SceneManager.refreshWindowBackgrounds();
  }
  
  Game_System.prototype.setWindowBackOpacity = function(value) {
    this._windowBackOpacity = value;
    SceneManager.refreshWindowBackgrounds();
  };

  Game_System.prototype.windowBackOpacity = function() {    
    if (this._windowBackOpacity === undefined) {
      this._windowBackOpacity = $.opacity;
    }
    return this._windowBackOpacity;
  };
  
  Game_System.prototype.windowBackColor = function() {
    if (this._windowBackColor === undefined) {
      this._windowBackColor = $.bgColor;
    }
    return this._windowBackColor;
  };
  
  /***************************************************************************/

  Window_Base.prototype.standardBackOpacity = function() {
    return $gameSystem.windowBackOpacity();
  };
  
  /* Ignore windowskin tone */
  Window.prototype._refreshBack = function() {
    var m = this._margin;
    var w = this._width - m * 2;
    var h = this._height - m * 2;
    var bitmap = new Bitmap(w, h);
    var rgb = $gameSystem.windowBackColor();
    var color = "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
    bitmap.fillRect(0, 0, w, h, color);
    this._windowBackSprite.bitmap = bitmap;
    this._windowBackSprite.setFrame(0, 0, w, h);
    this._windowBackSprite.move(m, m);
  };   
})(TH.WindowBackgroundColors);
  