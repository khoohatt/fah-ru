/*:
-------------------------------------------------------------------------
@title Conditional Choice Text
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.1
@date Dec 27, 2015
@filename HIME_ConditionalChoiceText.js
@url http://himeworks.com/2015/11/conditional-choice-text/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/
-------------------------------------------------------------------------
@plugindesc v1.1 - Allows you to dynamically set the text for each choice
in your events.
@help 
-------------------------------------------------------------------------
== Description ==

RPG Maker allows you to offer your players choice selection, and
depending on which choice they pick, your events will behave differently.

However, what happens if you wanted to have a particular choice display
a different text, depending on whether certain conditions have been met?
Maybe if you haven't found an item that allows you to understand what the
locals are saying in a foreign language, all of the text that is shown
will be garbled.

In particular, if you combine it with a plugin that allows you to disable
choices, you could show question marks instead of the actual text.

With this plugin, you can easily change a choice's text using events.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.1 - Dec 27, 2015
 * choice text is now evaluated in the interpreter
 * game message returns choices with updated text
1.0 - Nov 6, 2015
 * initial release
 
== Usage == 

There are two ways to set the choice text.

1. Using a plugin command.

Create a plugin command and write

  choice_text choiceNumber customText
  
Where the `choiceNumber` is the number of the choice that the text
will apply to, and `customText` is the text that you want to change
to. You can include spaces in your text.

For example, if you want to change the second choice's text to
"???" you can write

  choice_text 2 ???
  
It is up to you to set up the conditional branches appropriately.

2. Using a script call

Create a script call and write

  this.choice_text(choiceNumber, customText, condition)
  
Where the `choiceNumber` is the number of the choice that the text
will apply to, and `customText` is the text that you want to change
to.

The `condition` is a valid formula that evaluates to true or false.
The specified choice's text will only be changed if the condition
is true.

To change the second choice's text to ??? assuming switch 3 is OFF,
you can write

  this.choice_text(2, "???", "$gameSwitches.value(3) === false")

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {};
var TH = TH || {};
Imported.ConditionalChoiceText = 1;
TH.ConditionalChoiceText = TH.ConditionalChoiceText || {};

(function ($) {

  /* store the text for each choice */
  var TH_ConditionalChoiceText_GameMessage_Clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function() {
    TH_ConditionalChoiceText_GameMessage_Clear.call(this);
    this._customChoiceText = {};
  };
  
  /* Replace each choice text if needed */
  var TH_GameMessage_choices = Game_Message.prototype.choices;
  Game_Message.prototype.choices = function() {
    var res = TH_GameMessage_choices.call(this);
    for (var key in this._customChoiceText) {
      res[key] = this._customChoiceText[key]
    }
    return res;
  };
  
  /* Returns the custom text for the given choice */
  Game_Message.prototype.choiceText = function(choiceNum) {
    return this._customChoiceText[choiceNum];
  }
  
  Game_Message.prototype.setChoiceText = function(choiceNum, text) {
    this._customChoiceText[choiceNum] = text;
  }
  
  /* Use a plugin command*/
  var TH_ConditionalChoiceText_GameInterpreterPluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    TH_ConditionalChoiceText_GameInterpreterPluginCommand.call(this, command, args);    
    if (command.toLowerCase() === "choice_text") {
      var choiceNum = Math.floor(args[0] - 1);
      var text = args.slice(1).join(" ")
      $gameMessage.setChoiceText(choiceNum, text);
    }
    return true;
  };
  
  Game_Interpreter.prototype.choice_text = function(choiceNum, text, formula) {
    var num = Math.floor(choiceNum) - 1;    
    if (eval(formula)) {
      $gameMessage.setChoiceText(num, text);
    }
  };
  
  /* Use a script call */
  choice_text = function(choiceNum, text, formula) {
    var num = Math.floor(choiceNum) - 1;    
    if (eval(formula)) {
      $gameMessage.setChoiceText(num, text);
    }
  };
})(TH.ConditionalChoiceText);