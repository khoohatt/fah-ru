//=============================================================================
// Olivia Engine - Octo Battle - for RPG Maker MV version 1.6.1
// Olivia_OctoBattle.js
//=============================================================================
 /*:
 * @plugindesc <OctoBattle> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV compilation plugin using eight various battle-related
 * plugins to make an indepth battle system. The plugins are:
 *
 * 1) Weakness Display Plugin
 * 2) Break Shield System Plugin
 * 3) Boost Point System Plugin
 * 4) Weapon Swap System Plugin
 * 5) Side Battle Status UI Plugin
 * 6) Victory Sequence UI Plugin
 * 7) Battle Effects Pack Plugin
 * 8) Order Turn Battle Plugin
 *
 * Weakness Display Plugin: The features create a display in battle to show an
 * enemy's elemental weaknesses. These weaknesses will start off hidden and
 * will be slowly revealed whenever they receive elemental damage of the
 * correct type. Choose to display the enemy's HP status, too.
 *
 * Break Shield System Plugin: These features creates a new mechanic called a
 * Break Shield. Actors and/or enemies can have them. Whenever a battler is
 * struck with an elemental weakness, their Break Shield is reduced by 1
 * (unless modified by a notetag). Once the battler's Break Shield reaches
 * a score of 0, a state is then applied to the battler (usually a stun state).
 * Once the Break state wears off, the battler will regain their Break Shields
 * again. This can be used to create complex battle depth for your game.
 *
 * Boost Point System Plugin: These features add Boost Points to your game.
 * This is a newly added mechanic that allows actors and enemies to temporarily
 * power themselves up for the current turn by using a new resource called
 * Boost Points. Boost Points are acquired at the end of each turn if the
 * battler did not use Boost Points. While Boosted, actions can either deal
 * more damage, hit more times, make buff/debuff effects last longer, and more.
 *
 * Weapon Swap System Plugin: This will give your game's actors the function
 * to swap weapons in the middle of the fight. Up to one of each weapon type
 * can be equipped at a time and they can be switched out each turn. Swapping
 * weapons can let the player team adapt to certain situations better or giving
 * them the ability to hit certain weapon weaknesses in battle.
 *
 * Side Battle Status UI Plugin: This changes the UI of the battle system to
 * something more minimalistic. The menus are placed towards the player's party
 * to let the player focus their attention to the center of the screen instead
 * of to the lower ledges of the screen.
 *
 * Victory Sequence UI Plugin: This makes the battle system's victory sequence
 * only a single screen. It puts together all of the reward information gained
 * from battle onto a compact screen to display everything at once before the
 * player goes back to the map scene.
 *
 * Battle Effects Pack Plugin: This adds many new features to battle. These
 * new features include colored damage popups and two new popups: Weak and
 * Break, buff and debuff turn stacking, buff and debuff maximum turn control,
 * state maximum turn control, follow up skill actions, extra skill lists, and
 * many unique notetag effects.
 *
 * Order Turn Battle Plugin: This changes the battle system to have a turn
 * order system where battlers act immediately after inputting actions. These
 * actions can influence the order position of battlers in the current turn or
 * the next turn. The turn order is displayed to the top of the screen and gives
 * the player a clear understanding on whose turn it will be making it easier
 * for the player to formulate strategies and adapt to the situation in battle.
 *
 * Some of the features in this plugin requires YEP Battle Engine Core. Please
 * go to Yanfly's website to download it and install it:
 * http://yanfly.moe/2015/10/10/yep-3-battle-engine-core/
 * 
 * ------------
 * Instructions
 * ------------
 *
 * If you are using this plugin, please do not use the other 8 plugins listed
 * or else there will be errors. If you have configured the plugin parameters
 * for those individual plugins, you will unfortunately have to reconfigure
 * them for this one again. I'm afraid there is not anything I can do about that
 * and I must apologize for it.
 *
 * For the best compatibility, place this plugin close to the BOTTOM of your
 * plugin list. This is to ensure the features of this plugin will be used and
 * that other plugins do not override this one.
 *
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * There are many plugin parameters found in this plugin. They are separated by
 * sections each related to their own plugin. Those features can be turned on
 * and off if you don't wish to use every feature out of the eight. When an
 * entire feature is turned off, everything about that is turned off. Please
 * carefully set up your game!
 *
 * --------
 * Notetags
 * --------
 * 
 * Skill and Item Notetags:
 *
 * <Analyze Weakness: x>
 * This will reveal x weaknesses that the player has not currently
 * revealed yet from the target enemy.
 *
 * <Break Reduce: x>
 * Reduces the target's Break Shield by x if this action hits a weakness.
 * If you do not use this notetag, x will be the default value found in
 * the plugin's parameters.
 *
 * <Change Break Shield: x>
 * This will change the target battler's Break Shield value to x if the
 * battler isn't currently stunned. No effect if you don't use this notetag.
 *
 * <Increase Break Shield: +x>
 * <Decrease Break Shield: -x>
 * This will either increase the target battler's break shield by x or
 * decrease the target battler's break shield by x. Happens after the
 * Change Break Shield notetag. No effect if you don't use this notetag.
 *
 * <Require x BP>
 * This will make the action require at least x BP to use for actors.
 * If for enemies, then at least x BP must be stored. This will not
 * make the enemies use the BP until you use the enemy BP use notetags.
 *
 * <Require > x BP>
 * <Require >= x BP>
 * <Require = x BP>
 * <Require <= x BP>
 * <Require < x BP>
 * This will make the action require greater than, greater than or equal to,
 * equal to exactly, less than or equal to, or less than x BP for the skill
 * to be used for actors. If for enemies, this will be the BP stored. This
 * will not make the enemies use the BP until you use the enemy BP use notetag.
 *
 * <Target BP: +x>
 * <Target BP: -x>
 * The target will gain or lose BP equal to x. This is a BP effect.
 *
 * <User BP: +x>
 * <User BP: -x>
 * The user will gain or lose BP equal to x. This is a BP effect.
 *
 * <Boost Damage>
 * If the action's user is using BP, this will boost the damage multiplier
 * for this action by the multiplier set in the plugin parameters.
 *
 * <Boost Turns>
 * If the action's user is using BP, this will boost the state/buff turns
 * for this action by the multiplier set in the plugin parameters.
 *
 * <Boost Repeats>
 * If the action's user is using BP, this will boost the number of repeated
 * hits for this action by the multiplier set in the plugin parameters.
 *
 * <Boost Analyze>
 * If the action's user is using BP, this will boost the number of weaknesses
 * revealed for this action by the multiplier set in the plugin parameters.
 *
 * <Boost BP Effect>
 * If the action's user is using BP, this will boost the number of BP effects
 * for this action by the multiplier set in the plugin parameters.
 *
 * <Switch to Weapon: x>
 * <Switch to Weapon: text>
 * When the actor uses this skill or item, the actor will switch to this
 * weapon if it is equipped when the skill cost is paid. x is the weapon
 * type ID and text is the weapon name. If you use the weapon name, type
 * it out exactly since it is case sensitive. This notetag does not make
 * the weapon a requirement. To make it a requirement, use the database's
 * "Required Weapon" dropdown lists to enforce the requirement.
 *
 * <Bypass Target Change>
 * <Divine>
 * Makes this skill/item immune to the target scope change notetag effects.
 *
 * <JP x5>
 * <EXP x10>
 * <Gold x200>
 * Replace the numbers. Changes the multipliers for the rewards found in the
 * current battle. JP will require Yanfly's Job Points plugin to have an effect.
 * After the battle is over, the multipliers will reset. The multipliers do not
 * stack and will overwrite each other, even if they are different types.
 *
 * <OTB User Next Turn: +x>
 * <OTB User Next Turn: -x>
 * Change the user's turn order position for the next turn upon using this
 * skill or item. This will only occur once upon usage, no matter how many times
 * the battler hits the target.
 *
 * <OTB Target Current Turn: +x>
 * <OTB Target Current Turn: -x>
 * <OTB Target Next Turn: +x>
 * <OTB Target Next Turn: -x>
 * <OTB Target Follow Turn: +x>
 * <OTB Target Follow Turn: -x>
 * Change the target's turn order position for the current turn, the next turn,
 * or the following turn. If you are using the 'Follow' version of the notetag,
 * the turn it will modify will depend on if the target has acted during the
 * current turn. If it has acted, then it will affect the next turn, otherwise,
 * the current turn. Successfully attacking the target multiple times will also
 * affect the target multiple times.
 *
 * <OTB User Add Current Turn Actions: x>
 * <OTB User Add Next Turn Actions: x>
 * Add x actions to the current turn or the next turn for the user. This will
 * only be added once no matter how many times the battler hits the target.
 *
 * <OTB Target Add Current Turn Actions: x>
 * <OTB Target Add Next Turn Actions: x>
 * Add x actions to the current turn or the next turn for the target. If the
 * target is targeted multiple times, the target will gain actions multiple
 * times so please be cautious when using this.
 *
 *
 *
 * Skill Notetags:
 *
 * <Require Any Weapon>
 * Requires any kind of weapon to be equipped in order to use it.
 *
 * <Require Weapon Types: x>
 * <Require Weapon Types: x, x, x>
 * Insert multiple x to add more weapon types. All of the weapon types must
 * be equipped in order for this skill to be used.
 * 
 * <Destroy Weapon>
 * Destroys the actor's currently equipped weapon after it is finished using a
 * skill with this notetag.
 *
 * <Extra Skill List: x>
 * <Extra Skill List: x, x, x>
 * Puts the skills x in a new window as a list to select from, turning this
 * skill into a folder during battle. This does not work outside of battle.
 * The actor must have access to all of the listed skills in order to use them.
 *
 *
 *
 * Actor, Class, and Enemy Notetags:
 * 
 * <Break Shields: x>
 * x is the base number of Break Shields the battler starts with.
 * If you do not use this notetag, x will be the default value found in
 * the plugin's parameters.
 *
 *
 *
 * Class, Weapon, Armor, and State Notetags:
 * 
 * <Break Shields: +x>
 * <Break Shields: -x>
 * x is the increased/decreased amount of Break Shields applied to how
 * much the battler will start with. If you do not use this notetag,
 * then no extra Break Shields will be added.
 *
 * <Protect Element: x>
 * <Protect Elements: x, x, x, x, x>
 * x element will be guarded. A maximum of 100% damage will be dealt to
 * the battler if that element is protected. This will also prevent the
 * Break Shields from reducing for that element. Insert more x's to
 * protect more elements.
 *
 * 
 *
 * 
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 * <BP Battle Start: x%>
 * <BP Battle Start: +x>
 * <BP Battle Start: -x>
 * Changes the amount of BP the battler starts with in battle by a
 * percentage (x%) or by a flat amount (+x or -x);
 *
 * <BP Regen: x%>
 * <BP Regen: +x>
 * <BP Regen: -x>
 * Changes the amount of BP the battler regens each turn in battle by a
 * percentage (x%) or by a flat amount (+x or -x);
 *
 * <Skill Target Change: Self to All>
 * <Item Target Change: Self to All>
 * Changes skills/items with the self scope to become an all scope in battle.
 * Does not affect skills/items with the <Bypass Target Change> notetag.
 *
 * <Skill Target Change Allies: All to One>
 * <Skill Target Change Enemies: All to One>
 * <Item Target Change Allies: All to One>
 * <Item Target Change Enemies: All to One>
 * Changes skills/items with the all allies/enemies scope to become 1 ally/enemy
 * scope in battle. Does not affect skills/items with the <Bypass Target Change>
 * notetag.
 *
 * <Skill Target Change Allies: One to All>
 * <Skill Target Change Enemies: One to All>
 * <Item Target Change Allies: One to All>
 * <Item Target Change Enemies: One to All>
 * Changes skills/items with the 1 ally/enemy scope to become all allies/enemies
 * scope in battle. Does not affect skills/items with the <Bypass Target Change>
 * notetag.
 *
 *
 * 
 *
 * Enemy Notetags:
 *
 * <Show HP Gauge>
 * This will show the enemy's HP gauge by default and ignore the plugin
 * parameter's default settings.
 *
 * <Hide HP Gauge>
 * This will hide the enemy's HP gauge by default and ignore the plugin
 * parameter's default settings.
 *
 * <No HP Gauge>
 * This will hide the enemy's HP gauge no matter what.
 *
 * <Boost Skill x: Full>
 * <Boost skillname: Full>
 * Whenever the enemy uses skill x (or the skillname if you use that),
 * it will use as much BP as it can for the skill when it performs it.
 *
 * <Boost Skill x: At Least y>
 * <Boost skillname: At Least y>
 * Whenever the enemy uses skill x (or the skillname if you use that),
 * it will use BP after reaching y BP and use as much as it can.
 *
 * <Boost Skill x: At Most y>
 * <Boost skillname: At Most y>
 * Whenever the enemy uses skill x (or the skillname if you use that),
 * it will use as much BP as it can unless BP is over y BP.
 *
 *
 *
 *
 * State Notetags:
 *
 * <Boost Sealed>
 * If a battler is affected by a state with this notetag, they cannot boost.
 *
 * <All Element Damage Rate: x%>
 * Makes the battler receive x% multiplier from all elements.
 *
 * <Break Popup>
 * If a battler receives a state with this notetag, the Break Popup will appear.
 * It will take priority over the Weak Popup.
 *
 * <Buff Immunity: x>
 * <Buff Immunity: x, x, x>
 * <Debuff Immunity: x>
 * <Debuff Immunity: x, x, x>
 * Replace x with the parameter ID to make the battler immune to receiving buffs
 * or debuffs of that parameter. This does not remove already applied buffs or
 * debuffs. It only stops the battler from receiving them.
 * 0: Max HP
 * 1: Max MP
 * 2: Attack
 * 3: Defense
 * 4: Magic Attack
 * 5: Magic Defense
 * 6: Agility
 * 7: Luck
 *
 * <Damage Color: r, g, b, a>
 * If the battler receives HP damage while affected by a state with this notetag
 * the popup color will change.
 * r = red (0-255)
 * g = green (0-255)
 * b = blue (0-255)
 * a = alpha (0-255)
 *
 * <Item Seal>
 * If an actor is affected by a state with this notetag, they cannot use items
 * from the actor command menu.
 *
 * <Max Turns: x>
 * Sets the maximum number of turns this state can be to x. This is used for
 * Yanfly's Buffs and States Core if you allow state turn stacking.
 *
 * <No Weak Popup>
 * If the battler is hit with an elemental weakness while affected by a state
 * with this notetag, the Weak popup will not appear.
 *
 * <Physical Follow Up Skill: x>
 * <Magical Follow Up Skill: x>
 * <Certain Follow Up Skill: x>
 * <Follow Up Skill: x>
 * This requires Yanfly's Battle Engine Core to work. This makes the battler
 * affected by this state to perform skill ID x after the current skill is
 * finished being used.
 * Physical - Requires battler to perform physical type skill
 * Magical  - Requires battler to perform magical type skill
 * Certain  - Requires battler to perform certain hit type skill
 * n/a      - Requires battler to perform physical or magical type skill
 *
 * <State Immunity: x>
 * <State Immunity: x, x, x>
 * Insert the IDs of the states that the battler cannot receive if they are
 * affected by a state with this notetag. They do not become resistant to it,
 * meaning if the states have already been applied, they will not suddenly
 * disappear, but they will not be able to be applied until this state is gone.
 *
 *
 *
 * ---------------
 * Action Sequence
 * ---------------
 *
 * If you are using YEP Battle Engine Core, there is an action sequence that
 * lets you switch weapons for the actor in the middle of an action sequence:
 *
 * Weapon Swap: targets, x
 * or
 * Weapon Swap: targets, text
 * or
 * Swap Weapon: targets, x
 * or
 * Swap Weapon: targets, text
 *
 * Use x with the weapon type ID in the Database Type tab. Or use text and
 * replace it with the name of the weapon type. If you use the name of the
 * weapon type, type it out exactly as it is spelled because it is case
 * sensitive.
 *
 *
 *
 * ---------------
 * Plugin Commands
 * ---------------
 *
 * If you want to turn on or off the victory sequence or the music, use these
 * plugin commands:
 *
 * EnableVictoryAftermath
 * DisableVictoryAftermath
 * This turns on or off the victory sequence. This one matches Yanfly's plugin
 * command so you don't have to change your game's plugin command call if you
 * are switching over.
 *
 * EnableVictoryMusic
 * DisableVictoryMusic
 * This turns on or off the victory BGM and ME. This one matches Yanfly's
 * plugin command so you don't have to change your game's plugin command call
 * if you are switching over.
 *
 *
 *
 * ------------
 * Script Calls
 * ------------
 *
 * BattleManager.revealWeakness(x)
 * Replace x with the number of weaknesses that are to be revealed for all
 * enemies in the battle.
 *
 * BattleManager.revealWeaknessByVariable(x)
 * Replace x with the variable ID. The x value determines how many weaknesses
 * are revealed for all enemies in the battle.
 *
 *
 *
 * ----------
 * Text Codes
 * ----------
 *
 * You can put these in a skill or item's help description and it will change
 * the text depending on how much BP the current actor is using.
 *
 * \bpDamage[x]
 * This will apply BP damage multipliers to number x based on the
 * actor's currently used BP amount.
 *
 * \bpTurn[x]
 * This will apply BP turn multipliers to number x based on the
 * actor's currently used BP amount.
 *
 * \bpRepeat[x]
 * This will apply BP repeat multipliers to number x based on the
 * actor's currently used BP amount.
 *
 * \bpAnalyze[x]
 * This will apply BP analyze multipliers to number x based on the
 * actor's currently used BP amount.
 *
 * \bpEffect[x]
 * This will apply BP effect multipliers to number x based on the
 * actor's currently used BP amount.
 *
 * \bp[text]
 * The text inside the brackets won't appear unless
 * at least 1 BP is used.
 *
 * \bp0[text]
 * The text inside the brackets will only appear if
 * no BP is being used.
 *
 * \bp>x[text]
 * The text inside the brackets will only appear if
 * more than x BP is being used.
 *
 * \bp>=x[text]
 * The text inside the brackets will only appear if
 * more than or exactly x BP is being used.
 *
 * \bp=x[text]
 * The text inside the brackets will only appear if
 * exactly x BP is being used.
 *
 * \bp<=x[text]
 * The text inside the brackets will only appear if
 * less than or exactly x BP is being used.
 *
 * \bp<x[text]
 * The text inside the brackets will only appear if
 * less than x BP is being used.
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
 * -------------
 * Compatibility
 * -------------
 *
 * This plugin is compatible with the following plugins:
 *
 * - YEP Core Engine
 * - YEP Battle Engine Core
 * - YEP Action Sequence Packs 1, 2, 3
 * - YEP Animated Sideview Enemies
 * - YEP Counter Control
 * - YEP Battle AI Core
 * - YEP Battle Select Cursor
 * - YEP Buffs & States Core
 * - YEP Damage Core
 * - YEP Element Core
 * - YEP Target Core
 * - YEP Skill Core
 * - YEP Instant Cast
 * - YEP Item Core
 * - YEP Equip Core
 * - YEP Party System
 * - YEP Actor Party Switch
 * - YEP Job Points
 * - YEP Base Troop Events
 * - YEP Swap Enemies
 *
 * Place this plugin under those in the Plugin Manager list. Otherwise, the
 * effects of the plugins under this plugin may not work properly. I am NOT
 * responsible for the compatibility of plugins not shown in the above list.
 *
 * ------------
 * Terms of Use
 * ------------
 * 
 * 1. These plugins may be used in free or commercial games.
 * 2. 'Fallen Angel Olivia' and 'Yanfly' must be given credit in your games.
 * 3. You are allowed to edit the code.
 * 4. Do NOT change the filename, parameters, and information of the plugin.
 * 5. You are NOT allowed to redistribute these Plugins.
 * 6. You may NOT take code for your own released Plugins without credit.
 *
 * -------
 * Credits
 * -------
 *
 * If you are using this plugin, credit the following people:
 * 
 * - Fallen Angel Olivia
 * - Yanfly
 *
 * @param 
 * @param 
 * @param ATTENTION!!!
 * @default READ THE HELP FILE
 * @param 
 * @param 
 *
 * @param Weakness Display
 * @text Weakness Display System
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Weakness Display. Everything under this will be affected.
 * @default true
 *
 * @param Weakness Element Data
 * @text Element Data
 * @parent Weakness Display
 * 
 * @param Shown Elements
 * @parent Weakness Element Data
 * @type number[]
 * @desc This is a list of all the element ID's that are displayed on the list.
 * @default ["1","2","3","4","5","6","7","8","9"]
 *
 * @param Element Icons
 * @parent Weakness Element Data
 * @type number[]
 * @desc Icon ID's used for the "Shown Elements" plugin parameter.
 * @default ["76","64","65","66","67","68","69","70","71"]
 *
 * @param Unknown Weakness Icon
 * @text Unrevealed Icon
 * @parent Weakness Element Data
 * @type number
 * @desc Icon ID used for an unrevealed element
 * @default 16
 *
 * @param Weakness Window Data
 * @text Visual Display
 * @parent Weakness Display
 *
 * @param Weakness Always Show
 * @text Always Show?
 * @parent Weakness Window Data
 * @type boolean
 * @on On
 * @off Off
 * @desc Always show the weakness display? Otherwise, it is hidden until enemy is selected or attacked.
 * @default true
 *
 * @param Weakness Hide Duration
 * @text Hide After Duration
 * @parent Weakness Always Show
 * @type number
 * @desc If the Weakness Display isn't always shown, hide after this many frames of it being visible.
 * @default 180
 *
 * @param Weakness Show Break Shield
 * @text Show Break Shield?
 * @parent Weakness Window Data
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the Break Shield for the enemy?
 * @default true
 *
 * @param Weakness Stun Duration
 * @text Show Stun Duration?
 * @parent Weakness Show Break Shield
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the number of turns left for the Break Stun?
 * @default false
 *
 * @param Weakness Show HP Gauge
 * @text Show HP Gauge?
 * @parent Weakness Window Data
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the HP gauge for the enemy by default?
 * @default true
 *
 * @param HP Gauge Minimum Width
 * @text Minimum Width
 * @parent Weakness Show HP Gauge
 * @type number
 * @desc This is the minimum width of the HP gauge if the gauge is smaller than the enemy name
 * @default 100
 *
 * @param HP Gauge Padding
 * @text Gauge Padding
 * @parent Weakness Show HP Gauge
 * @type number
 * @desc This is how much padding on both sides to give the HP gauge after calculating the width
 * @default 25
 *
 * @param Weakness Show Name
 * @text Show Name?
 * @parent Weakness Window Data
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the name of the enemy?
 * @default true
 *
 * @param Name Font Size
 * @text Font Size
 * @parent Weakness Show Name
 * @number
 * @min 1
 * @desc Font size used for enemy name
 * @default 22
 *
 * @param 50% HP Color
 * @parent Weakness Show Name
 * @type number
 * @desc Text color ID of the name when the enemy is at 50% HP or less.
 * @default 17
 *
 * @param 25% HP Color
 * @parent Weakness Show Name
 * @type number
 * @desc Text color ID of the name when the enemy is at 25% HP or less.
 * @default 2
 *
 * @param Weakness Show States
 * @text Show States?
 * @parent Weakness Window Data
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the states applied to the enemy? Will move the states sprite from the top of the enemy to here
 * @default true
 *
 * @param Small Weakness Icons
 * @parent Weakness Window Data
 * @type boolean
 * @on On
 * @off Off
 * @desc Draw smaller icons?
 * @default true
 *
 * @param Weak Icon Size
 * @parent Small Weakness Icons
 * @desc Rate of how much to shrink the weakness icons.
 * @default 0.6
 *
 * @param
 * @param
 *
 * @param Break Shield System
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Break Shield system. Everything under this will be affected.
 * @default true
 *
 * @param Break Shield Access
 * @text Access
 * @parent Break Shield System 
 *
 * @param Actor Shields
 * @parent Break Shield Access
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Break Shield system for actors
 * @default false
 *
 * @param Draw Menu Shields
 * @text Draw In Menus?
 * @parent Actor Shields
 * @type boolean
 * @on On
 * @off Off
 * @desc If enabled, will draw break shields in the menu where states are drawn.
 * @default true
 *
 * @param Enemy Shields
 * @parent Break Shield Access
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Break Shield system for enemies
 * @default true
 *
 * @param Break Shield Mechanics
 * @text Mechanics
 * @parent Break Shield System 
 *
 * @param Base Shield Value
 * @parent Break Shield Mechanics
 * @type number
 * @min 1
 * @desc The minimum amount of shields a battler can have
 * @default 1
 *
 * @param Break Reduction
 * @parent Break Shield Mechanics
 * @desc The default value of the item or skill when it goes to reduce Break Shield points
 * @default 1
 *
 * @param Element Weakness Rate
 * @parent Break Shield Mechanics
 * @desc The element weakness rate must be greater than this value to break a Break Shield point
 * @default 1.1
 *
 * @param Max Break Shields
 * @parent Break Shield Mechanics
 * @type number
 * @min 1
 * @desc The maximum amount of shields a battler can have
 * @default 99
 *
 * @param Stun State ID
 * @parent Break Shield Mechanics
 * @type state
 * @desc The state ID used for the stun state that is applied when Break Shields reach 0
 * @default 4
 *
 * @param Break Shield Visual
 * @text Visuals
 * @parent Break Shield System 
 *
 * @param Shield Icon
 * @parent Break Shield Visual
 * @type number
 * @min 1
 * @desc The icon ID used for representing Break Shields
 * @default 81
 *
 * @param Stun Icon
 * @parent Break Shield Visual
 * @type number
 * @min 1
 * @desc The icon ID used for representing Break Stun
 * @default 6
 *
 * @param Protect Weakness Icon
 * @parent Break Shield Visual
 * @type number
 * @min 1
 * @desc The icon ID used for representing a protected weakness. Protect Weakness Icon will be drawn on top of lower icon
 * @default 81
 *
 * @param Reduce Animation
 * @parent Break Shield Visual
 * @type animation
 * @desc The animation ID used for the moment an enemy's Break Shields is reduced. Use 0 for no animation.
 * @default 2
 *
 * @param Break Animation
 * @parent Break Shield Visual
 * @type animation
 * @desc The animation ID used for the moment an enemy's Break Shields reach 0. Use 0 for no animation.
 * @default 56
 *
 * @param Icon Font Size
 * @parent Break Shield Visual
 * @type number
 * @min 1
 * @desc The font size of the text used to display the shields left or duration of the turn.
 * @default 22
 *
 * @param Show Actor Shields
 * @parent Break Shield Visual
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the actor shields next to their name in the status window?
 * @default true
 *
 * @param Show Enemy Shields
 * @parent Break Shield Visual
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the enemy shields next to their name in the target window?
 * @default true
 *
 * @param
 * @param
 *
 * @param Boost Point System
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Boost Point system. Everything under this will be affected.
 * @default true
 *
 * @param Boost Point Battle Control
 * @text Battle Control
 * @parent Boost Point System 
 *
 * @param Boost Point Boost Command
 * @text Boost Command
 * @parent Boost Point Battle Control
 * @desc How command for how Boost is displayed
 * @default Boost
 *
 * @param Boost Point Boost Command Show
 * @text Show Command?
 * @parent Boost Point Boost Command
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the Boost Command in the Actor Command Window?
 * @default true
 *
 * @param Boost Point Unboost Command
 * @text Unboost Command
 * @parent Boost Point Battle Control
 * @desc How command for how Unboost is displayed
 * @default Unboost
 *
 * @param Boost Point Unboost Command Show
 * @text Show Command?
 * @parent Boost Point Unboost Command
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the Unboost Command in the Actor Command Window?
 * @default true
 *
 * @param Boost Point LR Buttons
 * @text Use L and R Buttons?
 * @parent Boost Point Battle Control
 * @type boolean
 * @on On
 * @off Off
 * @desc Use L and R buttons (Q and W keys) to control boosting?
 * @default true
 *
 * @param Boost Point Mechanics
 * @text Mechanics
 * @parent Boost Point System 
 *
 * @param Boost Point Start Battle
 * @text Start Battle BP
 * @parent Boost Point Mechanics
 * @type number
 * @desc The amount of BP battlers start each battle with
 * @default 1
 *
 * @param Boost Point Regen
 * @text Regen BP
 * @parent Boost Point Mechanics
 * @type number
 * @desc The amount of BP battlers regenerate each turn
 * @default 1
 *
 * @param Boost Point Always Regen
 * @text Always Regenerate
 * @parent Boost Point Regen
 * @type boolean
 * @on On
 * @off Off
 * @desc Always regenerate BP. Otherwise, regenerate BP when BP wasn't used that turn.
 * @default false
 *
 * @param Boost Point Maximum Stored
 * @text Max Stored BP
 * @parent Boost Point Mechanics
 * @type number
 * @desc The most amount of BP a battler can hold onto at any time
 * @default 5
 *
 * @param Boost Point Maximum Use
 * @text Max Used BP
 * @parent Boost Point Mechanics
 * @type number
 * @desc The most amount of BP a battler can use at once.
 * @default 3
 *
 * @param Boost Point Death Removal
 * @text Death Removal
 * @parent Boost Point Mechanics
 * @type boolean
 * @on On
 * @off Off
 * @desc Remove all BP upon death?
 * @default true
 *
 * @param Boost Point Death Regen
 * @text Death Regen
 * @parent Boost Point Mechanics
 * @type boolean
 * @on On
 * @off Off
 * @desc Can regen BP while dead or hidden?
 * @default false
 *
 * @param Boost Point Multipliers
 * @text Multipliers
 * @parent Boost Point System 
 *
 * @param Boost Point Damage Multipliers
 * @text Damage Multipliers
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The multipliers for each BP used from 0 to max. This is the percentage of the multiplier.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0"]
 *
 * @param Boost Point Damage Addition
 * @text Damage Addition
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The addition for each BP used from 0 to max. This is the integer version of the bonus.
 * @default ["0","0","0","0","0","0","0","0","0","0"]
 *
 * @param Boost Point Repeat Multipliers
 * @text Repeat Multipliers
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The multipliers for each BP used from 0 to max. This is the percentage of the multiplier.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0"]
 *
 * @param Boost Point Repeat Addition
 * @text Repeat Addition
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The addition for each BP used from 0 to max. This is the integer version of the bonus.
 * @default ["0","0","0","0","0","0","0","0","0","0"]
 *
 * @param Boost Point Turn Multipliers
 * @text Turn Multipliers
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The multipliers for each BP used from 0 to max. This is the percentage of the multiplier.
 * @default ["1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0"]
 *
 * @param Boost Point Turn Addition
 * @text Turn Addition
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The addition for each BP used from 0 to max. This is the integer version of the bonus.
 * @default ["0","2","4","6","8","10","12","14","16","18"]
 *
 * @param Boost Point Analyze Multipliers
 * @text Analyze Multipliers
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The multipliers for each BP used from 0 to max. This is the percentage of the multiplier.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0"]
 *
 * @param Boost Point Analyze Addition
 * @text Analyze Addition
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The addition for each BP used from 0 to max. This is the integer version of the bonus.
 * @default ["0","0","0","0","0","0","0","0","0","0"]
 *
 * @param Boost Point BP Effect Multipliers
 * @text BP Effect Multipliers
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The multipliers for each BP used from 0 to max. This is the percentage of the multiplier.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0"]
 *
 * @param Boost Point BP Addition
 * @text BP Addition
 * @parent Boost Point Multipliers
 * @type string[]
 * @desc The addition for each BP used from 0 to max. This is the integer version of the bonus.
 * @default ["0","0","0","0","0","0","0","0","0","0"]
 *
 * @param Boost Point Visuals
 * @text Visuals
 * @parent Boost Point System 
 *
 * @param Boost Point Animations
 * @text Animations
 * @parent Boost Point Visuals
 * @type animation[]
 * @desc Choose animations to play when changing to different levels of BP
 * @default ["12","13","15","14","2","51","52","53","67","66"]
 *
 * @param Boost Point Show Icons
 * @text Show Icons?
 * @parent Boost Point Visuals
 * @type boolean
 * @on On
 * @off Off
 * @desc Show boost point icons in the party status menu in battle?
 * @default true
 *
 * @param Boost Point Icon Filled
 * @text Boost Icon
 * @parent Boost Point Show Icons
 * @type number
 * @desc Icon ID used to represent a Boost slot
 * @default 160
 *
 * @param Boost Point Icon Empty
 * @text Empty Icon
 * @parent Boost Point Show Icons
 * @type number
 * @desc Icon ID used to represent an empty slot
 * @default 161
 *
 * @param Small Boost Icons
 * @parent Boost Point Show Icons
 * @type boolean
 * @on On
 * @off Off
 * @desc Draw smaller icons?
 * @default true
 *
 * @param Boost Icon Size
 * @parent Small Boost Icons
 * @desc Rate of how much to shrink the Boost icons
 * @default 0.5
 *
 * @param Boost Point Small Text
 * @text Text
 * @parent Small Boost Icons
 * @desc Text used to accompany small Boost icons
 * @default Boost
 *
 * @param Boost Point Small Text Align
 * @text Text Alignment
 * @parent Small Boost Icons
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment used for the small Boost text
 * @default right
 *
 * @param
 * @param
 *
 * @param Weapon Swap System
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Weapon Swap System. Everything under this will be affected.
 * @default true
 *
 * @param Weapon Swap Battle Control
 * @text Battle Control
 * @parent Weapon Swap System 
 *
 * @param Weapon Swap Command
 * @text Swap Command
 * @parent Weapon Swap Battle Control
 * @desc How command for how Weapon Swap is displayed
 * @default WpnSwap
 *
 * @param Weapon Swap Show Command
 * @text Show Command?
 * @parent Weapon Swap Command
 * @type boolean
 * @on On
 * @off Off
 * @desc Show the Weapon Swap Command in the Actor Command Window?
 * @default false
 *
 * @param Weapon Swap Arrow Buttons
 * @text Use Arrow Swapping?
 * @parent Weapon Swap Battle Control
 * @type boolean
 * @on On
 * @off Off
 * @desc Use Arrow Keys to control weapon swapping?
 * @default true
 *
 * @param Weapon Swap Show Arrows
 * @text Show Swap Arrows?
 * @parent Weapon Swap Battle Control
 * @type boolean
 * @on On
 * @off Off
 * @desc Show arrows on the attack command?
 * @default true
 *
 * @param Weapon Swap Battle Test
 * @text Battle Test Weapons
 * @parent Weapon Swap Battle Control
 * @type boolean
 * @on On
 * @off Off
 * @desc In battle test, give all party members a copy of each weapon?
 * @default true
 *
 * @param Weapon Swap Visual
 * @text Visuals
 * @parent  Weapon Swap System
 *
 * @param Weapon Swap Battle Icons
 * @text Show Battle Icons
 * @parent Weapon Swap Visual
 * @type boolean
 * @on On
 * @off Off
 * @desc Show icons of currently equipped weapons in battle?
 * @default true
 *
 * @param Weapon Swap Battle Action
 * @text Show Battle Action
 * @parent Weapon Swap Visual
 * @type boolean
 * @on On
 * @off Off
 * @desc Show animation of actor switching weapons? Sideview only
 * @default true
 *
 * @param Weapon Swap Equip Core Window
 * @text Extend Equip Stat Window
 * @parent Weapon Swap Visual
 * @type boolean
 * @on On
 * @off Off
 * @desc Require Yanfly's Equip Core. Extend the stat compare window
 * @default true
 *
 * @param Weapon Swap Text Hit
 * @text Text Hit Rate
 * @parent Weapon Swap Equip Core Window
 * @desc How to display this extra parameter
 * @default ACC
 *
 * @param Weapon Swap Text Evasion
 * @text Text Evasion
 * @parent Weapon Swap Equip Core Window
 * @desc How to display this extra parameter
 * @default EVA
 *
 * @param Weapon Swap Text Critical
 * @text Text Critical
 * @parent Weapon Swap Equip Core Window
 * @desc How to display this extra parameter
 * @default CRI
 *
 * @param
 * @param
 *
 * @param Side Battle UI
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Side Battle UI
 * @default true
 *
 * @param Warning Side Battle UI
 * @text !!!!! WARNING !!!!!
 * @parent Side Battle UI
 * @default Requires YEP_BattleEngineCore
 *
 * @param Side UI Position Sprites
 * @text Position Sprites
 * @parent Side Battle UI
 *
 * @param Side Battle Position Actors
 * @text Position Actors
 * @parent Side UI Position Sprites
 * @type boolean
 * @on On
 * @off Off
 * @desc Position actor sprites on the screen using the formula below?
 * @default true
 *
 * @param Side Battle Actor X
 * @text Formula for X
 * @parent Side Battle Position Actors
 * @desc Formula used for X screen position
 * @default Graphics.boxWidth * 0.5 + 128 + index * 64
 *
 * @param Side Battle Actor Y
 * @text Formula for Y
 * @parent Side Battle Position Actors
 * @desc Formula used for Y screen position
 * @default Graphics.boxHeight - 128 - ($gameParty.maxBattleMembers() - index - 1) * 48
 *
 * @param Side Battle Position Enemies
 * @text Position Enemies
 * @parent Side UI Position Sprites
 * @type boolean
 * @on On
 * @off Off
 * @desc Position enemy sprites on the screen using the formula below?
 * @default true
 *
 * @param Side Battle Enemy X
 * @text Formula for X
 * @parent Side Battle Position Enemies
 * @desc Formula used for X screen position
 * @default x
 *
 * @param Side Battle Enemy Y
 * @text Formula for Y
 * @parent Side Battle Position Enemies
 * @desc Formula used for Y screen position
 * @default Graphics.boxHeight - 444 - 128 + y
 *
 * @param Side UI Status Window
 * @text Status Window
 * @parent Side Battle UI
 *
 * @param Side Battle Ceiling Distance
 * @text Ceiling Distance
 * @parent Side UI Status Window
 * @type number
 * @desc How many pixels from the top of the screen to leave as room for the status windows?
 * @default 0
 *
 * @param Side Battle Gauge Height
 * @text Gauge Height
 * @parent Side UI Status Window
 * @type number
 * @desc How high should the gauges of the windows be pixels
 * @default 6
 *
 * @param Side Battle Gauge Width
 * @text Gauge Width
 * @parent Side UI Status Window
 * @type number
 * @desc How wide should the gauges of the windows be in pixels
 * @default 160
 *
 * @param Side Battle Status Move Active
 * @text Move Distance: Active
 * @parent Side UI Status Window
 * @type number
 * @desc Move the status window this many pixels when the battler is the active battler
 * @default 48
 *
 * @param Side Battle Status Move Selected
 * @text Move Distance: Selected
 * @parent Side UI Status Window
 * @type number
 * @desc Move the status window this many pixels when the battler is selected for a skill or item target
 * @default 24
 *
 * @param Side Battle Status Move Speed
 * @text Move Distance: Speed
 * @parent Side UI Status Window
 * @type number
 * @desc The move speed for the window when animating
 * @default 4
 *
 * @param Side Battle Status States Max
 * @text States Max
 * @parent Side UI Status Window
 * @type number
 * @desc Maximum number of states to draw on the status windows
 * @default 4
 *
 * @param Side Battle Status Scale
 * @text Window Scale
 * @parent Side UI Status Window
 * @desc Scale the size of the contents of the status windows down by this much
 * @default 0.6
 *
 * @param Side Battle Status Width
 * @text Window Width
 * @parent Side UI Status Window
 * @type number
 * @desc How wide should the status windows be on the screen
 * @default 200
 *
 * @param Side UI Window Settings
 * @text Window Settings
 * @parent Side Battle UI
 *
 * @param Side Battle Dim Help Window
 * @text Dim Help Window
 * @parent Side UI Window Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Dim the help window background
 * @default true
 *
 * @param Side Battle Command Window Width
 * @text Command Window Width
 * @parent Side UI Window Settings
 * @type number
 * @min 1
 * @desc Width in pixels for battle command windows
 * @default 160
 *
 * @param Side Battle List Window Max
 * @text List Window Rows
 * @parent Side UI Window Settings
 * @type number
 * @min 1
 * @desc Maximum number of rows to use for each of the list windows
 * @default 8
 *
 * @param Side Battle List Window Width
 * @text List Window Width
 * @parent Side UI Window Settings
 * @type number
 * @min 1
 * @desc Width in pixels for battle list windows
 * @default 320
 *
 * @param Side Battle Command Window Scale
 * @text Window Scale
 * @parent Side UI Window Settings
 * @desc Scale the size of the contents of the command and list windows down by this much
 * @default 0.8
 *
 * @param Side Battle Window Masking
 * @text Window Masking Effect
 * @parent Side Battle UI
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the window masking effect
 * @default false
 *
 * @param
 * @param
 *
 * @param Victory Screen UI
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Victory Screen UI. Everything under this will be affected.
 * @default true
 *
 * @param Victory Screen Audio
 * @text Audio
 * @parent Victory Screen UI
 *
 * @param Victory Screen Level Sound
 * @text Level Sound
 * @parent Victory Screen Audio
 * @type file
 * @dir audio/se/
 * @desc Filename for the sound effect used when a level up occurs
 * @default Skill2
 *
 * @param Victory Screen Level Sound Volume
 * @text Volume
 * @parent Victory Screen Level Sound
 * @type number
 * @desc Volume of this sound effect
 * @default 90
 *
 * @param Victory Screen Level Sound Pitch
 * @text Pitch
 * @parent Victory Screen Level Sound
 * @type number
 * @desc Pitch of this sound effect
 * @default 100
 *
 * @param Victory Screen Level Sound Pan
 * @text Pan
 * @parent Victory Screen Level Sound
 * @type number
 * @desc Pan of this sound effect
 * @default 0
 *
 * @param Victory Screen BGM
 * @text BGM
 * @parent Victory Screen Audio
 * @type file
 * @dir audio/bgm/
 * @desc Filename for the BGM used during the victory sequence
 * @default Ship3
 *
 * @param Victory Screen BGM Volume
 * @text Volume
 * @parent Victory Screen BGM
 * @type number
 * @desc Volume of this sound effect
 * @default 90
 *
 * @param Victory Screen BGM Pitch
 * @text Pitch
 * @parent Victory Screen BGM
 * @type number
 * @desc Pitch of this sound effect
 * @default 100
 *
 * @param Victory Screen BGM Pan
 * @text Pan
 * @parent Victory Screen BGM
 * @type number
 * @desc Pan of this sound effect
 * @default 0
 *
 * @param Victory Screen Transition
 * @text Transition
 * @parent Victory Screen UI
 *
 * @param Victory Screen Transition Power
 * @text Transition Power
 * @parent Victory Screen Transition
 * @type number
 * @min 1
 * @desc Transition power when entering victory sequence. Use higher numbers to make transition faster.
 * @default 8
 *
 * @param Victory Screen Hide Window Delay
 * @text Hide Window Delay
 * @parent Victory Screen Transition
 * @type number
 * @desc Milliseconds used to wait before hiding the status windows
 * @default 500
 *
 * @param Victory Screen Display Delay
 * @text Display Delay
 * @parent Victory Screen Transition
 * @type number
 * @desc Milliseconds used to wait before showing the display
 * @default 1000
 *
 * @param Victory Screen Zoom
 * @text Zoom?
 * @parent Victory Screen Transition
 * @type boolean
 * @on On
 * @off Off
 * @desc Zoom in to the party during the transition?
 * @default true
 *
 * @param Victory Screen Zoom X
 * @text X
 * @parent Victory Screen Zoom
 * @type number
 * @desc X coordinate to zoom in at
 * @default 700
 *
 * @param Victory Screen Zoom Y
 * @text Y
 * @parent Victory Screen Zoom
 * @type number
 * @desc Y coordinate to zoom in at
 * @default 460
 *
 * @param Victory Screen Zoom Scale
 * @text Scale
 * @parent Victory Screen Zoom
 * @desc Scale to zoom in at
 * @default 2.0
 *
 * @param Victory Screen Zoom Duration
 * @text Duration
 * @parent Victory Screen Zoom
 * @type number
 * @desc Duration in frames for the whole zoom
 * @default 300
 *
 * @param Victory Screen Background
 * @text Background
 * @parent Victory Screen UI
 *
 * @param Victory Screen Background Dimmer Height
 * @text Dim Start Rate
 * @parent Victory Screen Background
 * @desc The veritcal portion of the screen to start dimming at
 * @default 0.2
 *
 * @param Victory Screen Background Side Thickness
 * @text Side Thickness
 * @parent Victory Screen Background
 * @type number
 * @desc Amount of distance between the side of the screen and the contents
 * @default 96
 *
 * @param Victory Screen Background Middle Thickness
 * @text Middle Thickness
 * @parent Victory Screen Background
 * @type number
 * @desc Amount of distance between content in the middle of the screen
 * @default 96
 *
 * @param Victory Screen Background Text Items
 * @text Item Reward Text
 * @parent Victory Screen Background
 * @desc Text used to display the items received from battle
 * @default Items Obtained
 *
 * @param Victory Screen Background Text Items Font Size
 * @text Font Size
 * @parent Victory Screen Background Text Items
 * @type number
 * @min 1
 * @desc Font size used for Item Reward Text
 * @default 36
 *
 * @param Victory Screen Background Text Victory
 * @text Victory Text
 * @parent Victory Screen Background
 * @desc Text to display for Victory screen title
 * @default Victory!
 *
 * @param Victory Screen Background Text Victory Font Size
 * @text Font Size
 * @parent Victory Screen Background Text Victory
 * @type number
 * @min 1
 * @desc Font size used for Victory Text
 * @default 60
 *
 * @param Victory Screen Rewards
 * @text Rewards
 * @parent Victory Screen Background
 *
 * @param Victory Screen Rewards Category Font Size
 * @text Category Font Size
 * @parent Victory Screen Rewards
 * @type number
 * @min 1
 * @desc Font size used for reward categories
 * @default 20
 *
 * @param Victory Screen Rewards Category Font Color
 * @text Category Font Color
 * @parent Victory Screen Rewards
 * @type number
 * @desc Text color used for reward categories
 * @default 8
 *
 * @param Victory Screen Rewards Results Font Size
 * @text Results Font Size
 * @parent Victory Screen Rewards
 * @type number
 * @min 1
 * @desc Font size used for reward results
 * @default 28
 *
 * @param Victory Screen Rewards Results Font Color
 * @text Results Font Color
 * @parent Victory Screen Rewards
 * @type number
 * @desc Text color used for reward results
 * @default 0
 *
 * @param Victory Screen Status Windows
 * @text Status Windows
 * @parent Victory Screen UI
 *
 * @param Victory Screen Status Actor Font Size
 * @text Actor Name Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size used for actor names
 * @default 20
 *
 * @param Victory Screen Status Level Font Size
 * @text Level Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size used for levels
 * @default 20
 *
 * @param Victory Screen Status Level Format
 * @text Level Format
 * @parent Victory Screen Status Windows
 * @desc Text format used for levels. %1 is 
 * @default Lv.%1
 *
 * @param Victory Screen Status JP Font Size
 * @text JP Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size used for JP
 * @default 16
 *
 * @param Victory Screen Status EXP Font Size
 * @text EXP Label Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size used for the EXP label
 * @default 16
 *
 * @param Victory Screen Status Update Duration
 * @text Update Duration
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Duration in frames for updating actors in the status windows
 * @default 180
 *
 * @param Victory Screen Status Current EXP Font Size
 * @text Current EXP Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size for current EXP
 * @default 20
 *
 * @param Victory Screen Status Current EXP Font Color
 * @text Current EXP Font Color
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Text color for current EXP
 * @default 0
 *
 * @param Victory Screen Status Next EXP Font Size
 * @text Next EXP Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size for next level's EXP
 * @default 18
 *
 * @param Victory Screen Status Next EXP Font Color
 * @text Next EXP Font Color
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Font color for next level's EXP
 * @default 8
 *
 * @param Victory Screen Status Exp Gauge Height
 * @text Gauge Height
 * @parent Victory Screen Status Windows
 * @type number
 * @min 3
 * @desc Height for EXP gauge
 * @default 18
 *
 * @param Victory Screen Status Exp Gauge Color 1
 * @text Gauge Color 1
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Text color 1 for EXP gauge
 * @default 30
 *
 * @param Victory Screen Status Exp Gauge Color 2
 * @text Gauge Color 2
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Text color 2 for EXP gauge
 * @default 31
 *
 * @param Victory Screen Status Level Up Text
 * @text Level Up Text
 * @parent Victory Screen Status Windows
 * @desc Text to display when a level is reached
 * @default Level Up!
 *
 * @param Victory Screen Status Level Up Font Size
 * @text Level Up Font Size
 * @parent Victory Screen Status Windows
 * @type number
 * @min 1
 * @desc Font size for Level Up Text
 * @default 36
 *
 * @param Victory Screen Status Level Up Color
 * @text Level Up Font Color
 * @parent Victory Screen Status Windows
 * @type number
 * @desc Text color for Level Up Text
 * @default 17
 *
 * @param Victory Screen Continue Button
 * @text Continue Button
 * @parent Victory Screen UI
 *
 * @param Victory Screen Continue Duration
 * @text Duration
 * @parent Victory Screen Continue Button
 * @type number
 * @min 1
 * @desc Duration in frames to wait before continue button appears
 * @default 180
 *
 * @param Victory Screen Continue Text
 * @text Text
 * @parent Victory Screen Continue Button
 * @desc Text to display to show at the bottom of the screen when ready to exit battle
 * @default Press \c[27]Z\c[0] or \c[27]X\c[0] to continue
 *
 * @param 
 * @param 
 *
 * @param Battle Effects Pack
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Battle Effects Pack. Everything under this will be affected.
 * @default true
 *
 * @param Battle Effects Weak Popups
 * @text Weak Popups
 * @parent Battle Effects Pack
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Weak Popups
 * @default true
 *
 * @param Battle Effects Weak Popup Require Rate
 * @text Required Rate
 * @parent Battle Effects Weak Popups
 * @desc Required rate of elemental damage for weak popup to appear
 * @default 1.1
 *
 * @param Battle Effects Weak Popup Cell X
 * @text Cell X
 * @parent Battle Effects Weak Popups
 * @type number
 * @desc Starting cell column for X
 * @default 4
 *
 * @param Battle Effects Weak Popup Cell Width
 * @text Cell Width
 * @parent Battle Effects Weak Popups
 * @type number
 * @desc Number of cells for this popup's width
 * @default 3
 *
 * @param Battle Effects Weak Popup Cell X Factor
 * @text X Factor
 * @parent Battle Effects Weak Popups
 * @desc Rate of buffer for the popup's X position
 * @default 0.25
 *
 * @param Battle Effects Weak Popup Cell Y Factor
 * @text Y Factor
 * @parent Battle Effects Weak Popups
 * @desc Rate of buffer for the popup's Y position
 * @default 0.60
 *
 * @param Battle Effects Weak Popup Move X Base
 * @text Move X Base
 * @parent Battle Effects Weak Popups
 * @desc Base horizontal movement of the popup
 * @default -0.04
 *
 * @param Battle Effects Weak Popup Move X Rate
 * @text Move X Rate
 * @parent Battle Effects Weak Popups
 * @desc Rate of change for horizontal movement
 * @default 1.1
 *
 * @param Battle Effects Weak Popup Move Y Base
 * @text Move Y Base
 * @parent Battle Effects Weak Popups
 * @desc Base vertical movement of the popup
 * @default 0
 *
 * @param Battle Effects Weak Popup Move Y Rate
 * @text Move Y Rate
 * @parent Battle Effects Weak Popups
 * @desc Rate of change for vertical movement
 * @default 0
 *
 * @param Battle Effects Break Popups
 * @text Break Popups
 * @parent Battle Effects Pack
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Break Popups
 * @default true
 *
 * @param Battle Effects Break Popup Cell X
 * @text Cell X
 * @parent Battle Effects Break Popups
 * @type number
 * @desc Starting cell column for X
 * @default 7
 *
 * @param Battle Effects Break Popup Cell Width
 * @text Cell Width
 * @parent Battle Effects Break Popups
 * @type number
 * @desc Number of cells for this popup's width
 * @default 3
 *
 * @param Battle Effects Break Popup Cell X Factor
 * @text X Factor
 * @parent Battle Effects Break Popups
 * @desc Rate of buffer for the popup's X position
 * @default 0.25
 *
 * @param Battle Effects Break Popup Cell Y Factor
 * @text Y Factor
 * @parent Battle Effects Break Popups
 * @desc Rate of buffer for the popup's Y position
 * @default 0.60
 *
 * @param Battle Effects Break Popup Move X Base
 * @text Move X Base
 * @parent Battle Effects Break Popups
 * @desc Base horizontal movement of the popup
 * @default -0.04
 *
 * @param Battle Effects Break Popup Move X Rate
 * @text Move X Rate
 * @parent Battle Effects Break Popups
 * @desc Rate of change for horizontal movement
 * @default 1.1
 *
 * @param Battle Effects Break Popup Move Y Base
 * @text Move Y Base
 * @parent Battle Effects Break Popups
 * @desc Base vertical movement of the popup
 * @default 0
 *
 * @param Battle Effects Break Popup Move Y Rate
 * @text Move Y Rate
 * @parent Battle Effects Break Popups
 * @desc Rate of change for vertical movement
 * @default 0
 *
 * @param Stacking Buff/Debuffs
 * @parent Battle Effects Pack
 *
 * @param Battle Effects Stack Buff Turns
 * @text Stack Buff Turns
 * @parent Stacking Buff/Debuffs
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable stacking buff turns
 * @default true
 *
 * @param Battle Effects Max Buff Turns
 * @text Max Buff Turns
 * @parent Battle Effects Stack Buff Turns
 * @desc Max number of turns for stacking buffs
 * @default 9
 *
 * @param Battle Effects Stack Debuff Turns
 * @text Stack Debuff Turns
 * @parent Stacking Buff/Debuffs
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable stacking debuff turns
 * @default true
 *
 * @param Battle Effects Max Debuff Turns
 * @text Max Debuff Turns
 * @parent Battle Effects Stack Debuff Turns
 * @desc Max number of turns for stacking debuffs
 * @default 9
 *
 * @param
 * @param
 *
 * @param Order Turn Battle
 * @type boolean
 * @on On
 * @off Off
 * @desc Enable or disable the Order Turn Battle System. Everything under this will be affected.
 * @default true
 *
 * @param Warning OTB 
 * @text !!!!! WARNING !!!!!
 * @parent Order Turn Battle
 * @default Requires YEP_BattleEngineCore
 *
 * @param OTB Force Battle System
 * @text Force Battle System?
 * @parent Order Turn Battle
 * @type boolean
 * @on On
 * @off Off
 * @desc Forces the OTB battle system no matter what your Battle Engine Core setting is.
 * @default true
 *
 * @param OTB Mechancs
 * @text Mechanics
 * @parent Order Turn Battle
 *
 * @param OTB Mechanics Action Speed Convert
 * @text Action Speed Convert
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Converts action speed into a <OTB User Next Turn: +x> notetag for items and skills
 * @default true
 *
 * @param OTB Mechanics Buff Debuff AGI Convert
 * @text Buff/Debuff AGI Convert
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Convert AGI buffs/debuffs into <OTB Target Next Turn: +x> notetag for items and skills
 * @default true
 *
 * @param OTB Mechanics Added Action Times
 * @text Added Action Times
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Allow Added Action Times in this battle system?
 * @default true
 *
 * @param OTB Mechanics Action Time Order Randomize
 * @text Randomize Position
 * @parent OTB Mechanics Added Action Times
 * @type boolean
 * @on On
 * @off Off
 * @desc Randomize the positions of newly added actions in the turn order after the first initial position?
 * @default true
 *
 * @param OTB Mechanics Enable Party Window
 * @text Enable Party Window?
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Gives access to the Party Command Window (Fight/Escape window)
 * @default false
 *
 * @param OTB Mechanics Escape Actor Window
 * @text Escape in Actor Window
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Add the Escape command in the actor window?
 * @default true
 *
 * @param OTB Mechanics Remove Restrict Current
 * @text Current Turn Wakeup
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Add battlers back to the current turn's order when they wake up from a restriction state?
 * @default true
 *
 * @param OTB Mechanics Remove Restrict Next
 * @text Next Turn Wakeup
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc Add battlers back to the next turn's order when they wake up from a restriction state?
 * @default true
 *
 * @param OTB Mechanics Static AGI Calculation
 * @text Static AGI Calculation
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc If on, calculate speed on static AGI. If off, calculate speed on random AGI.
 * @default true
 *
 * @param OTB Mechanics Stun Wakeup First
 * @text Stun Wakeup First
 * @parent OTB Mechancs
 * @type boolean
 * @on On
 * @off Off
 * @desc If on, when waking up from a stun, be first in position on the next turn
 * @default true
 *
 * @param OTB Mechanics Stun Wakeup Clamp
 * @text Clamp Turn Effects
 * @parent OTB Mechanics Stun Wakeup First
 * @type boolean
 * @on On
 * @off Off
 * @desc Prevent others from going past waking battlers for turn manipulation effects
 * @default true
 *
 * @param OTB Visuals
 * @text Visuals
 * @parent Order Turn Battle
 *
 * @param OTB Sprite Background Colors
 * @text Sprite Background Colors
 * @parent OTB Visuals
 *
 * @param OTB Background Actor Color
 * @text Actors
 * @parent OTB Sprite Background Colors
 * @desc Background color used for actors in the turn order
 * @default rgba(128, 160, 255, 0.6)
 *
 * @param OTB Background Enemy Color
 * @text Enemies
 * @parent OTB Sprite Background Colors
 * @desc Background color used for enemies in the turn order
 * @default rgba(255, 100, 80, 0.6)
 *
 * @param OTB Turn Order Display
 * @text Turn Order Display
 * @parent OTB Visuals
 *
 * @param OTB Display X
 * @text Display X
 * @parent OTB Turn Order Display
 * @type number
 * @desc The x position of the Turn Order Display
 * @default 48
 *
 * @param OTB Display Y
 * @text Display Y
 * @parent OTB Turn Order Display
 * @type number
 * @desc The y position of the Turn Order Display
 * @default 18
 *
 * @param OTB Display Help Window Move Y
 * @text Move to Y (During)
 * @parent OTB Turn Order Display
 * @type number
 * @desc Move to this Y position when Help Window is open
 * @default 18
 *
 * @param OTB Display Help Window Move Speed
 * @text Move Speed (During)
 * @parent OTB Turn Order Display
 * @type number
 * @desc Move speed when Help Window is open
 * @default 16
 *
 * @param OTB Display Current Text
 * @text Current Turn Text
 * @parent OTB Turn Order Display
 * @desc Text to display for current turn
 * @default CURRENT
 *
 * @param OTB Display Current Size
 * @text Font Size
 * @parent OTB Display Current Text
 * @type number
 * @desc Font size for current turn text
 * @default 20
 *
 * @param OTB Display Next Text
 * @text Next Turn Text
 * @parent OTB Turn Order Display
 * @desc Text to display for next turn
 * @default NEXT
 *
 * @param OTB Display Next Size
 * @text Font Size
 * @parent OTB Display Next Text
 * @type number
 * @desc Font size for next turn text
 * @default 20
 *
 * @param OTB Sprite Properties
 * @text Sprite Properties
 * @parent OTB Visuals
 *
 * @param OTB Sprite Move Duration
 * @text Move Duration
 * @parent OTB Sprite Properties
 * @type number
 * @min 1
 * @desc Number of frames to move the sprite
 * @default 20
 *
 * @param OTB Sprite Opacity Speed
 * @text Opacity Speed
 * @parent OTB Sprite Properties
 * @type number
 * @min 1
 * @desc How fast the sprite changes its opacity
 * @default 16
 *
 * @param OTB Battle Scene Properties
 * @text Battle Scene
 * @parent OTB Visuals
 *
 * @param OTB Help Window Y
 * @text Help Window Y
 * @parent OTB Battle Scene Properties
 * @type number
 * @desc Y coordinate of the help window
 * @default 92
 *
 * @param OTB Log Window Y
 * @text Log Window Y
 * @parent OTB Battle Scene Properties
 * @type number
 * @desc Y coordinate of the log window
 * @default 92
 *
 * @param
 * @param
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.Olivia_OctoBattle = true;

var Olivia = Olivia || {};
Olivia.OctoBattle = Olivia.OctoBattle || {};

var parameters = $plugins.filter(function(p) { return p.description.contains('<OctoBattle>') })[0].parameters;

Olivia.OctoBattle.WeaknessDisplay = {
    Enabled: eval(parameters['Weakness Display']),
    // Element Data
    ShownElements: JSON.parse(parameters['Shown Elements']),
    ElementIcons:  JSON.parse(parameters['Element Icons']),
    UnknownIcon:   Number(parameters['Unknown Weakness Icon']),
    // Window
    AlwaysShow:      eval(parameters['Weakness Always Show']),
    HideDuration:    Number(parameters['Weakness Hide Duration'] || 90),
    ShowBreakShield: eval(parameters['Weakness Show Break Shield']),
    ShowStunTurns:   eval(parameters['Weakness Stun Duration']),
    ShowHpGauge:     eval(parameters['Weakness Show HP Gauge']),
    HpGaugeMinWidth: Number(parameters['HP Gauge Minimum Width'] || 100),
    HpGaugePadding:  Number(parameters['HP Gauge Padding'] || 100),
    ShowName:        eval(parameters['Weakness Show Name']),
    NameFontSize:    Number(parameters['Name Font Size'] || 22),
    HpColor50:       Number(parameters['50% HP Color'] || 17),
    HpColor25:       Number(parameters['25% HP Color'] || 18),
    ShowStates:      eval(parameters['Weakness Show States'] || 'true'),
    SmallWeakIcons:  eval(parameters['Small Weakness Icons']),
    WeakIconSize:    Number(parameters['Weak Icon Size'] || 0.6)
};

Olivia.OctoBattle.BreakShield = {
    Enabled: eval(parameters['Break Shield System']),
    // Access
    Actors:   eval(parameters['Actor Shields']),
    DrawMenu: eval(parameters['Draw Menu Shields']),
    Enemies:  eval(parameters['Enemy Shields']),
    // Mechanics
    BaseShields: Number(parameters['Base Shield Value'] || 0),
    BreakReduce: Number(parameters['Break Reduction'] || 1),
    MaxShields:  Number(parameters['Max Break Shields'] || 99),
    StunState:   Number(parameters['Stun State ID'] || 1),
    WeakRate:    Number(parameters['Element Weakness Rate'] || 1.1),
    // Visuals
    ShieldIcon:      Number(parameters['Shield Icon'] || 81),
    StunIcon:        Number(parameters['Stun Icon'] || 6),
    ProtectIcon:     Number(parameters['Protect Weakness Icon'] || 81),
    IconFontSize:    Number(parameters['Icon Font Size'] || 22),
    ReduceAnimation: Number(parameters['Reduce Animation'] || 0),
    BreakAnimation:  Number(parameters['Break Animation'] || 0),
    ShowActorShield: eval(parameters['Show Actor Shields']),
    ShowEnemyShield: eval(parameters['Show Enemy Shields'])
};

Olivia.OctoBattle.BoostPoint = {
    Enabled: eval(parameters['Boost Point System']),
    // Mechanics
    BP_StartBattle: Number(parameters['Boost Point Start Battle'] || 1),
    BP_TurnRegen:   Number(parameters['Boost Point Regen'] || 1),
    BP_AlwaysRegen: eval(parameters['Boost Point Always Regen']),
    BP_MaxStored:   Number(parameters['Boost Point Maximum Stored'] || 5),
    BP_MaxUse:      Number(parameters['Boost Point Maximum Use'] || 3),
    DeathRemoval:   eval(parameters['Boost Point Death Removal'] || 'true'),
    DeathRegen:     eval(parameters['Boost Point Death Regen'] || 'false'),
    // Multipliers
    BP_DmgMultiply:      JSON.parse(parameters['Boost Point Damage Multipliers'] || '["1","1","1","1","1","1","1","1","1","1"]'),
    BP_DmgAddition:      JSON.parse(parameters['Boost Point Damage Addition'] || '["0","0","0","0","0","0","0","0","0","0"]'),
    BP_RepMultiply:      JSON.parse(parameters['Boost Point Repeat Multipliers'] || '["1","1","1","1","1","1","1","1","1","1"]'),
    BP_RepAddition:      JSON.parse(parameters['Boost Point Repeat Addition'] || '["0","0","0","0","0","0","0","0","0","0"]'),
    BP_TurnMultiply:     JSON.parse(parameters['Boost Point Turn Multipliers'] || '["1","1","1","1","1","1","1","1","1","1"]'),
    BP_TurnAddition:     JSON.parse(parameters['Boost Point Turn Addition'] || '["0","0","0","0","0","0","0","0","0","0"]'),
    BP_AnalyzeMultiply:  JSON.parse(parameters['Boost Point Analyze Multipliers'] || '["1","1","1","1","1","1","1","1","1","1"]'),
    BP_AnalyzeAddition:  JSON.parse(parameters['Boost Point Analyze Addition'] || '["0","0","0","0","0","0","0","0","0","0"]'),
    BP_BPEffectMultiply: JSON.parse(parameters['Boost Point BP Effect Multipliers'] || '["1","1","1","1","1","1","1","1","1","1"]'),
    BP_BPEffectAddition: JSON.parse(parameters['Boost Point BP Addition'] || '["0","0","0","0","0","0","0","0","0","0"]'),
    // Visuals
    Animations: JSON.parse(parameters['Boost Point Animations']),
    ShowIcons:  eval(parameters['Boost Point Show Icons']),
    // Icons
    BoostIcon: Number(parameters['Boost Point Icon Filled'] || 160),
    EmptyIcon: Number(parameters['Boost Point Icon Empty'] || 161),
    SmallIcon: eval(parameters['Small Boost Icons']),
    IconSize:  Number(parameters['Boost Icon Size'] || 0.5),
    SmallText: String(parameters['Boost Point Small Text']),
    TextAlign: String(parameters['Boost Point Small Text Align']),
    // Battle Control
    BoostCmd:    String(parameters['Boost Point Boost Command']),
    BoostShow:   eval(parameters['Boost Point Boost Command Show']),
    UnboostCmd:  String(parameters['Boost Point Unboost Command']),
    UnboostShow: eval(parameters['Boost Point Unboost Command Show']),
    LRButtons:   eval(parameters['Boost Point LR Buttons'])
};

Olivia.OctoBattle.WeaponSwap = {
    Enabled: eval(parameters['Weapon Swap System']),
    // Battle Control
    WpnSwapCmd:    String(parameters['Weapon Swap Command']),
    WpnSwapShow:   eval(parameters['Weapon Swap Show Command']),
    WpnSwapArrows: eval(parameters['Weapon Swap Arrow Buttons']),
    ShowArrows:    eval(parameters['Weapon Swap Show Arrows'] || 'true'),
    WpnBattleTest: eval(parameters['Weapon Swap Battle Test'] || 'true'),
    // Visuals
    ShowIcons:    eval(parameters['Weapon Swap Battle Icons']),
    BattleAction: eval(parameters['Weapon Swap Battle Action']),
    ExtraLines:   eval(parameters['Weapon Swap Equip Core Window'] || 'true'),
    TextHit:      String(parameters['Weapon Swap Text Hit'] || 'ACC'),
    TextEva:      String(parameters['Weapon Swap Text Evasion'] || 'EVA'),
    TextCri:      String(parameters['Weapon Swap Text Critical'] || 'CRI')
};

Olivia.OctoBattle.SideBattleUI = {
    Enabled: eval(parameters['Side Battle UI']),
    // Windows
    DimHelpWindow:   eval(parameters['Side Battle Dim Help Window']),
    WindowMasking:   eval(parameters['Side Battle Window Masking']),
    WindowScale:     Number(parameters['Side Battle Command Window Scale'] || 0.8),
    WindowCmdWidth:  Number(parameters['Side Battle Command Window Width'] || 160),
    WindowMaxList:   Number(parameters['Side Battle List Window Max'] || 8),
    WindowListWidth: Number(parameters['Side Battle List Window Width'] || 320),
    // Status Window
    CeilingBuffer:     Number(parameters['Side Battle Ceiling Distance'] || 0),
    StatusScale:       Number(parameters['Side Battle Status Scale'] || 0.6),
    StatusWidth:       Number(parameters['Side Battle Status Width'] || 200),
    GaugeWidth:        Number(parameters['Side Battle Gauge Width'] || 160),
    GaugeHeight:       Number(parameters['Side Battle Gauge Height'] || 6),
    StatesMax:         Number(parameters['Side Battle Status States Max'] || 4),
    ActiveBattlerMove: Number(parameters['Side Battle Status Move Active'] || 48),
    SelectBattlerMove: Number(parameters['Side Battle Status Move Selected'] || 24),
    WindowMoveSpeed:   Number(parameters['Side Battle Status Move Speed'] || 4),
    // Reposition
    PositionActors:        eval(parameters['Side Battle Position Actors']),
    ActorPositionFormulaX: String(parameters['Side Battle Actor X']),
    ActorPositionFormulaY: String(parameters['Side Battle Actor Y']),
    PositionEnemies:       eval(parameters['Side Battle Position Enemies']),
    EnemyPositionFormulaX: String(parameters['Side Battle Enemy X']),
    EnemyPositionFormulaY: String(parameters['Side Battle Enemy Y'])
};

Olivia.OctoBattle.VictoryUI = {
    Enabled: eval(parameters['Victory Screen UI']),
    // Audio
    LevelUpSound: {
        name:   String(parameters['Victory Screen Level Sound']),
        volume: Number(parameters['Victory Screen Level Sound Volume']),
        pitch:  Number(parameters['Victory Screen Level Sound Pitch']),
        pan:    Number(parameters['Victory Screen Level Sound Pan'])
    },
    VictoryBgm: {
        name:   String(parameters['Victory Screen BGM']),
        volume: Number(parameters['Victory Screen BGM Volume']),
        pitch:  Number(parameters['Victory Screen BGM Pitch']),
        pan:    Number(parameters['Victory Screen BGM Pan'])
    },
    // Transition Phase
    TransitionPower:    Number(parameters['Victory Screen Transition Power']),
    WaitHideWindows:    Number(parameters['Victory Screen Hide Window Delay']),
    WaitDisplayVictory: Number(parameters['Victory Screen Display Delay']),
    ZoomInTransition:   eval(parameters['Victory Screen Zoom']),
    ZoomX:              Number(parameters['Victory Screen Zoom X']),
    ZoomY:              Number(parameters['Victory Screen Zoom Y']),
    ZoomScale:          Number(parameters['Victory Screen Zoom Scale']),
    ZoomDuration:       Number(parameters['Victory Screen Zoom Duration']),
    // Background Visuals
    BackgroundDimHeight:     Number(parameters['Victory Screen Background Dimmer Height']),
    SideThickness:           Number(parameters['Victory Screen Background Side Thickness']),
    MiddleThickness:         Number(parameters['Victory Screen Background Middle Thickness']),
    TextItems:               String(parameters['Victory Screen Background Text Items']),
    TextItemsFontSize:       Number(parameters['Victory Screen Background Text Items Font Size']),
    TextVictory:             String(parameters['Victory Screen Background Text Victory']),
    TextVictoryFontSize:     Number(parameters['Victory Screen Background Text Victory Font Size']),
    RewardCategoryFontSize:  Number(parameters['Victory Screen Rewards Category Font Size']),
    RewardCategoryFontColor: Number(parameters['Victory Screen Rewards Category Font Color']),
    RewardResultsFontSize:   Number(parameters['Victory Screen Rewards Results Font Size']),
    RewardResultsFontColor:  Number(parameters['Victory Screen Rewards Results Font Color']),
    // Status Windows
    ActorNameFontSize:   Number(parameters['Victory Screen Status Actor Font Size']),
    ActorLevelFontSize:  Number(parameters['Victory Screen Status Level Font Size']),
    ActorLevelFormat:    String(parameters['Victory Screen Status Level Format']),
    ActorJPFontSize:     Number(parameters['Victory Screen Status JP Font Size']),
    ActorEXPFontSize:    Number(parameters['Victory Screen Status EXP Font Size']),
    ActorUpdateDuration: Number(parameters['Victory Screen Status Update Duration']),
    ExpCurrentFontSize:  Number(parameters['Victory Screen Status Current EXP Font Size']),
    ExpCurrentFontColor: Number(parameters['Victory Screen Status Current EXP Font Color']),
    ExpNextFontSize:     Number(parameters['Victory Screen Status Next EXP Font Size']),
    ExpNextFontColor:    Number(parameters['Victory Screen Status Next EXP Font Color']),
    ExpGaugeHeight:      Number(parameters['Victory Screen Status Exp Gauge Height']),
    ExpGaugeColor1:      Number(parameters['Victory Screen Status Exp Gauge Color 1']),
    ExpGaugeColor2:      Number(parameters['Victory Screen Status Exp Gauge Color 2']),
    LevelUpText:         String(parameters['Victory Screen Status Level Up Text']),
    LevelUpTextFontSize: Number(parameters['Victory Screen Status Level Up Font Size']),
    LevelUpTextColor:    Number(parameters['Victory Screen Status Level Up Color']),
    // Continue Button
    ContinueDuration:    Number(parameters['Victory Screen Continue Duration']),
    ContinueText:        String(parameters['Victory Screen Continue Text'])
};

Olivia.OctoBattle.BattleEffects = {
    Enabled: eval(parameters['Battle Effects Pack']),
    // Weak Popup Settings
    WeakPopupEnabled: eval(parameters['Battle Effects Weak Popups']),
    WeakPopupReqRate: Number(parameters['Battle Effects Weak Popup Require Rate'] || 1.1),
    WeakCellX:        Number(parameters['Battle Effects Weak Popup Cell X'] || 4),
    WeakCellWidth:    Number(parameters['Battle Effects Weak Popup Cell Width'] || 3),
    WeakCellXFactor:  Number(parameters['Battle Effects Weak Popup Cell X Factor'] || 0.25),
    WeakCellYFactor:  Number(parameters['Battle Effects Weak Popup Cell Y Factor'] || 0.60),
    WeakMoveXBase:    Number(parameters['Battle Effects Weak Popup Move X Base'] || -0.04), 
    WeakMoveXRate:    Number(parameters['Battle Effects Weak Popup Move X Rate'] || 1.1),
    WeakMoveYBase:    Number(parameters['Battle Effects Weak Popup Move Y Base'] || 0),
    WeakMoveYRate:    Number(parameters['Battle Effects Weak Popup Move Y Rate'] || 0),
    // Break Popup Settings
    BreakPopupEnabled: eval(parameters['Battle Effects Break Popups']),
    BreakCellX:        Number(parameters['Battle Effects Break Popup Cell X'] || 7),
    BreakCellWidth:    Number(parameters['Battle Effects Break Popup Cell Width'] || 3),
    BreakCellXFactor:  Number(parameters['Battle Effects Break Popup Cell X Factor'] || 0.25),
    BreakCellYFactor:  Number(parameters['Battle Effects Break Popup Cell Y Factor'] || 0.60),
    BreakMoveXBase:    Number(parameters['Battle Effects Break Popup Move X Base'] || -0.04), 
    BreakMoveXRate:    Number(parameters['Battle Effects Break Popup Move X Rate'] || 1.1),
    BreakMoveYBase:    Number(parameters['Battle Effects Break Popup Move Y Base'] || 0),
    BreakMoveYRate:    Number(parameters['Battle Effects Break Popup Move Y Rate'] || 0),
    // Stacking Buff Turns
    StackBuffTurns:   eval(parameters['Battle Effects Stack Buff Turns']),
    MaxBuffTurns:     Number(parameters['Battle Effects Max Buff Turns'] || 9),
    StackDebuffTurns: eval(parameters['Battle Effects Stack Debuff Turns']),
    MaxDebuffTurns:   Number(parameters['Battle Effects Max Buff Turns'] || 9)
};

Olivia.OctoBattle.OTB = {
    Enabled: eval(parameters['Order Turn Battle']),
    // Settings
    ForceBattleSystem: eval(parameters['OTB Force Battle System']),
    // Mechanics
    ActionSpeedConvert:       eval(parameters['OTB Mechanics Action Speed Convert']),
    BuffDebuffAgiConvert:     eval(parameters['OTB Mechanics Buff Debuff AGI Convert']),
    AddedActionTimes:         eval(parameters['OTB Mechanics Added Action Times']),
    ActionTimeOrderRandomize: eval(parameters['OTB Mechanics Action Time Order Randomize']),
    EnablePartyWindow:        eval(parameters['OTB Mechanics Enable Party Window']),
    EscapeActorWindow:        eval(parameters['OTB Mechanics Escape Actor Window']),
    RemoveRestrictCurrent:    eval(parameters['OTB Mechanics Remove Restrict Current']),
    RemoveRestrictNext:       eval(parameters['OTB Mechanics Remove Restrict Next']),
    StaticAgiCalculation:     eval(parameters['OTB Mechanics Static AGI Calculation']),
    StunWakeUpFirst:          eval(parameters['OTB Mechanics Stun Wakeup First']),
    StunWakeUpClamp:          eval(parameters['OTB Mechanics Stun Wakeup Clamp']),
    // Visuals
    BackgroundActorColor: String(parameters['OTB Background Actor Color']),
    BackgroundEnemyColor: String(parameters['OTB Background Enemy Color']),
    DisplayX:             Number(parameters['OTB Display X']),
    DisplayY:             Number(parameters['OTB Display Y']),
    HelpWindowMoveY:      Number(parameters['OTB Display Help Window Move Y']),
    HelpWindowMoveSpeed:  Number(parameters['OTB Display Help Window Move Speed']),
    CurrentTurnText:      String(parameters['OTB Display Current Text']),
    CurrentTurnFontSize:  Number(parameters['OTB Display Current Size']),
    NextTurnText:         String(parameters['OTB Display Next Text']),
    NextTurnFontSize:     Number(parameters['OTB Display Next Size']),
    MoveDuration:         Number(parameters['OTB Sprite Move Duration']),
    OpacitySpeed:         Number(parameters['OTB Sprite Opacity Speed']),
    HelpWindowNewY:       Number(parameters['OTB Help Window Y']),
    LogWindowNewY:        Number(parameters['OTB Log Window Y'])
};

//=============================================================================
// Weakness Display
//
// 1. Reveal corresponding weakness when struck with elemental damage.
// 2. Display data according to the elements revealed about that enemy.
// 3. Analyze effects to reveal more weaknesses.

if (Olivia.OctoBattle.WeaknessDisplay.Enabled) {

Olivia.OctoBattle.Weakness = Olivia.OctoBattle.Weakness || {};

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages battle progress.

BattleManager.revealWeaknessByVariable = function(variableId) {
    var times = $gameVariables.value(variableId);
    this.revealWeakness(times);
};

BattleManager.revealWeakness = function(times) {
    var members = $gameTroop.members();
    var targets = [];
    for (var i = 0; i < members.length; i++) {
        var target = members[i];
        if (!!target && !targets.contains(target.enemyId())) {
            target.revealNewWeaknesses(times);
            targets.push(target.enemyId());
        }
    }
};

//-----------------------------------------------------------------------------
// Game_System
//
// The game object class for the system data.

Olivia.OctoBattle.Weakness.___Game_System_initialize___ = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Olivia.OctoBattle.Weakness.___Game_System_initialize___.call(this);
    this.initializeRevealedEnemyWeaknesses();
};

Game_System.prototype.initializeRevealedEnemyWeaknesses = function() {
    this._revealedEnemyWeaknesses = this._revealedEnemyWeaknesses || {};
};

Game_System.prototype.addEnemyWeaknessElement = function(enemyId, elementId) {
    if (this._revealedEnemyWeaknesses === undefined) {
        this.initializeRevealedEnemyWeaknesses();
    }
    this._revealedEnemyWeaknesses[enemyId] = this._revealedEnemyWeaknesses[enemyId] || [];
    if (!this._revealedEnemyWeaknesses[enemyId].contains(elementId)) {
        this._revealedEnemyWeaknesses[enemyId].push(elementId);
    }
    this._revealedEnemyWeaknesses[enemyId].sort(function(a, b) {
        return a - b;
    });
};

Game_System.prototype.getRevealedEnemyWeaknesses = function(enemyId) {
    if (this._revealedEnemyWeaknesses === undefined) {
        this.initializeRevealedEnemyWeaknesses();
    }
    this._revealedEnemyWeaknesses[enemyId] = this._revealedEnemyWeaknesses[enemyId] || [];
    return this._revealedEnemyWeaknesses[enemyId];
};

//-----------------------------------------------------------------------------
// Game_Action
//
// The game object class for a battle action.

Olivia.OctoBattle.Weakness.___Game_Action_apply___ = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    Olivia.OctoBattle.Weakness.___Game_Action_apply___.call(this, target);
    target.revealWeaknessDisplay();
};

Olivia.OctoBattle.Weakness.___Game_Action_executeDamage___ = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
    Olivia.OctoBattle.Weakness.___Game_Action_executeDamage___.call(this, target, value);
    if (!!target && target.isEnemy() && value !== 0) {
        this.addEnemyWeaknessElement(target);
    }
};

Game_Action.prototype.addEnemyWeaknessElement = function(target) {
    if (Imported.YEP_ElementCore) {
        var elements = this.getItemElements();
    } else {
        var elementId = this.item().damage.elementId;
        if (elementId < 0) {
            var elements = this.subject().attackElements();
        } else {
            var elements = [elementId];
        }
    }
    for (var i = 0; i < elements.length; i++) {
        var elementId = elements[i];
        if (elementId > 0) {
            $gameSystem.addEnemyWeaknessElement(target.enemyId(), elementId);
        }
    }
};

Olivia.OctoBattle.Weakness.___Game_Action_applyItemUserEffect___ = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Olivia.OctoBattle.Weakness.___Game_Action_applyItemUserEffect___.call(this, target);
    if (target.isEnemy()) {
        this.applyWeaknessAnalyze(target);
    }
};

Game_Action.prototype.applyWeaknessAnalyze = function(target) {
    if (this.item().note.match(/<Analyze (?:Weakness|Weaknesses): (\d+)>/i)) {
        var times = parseInt(RegExp.$1);
        if (Olivia.OctoBattle.BoostPoint && this.item().note.match(/<(?:BP|Boost) Analyze>/i)) {
            var rate = this.subject().multiplierForBP('Analyze');
            times = Math.round(rate * times);
            times += this.subject().additionForBP('Analyze');
        }
        target.revealNewWeaknesses(times);
    }
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.

Olivia.OctoBattle.Weakness.___Game_BattlerBase_refresh___ = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    Olivia.OctoBattle.Weakness.___Game_BattlerBase_refresh___.call(this);
    $gameTemp._needRefreshAllEnemyWeaknessWindows = true;
};

//-----------------------------------------------------------------------------
// Game_Battler
//
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.

Olivia.OctoBattle.Weakness.___Game_Battler_startAnimation___ = Game_Battler.prototype.startAnimation;
Game_Battler.prototype.startAnimation = function(animationId, mirror, delay) {
    Olivia.OctoBattle.Weakness.___Game_Battler_startAnimation___.call(this, animationId, mirror, delay);
    this.revealWeaknessDisplay();
};

Game_Battler.prototype.revealWeaknessDisplay = function() {
    if (this.isEnemy()) {
        this._showWeaknessDisplay = Olivia.OctoBattle.WeaknessDisplay.HideDuration;
    }
};

//-----------------------------------------------------------------------------
// Game_Enemy
//
// The game object class for an enemy.

Game_Enemy.prototype.getWeaknessElements = function() {
    var elements = [];
    for (var i = 0; i < Olivia.OctoBattle.WeaknessDisplay.ShownElements.length; i++) {
        var elementId = Number(Olivia.OctoBattle.WeaknessDisplay.ShownElements[i]);
        if (Olivia.OctoBattle.BreakShield && Olivia.OctoBattle.BreakShield.Enabled) {
            if (this.originalElementRate(elementId) >= Olivia.OctoBattle.BreakShield.WeakRate) {
                elements.push(elementId);
            }
        } else {
            if (this.elementRate(elementId) >= 1.1) {
                elements.push(elementId);
            }
        }
    }
    return elements;
};

Game_Enemy.prototype.isShowWeaknessHpGauge = function() {
    if (this.enemy().note.match(/<No HP Gauge>/i)) {
        return false;
    } else if (this.enemy().note.match(/<Show HP Gauge>/i)) {
        return true;
    } else if (this.enemy().note.match(/<Hide HP Gauge>/i)) {
        return false;
    }
    return Olivia.OctoBattle.WeaknessDisplay.ShowHpGauge;
};

Game_Enemy.prototype.revealNewWeaknesses = function(times) {
    var weaknesses = this.getWeaknessElements();
    var revealed = $gameSystem.getRevealedEnemyWeaknesses(this.enemyId());
    var elements = [];
    for (var i = 0; i < weaknesses.length; i++) {
        var elementId = weaknesses[i];
        if (!revealed.contains(elementId)) {
            elements.push(elementId);
        }
    }
    while (times > 0) {
        if (elements.length <= 0) {
            break;
        }
        times -= 1;
        var index = Math.floor(Math.random() * elements.length);
        var random = elements[index];
        $gameSystem.addEnemyWeaknessElement(this.enemyId(), random);
        elements.splice(index, 1);
        this.revealWeaknessDisplay();
    }
    $gameTemp._needRefreshAllEnemyWeaknessWindows = true;
};

//-----------------------------------------------------------------------------
// Spriteset_Battle
//
// The set of sprites on the battle screen.

Olivia.OctoBattle.Weakness.___Spriteset_Battle_update___ = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    Olivia.OctoBattle.Weakness.___Spriteset_Battle_update___.call(this);
    this.updateEnemyWeaknessWindows();
};

Spriteset_Battle.prototype.updateEnemyWeaknessWindows = function() {
    if ($gameTemp._needRefreshAllEnemyWeaknessWindows === true) {
        for (var i = 0; i < this._enemySprites.length; i++) {
            var sprite = this._enemySprites[i];
            if (!!sprite && !!sprite._weaknessWindow) {
                sprite._weaknessWindow.refresh();
                if (sprite._weaknessWindow._added === false) {
                    this._baseSprite.addChild(sprite._weaknessWindow);
                }
            }
        }
        $gameTemp._needRefreshAllEnemyWeaknessWindows = false;
    }
};

//-----------------------------------------------------------------------------
// Sprite_Enemy
//
// The sprite for displaying an enemy.

Olivia.OctoBattle.Weakness.___Sprite_Enemy_initMembers___ = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
    Olivia.OctoBattle.Weakness.___Sprite_Enemy_initMembers___.call(this);
    this.createWeaknessDisplayWindow();
};

Sprite_Enemy.prototype.createWeaknessDisplayWindow = function() {
    this._weaknessWindow = new Window_WeaknessDisplay(this._enemy, this);
    this._weaknessWindow.refresh();
    this._weaknessWindow._added = false;
    if (Olivia.OctoBattle.WeaknessDisplay.ShowStates) {
        this._stateIconSprite.opacity = 0;
    }
};

Olivia.OctoBattle.Weakness.___Sprite_Enemy_setBattler___ = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    Olivia.OctoBattle.Weakness.___Sprite_Enemy_setBattler___.call(this, battler);
    if (!!this._weaknessWindow) {
        this._weaknessWindow.setSubject(battler);
    }
};

//-----------------------------------------------------------------------------
// Window_WeaknessDisplay
//
// The window attached to enemy sprites to show their weaknesses.

function Window_WeaknessDisplay() {
    this.initialize.apply(this, arguments);
}

Window_WeaknessDisplay.prototype = Object.create(Window_Base.prototype);
Window_WeaknessDisplay.prototype.constructor = Window_WeaknessDisplay;

Window_WeaknessDisplay.prototype.initialize = function(subject, sprite) {
    this._subject = subject;
    this._sprite = sprite;
    var width = Math.ceil(Graphics.boxWidth / 2);
    var height = this.fittingHeight(2);
    this.setCalculationConstants();
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.createStateIconSprite();
    this.opacity = 0;
    this.refresh();
};

Window_WeaknessDisplay.prototype.standardPadding = function() {
    return 0;
};

Window_WeaknessDisplay.prototype.setCalculationConstants = function() {
    this._factorX = -1 * Math.ceil(Graphics.boxWidth * 0.25);
    this._factorY = -1 * Math.round(this.lineHeight() * 0.75);
};

Window_WeaknessDisplay.prototype.createStateIconSprite = function() {
    if (Olivia.OctoBattle.WeaknessDisplay) {
        this._stateIconSprite = new Sprite_StateIcon();
        this.addChild(this._stateIconSprite);
        this._stateIconSprite.x = this.width / 2;
        this._stateIconSprite.y = 0;
    }
};

Window_WeaknessDisplay.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!!this._subject) {
        this.updatePosition();
        this.updateOpacity();
    }
};

Window_WeaknessDisplay.prototype.updatePosition = function() {
    this.x = this._sprite.x + this._factorX;
    this.y = this._sprite.y + this._factorY;
};

Window_WeaknessDisplay.prototype.updateOpacity = function() {
    if (this._subject.isHidden() || this._subject.isDead()) {
        this.contentsOpacity -= 16;
    } else if (Imported.YEP_BattleEngineCore && this._subject.battler() && this._subject.battler().opacity <= 0) {
        this.contentsOpacity -= 16;
    } else if (Olivia.OctoBattle.WeaknessDisplay.AlwaysShow) {
        this.contentsOpacity = 255;
    } else if (this._subject.isSelected()) {
        this.contentsOpacity = 255;
    } else if (this._subject._showWeaknessDisplay > 0) {
        this.contentsOpacity = 255;
        this._subject._showWeaknessDisplay -= 1;
    } else {
        this.contentsOpacity -= 16;
    }
    if (!!this._stateIconSprite) {
        this._stateIconSprite.opacity = this.contentsOpacity;
    }
};

Window_WeaknessDisplay.prototype.setSubject = function(subject) {
    this._subject = subject;
    this._subject._showWeaknessDisplay = this._subject._showWeaknessDisplay || Olivia.OctoBattle.WeaknessDisplay.HideDuration;
    if (!!this._stateIconSprite) {
        this._stateIconSprite.setup(this._subject);
    }
    if (this._subject.isHidden()) {
        this.contentsOpacity = 0;
    }
    this.refresh();
};

Window_WeaknessDisplay.prototype.refresh = function() {
    this.contents.clear();
    if (!!this._subject) {
        this.drawHpGauge();
        this.drawSubjectName();
        this.drawBreakShield();
        this.drawWeaknessIcons();
        if (!!this._stateIconSprite) {
            this.moveStateSprite();
        }
    }
};

Window_WeaknessDisplay.prototype.drawHpGauge = function() {
    if (Olivia.OctoBattle.WeaknessDisplay.ShowHpGauge) {
        if (Olivia.OctoBattle.WeaknessDisplay.ShowName) {
            this.resetFontSettings();
            this.contents.fontSize = Olivia.OctoBattle.WeaknessDisplay.NameFontSize;
            var size = this.textWidth(this._subject.name());
            this.resetFontSettings();
            size = Math.max(Olivia.OctoBattle.WeaknessDisplay.HpGaugeMinWidth, size);
        } else {
            var size = Olivia.OctoBattle.WeaknessDisplay.HpGaugeMinWidth;
        }
        size += 2 * Olivia.OctoBattle.WeaknessDisplay.HpGaugePadding;
        this._hpGaugeWidth = size;
        var x = Math.round((this.contentsWidth() - size) / 2);
        var rate = this._subject.hpRate();
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();
        this.drawGauge(x, 0, size, rate, color1, color2);
    } else {
        this._hpGaugeWidth = 0;
    }
};

Window_WeaknessDisplay.prototype.drawSubjectName = function() {
    if (Olivia.OctoBattle.WeaknessDisplay.ShowName) {
        this.resetFontSettings();
        this.contents.fontSize = Olivia.OctoBattle.WeaknessDisplay.NameFontSize;
        if (this._subject.hpRate() > 0.50) {
            this.changeTextColor(this.normalColor());
        } else if (this._subject.hpRate() > 0.25) {
            this.changeTextColor(this.textColor(Olivia.OctoBattle.WeaknessDisplay.HpColor50));
        } else {
            this.changeTextColor(this.textColor(Olivia.OctoBattle.WeaknessDisplay.HpColor25));
        }
        this.drawText(this._subject.name(), 0, 0, this.contentsWidth(), 'center');
        this.resetFontSettings();
    }
};

Window_WeaknessDisplay.prototype.drawBreakShield = function() {
    if (Olivia.OctoBattle.WeaknessDisplay.ShowBreakShield && Olivia.OctoBattle.BreakShield && Olivia.OctoBattle.BreakShield.Enabled && Olivia.OctoBattle.BreakShield.Enemies) {
        if (Olivia.OctoBattle.WeaknessDisplay.ShowName) {
            this.resetFontSettings();
            this.contents.fontSize = Olivia.OctoBattle.WeaknessDisplay.NameFontSize;
            var size = this.textWidth(this._subject.name());
            this.resetFontSettings();
            size = Math.max(this._hpGaugeWidth, size);
            var x = Math.round((this.contentsWidth() - size) / 2) - Window_Base._iconWidth - 2;
        } else if (Olivia.OctoBattle.WeaknessDisplay.ShowStates && this._subject.allIcons().length > 0) {
            var x = Math.round(this.contentsWidth() / 2) - Window_Base._iconWidth;
        } else {
            var x = Math.round((this.contentsWidth() - Window_Base._iconWidth) / 2);
        }
        this.drawBreakShieldIcon(this._subject, x, 0);
    }
};

Window_WeaknessDisplay.prototype.moveStateSprite = function() {
      var x = Math.round(this.contentsWidth() / 2);
      var y = Math.round(this.lineHeight() / 2) - 2;
      if (Olivia.OctoBattle.WeaknessDisplay.ShowHpGauge) {
          if (Olivia.OctoBattle.WeaknessDisplay.ShowName) {
              this.resetFontSettings();
              this.contents.fontSize = Olivia.OctoBattle.WeaknessDisplay.NameFontSize;
              var size = this.textWidth(this._subject.name());
              this.resetFontSettings();
              size = Math.max(Olivia.OctoBattle.WeaknessDisplay.HpGaugeMinWidth, size);
          } else {
              var size = Olivia.OctoBattle.WeaknessDisplay.HpGaugeMinWidth;
          }
          size += 2 * Olivia.OctoBattle.WeaknessDisplay.HpGaugePadding + 2;
          x += Math.round(size / 2) + Math.round(Window_Base._iconWidth / 2);
      } else if (Olivia.OctoBattle.WeaknessDisplay.ShowName) {
          this.resetFontSettings();
          this.contents.fontSize = Olivia.OctoBattle.WeaknessDisplay.NameFontSize;
          var size = this.textWidth(this._subject.name()) + Window_Base._iconWidth + 4;
          this.resetFontSettings();
          x += Math.round(size / 2);
      } else if (Olivia.OctoBattle.WeaknessDisplay.ShowBreakShield) {
          x += Math.round(Window_Base._iconWidth / 2);
      } else {
          y -= this.lineHeight();
      }
      this._stateIconSprite.x = x;
      this._stateIconSprite.y = y;
};

Window_WeaknessDisplay.prototype.showBreakStunDuration = function() {
    return Olivia.OctoBattle.WeaknessDisplay.ShowStunTurns;
};

Window_WeaknessDisplay.prototype.drawWeaknessIcons = function() {
    var elements = this._subject.getWeaknessElements();
    var iconWidth = Window_Base._iconWidth;
    if (Olivia.OctoBattle.WeaknessDisplay.SmallWeakIcons) {
        iconWidth = Math.round(iconWidth * Olivia.OctoBattle.WeaknessDisplay.WeakIconSize);
    }
    var size = elements.length * iconWidth;
    var x = Math.round((this.contentsWidth() - size) / 2);
    if (!Olivia.OctoBattle.WeaknessDisplay.ShowName && !Olivia.OctoBattle.WeaknessDisplay.ShowBreakShield && !Olivia.OctoBattle.WeaknessDisplay.ShowHpGauge) {
        var y = 0;
    } else {
        var y = this.lineHeight();
    }
    var revealed = $gameSystem.getRevealedEnemyWeaknesses(this._subject.enemyId());
    if (Olivia.OctoBattle.BreakShield && Olivia.OctoBattle.BreakShield.Enabled) {
        var protectedElements = this._subject.getProtectedWeaknessElements();
    }
    for (var i = 0; i < elements.length; i++) {
        var elementId = elements[i];
        if (revealed.contains(elementId)) {
            var index = Olivia.OctoBattle.WeaknessDisplay.ShownElements.indexOf(String(elementId));
            var icon = Number(Olivia.OctoBattle.WeaknessDisplay.ElementIcons[index]);
        } else {
            var icon = Olivia.OctoBattle.WeaknessDisplay.UnknownIcon;
        }
        if (Olivia.OctoBattle.WeaknessDisplay.SmallWeakIcons) {
            this.drawSmallIcon(icon, x, y);
        } else {
            this.drawIcon(icon, x, y);
        }
        if (Olivia.OctoBattle.BreakShield && Olivia.OctoBattle.BreakShield.Enabled && protectedElements.contains(elementId)) {
            var icon = Olivia.OctoBattle.BreakShield.ProtectIcon;
            if (Olivia.OctoBattle.WeaknessDisplay.SmallWeakIcons) {
                this.drawSmallIcon(icon, x, y);
            } else {
                this.drawIcon(icon, x, y);
            }
        }
        x += iconWidth;
    }
};

Window_WeaknessDisplay.prototype.drawSmallIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var rate = Olivia.OctoBattle.WeaknessDisplay.WeakIconSize;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, Math.round(pw * rate), Math.round(ph * rate));
};

//-----------------------------------------------------------------------------
// Window_EnemyVisualSelect
//
// From Yanfly's Battle Engine Core

if (Imported.YEP_BattleEngineCore) {

Window_EnemyVisualSelect.prototype.refresh = function() {
};

}

//=============================================================================
} // End Weakness Display
//=============================================================================  

//=============================================================================
// Break Shield System
//
// 1. Each target has a shield value
// 2. Shield value goes down whenever a weakness is struck
// 3. When shield value reaches 0, the target becomes stunned

if (Olivia.OctoBattle.BreakShield.Enabled) {

Olivia.OctoBattle.Shields = Olivia.OctoBattle.Shields || {};

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages battle progress.

Olivia.OctoBattle.Shields.___BattleManager_setup___ = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
  Olivia.OctoBattle.Shields.___BattleManager_setup___.call(this, troopId, canEscape, canLose);
  $gameParty.resetBreakShields();
  $gameTroop.resetBreakShields();
};

//-----------------------------------------------------------------------------
// Game_Action
//
// The game object class for a battle action.

Olivia.OctoBattle.Shields.___Game_Action_executeDamage___ = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
    Olivia.OctoBattle.Shields.___Game_Action_executeDamage___.call(this, target, value);
    if (!!target && value > 0 && target.isAffectedByBreakShield() && this.isHpEffect()) {
        this.executeBreakShieldReduction(target, value);
    }
};

Game_Action.prototype.executeBreakShieldReduction = function(target, value) {
    if (!target.isBreakStunned()) {
        var rate = this.calcElementRate(target);
        if (rate >= Olivia.OctoBattle.BreakShield.WeakRate) {
            var value = -1 * this.itemBreakShieldReduction();
            target.startBreakShieldReduceAnimation();
            target.alterBreakShield(value);
        }
    }
};

Game_Action.prototype.itemBreakShieldReduction = function() {
    if (this.item().note.match(/<Break (?:Reduce|Reduction): (\d+)>/i)) {
        return parseInt(RegExp.$1);
    } else {
        return Olivia.OctoBattle.BreakShield.BreakReduce;
    }
};

Olivia.OctoBattle.Shields.___Game_Action_applyItemUserEffect___ = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Olivia.OctoBattle.Shields.___Game_Action_applyItemUserEffect___.call(this, target);
    if (!!target && target.isAffectedByBreakShield()) {
        this.applyChangeBreakShield(target);
    }
};

Game_Action.prototype.applyChangeBreakShield = function(target) {
    if (!target.isBreakStunned()) {
        if (this.item().note.match(/<(?:Set|Change) Break (?:Shield|Shields): (\d+)>/i)) {
            target.setBreakShield(parseInt(RegExp.$1));
            $gameTemp._needRefreshAllEnemyWeaknessWindows = true;
        }
        if (this.item().note.match(/<(?:Increase|Decrease|Change) Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
            target.alterBreakShield(parseInt(RegExp.$1));
            $gameTemp._needRefreshAllEnemyWeaknessWindows = true;
        }
    }
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.

Olivia.OctoBattle.Shields.___Game_BattlerBase_elementRate___ = Game_BattlerBase.prototype.elementRate;
Game_BattlerBase.prototype.elementRate = function(elementId) {
    var rate = Olivia.OctoBattle.Shields.___Game_BattlerBase_elementRate___.call(this, elementId);
    if (this.getProtectedWeaknessElements().contains(elementId)) {
        return Math.min(1.0, rate);
    } else {
        return rate;
    }
};

Game_BattlerBase.prototype.originalElementRate = function(elementId) {
    return Olivia.OctoBattle.Shields.___Game_BattlerBase_elementRate___.call(this, elementId);
};

//-----------------------------------------------------------------------------
// Game_Battler
//
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.

Olivia.OctoBattle.Shields.___Game_Battler_removeBattleStates___ = Game_Battler.prototype.removeBattleStates;
Game_Battler.prototype.removeBattleStates = function() {
    Olivia.OctoBattle.Shields.___Game_Battler_removeBattleStates___.call(this);
    this.resetBreakShield();
};

Game_Battler.prototype.resetBreakShield = function() {
    if (this.isAffectedByBreakShield()) {
        this.setBreakShield(this.topBreakShield());
        this.refresh();
    }
};

Game_Battler.prototype.baseBreakShield = function() {
    return Olivia.OctoBattle.BreakShield.BaseShields;
};

Game_Battler.prototype.topBreakShield = function() {
    var shields = this.baseBreakShield();
    shields = this.addedBreakShields(shields);
    return Math.max(1, shields);
};

Game_Battler.prototype.addedBreakShields = function(shields) {
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (!!state && state.note.match(/<Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
            shields += parseInt(RegExp.$1);
        }
    }
    return shields;
};

Game_Battler.prototype.currentBreakShield = function() {
    if (this._currentBreakShield === undefined) {
        this.setBreakShield(this.topBreakShield());
    }
    return this._currentBreakShield;
};

Game_Battler.prototype.setBreakShield = function(value) {
    if (this.isAffectedByBreakShield()) {
        this._currentBreakShield = Math.ceil(value);
        this._currentBreakShield = this._currentBreakShield.clamp(0, Olivia.OctoBattle.BreakShield.MaxShields);
        if (this._currentBreakShield <= 0) {
            this.applyBreakStun();
        }
        this.refresh();
    }
};

Game_Battler.prototype.alterBreakShield = function(value) {
    this.setBreakShield(this.currentBreakShield() + value);
};

Game_Battler.prototype.applyBreakStun = function() {
    this.setBreakShield(this.topBreakShield());
    var stateId = Olivia.OctoBattle.BreakShield.StunState;
    this.addState(stateId);
    this.startBreakShieldBrokenAnimation();
};

Game_Battler.prototype.isBreakStunned = function() {
    return this.isStateAffected(Olivia.OctoBattle.BreakShield.StunState);
};

Game_Battler.prototype.startBreakShieldReduceAnimation = function() {
    if (Olivia.OctoBattle.BreakShield.ReduceAnimation) {
        var animationId = Olivia.OctoBattle.BreakShield.ReduceAnimation;
        this.startAnimation(animationId);
    }
};

Game_Battler.prototype.startBreakShieldBrokenAnimation = function() {
    if (Olivia.OctoBattle.BreakShield.BreakAnimation) {
        var animationId = Olivia.OctoBattle.BreakShield.BreakAnimation;
        this.startAnimation(animationId);
    }
};

Game_Battler.prototype.getProtectedWeaknessElements = function() {
    var elements = [];
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (!!state && state.note.match(/<Protect (?:Element|Elements):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            elements = elements.concat(array);
        }
    }
    elements.sort(function(a, b) {
        return a - b;
    });
    return elements;
};

//-----------------------------------------------------------------------------
// Game_Actor
//
// The game object class for an actor.

Game_Actor.prototype.isAffectedByBreakShield = function() {
    return Olivia.OctoBattle.BreakShield.Actors;
};

Game_Actor.prototype.bareHandsElementId = function() {
    return 0;
};

Game_Actor.prototype.baseBreakShield = function() {
    var shield = Olivia.OctoBattle.BreakShield.BaseShields;
    if (!!this.currentClass() && this.currentClass().note.match(/<Break (?:Shield|Shields): (\d+)>/i)) {
        shield = parseInt(RegExp.$1);
    } else if (this.actor() && this.actor().note.match(/<Break (?:Shield|Shields): (\d+)>/i)) {
        shield = parseInt(RegExp.$1);
    }
    return shield;
};

Game_Actor.prototype.addedBreakShields = function(shields) {
    shields = Game_Battler.prototype.addedBreakShields.call(this, shields);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (!!item && item.note.match(/<Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
            shields += parseInt(RegExp.$1);
        }
    }
    if (!!this.currentClass() && this.currentClass().note.match(/<Break (?:Shield|Shields): ([\+\-]\d+)>/i)) {
        shields += parseInt(RegExp.$1);
    }
    return shields;
};

Game_Actor.prototype.getProtectedWeaknessElements = function() {
    var elements = Game_Battler.prototype.getProtectedWeaknessElements.call(this);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (!!item && item.note.match(/<Protect (?:Element|Elements):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            elements = elements.concat(array);
        }
    }
    if (!!this.currentClass() && this.currentClass().note.match(/<Protect (?:Element|Elements):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        elements = elements.concat(array);
    }
    elements.sort(function(a, b) {
        return a - b;
    });
    return elements;
};

//-----------------------------------------------------------------------------
// Game_Enemy
//
// The game object class for an enemy.

Game_Enemy.prototype.isAffectedByBreakShield = function() {
    return Olivia.OctoBattle.BreakShield.Enemies;
};

Game_Enemy.prototype.baseBreakShield = function() {
    var shield = Olivia.OctoBattle.BreakShield.BaseShields;
    if (this.enemy() && this.enemy().note.match(/<Break (?:Shield|Shields): (\d+)>/i)) {
        shield = parseInt(RegExp.$1);
    }
    return shield;
};

//-----------------------------------------------------------------------------
// Game_Unit
//
// The superclass of Game_Party and Game_Troop.

Game_Unit.prototype.resetBreakShields = function() {
    var inBattle = this._inBattle;
    this._inBattle = false;
    var members = this.members();
    for (var i = 0; i < members.length; i++) {
        var member = members[i];
        if (member) {
            member.resetBreakShield();
        }
    }
    this._inBattle = inBattle;
};

//-----------------------------------------------------------------------------
// Window_Base
//
// The superclass of all windows within the game.

Window_Base._iconBreakShield = Olivia.OctoBattle.BreakShield.ShieldIcon;
Window_Base._iconBreakStun   = Olivia.OctoBattle.BreakShield.StunIcon;

Window_Base.prototype.drawBreakShieldIcon = function(target, x, y) {
    if (target.isAffectedByBreakShield()) {
        if (target.isDead() && $dataStates[target.deathStateId()].iconIndex > 0) {
            var icon = $dataStates[target.deathStateId()].iconIndex;
            var text = '';
        } else if (target.isDead()) {
            var icon = 0;
            var text = '';
        } else if (target.isBreakStunned()) {
            var icon = Window_Base._iconBreakStun;
            if (this.showBreakStunDuration()) {
                var text = target._stateTurns[Olivia.OctoBattle.BreakShield.StunState] || 0;
                if (text === 0) {
                    text = '';
                }
            } else {
                var text = '';
            }
        } else {
            var icon = Window_Base._iconBreakShield;
            var text = target.currentBreakShield();
        }
        this.drawIcon(icon, x, y);
        this.contents.fontSize = Olivia.OctoBattle.BreakShield.IconFontSize;
        var outline = this.contents.outlineColor;
        this.contents.outlineColor = 'rgba(0, 0, 0, 1.0)';
        this.drawText(text, x, y, Window_Base._iconWidth, 'center');
        this.resetFontSettings();
        this.contents.outlineColor = outline;
    }
};

Window_Base.prototype.showBreakStunDuration = function() {
    return true;
};

if (Olivia.OctoBattle.BreakShield.Actors && Olivia.OctoBattle.BreakShield.DrawMenu) {

Olivia.OctoBattle.Shields.___Window_Base_drawActorIcons___ = Window_Base.prototype.drawActorIcons;
Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
    if (!$gameParty.inBattle() && !(SceneManager._scene instanceof Scene_Battle)) {
        actor.resetBreakShield();
        this.drawBreakShieldIcon(actor, x, y + 2);
        x += Window_Base._iconWidth;
        width -= Window_Base._iconWidth;
    }
    Olivia.OctoBattle.Shields.___Window_Base_drawActorIcons___.call(this, actor, x, y, width);
};

}

//-----------------------------------------------------------------------------
// Window_BattleStatus
//
// The window for displaying the status of party members on the battle screen.

if (Olivia.OctoBattle.BreakShield.Actors && Olivia.OctoBattle.BreakShield.ShowActorShield) {

Olivia.OctoBattle.BreakShield.Window_BattleStatus_drawBasicArea = Window_BattleStatus.prototype.drawBasicArea;
Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    if (actor.isAffectedByBreakShield()) {
        this.drawBreakShieldBasic(rect, actor)
        rect.x += Window_Base._iconWidth + 2;
        rect.width -= Window_Base._iconWidth + 2;
    }
    Olivia.OctoBattle.BreakShield.Window_BattleStatus_drawBasicArea.call(this, rect, actor);
};

Window_BattleStatus.prototype.drawBreakShieldBasic = function(rect, actor) {
    this.drawBreakShieldIcon(actor, rect.x, rect.y + 2);
};

}

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//
// The window for selecting a target enemy on the battle screen.

if (Olivia.OctoBattle.BreakShield.Enemies && Olivia.OctoBattle.BreakShield.ShowEnemyShield) {

Window_BattleEnemy.prototype.drawItem = function(index) {
    this.resetTextColor();
    var name = this._enemies[index].name();
    var rect = this.itemRectForText(index);
    var x = rect.x;
    var y = rect.y;
    var width = rect.width;
    this.drawBreakShieldIcon(this._enemies[index], x, y + 2);
    x += Window_Base._iconWidth + 2;
    width -= Window_Base._iconWidth + 2;
    this.drawText(name, x, y, width);
};

}

//=============================================================================
} // End Break Shield System
//=============================================================================

//=============================================================================
// Boost Point System
//
// 1. Each battler has BP access
// 2. Each battler gains BP each turn if the previous turn used no BP
// 3. BP can be used up to a certain number of times to boost skills

if (Olivia.OctoBattle.BoostPoint.Enabled) {

Olivia.OctoBattle.BP = Olivia.OctoBattle.BP || {};

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages battle progress.

Olivia.OctoBattle.BP.___BattleManager_setup___ = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    Olivia.OctoBattle.BP.___BattleManager_setup___.call(this, troopId, canEscape, canLose);
    $gameParty.setupBattleBP();
    $gameTroop.setupBattleBP();
};

Olivia.OctoBattle.BP.___BattleManager_processTurn___ = BattleManager.processTurn;
BattleManager.processTurn = function() {
    this.processEnemyUseBoost();
    Olivia.OctoBattle.BP.___BattleManager_processTurn___.call(this);
};

BattleManager.processEnemyUseBoost = function() {
    var subject = this._subject;
    var action = subject.currentAction();
    if (!!subject && subject.isEnemy() && !!action && action.isSkill() && subject.storedBP() > 0 && !subject.isBoostSealed()) {
        subject.processUseBP(action.item());
    }
};

//-----------------------------------------------------------------------------
// Game_Action
//
// The game object class for a battle action.

Olivia.OctoBattle.BP.___Game_Action_numRepeats___ = Game_Action.prototype.numRepeats;
Game_Action.prototype.numRepeats = function() {
    var repeats = Olivia.OctoBattle.BP.___Game_Action_numRepeats___.call(this);
    repeats = this.applyBPRepeats(repeats);
    return Math.round(repeats);;
};

Game_Action.prototype.applyBPRepeats = function(repeats) {
    if (!!this.subject() && this.item().note.match(/<(?:BP|Boost) (?:Repeat|Repeats)>/i)) {
        var index = this.subject().useBP();
        var rate = this.subject().multiplierForBP('Repeat');
        repeats = Math.round(repeats * rate);
        repeats += this.subject().additionForBP('Repeat');
    }
    return repeats
};

Olivia.OctoBattle.BP.___Game_Action_applyGuard___ = Game_Action.prototype.applyGuard;
Game_Action.prototype.applyGuard = function(damage, target) {
    damage = this.applyBPDamage(damage);
    return Olivia.OctoBattle.BP.___Game_Action_applyGuard___.call(this, damage, target);
};

Game_Action.prototype.applyBPDamage = function(damage) {
    if (!!this.subject() && this.item().note.match(/<(?:BP|Boost) (?:DMG|Damage)>/i)) {
        var rate = this.subject().multiplierForBP('Damage');
        damage = Math.round(damage * rate);
        damage += this.subject().additionForBP('Damage');
    }
    return damage;
};

Olivia.OctoBattle.BP.___Game_Action_apply___ = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    this.applyBPTurns(false);
    Olivia.OctoBattle.BP.___Game_Action_apply___.call(this, target);
    this.applyBPTurns(true);
};

Game_Action.prototype.applyBPTurns = function(reset) {
    if (!!this.subject() && this.item().note.match(/<(?:BP|Boost) (?:Turn|Turns)>/i)) {
        var rate = this.subject().multiplierForBP('Turn');
        $gameTemp._bpTurnRate = rate;
        $gameTemp._bpTurnFlat = this.subject().additionForBP('Turn');
    }
    if (reset) {
        $gameTemp._bpTurnRate = undefined;
        $gameTemp._bpTurnFlat = undefined;
    }
};

Olivia.OctoBattle.BP.__Game_Action_applyItemUserEffect___ = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Olivia.OctoBattle.BP.__Game_Action_applyItemUserEffect___.call(this, target);
    this.applyBPEffects(target);
};

Game_Action.prototype.applyBPEffects = function(target) {
    if (!!target && this.item().note.match(/<Target (?:BP|Boost): ([\+\-]\d+)>/i)) {
        var bp = parseInt(RegExp.$1);
        if (this.item().note.match(/<(?:BP|Boost) BP Effect>/i)) {
            bp = Math.round(this.subject().multiplierForBP('BP Effect') * bp);
            bp += this.subject().additionForBP('BP Effect');
        }
        target.gainStoredBP(bp);
    }
    if (!!this.subject() && this.item().note.match(/<User (?:BP|Boost): ([\+\-]\d+)>/i)) {
        var bp = parseInt(RegExp.$1);
        if (this.item().note.match(/<(?:BP|Boost) BP Effect>/i)) {
            bp = Math.round(this.subject().multiplierForBP('BP Effect') * bp);
            bp += this.subject().additionForBP('BP Effect');
        }
        this.subject().gainStoredBP(bp);
    }
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.

Object.defineProperties(Game_BattlerBase.prototype, {
    // Boost Points
    bp: { get: function() { return this.useBP(); }, configurable: true }
});

Olivia.OctoBattle.BP.___Game_BattlerBase_initialize___ = Game_BattlerBase.prototype.initialize;
Game_BattlerBase.prototype.initialize = function() {
    Olivia.OctoBattle.BP.___Game_BattlerBase_initialize___.call(this);
    this.initializeBP();
};

Game_BattlerBase.prototype.initializeBP = function() {
    this._storedBP = this._storedBP || 0;
    this._useBP = this._useBP || 0;
    this._turnUsedBP = this._turnUsedBP || 0;
};

Game_BattlerBase.prototype.storedBP = function() {
    if (this._storedBP === undefined) {
        this.initializeBP();
    }
    return this._storedBP;
};

Game_BattlerBase.prototype.setStoredBP = function(bp) {
    if (this._storedBP === undefined) {
        this.initializeBP();
    }
    this._storedBP = bp.clamp(0, Olivia.OctoBattle.BoostPoint.BP_MaxStored);
    this.refresh();
};

Game_BattlerBase.prototype.useBP = function() {
    if (this._useBP === undefined) {
        this.initializeBP();
    }
    return this._useBP;
};

Game_BattlerBase.prototype.setUseBP = function(bp) {
    if (this._useBP === undefined) {
        this.initializeBP();
    }
    this._useBP = bp.clamp(0, Olivia.OctoBattle.BoostPoint.BP_MaxUse);
    this.refresh();
};

Game_BattlerBase.prototype.bpRegenValue = function() {
    if (!Olivia.OctoBattle.BoostPoint.DeathRegen && (this.isDead() || this.isHidden())) {
        return 0;
    } else {
        var bp = Olivia.OctoBattle.BoostPoint.BP_TurnRegen;
        bp = this.bpRegenMultipliers(bp);
        bp = this.bpRegenAdded(bp);
        return bp;
    }
};

Game_BattlerBase.prototype.isBoostSealed = function() {
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (!!state && state.note.match(/<Boost (?:Seal|Sealed)>/i)) {
            return true;
        }
    }
    return false;
};

Olivia.OctoBattle.BP.___Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    var currentTurnCount = this._stateTurns[stateId] || 0;
    Olivia.OctoBattle.BP.___Game_BattlerBase_resetStateCounts.call(this, stateId);
    if (!!$gameTemp._bpTurnRate) {
        $gameTemp._bpTurnFlat = $gameTemp._bpTurnFlat || 0;
        var state = $dataStates[stateId];
        var maxTurns = Math.round(state.maxTurns * $gameTemp._bpTurnRate) + $gameTemp._bpTurnFlat;
        var minTurns = Math.round(state.minTurns * $gameTemp._bpTurnRate) + $gameTemp._bpTurnFlat;
        var variance = 1 + Math.max(maxTurns - minTurns, 0);
        if (Imported.YEP_BuffsStatesCore) {
            if (state.reapplyRules === 1) {
                this._stateTurns[stateId] = minTurns + Math.randomInt(variance);
            } else if (state.reapplyRules === 2) {
                this._stateTurns[stateId] = minTurns + Math.randomInt(variance) + currentTurnCount;
            }
        } else {
            this._stateTurns[stateId] = minTurns + Math.randomInt(variance);
        }
    }
};

Olivia.OctoBattle.BP.___Game_BattlerBase_meetsUsableItemConditions___ = Game_BattlerBase.prototype.meetsUsableItemConditions;
Game_BattlerBase.prototype.meetsUsableItemConditions = function(item) {
    if (Olivia.OctoBattle.BP.___Game_BattlerBase_meetsUsableItemConditions___.call(this, item)) {
        return this.meetsUseBPRequirement(item);
    } else {
        return false;
    }
};

Game_BattlerBase.prototype.meetsUseBPRequirement = function(item) {
    var note = item.note;
    if (note.match(/<Require (\d+) BP>/i) || note.match(/<Require >= (\d+) BP>/i)) {
        var bp = parseInt(RegExp.$1)
        if (this.isActor()) {
            return this.bp >= bp;
        } else {
            return this.storedBP() >= bp;
        }
    } else if (item.note.match(/<Require > (\d+) BP>/i)) {
        var bp = parseInt(RegExp.$1)
        if (this.isActor()) {
            return this.bp > bp;
        } else {
            return this.storedBP() > bp;
        }
    } else if (item.note.match(/<Require = (\d+) BP>/i)) {
        var bp = parseInt(RegExp.$1)
        if (this.isActor()) {
            return this.bp === bp;
        } else {
            return this.storedBP() === bp;
        }
    } else if (item.note.match(/<Require < (\d+) BP>/i)) {
        var bp = parseInt(RegExp.$1)
        if (this.isActor()) {
            return this.bp < bp;
        } else {
            return this.storedBP() < bp;
        }
    } else if (item.note.match(/<Require <= (\d+) BP>/i)) {
        var bp = parseInt(RegExp.$1)
        if (this.isActor()) {
            return this.bp <= bp;
        } else {
            return this.storedBP() <= bp;
        }
    } else {
        return true;
    }
};

//-----------------------------------------------------------------------------
// Game_Battler
//
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.

Game_Battler.prototype.gainStoredBP = function(value) {
    this.setStoredBP(this.storedBP() + value);
};

Game_Battler.prototype.gainUseBP = function(value) {
    this.setUseBP(this.useBP() + value);
};

Game_Battler.prototype.multiplierForBP = function(type) {
    if (type.match(/Damage/i)) {
        var list = Olivia.OctoBattle.BoostPoint.BP_DmgMultiply;
    } else if (type.match(/Turn/i)) {
        var list = Olivia.OctoBattle.BoostPoint.BP_TurnMultiply;
    } else if (type.match(/Repeat/i)) {
        var list = Olivia.OctoBattle.BoostPoint.BP_RepMultiply;
    } else if (type.match(/Analyze/i)) {
        var list = Olivia.OctoBattle.BoostPoint.BP_AnalyzeMultiply;
    } else if (type.match(/BP Effect/i)) {
        var list = Olivia.OctoBattle.BoostPoint.BP_BPEffectMultiply;
    } else {
        return this.useBP();
    }
    var index = this.useBP();
    return list[index] || list[0];
};

Game_Battler.prototype.additionForBP = function(type) {
    if (type.match(/Damage/i)) {
        var list = Olivia.OctoBattle.BoostPoint.BP_DmgAddition;
    } else if (type.match(/Turn/i)) {
        var list = Olivia.OctoBattle.BoostPoint.BP_TurnAddition;
    } else if (type.match(/Repeat/i)) {
        var list = Olivia.OctoBattle.BoostPoint.BP_RepAddition;
    } else if (type.match(/Analyze/i)) {
        var list = Olivia.OctoBattle.BoostPoint.BP_AnalyzeAddition;
    } else if (type.match(/BP Effect/i)) {
        var list = Olivia.OctoBattle.BoostPoint.BP_BPEffectAddition;
    } else {
        return this.useBP();
    }
    var index = this.useBP();
    return parseInt(list[index] || list[0]);
};

Game_Battler.prototype.setupBattleBP = function() {
    var bp = Olivia.OctoBattle.BoostPoint.BP_StartBattle;
    bp = this.setupBattleBPMultiplier(bp);
    bp = this.setupBattleBPAdded(bp);
    this.setStoredBP(bp);
};

Game_Battler.prototype.setupBattleBPMultiplier = function(bp) {
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (!!state) {
            if (state.note.match(/<(?:BP|Boost) Battle Start: (\d+)([%％])>/i)) {
                bp *= parseFloat(RegExp.$1) * 0.01;
            }
        }
    }
    return bp;
};

Game_Battler.prototype.setupBattleBPAdded = function(bp) {
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (!!state) {
            if (state.note.match(/<(?:BP|Boost) Battle Start: ([\+\-]\d+)>/i)) {
                bp += parseInt(RegExp.$1);
            }
        }
    }
    return bp;
};

Game_Battler.prototype.startChangeBPAnimation = function() {
    var index = this.useBP().clamp(0, Olivia.OctoBattle.BoostPoint.BP_MaxUse);
    var animationId = Number(Olivia.OctoBattle.BoostPoint.Animations[index] || Olivia.OctoBattle.BoostPoint.Animations[0]);
    if (animationId > 0) {
        this.startAnimation(animationId);
    }
};

Game_Battler.prototype.canBoostBP = function() {
    if (this.isBoostSealed()) {
        return false;
    }
    return this.bp < Olivia.OctoBattle.BoostPoint.BP_MaxUse && this.storedBP() > 0;
};

Game_Battler.prototype.canUnboostBP = function() {
    return this.bp > 0;
};

Olivia.OctoBattle.BP.___Game_Battler_removeBattleStates___ = Game_Battler.prototype.removeBattleStates;
Game_Battler.prototype.removeBattleStates = function() {
    Olivia.OctoBattle.BP.___Game_Battler_removeBattleStates___.call(this);
    this._storedBP = 0;
    this._useBP = 0;
};

Olivia.OctoBattle.BP.___Game_Battler_regenerateTp___ = Game_Battler.prototype.regenerateTp;
Game_Battler.prototype.regenerateTp = function() {
    Olivia.OctoBattle.BP.___Game_Battler_regenerateTp___.call(this);
    this.regenerateBp();
};

Olivia.OctoBattle.BP.___Game_Battler_regenerateAll___ = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
    Olivia.OctoBattle.BP.___Game_Battler_regenerateAll___.call(this);
    if (Olivia.OctoBattle.BoostPoint.DeathRegen && this.isDead()) {
        this.regenerateBp();
    }
};

Game_Battler.prototype.regenerateBp = function() {
    if (Olivia.OctoBattle.BoostPoint.BP_AlwaysRegen || this._turnUsedBP <= 0) {
        this.gainStoredBP(this.bpRegenValue());
    }
    this._turnUsedBP = 0;
};

Olivia.OctoBattle.BP.___Game_Battler_onAllActionsEnd___ = Game_Battler.prototype.onAllActionsEnd;
Game_Battler.prototype.onAllActionsEnd = function() {
    Olivia.OctoBattle.BP.___Game_Battler_onAllActionsEnd___.call(this);
    this._turnUsedBP += this.useBP();
    this.setUseBP(0);
};

Game_Battler.prototype.bpRegenMultipliers = function(bp) {
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (!!state) {
            if (state.note.match(/<(?:BP|Boost) Regen: (\d+)([%％])>/i)) {
                bp *= parseFloat(RegExp.$1) * 0.01;
            }
        }
    }
    return bp;
};

Game_Battler.prototype.bpRegenAdded = function(bp) {
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (!!state) {
            if (state.note.match(/<(?:BP|Boost) Regen: ([\+\-]\d+)>/i)) {
                bp += parseInt(RegExp.$1);
            }
        }
    }
    return bp;
};

Olivia.OctoBattle.BP.___Game_Battler_addState___ = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
    var isDead = this.isDead();
    Olivia.OctoBattle.BP.___Game_Battler_addState___.call(this, stateId);
    if (Olivia.OctoBattle.BoostPoint.DeathRemoval && !isDead && this.isDead()) {
        this.setStoredBP(0);
    }
};

Olivia.OctoBattle.BP.___Game_Battler_addBuff___ = Game_Battler.prototype.addBuff;
Game_Battler.prototype.addBuff = function(paramId, turns) {
    if (!!$gameTemp._bpTurnRate) {
        $gameTemp._bpTurnFlat = $gameTemp._bpTurnFlat || 0;
        turns = Math.round($gameTemp._bpTurnRate * turns) + $gameTemp._bpTurnFlat;
    }
    Olivia.OctoBattle.BP.___Game_Battler_addBuff___.call(this, paramId, turns);
};

Olivia.OctoBattle.BP.___Game_Battler_addDebuff___ = Game_Battler.prototype.addDebuff;
Game_Battler.prototype.addDebuff = function(paramId, turns) {
    if (!!$gameTemp._bpTurnRate) {
        $gameTemp._bpTurnFlat = $gameTemp._bpTurnFlat || 0;
        turns = Math.round($gameTemp._bpTurnRate * turns) + $gameTemp._bpTurnFlat;
    }
    Olivia.OctoBattle.BP.___Game_Battler_addDebuff___.call(this, paramId, turns);
};

//-----------------------------------------------------------------------------
// Game_Actor
//
// The game object class for an actor.

Game_Actor.prototype.setupBattleBPMultiplier = function(bp) {
    bp = Game_Battler.prototype.setupBattleBPMultiplier.call(this, bp)
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var equip = equips[i];
        if (!!equip) {
            if (equip.note.match(/<(?:BP|Boost) Battle Start: (\d+)([%％])>/i)) {
                bp *= parseFloat(RegExp.$1) * 0.01;
            }
        }
    }
    if (!!this.actor() && this.actor().note.match(/<(?:BP|Boost) Battle Start: (\d+)([%％])>/i)) {
        bp *= parseFloat(RegExp.$1) * 0.01;
    }
    if (!!this.currentClass() && this.currentClass().note.match(/<(?:BP|Boost) Battle Start: (\d+)([%％])>/i)) {
        bp *= parseFloat(RegExp.$1) * 0.01;
    }
    return bp;
};

Game_Actor.prototype.setupBattleBPAdded = function(bp) {
    bp = Game_Battler.prototype.setupBattleBPAdded.call(this, bp)
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var equip = equips[i];
        if (!!equip) {
            if (equip.note.match(/<(?:BP|Boost) Battle Start: ([\+\-]\d+)>/i)) {
                bp += parseInt(RegExp.$1);
            }
        }
    }
    if (!!this.actor() && this.actor().note.match(/<(?:BP|Boost) Battle Start: ([\+\-]\d+)>/i)) {
        bp += parseInt(RegExp.$1);
    }
    if (!!this.currentClass() && this.currentClass().note.match(/<(?:BP|Boost) Battle Start: ([\+\-]\d+)>/i)) {
        bp += parseInt(RegExp.$1);
    }
    return bp;
};

Game_Actor.prototype.bpRegenMultipliers = function(bp) {
    bp = Game_Battler.prototype.bpRegenMultipliers.call(this, bp);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var equip = equips[i];
        if (!!equip) {
            if (equip.note.match(/<(?:BP|Boost) Regen: (\d+)([%％])>/i)) {
                bp *= parseFloat(RegExp.$1) * 0.01;
            }
        }
    }
    if (!!this.actor() && this.actor().note.match(/<(?:BP|Boost) Regen: (\d+)([%％])>/i)) {
        bp *= parseFloat(RegExp.$1) * 0.01;
    }
    if (!!this.currentClass() && this.currentClass().note.match(/<(?:BP|Boost) Regen: (\d+)([%％])>/i)) {
        bp *= parseFloat(RegExp.$1) * 0.01;
    }
    return bp;
};

Game_Actor.prototype.bpRegenAdded = function(bp) {
    bp = Game_Battler.prototype.bpRegenAdded.call(this, bp);
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var equip = equips[i];
        if (!!equip) {
            if (equip.note.match(/<(?:BP|Boost) Regen: ([\+\-]\d+)>/i)) {
                bp += parseInt(RegExp.$1);
            }
        }
    }
    if (!!this.actor() && this.actor().note.match(/<(?:BP|Boost) Regen: ([\+\-]\d+)>/i)) {
        bp += parseInt(RegExp.$1);
    }
    if (!!this.currentClass() && this.currentClass().note.match(/<(?:BP|Boost) Regen: ([\+\-]\d+)>/i)) {
        bp += parseInt(RegExp.$1);
    }
    return bp;
};

//-----------------------------------------------------------------------------
// Game_Enemy
//
// The game object class for an enemy.

Game_Enemy.prototype.setupBattleBPMultiplier = function(bp) {
    bp = Game_Battler.prototype.setupBattleBPMultiplier.call(this, bp)
    if (!!this.enemy() && this.enemy().note.match(/<(?:BP|Boost) Battle Start: (\d+)([%％])>/i)) {
        bp *= parseFloat(RegExp.$1) * 0.01;
    }
    return bp;
};

Game_Enemy.prototype.setupBattleBPAdded = function(bp) {
    bp = Game_Battler.prototype.setupBattleBPAdded.call(this, bp)
    if (!!this.enemy() && this.enemy().note.match(/<(?:BP|Boost) Battle Start: ([\+\-]\d+)>/i)) {
        bp += parseInt(RegExp.$1);
    }
    return bp;
};

Game_Enemy.prototype.bpRegenMultipliers = function(bp) {
    bp = Game_Battler.prototype.bpRegenMultipliers.call(this, bp)
    if (!!this.enemy() && this.enemy().note.match(/<(?:BP|Boost) Regen: (\d+)([%％])>/i)) {
        bp *= parseFloat(RegExp.$1) * 0.01;
    }
    return bp;
};

Game_Enemy.prototype.bpRegenAdded = function(bp) {
    bp = Game_Battler.prototype.bpRegenAdded.call(this, bp);
    if (!!this.enemy() && this.enemy().note.match(/<(?:BP|Boost) Regen: ([\+\-]\d+)>/i)) {
        bp += parseInt(RegExp.$1);
    }
    return bp;
};

Olivia.OctoBattle.BP.___Game_Enemy_setup___ = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    Olivia.OctoBattle.BP.___Game_Enemy_setup___.call(this, enemyId, x, y);
    this.setupBoostAI();
};

Game_Enemy.prototype.setupBoostAI = function() {
    if (this.enemy()._boostAI === undefined) {
        this.enemy()._boostAI = {};
        var notedata = this.enemy().note.split(/[\r\n]+/);
        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<Boost Skill (\d+):[ ](.*)>/i)) {
                var skillId = 'Skill ' + parseInt(RegExp.$1);
                var aiData = String(RegExp.$2).toLowerCase();
                this.enemy()._boostAI[skillId] = aiData;
            } else if (line.match(/<Boost[ ](.*):[ ](.*)>/i)) {
                var skillName = String(RegExp.$1);
                var aiData = String(RegExp.$2).toLowerCase();
                this.enemy()._boostAI[skillName] = aiData;
            }
        }
    }
};

Game_Enemy.prototype.processUseBP = function(skill) {
    this.setupBoostAI();
    var bp = this.calculateBPtoUse(skill);
    if (bp > 0) {
        this.processEnemyBPUsage(bp);
        this.startChangeBPAnimation();
    }
};

Game_Enemy.prototype.calculateBPtoUse = function(skill) {
    if (this.storedBP() <= 0) {
        return 0;
    }
    var skillName = skill.name;
    var skillId = 'Skill ' + skill.id;
    var bp = 0;
    if (this.enemy()._boostAI[skillName] || this.enemy()._boostAI[skillId]) {
        var aiData = this.enemy()._boostAI[skillName] || this.enemy()._boostAI[skillId];
        if (aiData.match(/(?:All|Full)/i)) {
            bp = this.storedBP();
        } else if (aiData.match(/at least (\d+)/i)) {
            var value = parseInt(RegExp.$1);
            if (this.storedBP() >= value) {
                bp = this.storedBP();
            }
        } else if (aiData.match(/at most (\d+)/i)) {
            var value = parseInt(RegExp.$1);
            if (this.storedBP() <= value) {
                bp = this.storedBP();
            }
        } else if (aiData.match(/exactly (\d+)/i)) {
            var value = parseInt(RegExp.$1);
            if (this.storedBP() === value) {
                bp = value;
            }
        }
    }
    return bp.clamp(0, Olivia.OctoBattle.BoostPoint.BP_MaxUse);
};

Game_Enemy.prototype.processEnemyBPUsage = function(bp) {
    bp = bp.clamp(0, this.storedBP());
    bp = bp.clamp(0, Olivia.OctoBattle.BoostPoint.BP_MaxUse);
    this.gainStoredBP(-bp);
    this.gainUseBP(bp);
};

Game_Enemy.prototype.startChangeBPAnimation = function() {
    var wait = 0;
    var bp = this.useBP().clamp(0, Olivia.OctoBattle.BoostPoint.BP_MaxUse);
    for (var i = 1; i <= bp; i++) {
        var animationId = Olivia.OctoBattle.BoostPoint.Animations[i] || Olivia.OctoBattle.BoostPoint.Animations[0];
        if (animationId > 0) {
            this.startAnimation(animationId, false, wait);
        }
        wait += 60;
    }
    wait = Math.round(wait)
    if (Imported.YEP_BattleEngineCore) {
        BattleManager.actionWait(wait);
    } else {
        SceneManager._scene._logWindow._waitCount = wait;
    }
};

//-----------------------------------------------------------------------------
// Game_Unit
//
// The superclass of Game_Party and Game_Troop.

Game_Unit.prototype.setupBattleBP = function() {
    var inBattle = this._inBattle;
    this._inBattle = false;
    var members = this.members();
    for (var i = 0; i < members.length; i++) {
        var member = members[i];
        if (member) {
            member.setupBattleBP();
        }
    }
    this._inBattle = inBattle;
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.

Olivia.OctoBattle.BP.___Scene_Battle_createActorCommandWindow___ = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    Olivia.OctoBattle.BP.___Scene_Battle_createActorCommandWindow___.call(this);
    this._actorCommandWindow.setHandler('boost', this.commandBoost.bind(this));
    this._actorCommandWindow.setHandler('unboost', this.commandUnboost.bind(this));
};

Scene_Battle.prototype.commandBoost = function() {
    BattleManager.actor().gainStoredBP(-1);
    BattleManager.actor().gainUseBP(1);
    BattleManager.actor().startChangeBPAnimation();
    this._helpWindow.refresh();
    this._actorCommandWindow._active = true;
    this._actorCommandWindow.refresh();
    if (this._itemConcoctPreviewWindow) {
        this._itemConcoctPreviewWindow.refresh();
    }
};

Scene_Battle.prototype.commandUnboost = function() {
    BattleManager.actor().gainUseBP(-1);
    BattleManager.actor().gainStoredBP(1);
    BattleManager.actor().startChangeBPAnimation();
    this._helpWindow.refresh();
    this._actorCommandWindow._active = true;
    this._actorCommandWindow.refresh();
    if (this._itemConcoctPreviewWindow) {
        this._itemConcoctPreviewWindow.refresh();
    }
};

Olivia.OctoBattle.BP.___Scene_Battle_selectNextCommand___ = Scene_Battle.prototype.selectNextCommand;
Scene_Battle.prototype.selectNextCommand = function() {
    this._helpWindow.clearBPSubject();
    Olivia.OctoBattle.BP.___Scene_Battle_selectNextCommand___.call(this);
};

Olivia.OctoBattle.BP.___Scene_Battle_startActorCommandSelection___ = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    Olivia.OctoBattle.BP.___Scene_Battle_startActorCommandSelection___.call(this);
    this._helpWindow.setBPSubject(BattleManager.actor());
};

//-----------------------------------------------------------------------------
// Window_Base
//
// The superclass of all windows within the game.

Window_Base.prototype.drawBoostIcons = function(battler, x, y) {
    var filled = battler.storedBP();
    var empty = Olivia.OctoBattle.BoostPoint.BP_MaxStored - filled;
    var iconWidth = Window_Base._iconWidth;
    if (Olivia.OctoBattle.BoostPoint.SmallIcon) {
        var x0 = x;
        iconWidth = Math.round(iconWidth * Olivia.OctoBattle.BoostPoint.IconSize);
    }
    while (filled > 0) {
        filled--;
        if (Olivia.OctoBattle.BoostPoint.SmallIcon) {
            this.drawSmallBoostIcon(Olivia.OctoBattle.BoostPoint.BoostIcon, x, y);
        } else {
            this.drawIcon(Olivia.OctoBattle.BoostPoint.BoostIcon, x, y);
        }
        x += iconWidth;
    }
    while (empty > 0) {
        empty--;
        if (Olivia.OctoBattle.BoostPoint.SmallIcon) {
            this.drawSmallBoostIcon(Olivia.OctoBattle.BoostPoint.EmptyIcon, x, y);
        } else {
            this.drawIcon(Olivia.OctoBattle.BoostPoint.EmptyIcon, x, y);
        }
        x += iconWidth;
    }
    if (Olivia.OctoBattle.BoostPoint.SmallIcon) {
        var text = Olivia.OctoBattle.BoostPoint.SmallText;
        var align = Olivia.OctoBattle.BoostPoint.TextAlign;
        var height = this.lineHeight() - 4 - iconWidth;
        var maxWidth = x - x0;
        y += height;
        this.contents.fontSize *= 1 - Olivia.OctoBattle.BoostPoint.IconSize;
        this.contents.drawText(text, x0, y, maxWidth, height, align);
    }
    this.resetFontSettings();
    return x;
};

Window_Base.prototype.drawSmallBoostIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var rate = Olivia.OctoBattle.BoostPoint.IconSize;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, Math.round(pw * rate), Math.round(ph * rate));
};

Window_Base.prototype.setBPSubject = function(battler) {
    this._bpSubject = battler;
};

Window_Base.prototype.clearBPSubject = function() {
    this._bpSubject = undefined;
};

Olivia.OctoBattle.BP.___Window_Base_convertEscapeCharacters___ = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = Olivia.OctoBattle.BP.___Window_Base_convertEscapeCharacters___.call(this, text);
    text = this.convertBPEscapeCharacters(text);
    return text;
};

Window_Base.prototype.convertBPEscapeCharacters = function(text) {
    text = text.replace(/\x1bBPDMG\[(\d+)\]/gi, function() {
        return this.convertBPDamageEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bBPDAMAGE\[(\d+)\]/gi, function() {
        return this.convertBPDamageEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bBPTURN\[(\d+)\]/gi, function() {
        return this.convertBPTurnEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bBPREP\[(\d+)\]/gi, function() {
        return this.convertBPRepeatEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bBPREPEAT\[(\d+)\]/gi, function() {
        return this.convertBPRepeatEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bBPHITS\[(\d+)\]/gi, function() {
        return this.convertBPRepeatEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bBPANALYZE\[(\d+)\]/gi, function() {
        return this.convertBPAnalyzeEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bBPEFFECT\[(\d+)\]/gi, function() {
        return this.convertBPEffectEscape(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bBP\[(.*?)\]/gi, function() {
        return this.convertBPUpEscape(String(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bBP0\[(.*?)\]/gi, function() {
        return this.convertBP0Escape(String(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bBP=(\d+)\[(.*?)\]/gi, function() {
        return this.convertBPEqualEscape(parseInt(arguments[1]), String(arguments[2]));
    }.bind(this));
    text = text.replace(/\x1bBP=(\d+)\[(.*?)\]/gi, function() {
        return this.convertBPEqualEscape(parseInt(arguments[1]), String(arguments[2]));
    }.bind(this));
    text = text.replace(/\x1bBP\<=(\d+)\[(.*?)\]/gi, function() {
        return this.convertBPLessEqualEscape(parseInt(arguments[1]), String(arguments[2]));
    }.bind(this));
    text = text.replace(/\x1bBP\<(\d+)\[(.*?)\]/gi, function() {
        return this.convertBPLessEscape(parseInt(arguments[1]), String(arguments[2]));
    }.bind(this));
    text = text.replace(/\x1bBP\>=(\d+)\[(.*?)\]/gi, function() {
        return this.convertBPGreaterEqualEscape(parseInt(arguments[1]), String(arguments[2]));
    }.bind(this));
    text = text.replace(/\x1bBP\>(\d+)\[(.*?)\]/gi, function() {
        return this.convertBPGreaterEscape(parseInt(arguments[1]), String(arguments[2]));
    }.bind(this));
    return text;
};

Window_Base.prototype.convertBPDamageEscape = function(value) {
    if (!!this._bpSubject) {
        var rate = this._bpSubject.multiplierForBP('Damage');
        value = Math.round(value * rate);
        value += this._bpSubject.additionForBP('Damage');
    }
    return value;
};

Window_Base.prototype.convertBPTurnEscape = function(value) {
    if (!!this._bpSubject) {
        var rate = this._bpSubject.multiplierForBP('Turn');
        value = Math.round(value * rate);
        value += this._bpSubject.additionForBP('Turn');
    }
    return value;
};

Window_Base.prototype.convertBPRepeatEscape = function(value) {
    if (!!this._bpSubject) {
        var rate = this._bpSubject.multiplierForBP('Repeat');
        value = Math.round(value * rate);
        value += this._bpSubject.additionForBP('Repeat');
    }
    return value;
};

Window_Base.prototype.convertBPAnalyzeEscape = function(value) {
    if (!!this._bpSubject) {
        var rate = this._bpSubject.multiplierForBP('Analyze');
        value = Math.round(value * rate);
        value += this._bpSubject.additionForBP('Analyze');
    }
    return value;
};

Window_Base.prototype.convertBPEffectEscape = function(value) {
    if (!!this._bpSubject) {
        var rate = this._bpSubject.multiplierForBP('BP Effect');
        value = Math.round(value * rate);
        value += this._bpSubject.additionForBP('BP Effect');
    }
    return value;
};

Window_Base.prototype.convertBPUpEscape = function(str) {
    if (!!this._bpSubject && this._bpSubject.bp > 0) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBP0Escape = function(str) {
    if (!this._bpSubject || this._bpSubject.bp <= 0) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBPEqualEscape = function(bp, str) {
    if (!!this._bpSubject && this._bpSubject.bp === bp) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBPEqualEscape = function(bp, str) {
    if (!!this._bpSubject && this._bpSubject.bp === bp) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBPLessEqualEscape = function(bp, str) {
    if (!!this._bpSubject && this._bpSubject.bp <= bp) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBPLessEscape = function(bp, str) {
    if (!!this._bpSubject && this._bpSubject.bp < bp) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBPGreaterEqualEscape = function(bp, str) {
    if (!!this._bpSubject && this._bpSubject.bp >= bp) {
        return str;
    } else {
        return '';
    }
};

Window_Base.prototype.convertBPGreaterEscape = function(bp, str) {
    if (!!this._bpSubject && this._bpSubject.bp > bp) {
        return str;
    } else {
        return '';
    }
};

//-----------------------------------------------------------------------------
// Window_Selectable
//
// The window class with cursor movement and scroll functions.

if (Olivia.OctoBattle.BoostPoint.LRButtons) {

Olivia.OctoBattle.BP.___Window_Selectable_cursorPagedown___ = Window_Selectable.prototype.cursorPagedown;
Window_Selectable.prototype.cursorPagedown = function() {
    if (SceneManager._scene instanceof Scene_Battle && !this._isBoostRestricted) {
        if (BattleManager.actor() && BattleManager.actor().canBoostBP()) {
            SceneManager._scene.commandBoost();
            SceneManager._scene._actorCommandWindow._active = false;
            this.refresh();
        }
        Input.clear();
    } else {
        Olivia.OctoBattle.BP.___Window_Selectable_cursorPagedown___.call(this);
    }
};

Olivia.OctoBattle.BP.___Window_Selectable_cursorPageup___ = Window_Selectable.prototype.cursorPageup;
Window_Selectable.prototype.cursorPageup = function() {
    if (SceneManager._scene instanceof Scene_Battle && !this._isBoostRestricted) {
        if (BattleManager.actor() && BattleManager.actor().canUnboostBP()) {
            SceneManager._scene.commandUnboost();
            SceneManager._scene._actorCommandWindow._active = false;
            this.refresh();
        }
        Input.clear();
    } else {
        Olivia.OctoBattle.BP.___Window_Selectable_cursorPageup___.call(this);
    }
};

}

//-----------------------------------------------------------------------------
// Window_ActorCommand
//
// The window for selecting an actor's action on the battle screen.

Olivia.OctoBattle.BP.___Window_ActorCommand_addGuardCommand___ = Window_ActorCommand.prototype.addGuardCommand;
Window_ActorCommand.prototype.addGuardCommand = function() {
    this.addBoostCommand();
    this.addUnboostCommand();
    Olivia.OctoBattle.BP.___Window_ActorCommand_addGuardCommand___.call(this);
};

Window_ActorCommand.prototype.addBoostCommand = function() {
    if (Olivia.OctoBattle.BoostPoint.BoostShow) {
        var name = Olivia.OctoBattle.BoostPoint.BoostCmd;
        var enabled = this._actor.canBoostBP();
        this.addCommand(name, 'boost', enabled);
    }
};

Window_ActorCommand.prototype.addUnboostCommand = function() {
    if (Olivia.OctoBattle.BoostPoint.UnboostShow) {
        var name = Olivia.OctoBattle.BoostPoint.UnboostCmd;
        var enabled = this._actor.canUnboostBP();
        this.addCommand(name, 'unboost', enabled);
    }
};

Window_ActorCommand.prototype.playOkSound = function() {
    if (this.currentSymbol() !== 'boost' && this.currentSymbol() !== 'unboost') {
        Window_Selectable.prototype.playOkSound.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_BattleStatus
//
// The window for displaying the status of party members on the battle screen.

if (Olivia.OctoBattle.BoostPoint.ShowIcons) {

Olivia.OctoBattle.BP.Window_BattleStatus_drawBasicArea = Window_BattleStatus.prototype.drawBasicArea;
Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    var x = this.drawBoostIcons(actor, rect.x, rect.y + 2);
    rect.x += x + 2;
    rect.width -= x + 2;
    Olivia.OctoBattle.BP.Window_BattleStatus_drawBasicArea.call(this, rect, actor);
};

}

//-----------------------------------------------------------------------------
// Window_BattleActor
//
// The window for selecting a target actor on the battle screen.

Olivia.OctoBattle.BP.___Window_BattleActor_initialize___ = Window_BattleActor.prototype.initialize;
Window_BattleActor.prototype.initialize = function(x, y) {
    this._isBoostRestricted = true;
    Olivia.OctoBattle.BP.___Window_BattleActor_initialize___.call(this, x, y);
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//
// The window for selecting a target enemy on the battle screen.

Olivia.OctoBattle.BP.___Window_BattleEnemy_initialize___ = Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(x, y) {
    this._isBoostRestricted = true;
    Olivia.OctoBattle.BP.___Window_BattleEnemy_initialize___.call(this, x, y);
};

//=============================================================================
} // End Boost Point System
//=============================================================================  

//=============================================================================
// Weapon Swap System
//
// 1. Player can swap actor's weapons in the middle of battle
// 2. They must be equipped before entering battle

if (Olivia.OctoBattle.WeaponSwap.Enabled) {

Olivia.OctoBattle.Weapon = Olivia.OctoBattle.Weapon || {};

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages battle progress.

if (Imported.YEP_BattleEngineCore) {

Olivia.OctoBattle.Weapon.___BattleManager_processActionSequence___ = BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
    if (actionName === 'WEAPON SWAP' || actionName === 'SWAP WEAPON') {
      return this.actionWeaponSwap(actionArgs);
    }
    return Olivia.OctoBattle.Weapon.___BattleManager_processActionSequence___.call(this, actionName, actionArgs);
}

BattleManager.actionWeaponSwap = function(actionArgs) {
    var targets =
      this.makeActionTargets(actionArgs[0]).filter(Yanfly.Util.onlyUnique);
    var weapon = actionArgs[1];
    if ($dataSystem.weaponTypes.contains(weapon)) {
        var wType = $dataSystem.weaponTypes.indexOf(weapon);
    } else {
        var wType = parseInt(weapon);
    }
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        if (!!target && target.isActor()) {
            target.switchToWeaponType(wType);
        }
    }
};

}

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.

Olivia.OctoBattle.Weapon.___Game_BattlerBase_paySkillCost___ = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Olivia.OctoBattle.Weapon.___Game_BattlerBase_paySkillCost___.call(this, skill);
    if (this.isActor()) {
        this.applyWeaponSwapOnCost(skill);
    }
};

Olivia.OctoBattle.Weapon.___Game_BattlerBase_meetsSkillConditions___ = Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    if (this.failsToMeetSkillConditionRequireAnyWeapon(skill)) {
        return false;
    } else if (this.failsToMeetSkillConditionRequireWeaponTypes(skill)) {
        return false;
    } else {
        return Olivia.OctoBattle.Weapon.___Game_BattlerBase_meetsSkillConditions___.call(this, skill);
    }
};

Game_BattlerBase.prototype.failsToMeetSkillConditionRequireAnyWeapon = function(skill) {
    return skill.note.match(/<Require Any Weapon>/i) && this.isActor() && !this.equips()[0];
};

Game_BattlerBase.prototype.failsToMeetSkillConditionRequireWeaponTypes = function(skill) {
    if (this.isEnemy()) {
        return false;
    } else if (Olivia.OctoBattle.WeaponSwap.Enabled) {
        if (skill.note.match(/<Require Weapon Types:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            for (var i = 0; i < array.length; i++) {
                var wtypeId = array[i];
                if (!this.isWtypeEquipped(wtypeId)) {
                    return true;
                }
            }
        }
    }
    return false;
};

//-----------------------------------------------------------------------------
// Game_Actor
//
// The game object class for an actor.

Olivia.OctoBattle.Weapon.___Game_Actor_initEquips___ = Game_Actor.prototype.initEquips;
Game_Actor.prototype.initEquips = function(equips) {
    Olivia.OctoBattle.Weapon.___Game_Actor_initEquips___.call(this, equips);
    this.initializeWeaponSwap();
};

Game_Actor.prototype.initializeWeaponSwap = function() {
    this._usedWeaponSlot = 0;
    this._swapWeapons = [];
    for (var i = 0; i < $dataSystem.weaponTypes.length; i++) {
        if (this.isEquipWtypeOk(i)) {
            this._usedWeaponSlot = this._usedWeaponSlot || i;
        }
        this._swapWeapons.push(0);
    }
    var weapon = this.weapons()[0];
    if (!!weapon) {
        var index = weapon.wtypeId;
        this._swapWeapons[index] = weapon.id;
    }
};

Game_Actor.prototype.isDualWield = function() {
    return false;
};

Game_Actor.prototype.isWtypeEquipped = function(wtypeId) {
    if (this._swapWeapons === undefined) {
        this.initializeWeaponSwap();
    }
    return this._swapWeapons[wtypeId] > 0;
};

Game_Actor.prototype.getSwapWeapons = function() {
    if (this._swapWeapons === undefined) {
        this.initializeWeaponSwap();
    }
    var weapons = [];
    for (var i = 1; i < this._swapWeapons.length; i++) {
        weaponId = this._swapWeapons[i];
        weapons.push($dataWeapons[weaponId]);
    }
    return weapons;
};

Game_Actor.prototype.getFirstSwapWeapon = function() {
    if (this._swapWeapons === undefined) {
        this.initializeWeaponSwap();
    }
    for (var i = 1; i < this._swapWeapons.length; i++) {
        weaponId = this._swapWeapons[i];
        if (weaponId > 0) {
            return $dataWeapons[weaponId];
        }
    }
    return null;
};

Game_Actor.prototype.setSwapWeaponSlot = function(index, id) {
    if (this._swapWeapons === undefined) {
        this.initializeWeaponSwap();
    }
    this._swapWeapons[index] = id;
};

Olivia.OctoBattle.Weapon.___Game_Actor_changeEquip___ = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
    if (slotId === 0) {
        this.changeWeapon(item);
    } else {
        Olivia.OctoBattle.Weapon.___Game_Actor_changeEquip___.call(this, slotId, item);
    }
};

Game_Actor.prototype.changeWeapon = function(weapon) {
    var currentWeapon = this.weapons()[0];
    if (!!weapon) {
        this.switchToWeaponType(weapon.wtypeId, false);
        currentWeapon = this.weapons()[0];
        var index = weapon.wtypeId;
        if (!!currentWeapon && currentWeapon.wtypeId === weapon.wtypeId) {
            this.tradeItemWithParty(weapon, currentWeapon);
        } else {
            this.tradeItemWithParty(weapon, null);
        }
        this.setSwapWeaponSlot(index, weapon.id);
        this._usedWeaponSlot = index;
        this._equips[0].setObject(weapon);
    } else if (!!currentWeapon) {
        var index = currentWeapon.wtypeId;
        this.setSwapWeaponSlot(index, 0);
        this.tradeItemWithParty(null, currentWeapon);
        this._equips[0].setObject(null);
        var firstSwapWeapon = this.getFirstSwapWeapon();
        if (firstSwapWeapon) {
            this._usedWeaponSlot = firstSwapWeapon.wtypeId;
        } else {
            this._usedWeaponSlot = 1;
        }
    }
    this.refresh();
};

Game_Actor.prototype.switchToWeaponType = function(wtype, animation) {
    var weapon = $dataWeapons[this._swapWeapons[wtype]];
    this._equips[0].setObject(weapon);
    this._usedWeaponSlot = wtype;
    this.refresh();
    if ($gameParty.inBattle() && animation && Olivia.OctoBattle.WeaponSwap.BattleAction) {
        this.performAttack();
    }
};

Game_Actor.prototype.swapWeaponBattle = function(direction) {
    if (this._swapWeapons === undefined) {
        this.initializeWeaponSwap();
    }
    var slot = this._usedWeaponSlot;
    while (true) {
        if (direction === 'right') {
            slot += 1;
            if (slot >= $dataSystem.weaponTypes.length) {
                slot = 1;
            }
        } else {
            slot -= 1;
            if (slot <= 0) {
              slot = $dataSystem.weaponTypes.length - 1;
            }
        }
        if (this._swapWeapons[slot] > 0) {
            this._usedWeaponSlot = slot;
            this.switchToWeaponType(slot, true)
            break;
        }
        if (slot === this._usedWeaponSlot) {
            break;
        }
    }
};

Game_Actor.prototype.applyWeaponSwapOnCost = function(skill) {
    if (skill.note.match(/<Switch to Weapon: (\d+)>/i)) {
        var wtype = parseInt(RegExp.$1).clamp(1, $dataSystem.weaponTypes.length - 1);
    } else if (skill.note.match(/<Switch to Weapon: (.*)>/i)) {
        var name = String(RegExp.$1);
        var wtype = $dataSystem.weaponTypes.indexOf(name)
        if (wtype > 0) {
            this.switchToWeaponType(wtype);
        }
    }
};

Olivia.OctoBattle.Weapon.___Game_Actor_releaseUnequippableItems___ = Game_Actor.prototype.releaseUnequippableItems;
Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
    if (this._swapWeapons === undefined) {
        this.initializeWeaponSwap();
    }
    Olivia.OctoBattle.Weapon.___Game_Actor_releaseUnequippableItems___.call(this, forcing);
    for (var i = 1; i < this._swapWeapons.length; i++) {
        var weaponId = this._swapWeapons[i];
        if (weaponId > 0) {
            var weapon = $dataWeapons[weaponId];
            if (!this.canEquip(weapon)) {
                if (!forcing) {
                    this.tradeItemWithParty(null, weapon);
                }
                this._swapWeapons[i] = 0;
            }
        }
    }
};

Game_Actor.prototype.optimizeEquipments = function() {
    var maxSlots = this.equipSlots().length;
    this.clearEquipments();
    for (var i = 1; i < maxSlots; i++) {
        if (this.isEquipChangeOk(i)) {
            this.changeEquip(i, this.bestEquipItem(i));
        }
    }
    this.optimizeWeapons();
};

Game_Actor.prototype.optimizeWeapons = function() {
    var currentWeaponSlot = this._usedWeaponSlot;
    for (var wtypeId = 1; wtypeId < $dataSystem.weaponTypes.length; wtypeId++) {
        if (this.isEquipWtypeOk(wtypeId)) {
            this.changeWeapon(this.bestEquipWeapon(wtypeId));
        }
    }
    this._usedWeaponSlot = currentWeaponSlot;
};

Game_Actor.prototype.bestEquipWeapon = function(wtypeId) {
    var items = $gameParty.weapons().filter(function(weapon) {
        return weapon.wtypeId === wtypeId && this.isEquipWtypeOk(wtypeId);
    }, this);
    var bestItem = null;
    var bestPerformance = -1000;
    for (var i = 0; i < items.length; i++) {
        var performance = this.calcEquipItemPerformance(items[i]);
        if (performance > bestPerformance) {
            bestPerformance = performance;
            bestItem = items[i];
        }
    }
    return bestItem;
};

Game_Actor.prototype.clearEquipments = function() {
    var maxSlots = this.equipSlots().length;
    for (var i = 1; i < maxSlots; i++) {
        if (this.isEquipChangeOk(i)) {
            this.changeEquip(i, null);
        }
    }
    this.clearWeapons();
};

Game_Actor.prototype.clearWeapons = function() {
    if (Imported.YEP_EquipCore && Yanfly.Param.EquipNonRemove.contains(1)) {
        return;
    }
    var slotId = 0;
    for (var wtypeId = 1; wtypeId < $dataSystem.weaponTypes.length; wtypeId++) {
        if (this.isEquipWtypeOk(wtypeId)) {
            slotId = slotId || wtypeId;
            this.switchToWeaponType(wtypeId, false);
            this.changeWeapon(null);
        }
    }
    this._usedWeaponSlot = slotId;
};

//-----------------------------------------------------------------------------
// Game_Party
//
// The game object class for the party. Information such as gold and items is
// included.

if (Olivia.OctoBattle.WeaponSwap.WpnBattleTest) {

Olivia.OctoBattle.Weapon.___Game_Party_setupBattleTestMembers___ = Game_Party.prototype.setupBattleTestMembers;
Game_Party.prototype.setupBattleTestMembers = function() {
    Olivia.OctoBattle.Weapon.___Game_Party_setupBattleTestMembers___.call(this);
    var weapons = this.createBattleTestWeaponTypes();
    var members = this.members();
    for (var i = 0; i < members.length; i++) {
        member = members[i];
        if (!!member) {
            for (var w = 1; w < weapons.length; w++) {
                if (!member.isWtypeEquipped(w)) {
                    member.changeEquip(0, weapons[w]);
                }
            }
            if (!!member.getFirstSwapWeapon()) {
                member.switchToWeaponType(member.getFirstSwapWeapon().wtypeId, false);
            } else {
                member.switchToWeaponType(0, false);
            }
        }
    }
};

Game_Party.prototype.createBattleTestWeaponTypes = function() {
    var weapons = [null];
    for (var wtypeId = 1; wtypeId < $dataSystem.weaponTypes.length; wtypeId++) {
        weapons.push(this.battleTestGetFirstOfWtype(wtypeId));
    }
    return weapons;
};

Game_Party.prototype.battleTestGetFirstOfWtype = function(wtypeId) {
    for (var id = 1; id < $dataWeapons.length; id++) {
        var weapon = $dataWeapons[id];
        if (!!weapon && weapon.wtypeId === wtypeId) {
            return weapon;
        }
    }
    var message = 'You do not have a weapon made for weapon type ' + wtypeId;
    SceneManager.stop();
    Graphics.printError('Weapon Swap Error', message);
    return null;
};

}

//-----------------------------------------------------------------------------
// Scene_Equip
//
// The scene class of the equipment screen.

Olivia.OctoBattle.Weapon.___Scene_Equip_onSlotOk___ = Scene_Equip.prototype.onSlotOk;
Scene_Equip.prototype.onSlotOk = function() {
    if (Imported.YEP_EquipCore) {
        this._itemWindow._slotId = -1;
        var slotId = this._slotWindow.index();
        this._itemWindow.setSlotId(slotId);
        Yanfly.Equip.Scene_Equip_onSlotOk.call(this);
        this._itemWindow.show();
    } else {
        Olivia.OctoBattle.Weapon.___Scene_Equip_onSlotOk___.call(this);
    }
};

Scene_Equip.prototype.onItemOk = function() {
    SoundManager.playEquip();
    var slotId = this._slotWindow.index();
    if (slotId < $dataSystem.weaponTypes.length - 1) {
        slotId = 0;
    } else {
        slotId -= $dataSystem.weaponTypes.length - 2;
    }
    this.actor().changeEquip(slotId, this._itemWindow.item());
    this._slotWindow.activate();
    this._slotWindow.refresh();
    this._itemWindow.deselect();
    this._itemWindow.refresh();
    this._statusWindow.refresh();
    if (Imported.YEP_EquipCore) {
        this._itemWindow.hide();
        this._statusWindow.refresh();
    }
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.

Olivia.OctoBattle.Weapon.___Scene_Battle_createActorCommandWindow___ = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    Olivia.OctoBattle.Weapon.___Scene_Battle_createActorCommandWindow___.call(this);
    this._actorCommandWindow.setHandler('weaponSwap', this.commandWeaponSlot.bind(this));
};

Scene_Battle.prototype.commandWeaponSlot = function() {
    BattleManager.actor().swapWeaponBattle('right');
    this._actorCommandWindow.refresh();
    this._actorCommandWindow.activate();
};

//-----------------------------------------------------------------------------
// Sprite_WindowArrow
//
// The sprite class with a feature which displays animations.

function Sprite_WindowArrow() {
    this.initialize.apply(this, arguments);
}

Sprite_WindowArrow.prototype = Object.create(Sprite.prototype);
Sprite_WindowArrow.prototype.constructor = Sprite_WindowArrow;

Sprite_WindowArrow.prototype.initialize = function(parent, direction) {
    this._parent = parent;
    this._direction = direction;
    Sprite.prototype.initialize.call(this);
    this.createBitmap();
};

Sprite_WindowArrow.prototype.createBitmap = function() {
    this.bitmap = ImageManager.loadSystem('Window');
    this.bitmap.addLoadListener(this.setupBitmap.bind(this));
};

Sprite_WindowArrow.prototype.setupBitmap = function() {
    if (this._direction === 'left') {
        this.setFrame(120, 36, 24, 24);
        this.anchor.x = -0.1;
        this.x = 0;
    } else {
        this.setFrame(144, 36, 24, 24);
        this.anchor.x = 1.1;
        this.x = this._parent.width;
    }
    this.anchor.y = 0.5;
};

Sprite_WindowArrow.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateOpacity();
};

Sprite_WindowArrow.prototype.updateOpacity = function() {
    if (!this._parent.visible || this._parent.contentsOpacity < 255 || this._parent.openness < 255) {
        this.opacity = 0;
        this._currentIndex = -1;
    } else if (this._currentIndex !== this._parent.index()) {
        this._currentIndex = this._parent.index();
        var rect = this._parent.itemRect(this._parent.findSymbol('attack'));
        var y = rect.y + this._parent.standardPadding();
        if (y > 0 && y < (this._parent.height - this._parent.standardPadding() * 2)) {
            y += Math.round(this._parent.lineHeight() / 2);
            this.opacity = 255;
            this.y = y;
        } else {
            this.opacity = 0;
        }
    }
};

//-----------------------------------------------------------------------------
// Window_EquipSlot
//
// The window for selecting an equipment slot on the equipment screen.

Window_EquipSlot.prototype.maxItems = function() {
    if (!!this._actor) {
        var slots = this._actor.equipSlots().length - 1;
        slots += $dataSystem.weaponTypes.length - 1;
        return slots;
    } else {
        return 0;
    }
};

Olivia.OctoBattle.Weapon.___Window_EquipSlot_slotName___ = Window_EquipSlot.prototype.slotName;
Window_EquipSlot.prototype.slotName = function(index) {
    if (index < $dataSystem.weaponTypes.length - 1) {
        return $dataSystem.weaponTypes[index + 1];
    } else {
        index -= $dataSystem.weaponTypes.length - 2;
    }
    return Olivia.OctoBattle.Weapon.___Window_EquipSlot_slotName___.call(this, index);
};

Olivia.OctoBattle.Weapon.___Window_EquipSlot_isEnabled___ = Window_EquipSlot.prototype.isEnabled;
Window_EquipSlot.prototype.isEnabled = function(index) {
    if (index < $dataSystem.weaponTypes.length - 1) {
        index += 1;
        return this._actor.isEquipWtypeOk(index);
    } else {
        index -= $dataSystem.weaponTypes.length - 2;
        return Olivia.OctoBattle.Weapon.___Window_EquipSlot_isEnabled___.call(this, index);
    }
};

Window_EquipSlot.prototype.item = function() {
    if (!!this._actor) {
        var index = this.index();
        return this.getItemFromIndex(index);
    } else {
        return null;
    }
    return this._actor ? this._actor.equips()[this.index()] : null;
};

Window_EquipSlot.prototype.drawItem = function(index) {
    if (Imported.YEP_EquipCore) {
        this.drawItemWeaponSwapEquipCore(index);
    } else {
        this.drawItemWeaponSwapBase(index);
    }
};

Window_EquipSlot.prototype.getItemFromIndex = function(index) {
    if (index < $dataSystem.weaponTypes.length - 1) {
        return this._actor.getSwapWeapons()[index];
    } else {
        index -= $dataSystem.weaponTypes.length - 2;
        return this._actor.equips()[index];
    }
}

Window_EquipSlot.prototype.drawItemWeaponSwapEquipCore = function(index) {
    if (!this._actor) return;
    var rect = this.itemRectForText(index);
    this.changeTextColor(this.systemColor());
    this.changePaintOpacity(this.isEnabled(index));
    var ww1 = this._nameWidth;
    this.drawText(this.slotName(index), rect.x, rect.y, ww1);
    var ww2 = rect.width - ww1;
    var item = this.getItemFromIndex(index)
    if (item) {
        this.drawItemName(item, rect.x + ww1, rect.y, ww2);
    } else if (this.isEnabled(index)) {
        this.drawEmptySlot(rect.x + ww1, rect.y, ww2);
    }
    this.changePaintOpacity(true);
};

Window_EquipSlot.prototype.drawItemWeaponSwapBase = function(index) {
    if (this._actor) {
        var rect = this.itemRectForText(index);
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(this.isEnabled(index));
        this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
        this.drawItemName(this.getItemFromIndex(index), rect.x + 138, rect.y);
        this.changePaintOpacity(true);
    }
};

Olivia.OctoBattle.Weapon.___Window_EquipSlot_updateHelp___ = Window_EquipSlot.prototype.updateHelp;
Window_EquipSlot.prototype.updateHelp = function() {
    if (this._statusWindow) {
        var actor = JsonEx.makeDeepCopy(this._actor);
        if (this.index() < $dataSystem.weaponTypes.length - 1) {
            var item = this._actor.getSwapWeapons()[this.index()];
        } else {
            var item = null;
        }
        actor.forceChangeEquip(0, item);
        this._statusWindow.setActor(actor);
    }
    Olivia.OctoBattle.Weapon.___Window_EquipSlot_updateHelp___.call(this);
    if (this._statusWindow) {
        this._statusWindow.setTempActor(null);
    }
};

//-----------------------------------------------------------------------------
// Window_EquipItem
//
// The window for selecting an equipment item on the equipment screen.

Olivia.OctoBattle.Weapon.___Window_EquipItem_initialize___ = Window_EquipItem.prototype.initialize;
Window_EquipItem.prototype.initialize = function(x, y, width, height) {
    this._weaponTypeId = 0;
    Olivia.OctoBattle.Weapon.___Window_EquipItem_initialize___.call(this, x, y, width, height);
};

Olivia.OctoBattle.Weapon.___Window_EquipItem_setSlotId___ = Window_EquipItem.prototype.setSlotId;
Window_EquipItem.prototype.setSlotId = function(slotId) {
    if (slotId < $dataSystem.weaponTypes.length - 1) {
        weaponTypeId = slotId + 1;
        slotId = 0;
        if (this._weaponTypeId !== weaponTypeId) {
            this._slotId = 0;
            this._weaponTypeId = weaponTypeId;
            this.refresh();
            this.resetScroll();
            return;
        }
    } else {
        slotId -= $dataSystem.weaponTypes.length - 2;
        this._weaponTypeId = 0;
    }
    if (Imported.YEP_EquipCore) {
        Yanfly.Equip.Window_EquipItem_setSlotId.call(this, slotId);
    } else {
        Olivia.OctoBattle.Weapon.___Window_EquipItem_setSlotId___.call(this, slotId);
    }
};

Olivia.OctoBattle.Weapon.___Window_EquipItem_includes___ = Window_EquipItem.prototype.includes;
Window_EquipItem.prototype.includes = function(item) {
    if (Olivia.OctoBattle.Weapon.___Window_EquipItem_includes___.call(this, item)) {
        if (!!item && this._slotId <= 0) {
            return this._weaponTypeId === item.wtypeId;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

Window_EquipItem.prototype.updateHelp = function() {
    Window_ItemList.prototype.updateHelp.call(this);
    if (!!this._actor && this._statusWindow) {
        var actor = JsonEx.makeDeepCopy(this._statusWindow._actor);
        actor.forceChangeEquip(this._slotId, this.item());
        this._statusWindow.setTempActor(actor);
    }
};

//-----------------------------------------------------------------------------
// Window_ActorCommand
//
// The window for selecting an actor's action on the battle screen.

Olivia.OctoBattle.Weapon.___Window_ActorCommand_initialize___ = Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function() {
    Olivia.OctoBattle.Weapon.___Window_ActorCommand_initialize___.call(this);
    if (Olivia.OctoBattle.WeaponSwap.ShowArrows) {
        this.createWeaponArrowSprites();
    }
};

Window_ActorCommand.prototype.createWeaponArrowSprites = function() {
    this._weaponLeftArrowSprite = new Sprite_WindowArrow(this, 'left');
    this.addChild(this._weaponLeftArrowSprite);
    this._weaponRightArrowSprite = new Sprite_WindowArrow(this, 'right');
    this.addChild(this._weaponRightArrowSprite);
};

Olivia.OctoBattle.Weapon.___Window_ActorCommand_addAttackCommand___ = Window_ActorCommand.prototype.addAttackCommand;
Window_ActorCommand.prototype.addAttackCommand = function() {
    Olivia.OctoBattle.Weapon.___Window_ActorCommand_addAttackCommand___.call(this);
    if (Olivia.OctoBattle.WeaponSwap.WpnSwapShow) {
        this.addWeaponSwapCommand();
    }
};

Window_ActorCommand.prototype.addWeaponSwapCommand = function() {
    var name = Olivia.OctoBattle.WeaponSwap.WpnSwapCmd;
    this.addCommand(name, 'weaponSwap', this.isWeaponSwapEnabled());
};

Window_ActorCommand.prototype.isWeaponSwapEnabled = function() {
    if (this._actor.getFirstSwapWeapon()) {
        var count = 0;
        var weapons = this._actor.getSwapWeapons();
        for (var i = 0; i < weapons.length; i++) {
            var weapon = weapons[i];
            if (!!weapon) {
                count += 1;
                if (count >= 2) {
                    return true;
                }
            }
        }
    }
    return false;
};

Window_ActorCommand.prototype.drawItem = function(index) {
    if (Olivia.OctoBattle.WeaponSwap.ShowIcons) {
        this.drawWeaponIcon(index);
    }
    Window_Command.prototype.drawItem.call(this, index);
};

Window_ActorCommand.prototype.drawWeaponIcon = function(index) {
    if (this._list[index].symbol === 'attack') {
        var rect = this.itemRect(index);
        if (this.itemTextAlign() === 'left') {
            var x = rect.width - Window_Base._iconWidth - 2;
        } else {
            var x = rect.x + 2;
        }
        var weapon = this._actor.weapons()[0];
        if (!!weapon) {
            var icon = weapon.iconIndex;
        } else {
            var icon = 77;
        }
        this.drawIcon(icon, x, rect.y + 2);
    }
};

if (Olivia.OctoBattle.WeaponSwap.WpnSwapArrows) {

Window_ActorCommand.prototype.processCursorMove = function() {
    if (this.active && Input.isRepeated('right') && this.currentSymbol() === 'attack') {
        this._actor.swapWeaponBattle('right');
        SoundManager.playEquip();
        this.refresh();
    } else if (this.active && Input.isRepeated('left') && this.currentSymbol() === 'attack') {
        this._actor.swapWeaponBattle('left');
        SoundManager.playEquip();
        this.refresh();
    } else {
        Window_Command.prototype.processCursorMove.call(this);
    }
};

}

Window_ActorCommand.prototype.playOkSound = function() {
    if (this.currentSymbol() === 'weaponSwap') {
        SoundManager.playEquip();
    } else {
        Window_Command.prototype.playOkSound.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_ActorCommand
//
// From Yanfly's Equip Core

if (Imported.YEP_EquipCore && Olivia.OctoBattle.WeaponSwap.ExtraLines) {

Olivia.OctoBattle.Weapon.___Window_StatCompare_refresh___ = Window_StatCompare.prototype.refresh;
Window_StatCompare.prototype.refresh = function() {
    Olivia.OctoBattle.Weapon.___Window_StatCompare_refresh___.call(this);
    if (!!this._actor) {
        this.drawExtraParameters();
    }
};

Window_StatCompare.prototype.drawExtraParameters = function() {
    this.drawExtraParamItem('hit', 0, this.lineHeight() * 8);
    this.drawExtraParamItem('eva', 0, this.lineHeight() * 9);
    this.drawExtraParamItem('cri', 0, this.lineHeight() * 10);
};

Window_StatCompare.prototype.drawExtraParamItem = function(param, x, y) {
    this.drawDarkRect(x, y, this.contents.width, this.lineHeight());
    this.drawExtraParamItemName(y, param)
    this.drawCurrentExtraParam(y, param);
    this.drawRightArrow(y);
    if (this._tempActor) {
        this.drawNewExtraParam(y, param);
        this.drawExtraParamDifference(y, param);
    }
};

Window_StatCompare.prototype.drawExtraParamItemName = function(y, param) {
    if (param === 'hit') {
        var name = Olivia.OctoBattle.WeaponSwap.TextHit;
    } else if (param === 'eva') {
        var name = Olivia.OctoBattle.WeaponSwap.TextEva;
    } else if (param === 'cri') {
        var name = Olivia.OctoBattle.WeaponSwap.TextCri;
    }
    var x = this.textPadding();
    this.changeTextColor(this.systemColor());
    this.drawText(name, x, y, this._paramNameWidth);
};

Window_StatCompare.prototype.drawCurrentExtraParam = function(y, param) {
    if (param === 'hit') {
        var actorparam = Math.round(this._actor.hit * 100) + '%';
    } else if (param === 'eva') {
        var actorparam = Math.round(this._actor.eva * 100) + '%';
    } else if (param === 'cri') {
        var actorparam = Math.round(this._actor.cri * 100) + '%';
    }
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
    this.resetTextColor();
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
};

Window_StatCompare.prototype.drawNewExtraParam = function(y, param) {
    if (param === 'hit') {
        var newValue = Math.round(this._tempActor.hit * 100);
        var diffvalue = newValue - Math.round(this._actor.hit * 100);
    } else if (param === 'eva') {
        var newValue = Math.round(this._tempActor.eva * 100);
        var diffvalue = newValue - Math.round(this._actor.eva * 100);
    } else if (param === 'cri') {
        var newValue = Math.round(this._tempActor.cri * 100);
        var diffvalue = newValue - Math.round(this._actor.cri * 100);
    }
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var actorparam = newValue + '%';
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
};

Window_StatCompare.prototype.drawExtraParamDifference = function(y, param) {
    var x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    if (param === 'hit') {
        var newValue = Math.round(this._tempActor.hit * 100);
        var diffvalue = newValue - Math.round(this._actor.hit * 100);
    } else if (param === 'eva') {
        var newValue = Math.round(this._tempActor.eva * 100);
        var diffvalue = newValue - Math.round(this._actor.eva * 100);
    } else if (param === 'cri') {
        var newValue = Math.round(this._tempActor.cri * 100);
        var diffvalue = newValue - Math.round(this._actor.cri * 100);
    }
    if (diffvalue === 0) return;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    var text = diffvalue + '%';
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
};

}

//=============================================================================
} // End Weapon Swap System
//=============================================================================

//=============================================================================
// Side Battle UI
//
// 1. Remove existing UI
// 2. Put UI elements on the side that automatically update
// 3. Slightly animated

if (Imported.YEP_BattleEngineCore && Olivia.OctoBattle.SideBattleUI.Enabled) {

Olivia.OctoBattle.BattleUI = Olivia.OctoBattle.BattleUI || {};

//=============================================================================
// Window Layer
//
// Masks windows

if (!Olivia.OctoBattle.SideBattleUI.WindowMasking) {

Olivia.OctoBattle.BattleUI.___WindowLayer_maskWindow___ = WindowLayer.prototype._maskWindow;
WindowLayer.prototype._maskWindow = function(window, shift) {
    if (!!$gameParty && $gameParty.inBattle()) {
        return;
    }
    Olivia.OctoBattle.BattleUI.___WindowLayer_maskWindow___.call(this, window, shift);
};

}

//-----------------------------------------------------------------------------
// Game_System
//
// The game object class for the system data.

Game_System.prototype.isSideView = function() {
    return true;
};

//-----------------------------------------------------------------------------
// Game_Actor
//
// The game object class for an actor.

Olivia.OctoBattle.BattleUI.___Game_Actor_refresh___ = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
    Olivia.OctoBattle.BattleUI.___Game_Actor_refresh___.call(this);
    if ($gameParty.inBattle()) {
        this._needsStatusStateRefresh = true;
    }
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.

Scene_Battle.prototype.updateWindowPositions = function() {
    if (BattleManager.isInputting()) {
        if (this._partyCommandWindow.active) {
            this._partyCommandWindow.updatePosition();
        }
        if (this._actorCommandWindow.active) {
            this._actorCommandWindow.updatePosition();
        }
        if (this._skillWindow.active) {
            this._actorCommandWindow.updatePosition();
            this._skillWindow.updatePosition();
        }
        if (this._itemWindow.active) {
            this._actorCommandWindow.updatePosition();
            this._itemWindow.updatePosition();
        }
        if (this._actorWindow.active) {
            this._actorCommandWindow.updateFadeOut();
            this._skillWindow.updateFadeOut();
            this._itemWindow.updateFadeOut();
        }
        if (this._enemyWindow.active) {
            this._actorCommandWindow.updateFadeOut();
            this._skillWindow.updateFadeOut();
            this._itemWindow.updateFadeOut();
        }
    }
};

Olivia.OctoBattle.BattleUI.___Scene_Battle_createStatusWindow___ = Scene_Battle.prototype.createStatusWindow;
Scene_Battle.prototype.createStatusWindow = function() {
    Olivia.OctoBattle.BattleUI.___Scene_Battle_createStatusWindow___.call(this);
    this.createSideStatusWindows();
};

Scene_Battle.prototype.createSideStatusWindows = function() {
    this._sideStatusWindows = [];
    for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
        var newStatusWindow = new Window_BattleSideStatus(i);
        this._sideStatusWindows.push(newStatusWindow);
        this.addWindow(newStatusWindow);
    }
};

//-----------------------------------------------------------------------------
// Sprite_Actor
//
// The sprite for displaying an actor.

if (Olivia.OctoBattle.SideBattleUI.PositionActors) {

Sprite_Actor.prototype.setActorHome = function(index) {
    var x = Math.round(eval(Olivia.OctoBattle.SideBattleUI.ActorPositionFormulaX));
    var y = Math.round(eval(Olivia.OctoBattle.SideBattleUI.ActorPositionFormulaY));
    this.setHome(x, y);
};

}

//-----------------------------------------------------------------------------
// Sprite_Enemy
//
// The sprite for displaying an enemy.

if (Olivia.OctoBattle.SideBattleUI.PositionEnemies) {

Sprite_Enemy.prototype.setHome = function(x, y) {
    x = Math.round(eval(Olivia.OctoBattle.SideBattleUI.EnemyPositionFormulaX));
    y = Math.round(eval(Olivia.OctoBattle.SideBattleUI.EnemyPositionFormulaY));
    Sprite_Battler.prototype.setHome.call(this, x, y);
};

}

//-----------------------------------------------------------------------------
// Window_Help
//
// The window for displaying the description of the selected item.

if (Olivia.OctoBattle.SideBattleUI.DimHelpWindow) {

Olivia.OctoBattle.BattleUI.___Window_Help_initialize___ = Window_Help.prototype.initialize;
Window_Help.prototype.initialize = function(numLines) {
    Olivia.OctoBattle.BattleUI.___Window_Help_initialize___.call(this, numLines);
    if (SceneManager._scene instanceof Scene_Battle) {
        this.opacity = 0;
        this.showBackgroundDimmer();
    }
};

Window_Help.prototype.refreshDimmerBitmap = function() {
    if (this._dimmerSprite) {
        var bitmap = this._dimmerSprite.bitmap;
        var w = this.width;
        var h = this.height;
        var m = this.standardPadding();
        var w1 = Math.ceil(w / 2);
        var w2 = w1 - Olivia.OctoBattle.SideBattleUI.StatusWidth;
        var h1 = h - m * 2;
        var c1 = this.dimColor1();
        var c2 = this.dimColor2();
        bitmap.resize(w, h);
        bitmap.fillRect(0, m, w1, h1, c1);
        bitmap.gradientFillRect(w1, m, w2, h1, c1, c2);
        this._dimmerSprite.setFrame(0, 0, w, h);
    }
};

}

//-----------------------------------------------------------------------------
// Window_PartyCommand
//
// The window for selecting whether to fight or escape on the battle screen.

Window_PartyCommand.prototype.numVisibleRows = function() {
    if (!this._list) {
        return 4;
    }
    return Math.min(Math.ceil(this.maxItems() / this.maxCols()), Olivia.OctoBattle.SideBattleUI.WindowMaxList);
};

Window_PartyCommand.prototype.scaleRate = function() {
    return Olivia.OctoBattle.SideBattleUI.WindowScale;
};

Window_PartyCommand.prototype.lineHeight = function() {
    return Math.round(Window_Command.prototype.lineHeight.call(this) * this.scaleRate());
};

Window_PartyCommand.prototype.standardFontSize = function() {
    return Math.round(Window_Command.prototype.standardFontSize.call(this) * this.scaleRate());
};

Window_PartyCommand.prototype.standardPadding = function() {
    return Math.round(Window_Command.prototype.standardPadding.call(this) * this.scaleRate());
};

Window_PartyCommand.prototype.textPadding = function() {
    return Math.round(Window_Command.prototype.textPadding.call(this) * this.scaleRate());
};

Window_PartyCommand.prototype.windowWidth = function() {
    return Olivia.OctoBattle.SideBattleUI.WindowCmdWidth;
};

Window_PartyCommand.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var rate = this.scaleRate();
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, Math.round(pw * rate), Math.round(ph * rate));
};

Window_PartyCommand.prototype.createContents = function() {
    this.height = this.windowHeight();
    Window_Command.prototype.createContents.call(this);
};

Window_PartyCommand.prototype.updatePosition = function() {
    if (!!$gameParty.aliveMembers()[0]) {
        var actor = $gameParty.aliveMembers()[0];
        var x = actor.spritePosX() - Math.round(actor.spriteWidth() / 2) - this.width;
        var y = actor.spritePosY() - actor.spriteHeight();
        this.x = x + (this._positionXCorrection || 0);
        this.y = y + (this._positionYCorrection || 0);
        Window_PartyCommand.prototype.updateFadeIn.call(this);
        Window_PartyCommand.prototype.correctScreenPosition.call(this);
    }
};

Window_PartyCommand.prototype.correctScreenPosition = function() {
    this.x = Math.min(Graphics.boxWidth - this.width, this.x);
    this.y = Math.min(Graphics.boxHeight - this.height, this.y);
};

Window_PartyCommand.prototype.updateFadeIn = function() {
    this.opacity = 255;
    this.contentsOpacity = 255;
};

Window_PartyCommand.prototype.updateFadeOut = function() {
    this.opacity -= 16;
    this.contentsOpacity -= 16;
};

//-----------------------------------------------------------------------------
// Window_ActorCommand
//
// The window for selecting an actor's action on the battle screen.

Window_ActorCommand.prototype.numVisibleRows = function() {
    return Window_PartyCommand.prototype.numVisibleRows.call(this);
};

Window_ActorCommand.prototype.scaleRate = function() {
    return Window_PartyCommand.prototype.scaleRate.call(this);
};

Window_ActorCommand.prototype.lineHeight = function() {
    return Window_PartyCommand.prototype.lineHeight.call(this);
};

Window_ActorCommand.prototype.standardFontSize = function() {
    return Window_PartyCommand.prototype.standardFontSize.call(this);
};

Window_ActorCommand.prototype.standardPadding = function() {
    return Window_PartyCommand.prototype.standardPadding.call(this);
};

Window_ActorCommand.prototype.textPadding = function() {
    return Window_PartyCommand.prototype.textPadding.call(this);
};

Window_ActorCommand.prototype.windowWidth = function() {
    return Window_PartyCommand.prototype.windowWidth.call(this);
};

Window_ActorCommand.prototype.drawIcon = function(iconIndex, x, y) {
    Window_PartyCommand.prototype.drawIcon.call(this, iconIndex, x, y);
};

Window_ActorCommand.prototype.createContents = function() {
    this.height = this.windowHeight();
    Window_Command.prototype.createContents.call(this);
    this.updatePosition();
};

Window_ActorCommand.prototype.updatePosition = function() {
    if (this._actor) {
        Window_PartyCommand.prototype.updateFadeIn.call(this);
        var x = this._actor.spritePosX() + Math.round(this._actor.spriteWidth() / 2);
        x = Math.min(Graphics.boxWidth - this.width, x);
        var y = this._actor.spritePosY() - this._actor.spriteHeight();
        y = Math.min(Graphics.boxHeight - this.height, y);
        this.x = x + (this._positionXCorrection || 0);
        this.y = y + (this._positionYCorrection || 0);
        Window_PartyCommand.prototype.updateFadeIn.call(this);
        Window_PartyCommand.prototype.correctScreenPosition.call(this);
    }
};

Window_ActorCommand.prototype.updateFadeOut = function() {
    Window_PartyCommand.prototype.updateFadeOut.call(this);
};

Olivia.OctoBattle.BattleUI.___Window_ActorCommand_setup___ = Window_ActorCommand.prototype.setup;
Window_ActorCommand.prototype.setup = function(actor) {
    Olivia.OctoBattle.BattleUI.___Window_ActorCommand_setup___.call(this, actor);
    this.updatePosition();
};

//-----------------------------------------------------------------------------
// Window_BattleActor
//
// The window for selecting a target actor on the battle screen.

Window_BattleActor.prototype.processCursorMove = function() {
    if (this.isCursorMovable() && Input.isRepeated('right')) {
        var lastIndex = this.index();
        this.cursorDown(Input.isTriggered('right'));
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    } else if (this.isCursorMovable() && Input.isRepeated('left')) {
        var lastIndex = this.index();
        this.cursorUp(Input.isTriggered('left'));
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    } else {
        Window_BattleStatus.prototype.processCursorMove.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//
// The window for selecting a target actor on the battle screen.

Window_BattleEnemy.prototype.processCursorMove = function() {
    if (this.isCursorMovable() && Input.isRepeated('down')) {
        var lastIndex = this.index();
        this.cursorRight(Input.isTriggered('down'));
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    } else if (this.isCursorMovable() && Input.isRepeated('up')) {
        var lastIndex = this.index();
        this.cursorLeft(Input.isTriggered('up'));
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    } else {
        Window_Selectable.prototype.processCursorMove.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_BattleStatus
//
// The window for displaying the status of party members on the battle screen.

Olivia.OctoBattle.BattleUI.___Window_BattleStatus_initialize___ = Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function() {
    Olivia.OctoBattle.BattleUI.___Window_BattleStatus_initialize___.call(this);
    if (SceneManager._scene instanceof Scene_Battle) {
        this.y = Graphics.boxHeight * 3;
    }
};

Olivia.OctoBattle.BattleUI.___Window_BattleStatus_drawItem___ = Window_BattleStatus.prototype.drawItem;
Window_BattleStatus.prototype.drawItem = function(index) {
    if (!SceneManager._scene instanceof Scene_Battle) {
        Olivia.OctoBattle.BattleUI.___Window_BattleStatus_drawItem___.call(this, index);
    }
};

//-----------------------------------------------------------------------------
// Window_BattleSkill
//
// The window for selecting a skill to use on the battle screen.

Olivia.OctoBattle.BattleUI.___Window_BattleSkill_initialize___ = Window_BattleSkill.prototype.initialize;
Window_BattleSkill.prototype.initialize = function(x, y, width, height) {
    y = Graphics.boxHeight * 3;
    width = Olivia.OctoBattle.SideBattleUI.WindowListWidth;
    height = 100;
    Olivia.OctoBattle.BattleUI.___Window_BattleSkill_initialize___.call(this, x, y, width, height);
    this.y = Graphics.boxHeight * 3;
};

Window_BattleSkill.prototype.scaleRate = function() {
    return Window_PartyCommand.prototype.scaleRate.call(this);
};

Window_BattleSkill.prototype.lineHeight = function() {
    return Window_PartyCommand.prototype.lineHeight.call(this);
};

Window_BattleSkill.prototype.standardFontSize = function() {
    return Window_PartyCommand.prototype.standardFontSize.call(this);
};

Window_BattleSkill.prototype.standardPadding = function() {
    return Window_PartyCommand.prototype.standardPadding.call(this);
};

Window_BattleSkill.prototype.textPadding = function() {
    return Window_PartyCommand.prototype.textPadding.call(this);
};

Window_BattleSkill.prototype.drawIcon = function(iconIndex, x, y) {
    Window_PartyCommand.prototype.drawIcon.call(this, iconIndex, x, y);
};

Window_BattleSkill.prototype.maxCols = function() {
    return 1;
};

Window_BattleSkill.prototype.maxListHeight = function() {
    return Math.min(this.maxItems(), Olivia.OctoBattle.SideBattleUI.WindowMaxList);
};

Window_BattleSkill.prototype.createContents = function() {
    this.height = this.fittingHeight(this.maxListHeight());
    Window_SkillList.prototype.createContents.call(this);
    this.updatePosition();
};

Window_BattleSkill.prototype.setActor = function(actor) {
    Window_SkillList.prototype.setActor.call(this, actor);
    this.updatePosition();
};

Window_BattleSkill.prototype.updatePosition = function() {
    this._positionXCorrection = 16;
    this._positionYCorrection = 16;
    Window_ActorCommand.prototype.updatePosition.call(this);
};

Window_BattleSkill.prototype.updateFadeOut = function() {
    Window_PartyCommand.prototype.updateFadeOut.call(this);
};

Window_BattleSkill.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Math.round(Window_Base._iconWidth * this.scaleRate()) + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        if (Imported.YEP_InstantCast) {
            this.drawInstantIcon(item, x, y, width);
        }
    }
};

//-----------------------------------------------------------------------------
// Window_BattleItem
//
// The window for selecting an item to use on the battle screen.

Olivia.OctoBattle.BattleUI.___Window_BattleItem_initialize___ = Window_BattleItem.prototype.initialize;
Window_BattleItem.prototype.initialize = function(x, y, width, height) {
    y = Graphics.boxHeight * 3;
    width = Olivia.OctoBattle.SideBattleUI.WindowListWidth;
    height = 100;
    this._positionXCorrection = 16;
    this._positionYCorrection = 16;
    Olivia.OctoBattle.BattleUI.___Window_BattleItem_initialize___.call(this, x, y, width, height);
};

Window_BattleItem.prototype.scaleRate = function() {
    return Window_PartyCommand.prototype.scaleRate.call(this);
};

Window_BattleItem.prototype.lineHeight = function() {
    return Window_PartyCommand.prototype.lineHeight.call(this);
};

Window_BattleItem.prototype.standardFontSize = function() {
    return Window_PartyCommand.prototype.standardFontSize.call(this);
};

Window_BattleItem.prototype.standardPadding = function() {
    return Window_PartyCommand.prototype.standardPadding.call(this);
};

Window_BattleItem.prototype.textPadding = function() {
    return Window_PartyCommand.prototype.textPadding.call(this);
};

Window_BattleItem.prototype.drawIcon = function(iconIndex, x, y) {
    Window_PartyCommand.prototype.drawIcon.call(this, iconIndex, x, y);
};

Window_BattleItem.prototype.maxCols = function() {
    return 1;
};

Window_BattleItem.prototype.maxListHeight = function() {
    return Math.min(this.maxItems(), Olivia.OctoBattle.SideBattleUI.WindowMaxList);
};

Window_BattleItem.prototype.createContents = function() {
    this.height = this.fittingHeight(this.maxListHeight());
    Window_ItemList.prototype.createContents.call(this);
    this.updatePosition();
};

Olivia.OctoBattle.BattleUI.___Window_BattleItem_show___ = Window_BattleItem.prototype.show;
Window_BattleItem.prototype.show = function() {
    Olivia.OctoBattle.BattleUI.___Window_BattleItem_show___.call(this);
    this.updatePosition();
};

Window_BattleItem.prototype.updatePosition = function() {
    if (!!BattleManager.actor()) {
        var actor = BattleManager.actor();
        var x = actor.spritePosX() + Math.round(actor.spriteWidth() / 2);
        var y = actor.spritePosY() - actor.spriteHeight();
        this.x = x + (this._positionXCorrection || 0);
        this.y = y + (this._positionYCorrection || 0);
        Window_PartyCommand.prototype.updateFadeIn.call(this);
        Window_PartyCommand.prototype.correctScreenPosition.call(this);
    }
};

Window_BattleItem.prototype.updateFadeOut = function() {
    Window_PartyCommand.prototype.updateFadeOut.call(this);
};

Window_BattleItem.prototype.drawItemName = function(item, x, y, width) {
    Window_BattleSkill.prototype.drawItemName.call(this, item, x, y, width);
};

//-----------------------------------------------------------------------------
// Window_BattleSideBase
//
// Used as a base for all of the miniature windows.

function Window_BattleSideBase() {
    this.initialize.apply(this, arguments);
}

Window_BattleSideBase.prototype = Object.create(Window_Base.prototype);
Window_BattleSideBase.prototype.constructor = Window_BattleSideBase;

Window_BattleSideBase.prototype.initialize = function(x, y, width, height, index) {
    this._index = index;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.opacity = 0;
};

Window_BattleSideBase.prototype.setNewActor = function() {
    this._actor = $gameParty.members()[this._index];
    this.refresh();
};

Window_BattleSideBase.prototype.scaleRate = function() {
    return Olivia.OctoBattle.SideBattleUI.StatusScale;
};

Window_BattleSideBase.prototype.lineHeight = function() {
    return Math.round(Window_Base.prototype.lineHeight.call(this) * this.scaleRate());
};

Window_BattleSideBase.prototype.standardFontSize = function() {
    return Math.round(Window_Base.prototype.standardFontSize.call(this) * this.scaleRate());
};

Window_BattleSideBase.prototype.standardPadding = function() {
    return 0;
};

Window_BattleSideBase.prototype.textPadding = function() {
    return Math.round(Window_Base.prototype.textPadding.call(this) * this.scaleRate());
};

Window_BattleSideBase.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var rate = this.scaleRate();
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, Math.round(pw * rate), Math.round(ph * rate));
};

Window_BattleSideBase.prototype.refresh = function() {
    this._actor = $gameParty.members()[this._index];
    this.contents.clear();
};

Window_BattleSideBase.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this._actor !== $gameParty.members()[this._index]) {
        this.setNewActor();
    }
    if (BattleManager._phase !== 'battleEnd' && this.checkRefreshConditions() && !BattleManager._victoryPhase && !BattleManager._hideOTBTurnDisplay) {
        this.refresh();
    }
};

Window_BattleSideBase.prototype.checkRefreshConditions = function() {
    return false;
};

//-----------------------------------------------------------------------------
// Window_BattleSideName
//
// Draws the actor's name.

function Window_BattleSideName() {
    this.initialize.apply(this, arguments);
}

Window_BattleSideName.prototype = Object.create(Window_BattleSideBase.prototype);
Window_BattleSideName.prototype.constructor = Window_BattleSideName;

Window_BattleSideName.prototype.initialize = function(x, y, width, height, index) {
    Window_BattleSideBase.prototype.initialize.call(this, x, y, width, height, index);
    this.refresh();
};

Window_BattleSideName.prototype.refresh = function() {
    Window_BattleSideBase.prototype.refresh.call(this);
    if (!!this._actor) {
        this.drawActorName(this._actor, this.textPadding(), 0, this.width);
        this._actorName = this._actor.name();
    }
};

Window_BattleSideName.prototype.checkRefreshConditions = function() {
    if (!!this._actor) {
        return this._actorName !== this._actor.name();
    } else {
        return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_BattleSideShield
//
// Draws the actor's Break Shield count

function Window_BattleSideShield() {
    this.initialize.apply(this, arguments);
}

Window_BattleSideShield.prototype = Object.create(Window_BattleSideBase.prototype);
Window_BattleSideShield.prototype.constructor = Window_BattleSideShield;

Window_BattleSideShield.prototype.initialize = function(x, y, width, height, index) {
    Window_BattleSideBase.prototype.initialize.call(this, x, y, width, height, index);
    this.refresh();
};

Window_BattleSideShield.prototype.lineHeight = function() {
    return Window_Base.prototype.lineHeight.call(this);
};

Window_BattleSideShield.prototype.drawIcon = function(iconIndex, x, y) {
    Window_Base.prototype.drawIcon.call(this, iconIndex, x, y);
};

Window_BattleSideShield.prototype.refresh = function() {
    Window_BattleSideBase.prototype.refresh.call(this);
    if (!!this._actor) {
        this.drawBreakShieldIcon(this._actor, 0, 0);
        this._breakShield = this._actor.currentBreakShield();
    }
};

Window_BattleSideShield.prototype.checkRefreshConditions = function() {
    if (!!this._actor) {
        return this._breakShield !== this._actor.currentBreakShield();
    } else {
        return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_BattleSideHP
//
// Draws the actor's HP.

function Window_BattleSideHP() {
    this.initialize.apply(this, arguments);
}

Window_BattleSideHP.prototype = Object.create(Window_BattleSideBase.prototype);
Window_BattleSideHP.prototype.constructor = Window_BattleSideHP;

Window_BattleSideHP.prototype.initialize = function(x, y, width, height, index) {
    Window_BattleSideBase.prototype.initialize.call(this, x, y, width, height, index);
    this.refresh();
};

Window_BattleSideHP.prototype.gaugeHeight = function() {
    return Olivia.OctoBattle.SideBattleUI.GaugeHeight;
};

Window_BattleSideHP.prototype.refresh = function() {
    Window_BattleSideBase.prototype.refresh.call(this);
    if (!!this._actor) {
        this.drawActorHp(this._actor, this.textPadding(), 0, Olivia.OctoBattle.SideBattleUI.GaugeWidth);
        this._hp = this._actor.hp;
        this._mhp = this._actor.mhp;
    }
};

Window_BattleSideHP.prototype.checkRefreshConditions = function() {
    if (!!this._actor) {
        return this._hp !== this._actor.hp || this._mhp !== this._actor.mhp;
    } else {
        return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_BattleSideMP
//
// Draws the actor's MP.

function Window_BattleSideMP() {
    this.initialize.apply(this, arguments);
}

Window_BattleSideMP.prototype = Object.create(Window_BattleSideBase.prototype);
Window_BattleSideMP.prototype.constructor = Window_BattleSideMP;

Window_BattleSideMP.prototype.initialize = function(x, y, width, height, index) {
    Window_BattleSideBase.prototype.initialize.call(this, x, y, width, height, index);
    this.refresh();
};

Window_BattleSideMP.prototype.gaugeHeight = function() {
    return Olivia.OctoBattle.SideBattleUI.GaugeHeight;
};

Window_BattleSideMP.prototype.refresh = function() {
    Window_BattleSideBase.prototype.refresh.call(this);
    if (!!this._actor) {
        this.drawActorMp(this._actor, this.textPadding(), 0, Olivia.OctoBattle.SideBattleUI.GaugeWidth);
        this._mp = this._actor.mp;
        this._mmp = this._actor.mmp;
    }
};

Window_BattleSideMP.prototype.checkRefreshConditions = function() {
    if (!!this._actor) {
        return this._mp !== this._actor.mp || this._mmp !== this._actor.mmp;
    } else {
        return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_BattleSideTP
//
// Draws the actor's TP.

function Window_BattleSideTP() {
    this.initialize.apply(this, arguments);
}

Window_BattleSideTP.prototype = Object.create(Window_BattleSideBase.prototype);
Window_BattleSideTP.prototype.constructor = Window_BattleSideMP;

Window_BattleSideTP.prototype.initialize = function(x, y, width, height, index) {
    Window_BattleSideBase.prototype.initialize.call(this, x, y, width, height, index);
    this.refresh();
};

Window_BattleSideTP.prototype.gaugeHeight = function() {
    return Olivia.OctoBattle.SideBattleUI.GaugeHeight;
};

Window_BattleSideTP.prototype.refresh = function() {
    Window_BattleSideBase.prototype.refresh.call(this);
    if (!!this._actor) {
        this.drawActorTp(this._actor, this.textPadding(), 0, Olivia.OctoBattle.SideBattleUI.GaugeWidth);
        this._mt = this._actor.tp;
    }
};

Window_BattleSideTP.prototype.checkRefreshConditions = function() {
    if (!!this._actor) {
        return this._tp !== this._actor.tp;
    } else {
        return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_BattleSideBoost
//
// Draws the actor's boost status

function Window_BattleSideBoost() {
    this.initialize.apply(this, arguments);
}

Window_BattleSideBoost.prototype = Object.create(Window_BattleSideBase.prototype);
Window_BattleSideBoost.prototype.constructor = Window_BattleSideBoost;

Window_BattleSideBoost.prototype.initialize = function(x, y, width, height, index) {
    Window_BattleSideBase.prototype.initialize.call(this, x, y, width, height, index);
    this.refresh();
};

Window_BattleSideBoost.prototype.lineHeight = function() {
    return Window_Base.prototype.lineHeight.call(this);
};

Window_BattleSideBoost.prototype.drawIcon = function(iconIndex, x, y) {
    Window_Base.prototype.drawIcon.call(this, iconIndex, x, y);
};

Window_BattleSideBoost.prototype.refresh = function() {
    Window_BattleSideBase.prototype.refresh.call(this);
    if (!!this._actor) {
        this.drawBoostIcons(this._actor, 0, 0);
        this._boostCount = this._actor.storedBP();
    }
};

Window_BattleSideBoost.prototype.checkRefreshConditions = function() {
    if (!!this._actor) {
        return this._boostCount !== this._actor.storedBP();
    } else {
        return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_BattleSideStates
//
// Draws the actor's states

function Window_BattleSideStates() {
    this.initialize.apply(this, arguments);
}

Window_BattleSideStates.prototype = Object.create(Window_BattleSideBase.prototype);
Window_BattleSideStates.prototype.constructor = Window_BattleSideStates;

Window_BattleSideStates.prototype.initialize = function(x, y, width, height, index) {
    width = Olivia.OctoBattle.SideBattleUI.StatesMax * Window_Base._iconWidth + 4;
    x -= width;
    Window_BattleSideBase.prototype.initialize.call(this, x, y, width, height, index);
    this.refresh();
};

Window_BattleSideStates.prototype.lineHeight = function() {
    return Window_Base.prototype.lineHeight.call(this);
};

Window_BattleSideStates.prototype.drawIcon = function(iconIndex, x, y) {
    Window_Base.prototype.drawIcon.call(this, iconIndex, x, y);
};

Window_BattleSideStates.prototype.refresh = function() {
    Window_BattleSideBase.prototype.refresh.call(this);
    if (!!this._actor) {
        var x = this.contents.width - 2;
        x -= Math.min(Olivia.OctoBattle.SideBattleUI.StatesMax, this._actor.allIcons().length) * Window_Base._iconWidth;
        this.drawActorIcons(this._actor, x, 0, this.contents.width - 2 - x);
        this._actor._needsStatusStateRefresh = undefined;
    }
};

Window_BattleSideStates.prototype.checkRefreshConditions = function() {
    if (!!this._actor) {
        return !!this._actor._needsStatusStateRefresh;
    } else {
        return Window_BattleSideBase.prototype.checkRefreshConditions.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_BattleSideStatus
//
// The window for displaying the status of the party members

function Window_BattleSideStatus() {
    this.initialize.apply(this, arguments);
}

Window_BattleSideStatus.prototype = Object.create(Window_BattleSideBase.prototype);
Window_BattleSideStatus.prototype.constructor = Window_BattleSideStatus;

Window_BattleSideStatus.prototype.initialize = function(index) {
    var width = Olivia.OctoBattle.SideBattleUI.StatusWidth;
    var height = this.fittingHeight(4.5);
    if ($dataSystem.optDisplayTp) {
        height += this.lineHeight();
    }
    var x = Graphics.boxWidth - width;
    var y = height * index + Olivia.OctoBattle.SideBattleUI.CeilingBuffer;
    this._targetX = this._homeX = x;
    this._targetY = this._homeY = y;
    width += Olivia.OctoBattle.SideBattleUI.ActiveBattlerMove * 2;
    Window_BattleSideBase.prototype.initialize.call(this, x, y, width, height, index);
    this.createSubWindows();
};

Window_BattleSideStatus.prototype.createSubWindows = function() {
    var width = this.width - Olivia.OctoBattle.SideBattleUI.ActiveBattlerMove * 2;
    var height = Window_Base.prototype.lineHeight.call(this);
    var index = this._index;
    var x = 0;
    var y = Math.ceil(this.lineHeight() / 4);
    var x1 = -1 * Window_Base._iconWidth - 2;
    var y1 = this.lineHeight() - 2;
    // Draw Actor Name
    this.addChild(new Window_BattleSideName(x, y, width, height, index));
    // Draw Boost Points
    if (Olivia.OctoBattle.BoostPoint && Olivia.OctoBattle.BoostPoint.Enabled) {
        x += 8;
        y += this.lineHeight();
        this.addChild(new Window_BattleSideBoost(x, y, width - x, height, index));
    }
    // Draw HP
    x += 8;
    y += this.lineHeight();
    this.addChild(new Window_BattleSideHP(x, y, width - x, height, index));
    // Draw MP
    x += 8;
    y += this.lineHeight();
    this.addChild(new Window_BattleSideMP(x, y, width - x, height, index));
    // Draw TP
    if ($dataSystem.optDisplayTp) {
        x += 8;
        y += this.lineHeight();
        this.addChild(new Window_BattleSideTP(x, y, width - x, height, index));
    }
    // Draw Break Shield Icon
    if (Olivia.OctoBattle.BreakShield && Olivia.OctoBattle.BreakShield.Enabled) {
        if (Olivia.OctoBattle.BreakShield.Actors && Olivia.OctoBattle.BreakShield.ShowActorShield) {
            this.addChild(new Window_BattleSideShield(x1, y1, width, height, index));
            y1 += Window_Base._iconHeight + 2;
        }
    }
    // Draw State Icons
    this.addChild(new Window_BattleSideStates(0, y1, width, height, index));
};

Window_BattleSideStatus.prototype.refresh = function() {
    this.contents.clear();
    if (!!this._actor) {
        var c1 = this.dimColor1();
        var c2 = this.dimColor2();
        var w1 = Math.ceil(this.width / 4);
        var w2 = this.width - w1;
        var h = this.height;
        this.contents.gradientFillRect(0, 0, w1, h, c2, c1);
        this.contents.fillRect(w1, 0, w2, h, c1);
    }
};

Window_BattleSideStatus.prototype.update = function() {
    Window_BattleSideBase.prototype.update.call(this);
    if (!!this._actor) {
        this.updatePosition();
    }
};

Window_BattleSideStatus.prototype.updatePosition = function() {
    this._cursorAll = false;
    if (this._actor === BattleManager.actor()) {
        this._targetX = this._homeX - Olivia.OctoBattle.SideBattleUI.ActiveBattlerMove;
        this._cursorAll = true;
    } else if (this._actor === BattleManager._subject) {
        this._targetX = this._homeX - Olivia.OctoBattle.SideBattleUI.ActiveBattlerMove;
    } else if (this._actor.isSelected()) {
        this._targetX = this._homeX - Olivia.OctoBattle.SideBattleUI.SelectBattlerMove;
    } else {
        this._targetX = this._homeX;
    }
    var moveSpeed = Olivia.OctoBattle.SideBattleUI.WindowMoveSpeed;
    if (this._targetX > this.x) {
        this.x = Math.min(this.x + moveSpeed, this._targetX);
    } else if (this._targetX < this.x) {
        this.x = Math.max(this.x - moveSpeed, this._targetX);
    }
};

//=============================================================================
} // End Side Battle UI
//=============================================================================

//=============================================================================
// Victory HUD
//
// 1. Display Gold earned, EXP earned, JP earned
// 2. Display EXP progress and JP total
// 3. Display item list

if (Olivia.OctoBattle.VictoryUI.Enabled) {

Olivia.OctoBattle.Victory = Olivia.OctoBattle.Victory || {};

//-----------------------------------------------------------------------------
// Bitmap
//
// Draw Functions

Bitmap.prototype.drawBattlePolygon = function(points, color, weight, opacity, stroke) {
    var context = this._context;
    context.save();
    context.beginPath();
    context.moveTo(points[0], points[1]);
    for (var i = 2; i < points.length; i += 2) {
        context.lineTo(points[i], points[i + 1]);
    }
    context.lineTo(points[0], points[1]);
    context.strokeStyle = color;
    context.lineWidth = weight;
    if (stroke) {
        context.stroke();
    }
    context.globalAlpha = opacity;
    context.fillStyle = color;
    context.fill();
    context.globalAlpha = 0;
    context.restore();
    this._setDirty();
};

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages battle progress.

Olivia.OctoBattle.Victory.___BattleManager_initMembers___ = BattleManager.initMembers;
BattleManager.initMembers = function() {
    Olivia.OctoBattle.Victory.___BattleManager_initMembers___.call(this);
    this._victoryPhase = false;
};

Olivia.OctoBattle.Victory.___BattleManager_isBusy___ = BattleManager.isBusy;
BattleManager.isBusy = function() {
    if (this._phase === 'battleEnd' && this._victoryPhase) {
        return true;
    } else {
        return Olivia.OctoBattle.Victory.___BattleManager_isBusy___.call(this);
    }
};

BattleManager.processVictory = function() {
    this._logWindow.clear();
    this._victoryPhase = true;
    if (this._windowLayer) {
        this._windowLayer.x = 0;
    }
    this._phase = 'battleEnd';
    $gameParty.removeBattleStates();
    if (!$gameSystem.skipVictoryMusic() && !$gameSystem.skipVictoryAftermath()) {
        this.playVictoryMe();
        this.playVictoryBgm();
    }
    this.makeTempActors();
    this.makeRewards();
    this.gainRewards();
    this.endBattle(0);
    if ($gameSystem.skipVictoryAftermath()) {
        setTimeout(BattleManager.updateBattleEnd.bind(this), 1000);
    } else {
        if (Olivia.OctoBattle.VictoryUI.ZoomInTransition) {
            this.startVictoryZoom();
        }
        $gameParty.performVictory();
        setTimeout(SceneManager._scene.hideAllWindows.bind(SceneManager._scene), Olivia.OctoBattle.VictoryUI.WaitHideWindows);
        setTimeout(SceneManager._scene.createVictoryWindows.bind(SceneManager._scene), Olivia.OctoBattle.VictoryUI.WaitDisplayVictory);
    }
};

BattleManager.playVictoryBgm = function() {
    AudioManager.playBgm(Olivia.OctoBattle.VictoryUI.VictoryBgm);
};

BattleManager.makeTempActors = function() {
    var members = $gameParty.members();
    this._tempActors = [];
    for (var i = 0; i < members.length; i++) {
        var member = members[i];
        this._tempActors[i] = JsonEx.makeDeepCopy(member);
    }
};

BattleManager.startVictoryZoom = function() {
    var x = Olivia.OctoBattle.VictoryUI.ZoomX;
    var y = Olivia.OctoBattle.VictoryUI.ZoomY;
    var scale = Olivia.OctoBattle.VictoryUI.ZoomScale;
    var duration = Olivia.OctoBattle.VictoryUI.ZoomDuration;
    if (Imported.YEP_BattleEngineCore && Imported.YEP_X_ActSeqPack3) {
        this._cameraX = x;
        this._cameraY = y;
        $gameScreen.setCameraDuration(duration)
        $gameScreen.startBattleZoom(scale, duration);
    } else {
        $gameScreen.startZoom(x, y, scale, duration);
    }
};

BattleManager.endVictoryPhase = function() {
    this.updateBattleEnd();
    this.replayBgmAndBgs();
};

//-----------------------------------------------------------------------------
// Game_System
//
// The game object class for the system data.

Olivia.OctoBattle.Victory.___Game_System_initialize___ = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Olivia.OctoBattle.Victory.___Game_System_initialize___.call(this);
    this._skipVictoryAftermath = false;
    this._skipVictoryMusic = false;
};

Game_System.prototype.skipVictoryAftermath = function() {
    return this._skipVictoryAftermath;
};

Game_System.prototype.skipVictoryMusic = function() {
    return this._skipVictoryMusic;
};

//-----------------------------------------------------------------------------
// Game_Actor
//
// The game object class for an actor.

Olivia.OctoBattle.Victory.___Game_Actor_shouldDisplayLevelUp___ = Game_Actor.prototype.shouldDisplayLevelUp;
Game_Actor.prototype.shouldDisplayLevelUp = function() {
    if ($gameParty.inBattle()) {
        return false;
    }
    return Olivia.OctoBattle.Victory.___Game_Actor_shouldDisplayLevelUp___.call(this);
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//
// The interpreter for running event commands.

Olivia.OctoBattle.Victory.___Game_Interpreter_pluginCommand___ = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Olivia.OctoBattle.Victory.___Game_Interpreter_pluginCommand___.call(this, command, args)
    if (command.match(/DisableVictoryAftermath/i)) {
        $gameSystem._skipVictoryAftermath = true;
    } else if (command.match(/EnableVictoryAftermath/i)) {
        $gameSystem._skipVictoryAftermath = false;
    } else if (command.match(/DisableVictoryMusic/i)) {
        $gameSystem._skipVictoryMusic = true;
    } else if (command.match(/EnableVictoryMusic/i)) {
        $gameSystem._skipVictoryMusic = false;
    }
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.

Scene_Battle.prototype.hideAllWindows = function() {
    for (var i = 0; i < this._windowLayer.children.length; i++) {
        var child = this._windowLayer.children[i];
        if (!!child) {
            child.hide();
        }
    }
};

Scene_Battle.prototype.createVictoryWindows = function() {
    this._victoryWindow = new Window_BattleVictory();
    this.addWindow(this._victoryWindow);
};

Olivia.OctoBattle.Victory.___Scene_Battle_terminate___ = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
    Olivia.OctoBattle.Victory.___Scene_Battle_terminate___.call(this);
    if (Olivia.OctoBattle.VictoryUI.ZoomInTransition) {
        $gameScreen.clearZoom();
    }
};

//-----------------------------------------------------------------------------
// Window_BattleVictory
//
// The window for displaying the victory results of battle

function Window_BattleVictory() {
    this.initialize.apply(this, arguments);
}

Window_BattleVictory.prototype = Object.create(Window_Base.prototype);
Window_BattleVictory.prototype.constructor = Window_BattleVictory;

Window_BattleVictory.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.createSubWindows();
    this.refresh();
};

Window_BattleVictory.prototype.standardPadding = function() {
    return 0;
};

Window_BattleVictory.prototype.createSubWindows = function() {
    if (BattleManager._rewards.items.length > 0) {
        this.createItemListWindow();
    }
    this.createActorWindows();
    this.createContinueWindow();
};

Window_BattleVictory.prototype.createItemListWindow = function() {
    var x = Math.round((this.width + Olivia.OctoBattle.VictoryUI.MiddleThickness) / 2);
    var y = Math.round(this.height * Olivia.OctoBattle.VictoryUI.BackgroundDimHeight) + Math.round(this.lineHeight() * 2.5);
    var w = this.width - x - Olivia.OctoBattle.VictoryUI.SideThickness;
    var h = this.height - y - this.lineHeight() * 1.5 - Window_Base.prototype.standardPadding.call(this) * 2;
    this._itemWindow = new Window_BattleVictoryItems(x, y, w, h);
    this.addChild(this._itemWindow);
};

Window_BattleVictory.prototype.createActorWindows = function() {
    var members = $gameParty.members();
    for (var i = 0; i < members.length; i++) {
        var member = members[i];
        if (!!member) {
            var actorWindow = new Window_BattleVictoryActor(i, member);
            this.addChild(actorWindow);
        }
    }
};

Window_BattleVictory.prototype.createContinueWindow = function() {
    this._continueWindow = new Window_BattleVictoryContinue();
    this.addChild(this._continueWindow);
};

Window_BattleVictory.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.contentsOpacity += Olivia.OctoBattle.VictoryUI.TransitionPower;
};

Window_BattleVictory.prototype.refresh = function() {
    this.contents.clear();
    this.drawBackground();
    this.drawForeground();
};

Window_BattleVictory.prototype.drawBackground = function() {
    this.drawBackgroundMajorFadeOut();
    this.drawBackgroundRewardStrips();
};

Window_BattleVictory.prototype.drawBackgroundMajorFadeOut = function() {
    var y = Math.round(this.height * Olivia.OctoBattle.VictoryUI.BackgroundDimHeight);
    var lowerHeight = this.lineHeight() + Window_Base.prototype.standardPadding.call(this) * 2;
    var height = this.height - y - lowerHeight;
    var width = this.width * 2;
    this.contents.gradientFillRect(0, y, width, height, this.dimColor1(), this.dimColor2());
    this.contents.gradientFillRect(0, this.height - lowerHeight + 2, this.width, lowerHeight - 2, this.dimColor2(), this.dimColor1());
    this.changePaintOpacity(false);
    this.contents.fillRect(0, y - 2, width, 2, this.normalColor());
    this.contents.fillRect(0, this.height - lowerHeight, width, 2, this.normalColor());
    if (BattleManager._rewards.items.length > 0) {
        var lx = Math.round(this.width / 2);
        var ly = y + this.lineHeight() * 2;
        var lw = this.width - lx - Olivia.OctoBattle.VictoryUI.SideThickness;
        this.contents.fillRect(lx, ly, lw, 2, this.normalColor());
    }
};

Window_BattleVictory.prototype.drawBackgroundRewardStrips = function() {
    var x = Olivia.OctoBattle.VictoryUI.SideThickness;
    var y1 = Math.round(this.height * Olivia.OctoBattle.VictoryUI.BackgroundDimHeight) + this.lineHeight();
    var y2 = y1 + this.lineHeight() + 2;
    var y3 = y2 + this.lineHeight() + 2;
    var width = Math.round(this.width / 2) - Olivia.OctoBattle.VictoryUI.SideThickness - Math.round(Olivia.OctoBattle.VictoryUI.MiddleThickness / 2);
    var width1 = Math.round(width * 0.80);
    var width2 = width - width1;
    this.changePaintOpacity(false);
    this.drawBackgroundRewardStrip(x, y1, width1, width2);
    this.drawBackgroundRewardStrip(x, y2, width1, width2);
    if (Imported.YEP_JobPoints) {
        this.drawBackgroundRewardStrip(x, y3, width1, width2);
    }
};

Window_BattleVictory.prototype.drawBackgroundRewardStrip = function(x, y, width1, width2) {
    var lh = this.lineHeight();
    var hlh = Math.round(this.lineHeight() / 2);
    x += hlh;
    width1 -= hlh;
    var points = [x, y, x - hlh, y + hlh, x, y + lh];
    this.changePaintOpacity(false);
    var opacity = this.translucentOpacity() / 255;
    this.contents.drawBattlePolygon(points, this.normalColor(), 0, opacity, false);
    this.contents.fillRect(x, y, width1, lh, this.normalColor());
    this.contents.gradientFillRect(x + width1, y, width2, lh, this.normalColor(), this.dimColor2());
};

Window_BattleVictory.prototype.drawForeground = function() {
    this.drawForgreoundVictoryText();
    this.drawForegroundRewardText();
    if (BattleManager._rewards.items.length > 0) {
        this.drawForegroundItemsObtained();
    }
};

Window_BattleVictory.prototype.drawForgreoundVictoryText = function() {
    this.changePaintOpacity(true);
    this.resetFontSettings();
    var text = Olivia.OctoBattle.VictoryUI.TextVictory;
    this.contents.fontSize = Olivia.OctoBattle.VictoryUI.TextVictoryFontSize;
    var x = Olivia.OctoBattle.VictoryUI.SideThickness;
    var y = Math.round(this.height * Olivia.OctoBattle.VictoryUI.BackgroundDimHeight) - Math.round(Olivia.OctoBattle.VictoryUI.TextVictoryFontSize / 2);
    this.drawText(text, x, y, this.width);
};

Window_BattleVictory.prototype.drawForegroundRewardText = function() {
    this.changePaintOpacity(true);
    this.resetFontSettings();
    var x = Olivia.OctoBattle.VictoryUI.SideThickness + Math.round(this.lineHeight() / 2);
    var y1 = Math.round(this.height * Olivia.OctoBattle.VictoryUI.BackgroundDimHeight) + this.lineHeight();
    var y2 = y1 + this.lineHeight() + 2;
    var y3 = y2 + this.lineHeight() + 2;
    var width = Math.round(this.width / 2) - Olivia.OctoBattle.VictoryUI.SideThickness - Math.round(Olivia.OctoBattle.VictoryUI.MiddleThickness / 2);
    var width1 = Math.round(width * 0.50);
    var width2 = Math.round(width * 0.75);

    this.drawForegroundRewards(x, y1, width1, width2, 'gold');
    this.drawForegroundRewards(x, y2, width1, width2, 'exp');
    if (Imported.YEP_JobPoints) {
        this.drawForegroundRewards(x, y3, width1, width2, 'jp');
    }
};

Window_BattleVictory.prototype.drawForegroundRewards = function(x, y, width1, width2, type) {
    if (type === 'gold') {
        var text1 = TextManager.currencyUnit;
        var text2 = BattleManager._rewards.gold;
    } else if (type === 'exp') {
        var text1 = TextManager.exp;
        var text2 = BattleManager._rewards.exp;
    } else if (type === 'jp') {
        var text1 = Yanfly.Param.Jp;
        var text2 = BattleManager._rewards.jp;
    } else {
        return;
    }
    if (Imported.YEP_CoreEngine) {
        text2 = Yanfly.Util.toGroup(text2);
    }
    this.changePaintOpacity(false);
    this.contents.fontSize = Olivia.OctoBattle.VictoryUI.RewardCategoryFontSize;
    this.changeTextColor(this.textColor(Olivia.OctoBattle.VictoryUI.RewardCategoryFontColor));
    this.drawText(text1, x, y, width1, 'left');
    this.changePaintOpacity(true);
    this.contents.fontSize = Olivia.OctoBattle.VictoryUI.RewardResultsFontSize;
    this.changeTextColor(this.textColor(Olivia.OctoBattle.VictoryUI.RewardResultsFontColor));
    this.drawText(text2, x, y, width2, 'right');
};

Window_BattleVictory.prototype.drawForegroundItemsObtained = function() {
    this.changePaintOpacity(true);
    this.resetFontSettings();
    var text = Olivia.OctoBattle.VictoryUI.TextItems;
    var x = Math.round((this.width + Olivia.OctoBattle.VictoryUI.MiddleThickness) / 2);
    var y = Math.round(this.height * Olivia.OctoBattle.VictoryUI.BackgroundDimHeight);
    var w = this.width - x - Olivia.OctoBattle.VictoryUI.SideThickness;
    this.contents.fontSize = Olivia.OctoBattle.VictoryUI.TextItemsFontSize;
    this.contents.drawText(text, x, y, w, this.lineHeight() * 2, 'left');
};

//-----------------------------------------------------------------------------
// Window_BattleVictoryContinue
//
// The window for displaying the description of the selected item.

function Window_BattleVictoryContinue() {
    this.initialize.apply(this, arguments);
}

Window_BattleVictoryContinue.prototype = Object.create(Window_Base.prototype);
Window_BattleVictoryContinue.prototype.constructor = Window_BattleVictoryContinue;

Window_BattleVictoryContinue.prototype.initialize = function() {
    this._duration = Olivia.OctoBattle.VictoryUI.ContinueDuration;
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, this.lineHeight());
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.refresh();
};

Window_BattleVictoryContinue.prototype.standardPadding = function() {
    return 0;
};

Window_BattleVictoryContinue.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this._duration > 0) {
        if (Input.isRepeated('ok') || Input.isRepeated('cancel') || TouchInput.isTriggered()) {
            Input.clear();
            TouchInput.clear();
            this._duration = 1;
        } else {
            this._duration--;
        }
    } else if (!this._ending && (Input.isRepeated('ok') || Input.isRepeated('cancel') || TouchInput.isTriggered())) {
        Input.clear();
        TouchInput.clear();
        this._ending = true;
        BattleManager.endVictoryPhase();
    } else {
        this.contentsOpacity += Olivia.OctoBattle.VictoryUI.TransitionPower;
    }
};

Window_BattleVictoryContinue.prototype.refresh = function() {
    this.contents.clear();
    var text = Olivia.OctoBattle.VictoryUI.ContinueText;
    this.drawTextEx(text, this.textPadding(), 0)
    var width = this.textWidthEx(text) + this.textPadding() * 2;
    this.x = Graphics.boxWidth - Olivia.OctoBattle.VictoryUI.SideThickness - width;
    this.y = Graphics.boxHeight - Math.round(this.lineHeight() * 1.5);
};

Window_BattleVictoryContinue.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

//-----------------------------------------------------------------------------
// Window_BattleVictoryItems
//
// The window for displaying the items acquired from battle

function Window_BattleVictoryItems() {
    this.initialize.apply(this, arguments);
}

Window_BattleVictoryItems.prototype = Object.create(Window_ItemList.prototype);
Window_BattleVictoryItems.prototype.constructor = Window_BattleVictoryItems;

Window_BattleVictoryItems.prototype.initialize = function(x, y, width, height) {
    height = Math.floor(height / this.lineHeight()) * this.lineHeight();
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.show();
    this.refresh();
    var delay = Math.ceil(255 / Olivia.OctoBattle.VictoryUI.TransitionPower);
    setTimeout(this.processReady.bind(this), delay);
};

Window_BattleVictoryItems.prototype.standardPadding = function() {
    return 0;
};

Window_BattleVictoryItems.prototype.maxCols = function() {
    return 1;
};

Window_BattleVictoryItems.prototype.processReady = function() {
    if (this._data.length > this.height / this.lineHeight()) {
        this.activate();
        this.select(0);
    }
};

Window_BattleVictoryItems.prototype.update = function() {
    Window_ItemList.prototype.update.call(this);
    this.contentsOpacity += Olivia.OctoBattle.VictoryUI.TransitionPower;
};

Window_BattleVictoryItems.prototype.makeItemList = function() {
    this._data = [];
    this._dropItems = [];
    this._dropWeapons = [];
    this._dropArmors = [];
    this.extractDrops();
};

Window_BattleVictoryItems.prototype.isEnabled = function(item) {
    return true;
};

// Code borrowed from Yanfly Victory Aftermath
Window_BattleVictoryItems.prototype.extractDrops = function() {
    BattleManager._rewards.items.forEach(function(item) {
        if (!item) return;
        if (DataManager.isItem(item)) this._dropItems.push(item.id);
        if (DataManager.isWeapon(item)) this._dropWeapons.push(item.id);
        if (DataManager.isArmor(item)) this._dropArmors.push(item.id);
    }, this);
    this._dropItems.sort(function(a, b){return a-b});
    this._dropWeapons.sort(function(a, b){return a-b});
    this._dropArmors.sort(function(a, b){return a-b});
    this._dropItems.forEach(function(id) {
        var item = $dataItems[id];
        if (item && !this._data.contains(item)) this._data.push(item);
    }, this);
    this._dropWeapons.forEach(function(id) {
        var item = $dataWeapons[id];
        if (item && !this._data.contains(item)) this._data.push(item);
    }, this);
    this._dropArmors.forEach(function(id) {
        var item = $dataArmors[id];
        if (item && !this._data.contains(item)) this._data.push(item);
    }, this);
};

// Code borrowed from Yanfly Victory Aftermath
Window_BattleVictoryItems.prototype.drawItemNumber = function(item, x, y, width) {
    if (!this.needsNumber()) return;
    var numItems = this.numItems(item);
    if (Imported.YEP_CoreEngine) {
        numItems = Yanfly.Util.toGroup(this.numItems(item));
        this.contents.fontSize = Yanfly.Param.ItemQuantitySize || 28;
    } else {
        this.contents.fontSize = 20;
    }
    this.drawText('\u00d7' + numItems, x, y, width, 'right');
    this.resetFontSettings();
};

// Code borrowed from Yanfly Victory Aftermath
Window_BattleVictoryItems.prototype.numItems = function(item) {
    if (DataManager.isItem(item)) {
        return this.getCount(item.id, this._dropItems);
    }
    if (DataManager.isWeapon(item)) {
        return this.getCount(item.id, this._dropWeapons);
    }
    if (DataManager.isArmor(item)) {
        return this.getCount(item.id, this._dropArmors);
    }
    return 0;
};

// Code borrowed from Yanfly Victory Aftermath
Window_BattleVictoryItems.prototype.getCount = function(value, arr) {
    var occur = 0;
    for(var i = 0; i < arr.length; i++){
        if (arr[i] === value) occur++;
    }
    return occur;
};

// Code borrowed from Yanfly Core Engine
Yanfly.Util.toGroup = function(inVal) {
  if (typeof inVal === 'string') return inVal;
  return inVal.toLocaleString('en');
  return inVal.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
    return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
  });
};

//-----------------------------------------------------------------------------
// Window_BattleVictoryActor
//
// The window for displaying the description of the selected item.

function Window_BattleVictoryActor() {
    this.initialize.apply(this, arguments);
}

Window_BattleVictoryActor.prototype = Object.create(Window_Base.prototype);
Window_BattleVictoryActor.prototype.constructor = Window_BattleVictoryActor;

Window_BattleVictoryActor.prototype.initialize = function(index, actor) {
    this._index = index;
    this._actor = actor;
    this._tempActor = BattleManager._tempActors[index];
    var x = Olivia.OctoBattle.VictoryUI.SideThickness;
    var y = Math.round(Graphics.boxHeight * Olivia.OctoBattle.VictoryUI.BackgroundDimHeight) + this.lineHeight() * 5 - 4;
    y += index * this.lineHeight() * 2 + index * Math.ceil(this.lineHeight() / 4) - Math.round(this.lineHeight() / 4);
    if (!Imported.YEP_JobPoints) {
        y -= Math.round(this.lineHeight() / 2) + 2;
    }
    var width = Math.round(Graphics.boxWidth / 2) - Olivia.OctoBattle.VictoryUI.SideThickness - Math.round(Olivia.OctoBattle.VictoryUI.MiddleThickness / 2);
    var height = this.lineHeight() * 2;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.createSubWindow();
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.refresh();
};

Window_BattleVictoryActor.prototype.standardPadding = function() {
    return 0;
};

Window_BattleVictoryActor.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.contentsOpacity += Olivia.OctoBattle.VictoryUI.TransitionPower;
};

Window_BattleVictoryActor.prototype.createSubWindow = function() {
    this._subWindow = new Window_BattleVictoryActorSub(this, this._actor, this._tempActor);
    this.addChild(this._subWindow);
};

Window_BattleVictoryActor.prototype.refresh = function() {
    this.contents.clear();
    this.drawBackgroundStrip();
    this.drawForegroundGaugeBack();
    this.drawForegroundActorName();
    if (Imported.YEP_JobPoints) {
        this.drawForegroundJPLabel();
    }
};

Window_BattleVictoryActor.prototype.drawBackgroundStrip = function() {
    this.changePaintOpacity(false);
    var lh = this.lineHeight();
    var hlh = Math.round(this.lineHeight() / 2);
    var width = this.width - lh;
    var points = [hlh, 0, 0, hlh, hlh, lh, hlh + width, lh, width + lh, hlh, width + hlh, 0];
    this.contents.drawBattlePolygon(points, this.dimColor1(), 0, 255, false);
    this.contents.fillRect(hlh, this.height - 2, width, 2, this.normalColor());
};

Window_BattleVictoryActor.prototype.drawForegroundGaugeBack = function() {
    this.changePaintOpacity(false);
    var width = this.width - this.lineHeight();
    var height = Olivia.OctoBattle.VictoryUI.ExpGaugeHeight;
    var x = Math.round(this.lineHeight() / 2);
    var y = this.height - height - 6;
    this.contents.fillRect(x, y, width, height, this.gaugeBackColor());
};

Window_BattleVictoryActor.prototype.drawForegroundActorName = function() {
    this.changePaintOpacity(true);
    this.resetFontSettings();
    this.contents.fontSize = Olivia.OctoBattle.VictoryUI.ActorNameFontSize;
    this.drawText(this._actor.name(), Math.round(this.lineHeight() / 2), 0, this.width - this.lineHeight())
};

Window_BattleVictoryActor.prototype.drawForegroundJPLabel = function() {
    this.changePaintOpacity(true);
    this.resetFontSettings();
    this.contents.fontSize = Olivia.OctoBattle.VictoryUI.ActorJPFontSize;
    this.drawText(Yanfly.Param.Jp, Math.round(this.lineHeight() / 2), 0, this.width - this.lineHeight(), 'right');
};

//-----------------------------------------------------------------------------
// Window_BattleVictoryActorSub
//
// The window for displaying the description of the selected item.

function Window_BattleVictoryActorSub() {
    this.initialize.apply(this, arguments);
}

Window_BattleVictoryActorSub.prototype = Object.create(Window_Base.prototype);
Window_BattleVictoryActorSub.prototype.constructor = Window_BattleVictoryActorSub;

Window_BattleVictoryActorSub.prototype.initialize = function(parent, actor, tempActor) {
    this._actor = actor;
    this._tempActor = tempActor;
    this._duration = Olivia.OctoBattle.VictoryUI.ActorUpdateDuration || 1;
    Window_Base.prototype.initialize.call(this, 0, 0, parent.width, parent.height);
    this.setupConstants();
    this.calculateNextLevelConstants();
    this.createGaugeSprite();
    this.createLevelUpSprite();
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.refresh();
};

Window_BattleVictoryActorSub.prototype.standardPadding = function() {
    return 0;
};

Window_BattleVictoryActorSub.prototype.setupConstants = function() {
    this._expWidth = this.width - this.lineHeight();
    this._exp = this._tempActor.currentExp();
    this._expTarget = this._actor.currentExp();
    this._level = this._tempActor.level;
    this._levelText = this._level;
    this._levelText = Yanfly.Util.toGroup(this._levelText);
    this._levelText = Olivia.OctoBattle.VictoryUI.ActorLevelFormat.format(this._levelText);
    this._maxLevel = this._tempActor.isMaxLevel();
    if (Imported.YEP_JobPoints) {
        this.contents.fontSize = Olivia.OctoBattle.VictoryUI.ActorJPFontSize;
        this._jpTextWidth = this.textWidth(Yanfly.Param.Jp + ' ');
        this._jp = this._tempActor.jp();
        this._jpTarget = this._actor.jp();
    }
};

Window_BattleVictoryActorSub.prototype.calculateNextLevelConstants = function() {
    if (this._level >= this._actor.maxLevel()) {
        this._level = this._actor.maxLevel();
        this._currentLevelExp = '-';
        this._nextLevelExp = '-';
        this._maxLevel = true;
    } else {
        this._currentLevelExp = this._actor.expForLevel(this._level);
        this._nextLevelExp = this._actor.expForLevel(this._level + 1);
    }
};

Window_BattleVictoryActorSub.prototype.createGaugeSprite = function() {
    var width = this.width - this.lineHeight();
    var height = Olivia.OctoBattle.VictoryUI.ExpGaugeHeight;
    var x = Math.round(this.lineHeight() / 2);
    var y = this.height - height - 6;
    var color1 = this.textColor(Olivia.OctoBattle.VictoryUI.ExpGaugeColor1);
    var color2 = this.textColor(Olivia.OctoBattle.VictoryUI.ExpGaugeColor2);
    if (Imported.YEP_CoreEngine && Yanfly.Param.GaugeOutline) {
        x += 1;
        y += 1;
        width -= 2;
        height -= 2;
    }
    this._gaugeWidth = width;
    this._gaugeSprite = new Sprite();
    this.addChildToBack(this._gaugeSprite);
    this._gaugeSprite.x = x;
    this._gaugeSprite.y = y;
    this._gaugeSprite.opacity = 0;
    this._gaugeSprite.bitmap = new Bitmap(width, height);
    this._gaugeSprite.bitmap.gradientFillRect(0, 0, width, height, color1, color2);
};

Window_BattleVictoryActorSub.prototype.createLevelUpSprite = function() {
    this.resetFontSettings();
    var text = Olivia.OctoBattle.VictoryUI.LevelUpText;
    this.contents.fontSize = Olivia.OctoBattle.VictoryUI.LevelUpTextFontSize;
    var width = this.textWidth(text); + this.lineHeight();
    this._levelUpSprite = new Sprite();
    this.addChild(this._levelUpSprite);
    this._levelUpSprite.x = Math.round(this.width * 0.5);
    if (Imported.YEP_JobPoints) {
        this._levelUpSprite.y = Math.round(this.lineHeight() * 1.5);
    } else {
        this._levelUpSprite.y = Math.round(this.lineHeight() * 0.5);
    }
    this._levelUpSprite.anchor.x = 0.5;
    this._levelUpSprite.anchor.y = 0.5;
    this._levelUpSprite.scale.x = 0;
    this._levelUpSprite.scale.y = 0;
    this._levelUpSprite.bitmap = new Bitmap(width, this.lineHeight() * 2);
    this._levelUpSprite.bitmap.textColor = this.textColor(Olivia.OctoBattle.VictoryUI.LevelUpTextColor);
    this._levelUpSprite.bitmap.fontSize = Olivia.OctoBattle.VictoryUI.LevelUpTextFontSize;
    this._levelUpSprite.bitmap.drawText(text, 0, 0, width, this.lineHeight() * 2, 'center');
    this._levelUp = false;
    this._levelUpSpriteFade = 0;
    this.resetFontSettings();
};

Window_BattleVictoryActorSub.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.contentsOpacity += Olivia.OctoBattle.VictoryUI.TransitionPower;
    if (!!this._gaugeSprite) {
        this._gaugeSprite.opacity = this.contentsOpacity;
    }
    if (this._duration > 0) {
        this.refresh();
        if (Input.isRepeated('ok') || Input.isRepeated('cancel')) {
            this._duration = 1;
        } else {
            this._duration--;
        }
    }
    if (this._levelUp) {
        this.updateLevelUpSpriteScale();
    }
    if (this._levelUpSpriteFade !== 0) {
        this.updateLevelUpSpriteFade();
    }
};

Window_BattleVictoryActorSub.prototype.updateLevelUpSpriteScale = function() {
    this._levelUpSprite.scale.x = Math.min(1, this._levelUpSprite.scale.x + 0.02);
    this._levelUpSprite.scale.y = Math.min(1, this._levelUpSprite.scale.y + 0.02);
    if (this._levelUpSprite.scale.x >= 1) {
    }
};

Window_BattleVictoryActorSub.prototype.updateLevelUpSpriteFade = function() {
    this._levelUpSprite.opacity += this._levelUpSpriteFade;
    if (this._levelUpSprite.opacity >= 255 || this._levelUpSprite.opacity <= 0) {
        this._levelUpSpriteFade *= -1;
    }
};

Window_BattleVictoryActorSub.prototype.refresh = function() {
    this.contents.clear();
    if (Imported.YEP_JobPoints) {
        this.drawActorJpInformation();
    }
    this.updateActorExp();
    this.drawActorLevelInformation();
    this.drawActorExpInformation();
    this.updateGaugeSpriteWidth();
    this.playLevelUpSound();
};

Window_BattleVictoryActorSub.prototype.drawActorJpInformation = function() {
    this.changePaintOpacity(true);
    this.resetFontSettings();
    var d = this._duration || 1;
    this._jp = (this._jp * (d - 1) + this._jpTarget) / d;
    var text = Yanfly.Util.toGroup(Math.round(this._jp));
    var x = Math.round(this.lineHeight() / 2);
    var width = this.width - this.lineHeight() - this._jpTextWidth;
    this.contents.fontSize = Olivia.OctoBattle.VictoryUI.ActorJPFontSize;
    this.drawText(text, x, 0, width, 'right');
};

Window_BattleVictoryActorSub.prototype.updateActorExp = function() {
    var d = this._duration || 1;
    this._exp = (this._exp * (d - 1) + this._expTarget) / d;
    while (this._exp >= this._nextLevelExp) {
        this.levelUp();
    }
};

Window_BattleVictoryActorSub.prototype.levelUp = function() {
    if (!this._maxLevel) {
        this._level += 1;
        this._levelUp = true;
        this._playLevelUpSound = true;
        this._levelUpSpriteFade = this._levelUpSpriteFade || 4;
        this.calculateNextLevelConstants();
        this._levelText = this._level;
        this._levelText = Yanfly.Util.toGroup(this._levelText);
        this._levelText = Olivia.OctoBattle.VictoryUI.ActorLevelFormat.format(this._levelText);
    }
};

Window_BattleVictoryActorSub.prototype.drawActorLevelInformation = function() {
    this.changePaintOpacity(true);
    this.resetFontSettings();
    var x = Math.round(this.lineHeight() / 2);
    var width = this.width - this.lineHeight();
    if (Imported.YEP_JobPoints) {
        var align = 'center';
    } else {
        var align = 'right';
    }
    this.contents.fontSize = Olivia.OctoBattle.VictoryUI.ActorLevelFontSize;
    this.drawText(this._levelText, x, 0, width, align);
};

Window_BattleVictoryActorSub.prototype.drawActorExpInformation = function() {
    if (this._maxLevel) {
        var nextExp = this._nextLevelExp;
        var currentExp = this._currentLevelExp;
    } else {
        var nextExp = this._nextLevelExp - this._currentLevelExp;
        var currentExp = Math.round(this._exp - this._currentLevelExp);
        if (Imported.YEP_CoreEngine) {
            nextExp = Yanfly.Util.toGroup(nextExp);
            currentExp = Yanfly.Util.toGroup(currentExp);
        }
    }
    nextExp = '/' + nextExp;
    var x = Math.round(this.lineHeight() / 2) + this.textPadding();
    var width = this.width - this.lineHeight() - this.textPadding() * 2;
    this.contents.fontSize = Olivia.OctoBattle.VictoryUI.ActorEXPFontSize;
    this.drawText(TextManager.exp, x, this.lineHeight(), width, 'left');
    this.changeTextColor(this.textColor(Olivia.OctoBattle.VictoryUI.ExpNextFontColor));
    this.contents.fontSize = Olivia.OctoBattle.VictoryUI.ExpNextFontSize;
    this.drawText(nextExp, x, this.lineHeight(), width, 'right');
    width -= this.textWidth(nextExp);
    this.changeTextColor(this.textColor(Olivia.OctoBattle.VictoryUI.ExpCurrentFontColor));
    this.contents.fontSize = Olivia.OctoBattle.VictoryUI.ExpCurrentFontSize;
    this.drawText(currentExp, x, this.lineHeight(), width, 'right');
};

Window_BattleVictoryActorSub.prototype.updateGaugeSpriteWidth = function() {
    if (this._maxLevel) {
        var width = this._gaugeWidth;
    } else {
        var nextExp = this._nextLevelExp - this._currentLevelExp;
        var currentExp = this._exp - this._currentLevelExp;
        var rate = Math.min(currentExp / nextExp, 1);
        var width = Math.round(this._gaugeWidth * rate);
    }
    this._gaugeSprite.width = width;
};

Window_BattleVictoryActorSub.prototype.playLevelUpSound = function() {
    if (this._playLevelUpSound) {
        this._playLevelUpSound = false;
        AudioManager.playSe(Olivia.OctoBattle.VictoryUI.LevelUpSound);
    }
};

//=============================================================================
} // End Victory HUD
//=============================================================================

//=============================================================================
// Battle Effects
//
// 1. Popup Control
// 2. Buff, Debuff, State Turn Stacking and Control
// 3. Follow Up Skill Actions
// 4. Extra Skill Lists
// 5. Unique Notetag Effects

if (Olivia.OctoBattle.BattleEffects.Enabled) {

Olivia.OctoBattle.Effects = Olivia.OctoBattle.Effects || {};

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages battle progress.

Olivia.OctoBattle.Effects.___BattleManager_initMembers___ = BattleManager.initMembers;
BattleManager.initMembers = function() {
    Olivia.OctoBattle.Effects.___BattleManager_initMembers___.call(this);
    this._battleBonus = '';
};

//-----------------------------------------------------------------------------
// Game_Action
//
// The game object class for a battle action.

Game_Action.prototype.subjectTargetEffectTraitSources = function() {
    var sources = this.subject().states();
    if (this.subject().isActor()) {
      sources.push(this.subject().actor());
      sources.push(this.subject().currentClass());
      var equips = this.subject().equips();
      for (var i = 0; i < equips.length; i++) {
          var equip = equips[i];
          if (!!equip) {
              sources.push(equip);
          }
      }
    } else {
      sources.push(this.subject().enemy());
    }
    return sources;
};

Game_Action.prototype.isSubjectAffectedByNote = function(note) {
    if (!!this.subject()) {
        var sources = this.subjectTargetEffectTraitSources();
        for (var i = 0; i < sources.length; i++) {
            var source = sources[i];
            if (!!source && source.note.match(note)) {
                return true;
            }
        }
    }
    return false;
};

Game_Action.prototype.isItemDivine = function() {
    return this.item().note.match(/<Divine>/i) || this.item().note.match(/<Bypass Target Change>/i)
};

Olivia.OctoBattle.Effects.___Game_Action_isForUser___ = Game_Action.prototype.isForUser;
Game_Action.prototype.isForUser = function() {
    if (this.isSkill()) {
        if (this.checkItemScope([11]) && this.isSubjectAffectedByNote(/<Skill Target Change: Self to All>/i) && !this.isItemDivine()) {
            return false;
        }
    } else if (this.isItem()) {
        if (this.checkItemScope([11]) && this.isSubjectAffectedByNote(/<Item Target Change: Self to All>/i) && !this.isItemDivine()) {
            return false;
        }
    }
    return Olivia.OctoBattle.Effects.___Game_Action_isForUser___.call(this);
};

Olivia.OctoBattle.Effects.___Game_Action_isForOne___ = Game_Action.prototype.isForOne;
Game_Action.prototype.isForOne = function() {
    if (this.isSkill()) {
        if (this.checkItemScope([8]) && this.isSubjectAffectedByNote(/<Skill Target Change Allies: All to One>/i) && !this.isItemDivine()) {
            return true;
        } else if (this.checkItemScope([2]) && this.isSubjectAffectedByNote(/<Skill Target Change Enemies: All to One>/i) && !this.isItemDivine()) {
            return true;
        } else if (this.checkItemScope([7]) && this.isSubjectAffectedByNote(/<Skill Target Change Allies: One to All>/i) && !this.isItemDivine()) {
            return false;
        } else if (this.checkItemScope([1]) && this.isSubjectAffectedByNote(/<Skill Target Change Enemies: One to All>/i) && !this.isItemDivine()) {
            return false;
        } else if (this.checkItemScope([11]) && this.isSubjectAffectedByNote(/<Skill Target Change: Self to All>/i) && !this.isItemDivine()) {
            return false;
        }
    } else if (this.isItem()) {
        if (this.checkItemScope([8]) && this.isSubjectAffectedByNote(/<Item Target Change Allies: All to One>/i) && !this.isItemDivine()) {
            return true;
        } else if (this.checkItemScope([2]) && this.isSubjectAffectedByNote(/<Item Target Change Enemies: All to One>/i) && !this.isItemDivine()) {
            return true;
        } else if (this.checkItemScope([7]) && this.isSubjectAffectedByNote(/<Item Target Change Allies: One to All>/i) && !this.isItemDivine()) {
            return false;
        } else if (this.checkItemScope([1]) && this.isSubjectAffectedByNote(/<Item Target Change Enemies: One to All>/i) && !this.isItemDivine()) {
            return false;
        } else if (this.checkItemScope([11]) && this.isSubjectAffectedByNote(/<Item Target Change: Self to All>/i) && !this.isItemDivine()) {
            return false;
        }
    }
    return Olivia.OctoBattle.Effects.___Game_Action_isForOne___.call(this);
};

Olivia.OctoBattle.Effects.___Game_Action_isForAll___ = Game_Action.prototype.isForAll;
Game_Action.prototype.isForAll = function() {
    if (this.isSkill()) {
        if (this.checkItemScope([8]) && this.isSubjectAffectedByNote(/<Skill Target Change Allies: All to One>/i) && !this.isItemDivine()) {
            return false;
        } else if (this.checkItemScope([2]) && this.isSubjectAffectedByNote(/<Skill Target Change Enemies: All to One>/i) && !this.isItemDivine()) {
            return false;
        } else if (this.checkItemScope([7]) && this.isSubjectAffectedByNote(/<Skill Target Change Allies: One to All>/i) && !this.isItemDivine()) {
            return true;
        } else if (this.checkItemScope([1]) && this.isSubjectAffectedByNote(/<Skill Target Change Enemies: One to All>/i) && !this.isItemDivine()) {
            return true;
        } else if (this.checkItemScope([11]) && this.isSubjectAffectedByNote(/<Skill Target Change: Self to All>/i) && !this.isItemDivine()) {
            return true;
        }
    } else if (this.isItem()) {
        if (this.checkItemScope([8]) && this.isSubjectAffectedByNote(/<Item Target Change Allies: All to One>/i) && !this.isItemDivine()) {
            return false;
        } else if (this.checkItemScope([2]) && this.isSubjectAffectedByNote(/<Item Target Change Enemies: All to One>/i) && !this.isItemDivine()) {
            return false;
        } else if (this.checkItemScope([7]) && this.isSubjectAffectedByNote(/<Item Target Change Allies: One to All>/i) && !this.isItemDivine()) {
            return true;
        } else if (this.checkItemScope([1]) && this.isSubjectAffectedByNote(/<Item Target Change Enemies: One to All>/i) && !this.isItemDivine()) {
            return true;
        } else if (this.checkItemScope([11]) && this.isSubjectAffectedByNote(/<Item Target Change: Self to All>/i) && !this.isItemDivine()) {
            return false;
        }
    }
    return Olivia.OctoBattle.Effects.___Game_Action_isForAll___.call(this);
};

Olivia.OctoBattle.Effects.___Game_Action_needsSelection___ = Game_Action.prototype.needsSelection;
Game_Action.prototype.needsSelection = function() {
    if (this.isSkill()) {
        if (this.checkItemScope([8]) && this.isSubjectAffectedByNote(/<Skill Target Change Allies: All to One>/i) && !this.isItemDivine()) {
            return true;
        } else if (this.checkItemScope([2]) && this.isSubjectAffectedByNote(/<Skill Target Change Enemies: All to One>/i) && !this.isItemDivine()) {
            return true;
        } else if (this.checkItemScope([7]) && this.isSubjectAffectedByNote(/<Skill Target Change Allies: One to All>/i) && !this.isItemDivine()) {
            return false;
        } else if (this.checkItemScope([1]) && this.isSubjectAffectedByNote(/<Skill Target Change Enemies: One to All>/i) && !this.isItemDivine()) {
            return false;
        }
    } else if (this.isItem()) {
        if (this.checkItemScope([8]) && this.isSubjectAffectedByNote(/<Item Target Change Allies: All to One>/i) && !this.isItemDivine()) {
            return true;
        } else if (this.checkItemScope([2]) && this.isSubjectAffectedByNote(/<Item Target Change Enemies: All to One>/i) && !this.isItemDivine()) {
            return true;
        } else if (this.checkItemScope([7]) && this.isSubjectAffectedByNote(/<Item Target Change Allies: One to All>/i) && !this.isItemDivine()) {
            return false;
        } else if (this.checkItemScope([1]) && this.isSubjectAffectedByNote(/<Item Target Change Enemies: One to All>/i) && !this.isItemDivine()) {
            return false;
        }
    }
    return Olivia.OctoBattle.Effects.___Game_Action_needsSelection___.call(this);
};

Olivia.OctoBattle.Effects.___Game_Action_makeDamageValue___ = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
    this._isCalculatingDamage = true;
    var value = Olivia.OctoBattle.Effects.___Game_Action_makeDamageValue___.call(this, target, critical);
    this._isCalculatingDamage = false;
    return value;
};

Olivia.OctoBattle.Effects.___Game_Action_calcElementRate___ = Game_Action.prototype.calcElementRate;
Game_Action.prototype.calcElementRate = function(target) {
    if (!!this._isCalculatingDamage) {
        var states = target.states();
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (!!state && state.note.match(/<All Element Damage Rate: (\d+)([%％])>/i)) {
                return parseFloat(RegExp.$1) * 0.01;
            }
        }
    }
    return Olivia.OctoBattle.Effects.___Game_Action_calcElementRate___.call(this, target);
};

Olivia.OctoBattle.Effects.___Game_Action_executeDamage___ = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
    this.processPopupColorNote(target, value);
    Olivia.OctoBattle.Effects.___Game_Action_executeDamage___.call(this, target, value);
    this.processWeakPopup(target, value);
};

Game_Action.prototype.processPopupColorNote = function(target, value) {
    if (!!target && value > 0 && this.isHpEffect()) {
        var states = target.states();
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (!!state && state.note.match(/<Damage Color:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
                target.result().colorSettings = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            }
        }
    }
};

Game_Action.prototype.processWeakPopup = function(target, value) {
    if (!!target && value > 0 && this.isHpEffect() && this.calcElementRate(target) >= Olivia.OctoBattle.BattleEffects.WeakPopupReqRate) {
        var states = target.states();
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (!!state && state.note.match(/<No Weak Popup>/i)) {
                return;
            }
        }
        target.result()._weakPopup = true;
    }
};

Olivia.OctoBattle.Effects.___Game_Action_applyItemUserEffect___ = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    this.registerUserLastActionType();
    Olivia.OctoBattle.Effects.___Game_Action_applyItemUserEffect___.call(this, target);
    this.applyBattleBonusRewards(target);
};

Game_Action.prototype.registerUserLastActionType = function() {
    if (!!this.subject()) {
        if (this.isPhysical()) {
            this.subject()._lastActionHitType = 'physical';
        } else if (this.isMagical()) {
            this.subject()._lastActionHitType = 'magical';
        } else if (this.isCertainHit()) {
            this.subject()._lastActionHitType = 'certain';
        } else {
            this.subject()._lastActionHitType = 'none';
        }
    }
};

Game_Action.prototype.applyBattleBonusRewards = function(target) {
    if (!!this.item()) {
        if (this.item().note.match(/<JP x(\d+)>/i)) {
            BattleManager._battleBonus = 'JP x' + RegExp.$1;
        } else if (this.item().note.match(/<EXP x(\d+)>/i)) {
            BattleManager._battleBonus = 'EXP x' + RegExp.$1;
        } else if (this.item().note.match(/<Gold x(\d+)>/i)) {
            BattleManager._battleBonus = 'Gold x' + RegExp.$1;
        }
    }
};

//-----------------------------------------------------------------------------
// Game_ActionResult
//
// The game object class for a result of a battle action. For convinience, all
// member variables in this class are public.

Olivia.OctoBattle.Effects.___Game_ActionResult_clear___ = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    Olivia.OctoBattle.Effects.___Game_ActionResult_clear___.call(this);
    this.colorSettings = undefined;
    this._weakPopup = undefined;
    this._breakPopup = undefined;
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.

Olivia.OctoBattle.Effects.___Game_BattlerBase_paySkillCost___ = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Olivia.OctoBattle.Effects.___Game_BattlerBase_paySkillCost___.call(this, skill);
    this.payWeaponDestroy(skill);
};

Game_BattlerBase.prototype.payWeaponDestroy = function(skill) {
    this._destroyWeapon = skill.note.match(/<Destroy Weapon>/i) && this.isActor();
};

Olivia.OctoBattle.Effects.___Game_BattlerBase_overwriteBuffTurns = Game_BattlerBase.prototype.overwriteBuffTurns;
Game_BattlerBase.prototype.overwriteBuffTurns = function(paramId, turns) {
    if (this._buffs[paramId] > 0 && Olivia.OctoBattle.BattleEffects.StackBuffTurns) {
        this._buffTurns[paramId] = this._buffTurns[paramId] || 0;
        this._buffTurns[paramId] += turns;
        this._buffTurns[paramId] = Math.min(this._buffTurns[paramId], Olivia.OctoBattle.BattleEffects.MaxBuffTurns);
    } else if (this._buffs[paramId] < 0 && Olivia.OctoBattle.BattleEffects.StackDebuffTurns) {
        this._buffTurns[paramId] = this._buffTurns[paramId] || 0;
        this._buffTurns[paramId] += turns;
        this._buffTurns[paramId] = Math.min(this._buffTurns[paramId], Olivia.OctoBattle.BattleEffects.MaxDebuffTurns);
    } else {
        Olivia.OctoBattle.Effects.___Game_BattlerBase_overwriteBuffTurns.call(this, paramId, turns);
    }
};

//-----------------------------------------------------------------------------
// Game_Battler
//
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.

Olivia.OctoBattle.Effects.___Game_Battler_startAnimation___ = Game_Battler.prototype.startAnimation;
Game_Battler.prototype.startAnimation = function(animationId, mirror, delay) {
    Olivia.OctoBattle.Effects.___Game_Battler_startAnimation___.call(this, animationId, mirror, delay);
    this._lastAnimationId = animationId;
};

Olivia.OctoBattle.Effects.___Game_Battler_addState___ = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
    if (!this.isStatePrevented(stateId)) {
        var affected = this.isStateAffected(stateId);
        Olivia.OctoBattle.Effects.___Game_Battler_addState___.call(this, stateId);
        this.setupBreakDamagePopup(stateId, affected)
        this.setStateMaximumTurns(stateId);
    }
};

Game_Battler.prototype.setupBreakDamagePopup = function(stateId, affected) {
    if (!affected && this.isStateAffected(stateId) && $dataStates[stateId].note.match(/<Break Popup>/i)) {
        this._result._breakPopup = true;
    }
};

Game_Battler.prototype.setStateMaximumTurns = function(stateId) {
    if (this.isStateAffected(stateId) && $dataStates[stateId].note.match(/<Max Turns: (\d+)>/i)) {
        this._stateTurns[stateId] = Math.min(this._stateTurns[stateId], parseInt(RegExp.$1));
    }
};

Game_Battler.prototype.isStatePrevented = function(stateId) {
    var prevented = [];
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (!!state && state.note.match(/<State (?:Immune|Immunity):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            prevented = prevented.concat(array);
        }
    }
    return prevented.contains(stateId);
};

Olivia.OctoBattle.Effects.___Game_Battler_addBuff___ = Game_Battler.prototype.addBuff;
Game_Battler.prototype.addBuff = function(paramId, turns) {
    if (!this.isBuffPrevented(paramId)) {
        Olivia.OctoBattle.Effects.___Game_Battler_addBuff___.call(this, paramId, turns);
    }
};

Game_Battler.prototype.isBuffPrevented = function(buffId) {
    var prevented = [];
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (!!state && state.note.match(/<Buff (?:Immune|Immunity):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            prevented = prevented.concat(array);
        }
    }
    return prevented.contains(buffId);
};

Olivia.OctoBattle.Effects.___Game_Battler_addDebuff___ = Game_Battler.prototype.addDebuff;
Game_Battler.prototype.addDebuff = function(paramId, turns) {
    if (!this.isDebuffPrevented(paramId)) {
        Olivia.OctoBattle.Effects.___Game_Battler_addDebuff___.call(this, paramId, turns);
    }
};

Game_Battler.prototype.isDebuffPrevented = function(debuffId) {
    var prevented = [];
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        if (!!state && state.note.match(/<Debuff (?:Immune|Immunity):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
            var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
            prevented = prevented.concat(array);
        }
    }
    return prevented.contains(debuffId);
};

Olivia.OctoBattle.Effects.___Game_Battler_onAllActionsEnd___ = Game_Battler.prototype.onAllActionsEnd;
Game_Battler.prototype.onAllActionsEnd = function() {
    Olivia.OctoBattle.Effects.___Game_Battler_onAllActionsEnd___.call(this);
    this.performDestroyWeapon();
    this.performFollowUpAction();
};

Game_Battler.prototype.performDestroyWeapon = function() {
    if (!!this._destroyWeapon && this.isActor()) {
        this._destroyWeapon = false;
        var weapon = this.equips()[0];
        this.changeEquip(0, null);
        $gameParty.loseItem(weapon, 1, false);
        if (Olivia.OctoBattle.WeaponSwap && Olivia.OctoBattle.WeaponSwap.Enabled && !!this.getFirstSwapWeapon()) {
            this.switchToWeaponType(this.getFirstSwapWeapon().wtypeId, false);
        }
    }
};

Game_Battler.prototype.performFollowUpAction = function() {
    if (Imported.YEP_BattleEngineCore) {
        var states = this.states();
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (!!state) {
                if (this._lastActionHitType === 'physical' && state.note.match(/<Physical Follow Up Skill: (\d+)>/i)) {
                    var skillId = parseInt(RegExp.$1);
                    BattleManager.queueForceAction(this, skillId, -1);
                } else if (this._lastActionHitType === 'magical' && state.note.match(/<Magical Follow Up Skill: (\d+)>/i)) {
                    var skillId = parseInt(RegExp.$1);
                    BattleManager.queueForceAction(this, skillId, -1);
                } else if (this._lastActionHitType === 'certain' && state.note.match(/<Certain Follow Up Skill: (\d+)>/i)) {
                    var skillId = parseInt(RegExp.$1);
                    BattleManager.queueForceAction(this, skillId, -1);
                } else if (this._lastActionHitType !== 'certain' && state.note.match(/<Follow Up Skill: (\d+)>/i)) {
                    var skillId = parseInt(RegExp.$1);
                    BattleManager.queueForceAction(this, skillId, -1);
                }
            }
        }
    }
};

//-----------------------------------------------------------------------------
// Game_Actor
//
// The game object class for an actor.

Olivia.OctoBattle.Effects.___Game_BattlerBase_meetsItemConditions___ = Game_BattlerBase.prototype.meetsItemConditions;
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
    if ($gameParty.inBattle() && this.states().length > 0) {
        var states = this.states();
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (!!state && state.note.match(/<Item Seal>/i)) {
                return false;
            }
        }
    }
    return Olivia.OctoBattle.Effects.___Game_BattlerBase_meetsItemConditions___.call(this, item);
};

//-----------------------------------------------------------------------------
// Game_Troop
//
// The game object class for a troop and the battle-related data.

Olivia.OctoBattle.Effects.___Game_Troop_expTotal___ = Game_Troop.prototype.expTotal;
Game_Troop.prototype.expTotal = function() {
    var total = Olivia.OctoBattle.Effects.___Game_Troop_expTotal___.call(this);
    if (BattleManager._battleBonus.match(/EXP x(\d+)/i)) {
        total *= parseInt(RegExp.$1);
    }
    return Math.ceil(total);
};

Olivia.OctoBattle.Effects.___Game_Troop_goldTotal___ = Game_Troop.prototype.goldTotal;
Game_Troop.prototype.goldTotal = function() {
    var total = Olivia.OctoBattle.Effects.___Game_Troop_goldTotal___.call(this);
    if (BattleManager._battleBonus.match(/Gold x(\d+)/i)) {
        total *= parseInt(RegExp.$1);
    }
    return Math.ceil(total);
};

if (Imported.YEP_JobPoints) {

Olivia.OctoBattle.Effects.___Game_Troop_jpTotal___ = Game_Troop.prototype.jpTotal;
Game_Troop.prototype.jpTotal = function() {
    var total = Olivia.OctoBattle.Effects.___Game_Troop_jpTotal___.call(this);
    if (BattleManager._battleBonus.match(/JP x(\d+)/i)) {
        total *= parseInt(RegExp.$1);
    }
    return Math.ceil(total);
};

}

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.

Olivia.OctoBattle.Effects.___Scene_Battle_isAnyInputWindowActive___ = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
    if (!!this._extraSkillWindow && this._extraSkillWindow.active) {
        return true;
    }
    return Olivia.OctoBattle.Effects.___Scene_Battle_isAnyInputWindowActive___.call(this);
};

Olivia.OctoBattle.Effects.___Scene_Battle_updateWindowPositions___ = Scene_Battle.prototype.updateWindowPositions;
Scene_Battle.prototype.updateWindowPositions = function() {
    Olivia.OctoBattle.Effects.___Scene_Battle_updateWindowPositions___.call(this);
    if (BattleManager.isInputting()) {
        if (!!this._extraSkillWindow && this._extraSkillWindow.active) {
            this._skillWindow.updatePosition();
            this._extraSkillWindow.updatePosition();
        }
    }
};

Olivia.OctoBattle.Effects.___Scene_Battle_onSkillOk___ = Scene_Battle.prototype.onSkillOk;
Scene_Battle.prototype.onSkillOk = function() {
    if (this._skillWindow.item().note.match(/<Extra Skill List:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        this.createExtraSkillListWindow(array);
    } else {
        Olivia.OctoBattle.Effects.___Scene_Battle_onSkillOk___.call(this);
    }
};

Scene_Battle.prototype.createExtraSkillListWindow = function(array) {
    if (!this._extraSkillWindow) {
        var x = this._skillWindow.x;
        var y = this._skillWindow.y;
        var width = this._skillWindow.width;
        var height = this._skillWindow.height;
        this._extraSkillWindow = new Window_BattleSkillExtra(x, y, width, height);
        this._extraSkillWindow.setHelpWindow(this._helpWindow);
        this._extraSkillWindow.setHandler('ok',     this.onExSkillOk.bind(this));
        this._extraSkillWindow.setHandler('cancel', this.onExSkillCancel.bind(this));
        this.addWindow(this._extraSkillWindow);
    }
    this._extraSkillWindow.setActor(BattleManager.actor());
    this._extraSkillWindow.setSkillList(array);
};

Scene_Battle.prototype.onExSkillOk = function() {
    this._extraSkillWindowProcess = true;
    this._skillWindowLastIndex = this._skillWindow.index();
    var originalSkillWindow = this._skillWindow;
    this._skillWindow = this._extraSkillWindow;
    Olivia.OctoBattle.Effects.___Scene_Battle_onSkillOk___.call(this);
    this._skillWindow = originalSkillWindow;
};

Scene_Battle.prototype.onExSkillCancel = function() {
    this._extraSkillWindowProcess = false;
    this._extraSkillWindow.hide();
    this._skillWindow.activate();
    this._helpWindow.show();
};

Scene_Battle.prototype.exSkillProcessReturn = function() {
    if (this._extraSkillWindowProcess) {
        this._extraSkillWindowProcess = false;
        this._skillWindow.deactivate();
        this._skillWindow.select(this._skillWindowLastIndex)
        this._extraSkillWindow.show();
        this._extraSkillWindow.activate();
    }
};

Olivia.OctoBattle.Effects.___Scene_Battle_onActorOk___ = Scene_Battle.prototype.onActorOk;
Scene_Battle.prototype.onActorOk = function() {
    this._extraSkillWindowProcess = false;
    Olivia.OctoBattle.Effects.___Scene_Battle_onActorOk___.call(this);
};

Olivia.OctoBattle.Effects.___Scene_Battle_onActorCancel___ = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    Olivia.OctoBattle.Effects.___Scene_Battle_onActorCancel___.call(this);
    this.exSkillProcessReturn();
};

Olivia.OctoBattle.Effects.___Scene_Battle_onEnemyOk___ = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
    this._extraSkillWindowProcess = false;
    Olivia.OctoBattle.Effects.___Scene_Battle_onEnemyOk___.call(this);
};

Olivia.OctoBattle.Effects.___Scene_Battle_onEnemyCancel___ = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    Olivia.OctoBattle.Effects.___Scene_Battle_onEnemyCancel___.call(this);
    this.exSkillProcessReturn();
};

//-----------------------------------------------------------------------------
// Sprite_Battler
//
// The superclass of Sprite_Actor and Sprite_Enemy.

Olivia.OctoBattle.Effects.___Sprite_Battler_setupDamagePopup___ = Sprite_Battler.prototype.setupDamagePopup;
Sprite_Battler.prototype.setupDamagePopup = function() {
    this.setupOctoSpecialEffectDamagePopup();
    Olivia.OctoBattle.Effects.___Sprite_Battler_setupDamagePopup___.call(this);
};

Sprite_Battler.prototype.setupOctoSpecialEffectDamagePopup = function() {
    if (this._battler.isDamagePopupRequested() && this._battler.isSpriteVisible()) {
        if (!!this._battler._result._breakPopup && Olivia.OctoBattle.BattleEffects.BreakPopupEnabled) {
            this.setupBreakDamagePopup();
        } else if (!!this._battler._result._weakPopup && Olivia.OctoBattle.BattleEffects.WeakPopupEnabled) {
            this.setupWeakDamagePopup();
        }
    }
};

Sprite_Battler.prototype.setupBreakDamagePopup = function() {
    var sprite = new Sprite_Damage();
    sprite.x = this.x - Math.round(this.width * Olivia.OctoBattle.BattleEffects.BreakCellXFactor);
    sprite.y = this.y - Math.round(this.height * Olivia.OctoBattle.BattleEffects.BreakCellYFactor);
    sprite.createBreak();
    BattleManager._spriteset.addChild(sprite);
    this._battler.clearResult();
};

Sprite_Battler.prototype.setupWeakDamagePopup = function() {
    var sprite = new Sprite_Damage();
    sprite.x = this.x - Math.round(this.width * Olivia.OctoBattle.BattleEffects.WeakCellXFactor);
    sprite.y = this.y - Math.round(this.height * Olivia.OctoBattle.BattleEffects.WeakCellYFactor);
    sprite.createWeak();
    BattleManager._spriteset.addChild(sprite);
    this._battler.clearResult();
};

//-----------------------------------------------------------------------------
// Sprite_Damage
//
// The sprite for displaying a popup damage.

Olivia.OctoBattle.Effects.___Sprite_Damage_setup___ = Sprite_Damage.prototype.setup;
Sprite_Damage.prototype.setup = function(target) {
    Olivia.OctoBattle.Effects.___Sprite_Damage_setup___.call(this, target);
    if (!!target.result().colorSettings) {
        this.setupColorEffects(target.result().colorSettings);
    }
};

Sprite_Damage.prototype.setupColorEffects = function(settings) {
    this._flashColor = [settings[0], settings[1], settings[2], settings[3]];
    this._flashDuration = 8888;
};

Sprite_Damage.prototype.createBreak = function() {
    var x = this.digitWidth() * Olivia.OctoBattle.BattleEffects.BreakCellX;
    var y = 4 * this.digitHeight();
    var w = this.digitWidth() * Olivia.OctoBattle.BattleEffects.BreakCellWidth;
    var h = this.digitHeight();
    var sprite = this.createChildSprite();
    sprite.setFrame(x, y, w, h);
    sprite._specialEffectPopup = true;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    if (Imported.YEP_BattleEngineCore) {
        this._duration = Yanfly.Param.BECPopupDur;
    }
    this._moveXBase = Olivia.OctoBattle.BattleEffects.BreakMoveXBase;
    this._moveXRate = Olivia.OctoBattle.BattleEffects.BreakMoveXRate;
    this._moveYBase = Olivia.OctoBattle.BattleEffects.BreakMoveYBase;
    this._moveYRate = Olivia.OctoBattle.BattleEffects.BreakMoveYRate;
};

Sprite_Damage.prototype.createWeak = function() {
    var x = this.digitWidth() * Olivia.OctoBattle.BattleEffects.WeakCellX;
    var y = 4 * this.digitHeight();
    var w = this.digitWidth() * Olivia.OctoBattle.BattleEffects.WeakCellWidth;
    var h = this.digitHeight();
    var sprite = this.createChildSprite();
    sprite.setFrame(x, y, w, h);
    sprite._specialEffectPopup = true;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    if (Imported.YEP_BattleEngineCore) {
        this._duration = Yanfly.Param.BECPopupDur;
    }
    this._moveXBase = Olivia.OctoBattle.BattleEffects.WeakMoveXBase;
    this._moveXRate = Olivia.OctoBattle.BattleEffects.WeakMoveXRate;
    this._moveYBase = Olivia.OctoBattle.BattleEffects.WeakMoveYBase;
    this._moveYRate = Olivia.OctoBattle.BattleEffects.WeakMoveYRate;
};

Olivia.OctoBattle.Effects.___Sprite_Damage_updateChild___ = Sprite_Damage.prototype.updateChild;
Sprite_Damage.prototype.updateChild = function(sprite) {
    if (sprite._specialEffectPopup) {
        this.updateBreakPopup(sprite);
    } else {
        Olivia.OctoBattle.Effects.___Sprite_Damage_updateChild___.call(this, sprite);
    }
};

Sprite_Damage.prototype.updateBreakPopup = function(sprite) {
    this._duration--;
    this.x += this._moveXBase;
    this._moveXBase *= this._moveXRate;
    this.y += this._moveYBase;
    this._moveYBase *= this._moveYRate;
};

//-----------------------------------------------------------------------------
// Window_BattleSkill
//
// The window for selecting a skill to use on the battle screen.

function Window_BattleSkillExtra() {
    this.initialize.apply(this, arguments);
}

Window_BattleSkillExtra.prototype = Object.create(Window_BattleSkill.prototype);
Window_BattleSkillExtra.prototype.constructor = Window_BattleSkillExtra;

Window_BattleSkillExtra.prototype.initialize = function(x, y, width, height) {
    this._skillList = [];
    Window_BattleSkill.prototype.initialize.call(this, x, y, width, height);
};

Window_BattleSkillExtra.prototype.setSkillList = function(array) {
    this._skillList = array;
    this.refresh();
    this.activate();
    this.updatePosition();
    this.show();
};

Window_BattleSkillExtra.prototype.makeItemList = function() {
    this._data = [];
    if (this._skillList && !!this._actor) {
        var skills = this._actor.skills();
        for (var i = 0; i < this._skillList.length; i++) {
            var skill = $dataSkills[this._skillList[i]];
            if (!!skill && skills.contains(skill)) {
                this._data.push(skill);
            }
        }
    }
};

Window_BattleSkillExtra.prototype.updatePosition = function() {
    this._positionXCorrection = 32;
    this._positionYCorrection = 32;
    Window_ActorCommand.prototype.updatePosition.call(this);
};

//-----------------------------------------------------------------------------
// Window_ActorCommand
//
// The window for selecting an actor's action on the battle screen.

Olivia.OctoBattle.Effects.___Window_ActorCommand_addItemCommand___ = Window_ActorCommand.prototype.addItemCommand;
Window_ActorCommand.prototype.addItemCommand = function() {
    Olivia.OctoBattle.Effects.___Window_ActorCommand_addItemCommand___.call(this);
    if (!!this._actor) {
        this.applyItemSeal();
    }
};

Window_ActorCommand.prototype.applyItemSeal = function() {
    var index = this.findSymbol('item');
    if (index >= 0) {
        var states = this._actor.states();
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (!!state && state.note.match(/<Item Seal>/i)) {
                this._list[index].enabled = false;
                return;
            }
        }
    }
};

//=============================================================================
} // End Battle Effects
//=============================================================================

//=============================================================================
// Order Turn Battle
//
// 1. Immediate action after selecting a command

if (Imported.YEP_BattleEngineCore && Olivia.OctoBattle.OTB.Enabled) {

Olivia.OctoBattle.Battle = Olivia.OctoBattle.Battle || {};

//-----------------------------------------------------------------------------
// Array
//
// Array functions

Object.defineProperties(Array.prototype, {
    getAllIndices: {
        enumerable: false,
        value: function(value) {
            var array = [];
            for (var i = 0; i < this.length; i++) {
                if (this[i] === value) {
                    array.push(i);
                }
            }
            return array;
        }
    }
});

//-----------------------------------------------------------------------------
// Bitmap
//
// Draw Functions

Bitmap.prototype.drawOutlinePolygon = function(points, color1, color2, weight, opacity, stroke) {
    var context = this._context;
    context.save();
    context.beginPath();
    context.moveTo(points[0], points[1]);
    for (var i = 2; i < points.length; i += 2) {
        context.lineTo(points[i], points[i + 1]);
    }
    context.lineTo(points[0], points[1]);
    context.strokeStyle = color1;
    context.lineWidth = weight;
    if (stroke) {
        context.stroke();
    }
    context.globalAlpha = opacity;
    context.fillStyle = color2;
    context.fill();
    context.globalAlpha = 1;
    context.restore();
    this._setDirty();
};

//-----------------------------------------------------------------------------
// Plugin Parameters
//
// Change some plugin parameters to fit the game better

Yanfly.Param.BECStartActCmd = true;

if (Olivia.OctoBattle.OTB.ForceBattleSystem) {
    Yanfly.Param.BECSystem = 'otb';
}

Yanfly.Param.PartyShowBattle = false;
Yanfly.Param.PartyEnBattle = false;

//-----------------------------------------------------------------------------
// DataManager
//
// The static class that manages the database and game objects.

DataManager.otbBuffDebuffAgiConvert = function(item) {
    if (BattleManager.isOTB() && Olivia.OctoBattle.OTB.BuffDebuffAgiConvert && !!item && !item._otbBuffDebuffAgiConvert) {
        item._otbBuffDebuffAgiConvert = true;
        for (var i = 0; i < item.effects.length; i++) {
            var effect = item.effects[i];
            if (effect.code === Game_Action.EFFECT_ADD_BUFF && effect.dataId === 6) {
                item.note += '<OTB Target Next Turn: +1>';
            }
            if (effect.code === Game_Action.EFFECT_ADD_BUFF && effect.dataId === 6) {
                item.note += '<OTB Target Next Turn: -1>';
            }
        }
    }
};

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages battle progress.

Olivia.OctoBattle.Battle.___BattleManager_initMembers___ = BattleManager.initMembers;
BattleManager.initMembers = function() {
    Olivia.OctoBattle.Battle.___BattleManager_initMembers___.call(this);
    if (this.isOTB()) {
        this._nextTurnActionBattlers = []
        this._createdFirstTurnActionOrders = false;
        this._requestCurrentTurnUpdate = false;
        this._requestCurrentTurnUpdateInstantly = false;
        this._requestNextTurnUpdate = false;
        this._requestNextTurnUpdateInstantly = false;
        this._requestShiftTurnOrder = false
        this._requestClearUnableBattlers = false;
        this._requestNextTurnPreview = null;
        this._requestNextTurnPreviewClear = false;
        this._requestCurrentTurnSpriteReorder = false;
        this._requestNextTurnSpriteReorder = false;
        this._hideOTBTurnDisplay = false;
    }
};

Olivia.OctoBattle.Battle.___BattleManager_isDTB___ = BattleManager.isDTB;
BattleManager.isDTB = function() {
    if (this.isOTB()) {
        return false;
    } else {
        return Olivia.OctoBattle.Battle.___BattleManager_isDTB___.call(this);
    }
};

BattleManager.isOTB = function() {
    if (Olivia.OctoBattle.OTB.ForceBattleSystem) {
        return true;
    } else {
        return this.isBattleSystem('otb');
    }
};

Olivia.OctoBattle.Battle.___BattleManager_isTurnBased___ = BattleManager.isTurnBased;
BattleManager.isTurnBased = function() {
    if (this.isOTB()) {
        return true;
    } else {
        return Olivia.OctoBattle.Battle.___BattleManager_isTurnBased___.call(this);
    }
};

BattleManager.otbDisplayWindow = function() {
    return SceneManager._scene._otbDisplayWindow;
};

Olivia.OctoBattle.Battle.___BattleManager_endBattle___ = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    Olivia.OctoBattle.Battle.___BattleManager_endBattle___.call(this, result);
    this._hideOTBTurnDisplay = true;
};

Olivia.OctoBattle.Battle.___BattleManager_startInput___ = BattleManager.startInput;
BattleManager.startInput = function() {
    Olivia.OctoBattle.Battle.___BattleManager_startInput___.call(this);
    if (this.isOTB() && this._phase !== 'turn') {
        this.startTurn();
    }
};

Olivia.OctoBattle.Battle.___BattleManager_startTurn___ = BattleManager.startTurn;
BattleManager.startTurn = function() {
    if (this._otbFailedEscape) {
        this.otbFailedEscape();
    } else {
        Olivia.OctoBattle.Battle.___BattleManager_startTurn___.call(this);
    }
};

BattleManager.otbFailedEscape = function() {
    this._otbFailedEscape = false;
    $gameParty.requestMotionRefresh();
};

Olivia.OctoBattle.Battle.___BattleManager_processTurn___ = BattleManager.processTurn;
BattleManager.processTurn = function() {
  if (this.isOTB() && this._subject.isActor()) {
      this.startOTBInput();
  } else {
      Olivia.OctoBattle.Battle.___BattleManager_processTurn___.call(this);
  }
};

BattleManager.startOTBInput = function() {
      this._phase = 'input';
      var battler = this._subject;
      if (!!battler) {
          BattleManager.changeActor(battler.index(), 'undecided');
          if (!battler.canInput()) {
              battler.makeActions();
              this.startAction();
          }
      }
};

Olivia.OctoBattle.Battle.___BattleManager_getNextSubject___ = BattleManager.getNextSubject;
BattleManager.getNextSubject = function() {
    if (this.isOTB()) {
        this._subject = this.getNextSubjectOTB();
        if (!!this._subject) {
            this._subject.makeActions();
        }
        this.otbDisplayWindow().updateShiftOrder();
        return this._subject;
    } else {
        return Olivia.OctoBattle.Battle.___BattleManager_getNextSubject___.call(this);
    }
};

BattleManager.getNextSubjectOTB = function() {
    for (;;) {
        var battler = this._actionBattlers.shift();
        if (!battler) {
            return null;
        }
        if (battler.isBattleMember() && battler.isAlive()) {
            return battler;
        }
    }
};

Olivia.OctoBattle.Battle.___BattleManager_selectPreviousCommand___ = BattleManager.selectPreviousCommand;
BattleManager.selectPreviousCommand = function() {
    if (this.isOTB()) {
        this._activeOTBActor = this._actorIndex;
        this._subject = null;
        this.changeActor(-1, 'undecided');
    } else {
        Olivia.OctoBattle.Battle.___BattleManager_selectPreviousCommand___.call(this);
    }
};

Olivia.OctoBattle.Battle.___BattleManager_displayEscapeFailureMessage___ = BattleManager.displayEscapeFailureMessage;
BattleManager.displayEscapeFailureMessage = function() {
    Olivia.OctoBattle.Battle.___BattleManager_displayEscapeFailureMessage___.call(this);
    if (this.isOTB()) {
        this.endAction();
        this._otbFailedEscape = true;
    }
};

BattleManager.otbSetSubject = function() {
    BattleManager.changeActor(this._activeOTBActor, 'undecided');
    this._subject = this.actor();
};

Olivia.OctoBattle.Battle.___BattleManager_selectNextCommand___ = BattleManager.selectNextCommand;
BattleManager.selectNextCommand = function() {
    if (this.isOTB()) {
        if (this._subject) {
            this.startAction();
        } else {
            this.otbSetSubject();
            this.startOTBInput();
        }
    } else {
        Olivia.OctoBattle.Battle.___BattleManager_selectNextCommand___.call(this);
    }
};

Olivia.OctoBattle.Battle.___BattleManager_startAction___ = BattleManager.startAction;
BattleManager.startAction = function() {
    if (Imported.YEP_InstantCast) {
        this.detectOtbInstantCast();
    }
    Olivia.OctoBattle.Battle.___BattleManager_startAction___.call(this);
};

if (Imported.YEP_InstantCast) { // Bypass need to order the Plugin Manager List

Olivia.OctoBattle.Battle.___InstantBattleManager_startAction___ = BattleManager.startAction;
BattleManager.startAction = function() {
    this._startedInstantCasting = true;
    Olivia.OctoBattle.Battle.___InstantBattleManager_startAction___.call(this);
};

}

Olivia.OctoBattle.Battle.___BattleManager_endAction___ = BattleManager.endAction;
BattleManager.endAction = function() {
    if (this.isOTB()) {
        this.endOTBAction();
    } else {
        Olivia.OctoBattle.Battle.___BattleManager_endAction___.call(this);
    }
};

if (Imported.YEP_InstantCast) { // Bypass need to order the Plugin Manager List

Olivia.OctoBattle.Battle.___InstantBattleManager_endAction___ = BattleManager.endAction;
BattleManager.endAction = function() {
    if (this.isOTB() && this._instantCasting) {
        this.endActorInstantCast();
    } else {
        Olivia.OctoBattle.Battle.___InstantBattleManager_endAction___.call(this);
    }
    this._startedInstantCasting = false;
};

}

BattleManager.endOTBAction = function() {
    this._phase = 'turn';
    if (this._otbInstantCast) {
        this._otbInstantCast = false;
        if (this._subject.isEnemy()) {
            this._actionBattlers.unshift(this._subject);
            this._subject.makeActions();
        }
        return Yanfly.BEC.BattleManager_endAction.call(this);
    }
    if (this._subject) {
        this._subject.spriteStepBack();
        if (Imported.YEP_BuffsStatesCore) {
            this._subject.onActionEndStateEffects();
        }
        this._subject.onAllActionsEnd();
        this._subject.removeCurrentAction();
    }
    if (this._processingForcedAction) {
        this._phase = this._preForcePhase;
        this._processingForcedAction = false;
    }
    if (this.loadPreForceActionSettings()) {
        return;
    }
    this.clearActor();
    this._subject = null;
    this.otbClearActionOrdersOfUnableBattlers();
    Yanfly.BEC.BattleManager_endAction.call(this);
};

BattleManager.otbClearActionOrdersOfUnableBattlers = function() {
    var changes1 = this.otbClearActionOrdersOfUnableBattlersArray(this._actionBattlers);
    var changes2 = this.otbClearActionOrdersOfUnableBattlersArray(this._nextTurnActionBattlers);
    this._requestClearUnableBattlers = changes1 || changes2;
};

BattleManager.otbClearActionOrdersOfUnableBattlersArray = function(array) {
    var changesMade = false;
    for (var i = 0; i < array.length; i++) {
        var battler = array[i];
        if (!!battler) {
            if (this.otbCheckIfBattlerIsUnable(battler, array)) {
                array.splice(i, 1);
                i--;
                this._requestCurrentTurnUpdate = true;
                this._requestNextTurnUpdate = true;
                changesMade = true;
            }
        }
    }
    return changesMade;
};

Olivia.OctoBattle.Battle.___BattleManager_forceAction___ = BattleManager.forceAction;
BattleManager.forceAction = function(battler) {
    if (this.isOTB()) {
        if ($gameTroop.turnCount() > 0) {
            battler._otbTimesActedThisTurn -= 1;
            this.otbForceAction(battler);
        } else if ($gameTemp.isPlaytest()) {
            var message = 'Forced actions do not work on turn 0. Please use turn 1.';
            SceneManager.stop();
            Graphics.printError('Battle System OTB Error', message);
        }
    } else {
        Olivia.OctoBattle.Battle.___BattleManager_forceAction___.call(this, battler);
    }
};

BattleManager.otbForceAction = function(battler) {
    if (this._subject) this._subject.clearResult();
    this.createForceActionFailSafes();
    this.savePreForceActionSettings();
    this._actionForcedBattler = battler;
};

BattleManager.otbCheckIfBattlerIsUnable = function(battler, array) {
    if (battler.isDead() || battler.isHidden()) {
        return true;
    } else if (!battler.canMove() && array === this._actionBattlers) {
        return true;
    } else if (!this.allBattleMembers().contains(battler)) {
        return true;
    } else if (!battler.canMove() && array === this._nextTurnActionBattlers) {
        var tempBattler = JsonEx.makeDeepCopy(battler);
        tempBattler._tempBattler = true;
        tempBattler.updateStateTurns();
        tempBattler.refresh();
        return !tempBattler.canMove();
    } else {
        return false;
    }
};

BattleManager.otbInsertRevivalActionOrders = function(battler) {
    battler._otbTimesActedThisTurn = battler._otbTimesActedThisTurn || 0;
    if (Olivia.OctoBattle.OTB.RemoveRestrictCurrent && battler.makeActionTimes() > battler._otbTimesActedThisTurn) {
        this.otbInsertRevivalActionOrder(battler, this._actionBattlers);
    }
    if (Olivia.OctoBattle.OTB.RemoveRestrictNext) {
        this.otbInsertRevivalActionOrder(battler, this._nextTurnActionBattlers);
    }
};

BattleManager.otbInsertRevivalActionOrder = function(battler, array) {
    if (!array.contains(battler)) {
        if (Olivia.OctoBattle.OTB.AddedActionTimes) {
            battler._otbTimesActedThisTurn = battler._otbTimesActedThisTurn || 0;
            var times = Math.max(battler.makeActionTimes() - battler._otbTimesActedThisTurn, 1);
        } else {
            var times = 1;
        }
        while (times--) {
            array.push(battler);
        }
        this.otbDisplayWindow().createReturnedBattlerSprite(battler, array === this._actionBattlers);
    }
};

BattleManager.otbInsertActionOrderAtEnd = function(battler, array, times) {
    while (times--) {
        array.push(battler);
        this.otbDisplayWindow().createBattlerSpriteAtEnd(battler, array === this._actionBattlers);
    }
};

BattleManager.detectOtbInstantCast = function() {
    this._otbInstantCast = false;
    if (!this.isOTB()) {
        return;
    } else if (!this._subject) {
        return;
    } else if (!this._subject.currentAction()) {
        return;
    } else if (!this._subject.currentAction().item()) {
        return;
    } else {
        var item = this._subject.currentAction().item();
        this._otbInstantCast = this._subject.isInstantCast(item);
    }
};

BattleManager.getSpritePriority = function() {
    if (this._subject && this._subject.isActor()) {
        return 1;
    } else if (this._subject && this._subject.isEnemy()) {
        return 2;
    } else {
        return 0;
    } 
};

Olivia.OctoBattle.Battle.___BattleManager_makeActionOrders___ = BattleManager.makeActionOrders;
BattleManager.makeActionOrders = function() {
    if (this.isOTB()) {
        this.makeActionOrdersOTB();
        this.otbDisplayWindow().createNewSprites();
    } else {
        Olivia.OctoBattle.Battle.___BattleManager_makeActionOrders___.call(this);
    }
};

BattleManager.makeActionOrdersOTB = function() {
    if (this._createdFirstTurnActionOrders) {
        this._actionBattlers = this._nextTurnActionBattlers;
    }
    this._nextTurnActionBattlers = [];
    this._nextTurnActionBattlers = this._nextTurnActionBattlers.concat($gameParty.aliveMembers());
    this._nextTurnActionBattlers = this._nextTurnActionBattlers.concat($gameTroop.aliveMembers());
    this._nextTurnActionBattlers.forEach(function(battler) {
        battler.makeSpeed();
    });
    this._nextTurnActionBattlers.sort(function(a, b) {
        return b.speed() - a.speed();
    });
    if (!this._createdFirstTurnActionOrders) {
        Olivia.OctoBattle.Battle.___BattleManager_makeActionOrders___.call(this);
    }
    if (!this._createdFirstTurnActionOrders) {
        this.otbActionTimesModification(this._actionBattlers);
    }
    this.otbClearActionOrdersOfUnableBattlers();
    this.otbActionTimesModification(this._nextTurnActionBattlers);
    this._createdFirstTurnActionOrders = true;
};

BattleManager.otbActionTimesModification = function(array) {
    if (Olivia.OctoBattle.OTB.AddedActionTimes) {
        var battlers = this.allBattleMembers();
        for (var i = 0; i < battlers.length; i++) {
            var battler = battlers[i];
            if (!!battler && array.contains(battler)) {
                var minimumIndex = array.indexOf(battler);
                var actionTimes = battler.makeActionTimes() - 1;
                while (actionTimes--) {
                    if (Olivia.OctoBattle.OTB.ActionTimeOrderRandomize && battler.speed() !== Infinity) {
                        var targetIndex = Math.randomInt(array.length - minimumIndex) + minimumIndex;
                    } else {
                        var targetIndex = minimumIndex;
                    }
                    array.splice(targetIndex, 0, battler);
                }
            }
        }
    }
};

BattleManager.otbNextTurnChange = function(battler, change, currentTurn) {
    if (currentTurn) {
        var targetArray = this._actionBattlers;
        this._requestCurrentTurnUpdate = true;
        this._requestCurrentTurnSpriteReorder = true;
    } else {
        var targetArray = this._nextTurnActionBattlers;
        this._requestNextTurnUpdate = true;
        this._requestNextTurnSpriteReorder = true;
    }
    if (targetArray.contains(battler)) {
        var indices = targetArray.getAllIndices(battler);
        for (var i = indices.length - 1; i >= 0; i--) {
            targetArray.splice(indices[i], 1);
        }
        var minimum = this.otbInfinityClamp(targetArray);
        for (var i = 0; i < indices.length; i++) {
            var index = (indices[i] - change).clamp(minimum, targetArray.length);
            targetArray.splice(index, 0, battler);
        }
    }
};

BattleManager.otbInfinityClamp = function(sourceArray) {
    if (Olivia.OctoBattle.OTB.StunWakeUpClamp) {
        for (var i = 0; i < sourceArray.length; i++) {
            var battler = sourceArray[i];
            if (battler.speed() !== Infinity) {
                return i;
            }
        }
        return i;
    } else {
        return 0;
    }
};

BattleManager.otbAddBattler = function(battler) {
    if (!!battler && this.allBattleMembers().contains(battler)) {
        this.otbInsertActionOrderAtEnd(battler, this._actionBattlers);
        this.otbInsertActionOrderAtEnd(battler, this._nextTurnActionBattlers);
    }
};

BattleManager.otbRemoveBattler = function(battler) {
    this.otbClearActionOrdersOfUnableBattlers();
};

//-----------------------------------------------------------------------------
// Game_Action
//
// The game object class for a battle action.

Olivia.OctoBattle.Battle.___Game_Action_speed___ = Game_Action.prototype.speed;
Game_Action.prototype.speed = function() {
    if (BattleManager.isOTB()) {
        return this.speedOTB();
    } else {
        return Olivia.OctoBattle.Battle.___Game_Action_speed___.call(this);
    }
};

Game_Action.prototype.speedOTB = function() {
    if (Olivia.OctoBattle.OTB.StaticAgiCalculation) {
        var speed = this.subject().agi;
    } else {
        var agi = this.subject().agi;
        var speed = agi + Math.randomInt(Math.floor(5 + agi / 4));
    }
    return speed;
};

Olivia.OctoBattle.Battle.___Game_Action_applyItemUserEffect___ = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Olivia.OctoBattle.Battle.___Game_Action_applyItemUserEffect___.call(this, target);
    if (BattleManager.isOTB() && !!this.item()) {
        DataManager.otbBuffDebuffAgiConvert(this.item());
        this.applyOTBEffect(target);
        this.applyOTBAddAction(target);
    }
};

Game_Action.prototype.applyOTBEffect = function(target) {
    if (target.speed() !== Infinity) {
        var currentTurnChange = 0;
        var nextTurnChange = 0;
        if (this.item().note.match(/<OTB Target Follow Turn: ([\+\-]\d+)>/i)) {
            if (BattleManager._actionBattlers.contains(target)) {
                currentTurnChange += parseInt(RegExp.$1);
            } else {
                nextTurnChange += parseInt(RegExp.$1);
            }
        }
        if (this.item().note.match(/<OTB Target Current Turn: ([\+\-]\d+)>/i)) {
            currentTurnChange += parseInt(RegExp.$1);
        }
        if (this.item().note.match(/<OTB Target Next Turn: ([\+\-]\d+)>/i)) {
            nextTurnChange += parseInt(RegExp.$1);
        }
        if (currentTurnChange !== 0) {
            BattleManager.otbNextTurnChange(target, currentTurnChange, true);
        }
        if (nextTurnChange !== 0) {
            BattleManager.otbNextTurnChange(target, nextTurnChange, false);
        }
    }
};

Game_Action.prototype.applyOTBAddAction = function(target) {
    if (this.item().note.match(/<OTB Target Add Current Turn (?:Action|Actions): (\d+)>/i)) {
        var times = parseInt(RegExp.$1);
        target.otbAddActionTimes(times, true);
    }
    if (this.item().note.match(/<OTB Target Add Next Turn (?:Action|Actions): (\d+)>/i)) {
        var times = parseInt(RegExp.$1);
        target.otbAddActionTimes(times, false);
    }
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.

Olivia.OctoBattle.Battle.___Game_BattlerBase_paySkillCost___ = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Olivia.OctoBattle.Battle.___Game_BattlerBase_paySkillCost___.call(this, skill);
    if ($gameParty.inBattle() && BattleManager.isOTB()) {
        this.otbTurnShiftCost();
        this.otbAddActionCost();
    }
};

Game_BattlerBase.prototype.otbTurnShiftCost = function() {
    var nextTurnChange = 0;
    if (!!this.currentAction() && this.currentAction().item()) {
        var item = this.currentAction().item();
        if (Olivia.OctoBattle.OTB.ActionSpeedConvert) {
            nextTurnChange += item.speed;
        }
        if (item.note.match(/<OTB User Next Turn: ([\+\-]\d+)>/i)) {
            nextTurnChange += parseInt(RegExp.$1);
        }
    }
    if (nextTurnChange !== 0) {
        BattleManager.otbNextTurnChange(this, nextTurnChange, false);
    }
};

Game_BattlerBase.prototype.otbAddActionCost = function() {
    if (!!this.currentAction() && this.currentAction().item()) {
        var item = this.currentAction().item();
        if (item.note.match(/<OTB User Add Current Turn (?:Action|Actions): (\d+)>/i)) {
            var times = parseInt(RegExp.$1);
            this.otbAddActionTimes(times, true);
        }
        if (item.note.match(/<OTB User Add Next Turn (?:Action|Actions): (\d+)>/i)) {
            var times = parseInt(RegExp.$1);
            this.otbAddActionTimes(times, false);
        }
    }
};

Olivia.OctoBattle.Battle.___Game_BattlerBase_hide___ = Game_BattlerBase.prototype.hide;
Game_BattlerBase.prototype.hide = function() {
    var isHidden = this._hidden;
    Olivia.OctoBattle.Battle.___Game_BattlerBase_hide___.call(this);
    if (BattleManager.isOTB() && isHidden !== this._hidden && !isHidden) {
        BattleManager.otbRemoveBattler(this);
    }
};

Olivia.OctoBattle.Battle.___Game_BattlerBase_appear___ = Game_BattlerBase.prototype.appear;
Game_BattlerBase.prototype.appear = function() {
    var isHidden = this._hidden;
    Olivia.OctoBattle.Battle.___Game_BattlerBase_appear___.call(this);
    if (BattleManager.isOTB() && isHidden !== this._hidden && isHidden) {
        BattleManager.otbAddBattler(this);
    }
};

Game_BattlerBase.prototype.otbInstanceName = function() {
    if (this.isActor()) {
        return 'Actor ' + this.actorId();
    } else {
        return 'Enemy ' + this.index();
    }
};
//-----------------------------------------------------------------------------
// Game_Battler
//
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.

Olivia.OctoBattle.Battle.___Game_Battler_onBattleStart___ = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    if (BattleManager.isOTB()) {
        this._otbTimesActedThisTurn = 0;
    }
    Olivia.OctoBattle.Battle.___Game_Battler_onBattleStart___.call(this);
};

Olivia.OctoBattle.Battle.___Game_Battler_onBattleEnd___ = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    if (BattleManager.isOTB()) {
        this._otbTimesActedThisTurn = 0;
    }
    Olivia.OctoBattle.Battle.___Game_Battler_onBattleEnd___.call(this);
};

Olivia.OctoBattle.Battle.___Game_Battler_performActionEnd___ = Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    Olivia.OctoBattle.Battle.___Game_Battler_performActionEnd___.call(this);
    this._otbTimesActedThisTurn = this._otbTimesActedThisTurn || 0;
    this._otbTimesActedThisTurn += 1;
};

Olivia.OctoBattle.Battle.___Game_Battler_onTurnEnd___ = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
    if (BattleManager.isOTB()) {
        this._otbTimesActedThisTurn = 0;
        var setting = Olivia.OctoBattle.OTB.RemoveRestrictCurrent;
        Olivia.OctoBattle.OTB.RemoveRestrictCurrent = false;
    }
    Olivia.OctoBattle.Battle.___Game_Battler_onTurnEnd___.call(this);
    if (BattleManager.isOTB()) {
        Olivia.OctoBattle.OTB.RemoveRestrictCurrent = setting;
    }
};

if (Imported.YEP_BuffsStatesCore) {

Olivia.OctoBattle.Battle.___Game_Battler_customEffectEval___ = Game_Battler.prototype.customEffectEval;
Game_Battler.prototype.customEffectEval = function(stateId, type) {
    if (!this._tempBattler) {
        Olivia.OctoBattle.Battle.___Game_Battler_customEffectEval___.call(this, stateId, type);
    }
};

Olivia.OctoBattle.Battle.___Game_Action_customEffectEval___ = Game_Action.prototype.customEffectEval;
Game_Action.prototype.customEffectEval = function(target, stateId, type, side, value) {
    if (this._tempBattler || target._tempBattler) {
        return value;
    } else {
        return Olivia.OctoBattle.Battle.___Game_Action_customEffectEval___.call(this, target, stateId, type, side, value);
    }
};

}

Game_Battler.prototype.otbAddActionTimes = function(times, currentTurn) {
    if (Olivia.OctoBattle.OTB.AddedActionTimes) {
        var times = Math.max(1, times);
        if (currentTurn) {
            var array = BattleManager._actionBattlers;
        } else {
            var array = BattleManager._nextTurnActionBattlers;
        }
        BattleManager.otbInsertActionOrderAtEnd(this, array, times);
    }
};

Olivia.OctoBattle.Battle.___Game_Battler_addState___ = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
    var canMove = this.canMove();
    var actionTimes = this.makeActionTimes();
    Olivia.OctoBattle.Battle.___Game_Battler_addState___.call(this, stateId);
    if ($gameParty.inBattle() && BattleManager.isOTB()) {
        if (canMove && !this.canMove()) {
            BattleManager.otbClearActionOrdersOfUnableBattlers();
        } else if (this.makeActionTimes() > actionTimes) {
            var times = this.makeActionTimes() > actionTimes;
            this.otbAddActionTimes(times, true);
            this.otbAddActionTimes(times, false);
        }
    }
};

Olivia.OctoBattle.Battle.___Game_Battler_removeState___ = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    var canMove = this.canMove();
    var actionTimes = this.makeActionTimes();
    Olivia.OctoBattle.Battle.___Game_Battler_removeState___.call(this, stateId);
    if (!this._tempBattler && $gameParty.inBattle() && BattleManager.isOTB()) {
        if (!canMove && this.canMove()) {
            BattleManager.otbInsertRevivalActionOrders(this);
        } else if (this.makeActionTimes() > actionTimes) {
            var times = this.makeActionTimes() > actionTimes;
            this.otbAddActionTimes(times, true);
            this.otbAddActionTimes(times, false);
        }
    }
};

Olivia.OctoBattle.Battle.___Game_Battler_makeSpeed___ = Game_Battler.prototype.makeSpeed;
Game_Battler.prototype.makeSpeed = function() {
    if (!Olivia.OctoBattle.OTB.StunWakeUpFirst && this._actions.length <= 0) {
        this._actions.push(new Game_Action(this));
    }
    Olivia.OctoBattle.Battle.___Game_Battler_makeSpeed___.call(this);
};

Olivia.OctoBattle.Battle.___Game_Battler_isUndecided___ = Game_Battler.prototype.isUndecided;
Game_Battler.prototype.isUndecided = function() {
    if (BattleManager.isOTB()) {
        return true;
    } else {
        return Olivia.OctoBattle.Battle.___Game_Battler_isUndecided___.call(this);
    }
};

Olivia.OctoBattle.Battle.___Game_Battler_consumeItem___ = Game_Battler.prototype.consumeItem;
Game_Battler.prototype.consumeItem = function(item) {
    Olivia.OctoBattle.Battle.___Game_Battler_consumeItem___.call(this, item);
    if ($gameParty.inBattle() && BattleManager.isOTB()) {
        this.otbTurnShiftCost();
        this.otbAddActionCost();
    }
};

//-----------------------------------------------------------------------------
// Game_Party
//
// The game object class for the party. Information such as gold and items is
// included.

Olivia.OctoBattle.Battle.___Game_Party_addActor___ = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
    var inParty = this._actors.contains(actorId);
    Olivia.OctoBattle.Battle.___Game_Party_addActor___.call(this, actorId);
    if (BattleManager.isOTB() && $gameParty.inBattle() && !inParty) {
        var actor = $gameActors.actor(actorId);
        if (!!actor) {
            BattleManager.otbAddBattler(actor);
        }
    }
};

Olivia.OctoBattle.Battle.___Game_Party_removeActor___ = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
    var inParty = this._actors.contains(actorId);
    Olivia.OctoBattle.Battle.___Game_Party_removeActor___.call(this, actorId);
    if (BattleManager.isOTB() && $gameParty.inBattle() && inParty) {
        var actor = $gameActors.actor(actorId);
        if (!!actor) {
            BattleManager.otbRemoveBattler(actor);
        }
    }
};

//-----------------------------------------------------------------------------
// Scene_Battle
//
// The scene class of the battle screen.

Olivia.OctoBattle.Battle.___Scene_Battle_createHelpWindow___ = Scene_Battle.prototype.createHelpWindow;
Scene_Battle.prototype.createHelpWindow = function() {
    Olivia.OctoBattle.Battle.___Scene_Battle_createHelpWindow___.call(this);
    if (BattleManager.isOTB()) {
        this.createOTBDisplayWindow();
        this._helpWindow.y = Olivia.OctoBattle.OTB.HelpWindowNewY;
        this._logWindow.y = Olivia.OctoBattle.OTB.LogWindowNewY;
    }
};

Scene_Battle.prototype.createOTBDisplayWindow = function() {
    this._otbDisplayWindow = new Window_OTBDisplay(this._helpWindow);
    this.addWindow(this._otbDisplayWindow);
};

Olivia.OctoBattle.Battle.___Scene_Battle_createActorCommandWindow___ = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    Olivia.OctoBattle.Battle.___Scene_Battle_createActorCommandWindow___.call(this);
    if (BattleManager.isOTB()) {
        this._actorCommandWindow.setHandler('escape', this.commandEscape.bind(this));
        if (!Olivia.OctoBattle.OTB.EnablePartyWindow) {
            this._actorCommandWindow._handlers['cancel'] = undefined;
        }
    }
};

Olivia.OctoBattle.Battle.___Scene_Battle_commandEscape___ = Scene_Battle.prototype.commandEscape;
Scene_Battle.prototype.commandEscape = function() {
    if (BattleManager.isOTB()) {
        BattleManager.processEscape();
    } else {
        Olivia.OctoBattle.Battle.___Scene_Battle_commandEscape___.call(this);
    }
};

if (Imported.YEP_PartySystem && Imported.YEP_X_ActorPartySwitch) {

Olivia.OctoBattle.Battle.___Scene_Battle_postPartySwitch___ = Scene_Battle.prototype.postPartySwitch;
Scene_Battle.prototype.postPartySwitch = function(index, swapOut, swapIn) {
    Olivia.OctoBattle.Battle.___Scene_Battle_postPartySwitch___.call(this, index, swapOut, swapIn);
    if (BattleManager.isOTB()) {
        this.otbPostPartySwitch(index, swapOut, swapIn);
    }
};

Scene_Battle.prototype.otbPostPartySwitch = function(index, swapOut, swapIn) {
    BattleManager._subject = swapIn;
    BattleManager.otbDisplayWindow()._subjectSprite.setBattler(swapIn);
    BattleManager.otbRemoveBattler(swapOut);
    var times = Math.max(0, swapIn.makeActionTimes() - swapIn._otbTimesActedThisTurn - 1);
    if (times > 0) {
        swapIn.otbAddActionTimes(times, true);
    }
    swapIn.otbAddActionTimes(swapIn.makeActionTimes(), false);
    this._helpWindow.setBPSubject(BattleManager.actor());
};

}

//-----------------------------------------------------------------------------
// Spriteset_Battle
//
// The set of sprites on the battle screen.

Spriteset_Battle.prototype.updateZCoordinates = function() {
    if (Imported.YEP_ImprovedBattlebacks) {
        this.updateBattlebackGroupRemove();
    } else {
        this._battleField.removeChild(this._back1Sprite);
        this._battleField.removeChild(this._back2Sprite);
    }
    if (BattleManager.getSpritePriority() !== 0){
        this._battleField.children.sort(this.battleFieldDepthCompare);
    }
    if (Imported.YEP_ImprovedBattlebacks) {
        this.updateBattlebackGroupAdd();
    } else {
        this._battleField.addChildAt(this._back2Sprite, 0);
        this._battleField.addChildAt(this._back1Sprite, 0);
    }
};

Spriteset_Battle.prototype.battleFieldDepthCompare = function(a, b) {
    var priority = BattleManager.getSpritePriority();
    if (a._battler && b._battler && priority !== 0) {
        if (priority === 1) {
            if (a._battler.isActor() && b._battler.isEnemy()) return 1;
            if (a._battler.isEnemy() && b._battler.isActor()) return -1;
        } else if (priority === 2) {
            if (a._battler.isActor() && b._battler.isEnemy()) return -1;
            if (a._battler.isEnemy() && b._battler.isActor()) return 1;
        }
    }
    if (a.z < b.z) {
        return -1;
    } else if (a.z > b.z) {
        return 1;
    } else if (a.y < b.y) {
        return -1;
    } else if (a.y > b.y) {
        return 1;
    } else {
        return 0;
    }
};

//-----------------------------------------------------------------------------
// Sprite_OTBTurnOrder
//
// The sprite for displaying a button.

function Sprite_OTBTurnOrder() {
    this.initialize.apply(this, arguments);
}

Sprite_OTBTurnOrder.prototype = Object.create(Sprite_Base.prototype);
Sprite_OTBTurnOrder.prototype.constructor = Sprite_OTBTurnOrder;

Sprite_OTBTurnOrder.prototype.initialize = function(battler, instance, source) {
    this._battler = battler;
    this._instance = instance || 0;
    this._sourceArray = source;
    this.createConstants();
    this._previewMode = false;
    this._disposeState = false;
    Sprite_Base.prototype.initialize.call(this);
    this.opacity = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.createBackground1Sprite();
    this.createBackground2Sprite();
    this.createBattlerSprite();
};

Sprite_OTBTurnOrder.prototype.lineHeight = function() {
    return Window_Base.prototype.lineHeight.call(this);
};

Sprite_OTBTurnOrder.prototype.createConstants = function() {
    this._updateReady = false;
    this._targetX = 0;
    this._moveDuration = Olivia.OctoBattle.OTB.MoveDuration;
    this._opacityRate = Olivia.OctoBattle.OTB.OpacitySpeed;
    this._bigAppearance = false;
    this._selectionEffectCount = 0;
    this._x1 = BattleManager.otbDisplayWindow()._x1;
    this._x2 = BattleManager.otbDisplayWindow()._x2;
    this._width1 = BattleManager.otbDisplayWindow()._width1;
    this._width2 = BattleManager.otbDisplayWindow()._width2;
};

Sprite_OTBTurnOrder.prototype.createBackground1Sprite = function() {
    var lh = this.lineHeight();
    this.x = lh;
    this.y = lh;
    var hlh = Math.round(lh / 2);
    this._background1Sprite = new Sprite();
    this.addChild(this._background1Sprite);
    this._background1Sprite.bitmap = new Bitmap(lh, lh);
    var color1 = 'rgba(255, 255, 255, 1)';
    if (this._battler.isActor()) {
        var color2 = Olivia.OctoBattle.OTB.BackgroundActorColor;
    } else {
        var color2 = Olivia.OctoBattle.OTB.BackgroundEnemyColor;
    }
    var points = [hlh, 0, 0, hlh, hlh, lh, lh, hlh];
    this._background1Sprite.bitmap.drawOutlinePolygon(points, color1, color2, 1, 1, true);
    this._background1Sprite.anchor.x = 0.5;
    this._background1Sprite.anchor.y = 0.5;
};

Sprite_OTBTurnOrder.prototype.createBackground2Sprite = function() {
    var lh = this.lineHeight() * 2;
    var hlh = Math.round(lh / 2);
    this._background2Sprite = new Sprite();
    this.addChild(this._background2Sprite);
    this._background2Sprite.bitmap = new Bitmap(lh, lh);
    var color1 = 'rgba(255, 255, 255, 1)';
    if (this._battler.isActor()) {
        var color2 = Olivia.OctoBattle.OTB.BackgroundActorColor;
    } else {
        var color2 = Olivia.OctoBattle.OTB.BackgroundEnemyColor;
    }
    var points = [hlh, 0, 0, hlh, hlh, lh, lh, hlh];
    this._background2Sprite.bitmap.drawOutlinePolygon(points, color1, color2, 1, 1, true);
    this._background2Sprite.anchor.x = 0.5;
    this._background2Sprite.anchor.y = 0.5;
    this._background2Sprite.opacity = 0;
};

Sprite_OTBTurnOrder.prototype.createBattlerSprite = function() {
    this._battlerSprite = new Sprite();
    this.addChild(this._battlerSprite);
    this._battlerSprite.anchor.x = 0.5;
    this._battlerSprite.anchor.y = 0.5;
    this._battlerSprite.bitmap = this.loadBattlerSpriteBitmap();
    this._battlerSprite.bitmap.addLoadListener(this.setupBattlerBitmap.bind(this));
};

Sprite_OTBTurnOrder.prototype.checkDragonbones = function() {
    return Imported.KELYEP_DragonBones && this._battler.isReplacedByDragonBonesBattler();
};

Sprite_OTBTurnOrder.prototype.loadBattlerSpriteBitmap = function() {
    var name = this._battler.battlerName();
    if (this._battler.isActor()) {
        if ($gameSystem.isSideView() && !this.checkDragonbones()) {
            return ImageManager.loadSvActor(name);
        } else {
            name = this._battler.characterName();
            return ImageManager.loadCharacter(name);
        }
    } else {
        var hue = this._battler.battlerHue();
        this._battlerName = name;
        this._battlerHue = hue;
        if (this.checkDragonbones()) {
            this._battlerName = dragonBonesIntegration.Game_Enemy_battlerName.call(this._battler);
            if ($gameSystem.isSideView()) {
                return ImageManager.loadSvEnemy(this._battlerName, hue);
            } else {
                return ImageManager.loadEnemy(this._battlerName, hue);
            }
        } else if (Imported.YEP_X_AnimatedSVEnemies && this._battler.hasSVBattler()) {
            this._battlerName = this._battler.svBattlerName();
            return ImageManager.loadSvActor(this._battlerName)
        } else if ($gameSystem.isSideView()) {
            return ImageManager.loadSvEnemy(name, hue);
        } else {
            return ImageManager.loadEnemy(name, hue);
        }
    }
};

Sprite_OTBTurnOrder.prototype.setupBattlerBitmap = function() {
    this.setupBattlerBitmapFrame();
    this.setupBattlerBitmapScale();
    this._updateReady = true;
};

Sprite_OTBTurnOrder.prototype.setupBattlerBitmapFrame = function() {
    var x = 0;
    var y = 0;
    var w = this._battlerSprite.bitmap.width;
    var h = this._battlerSprite.bitmap.height;
    this.scale.x = 1;
    if (this._battler.isActor()) {
        if ($gameSystem.isSideView() && !this.checkDragonbones()) {
            w /= 9;
            h /= 6;
        } else {
            var index = this._battler.characterIndex();
            var big = ImageManager.isBigCharacter(this._battler.characterName());
            w = this._battlerSprite.bitmap.width / (big ? 3 : 12);
            h = this._battlerSprite.bitmap.height / (big ? 4 : 8);
            x = (index % 4 * 3 + 1) * w;
            y = (Math.floor(index / 4) * 4) * h;
        }
    } else if (this.checkDragonbones()) {
        w *= 1;
        h *= 1;
    } else if (Imported.YEP_X_AnimatedSVEnemies && this._battler.isEnemy() && this._battler.hasSVBattler()) {
        w /= 9;
        h /= 6;
        this.scale.x = -1;
    }
    this._battlerSprite.setFrame(x, y, w, h);
};

Sprite_OTBTurnOrder.prototype.setupBattlerBitmapScale = function() {
    var lh = this.lineHeight();
    var largerDimension = Math.max(this._battlerSprite.width, this._battlerSprite.height);
    if (largerDimension > lh) {
        var rate = lh / largerDimension;
        this._battlerSprite.scale.x = rate;
        this._battlerSprite.scale.y = rate;
    }
    this._baseScale = rate;
    this._largeScale = Math.min(1, 2 * this._baseScale);
};

Sprite_OTBTurnOrder.prototype.setPreview = function(index) {
    this._previewMode = true;
    this.y = 0;
    if (this._sourceArray === BattleManager._actionBattlers) {
        var width = Math.min(this.lineHeight(), Math.ceil((this._width1 - this.lineHeight()) / (this._sourceArray.length - 1)));
        this.x = this._x1 + Math.round(this.lineHeight() / 2) + index * width - Math.round(width / 2);
    } else {
        var width = Math.min(this.lineHeight(), Math.ceil((this._width2 - this.lineHeight()) / (this._sourceArray.length - 1)));
        this.x = this._x2 + Math.round(this.lineHeight() / 2) + index * width - 4 - Math.round(width / 2);
    }
    this._background1Sprite.setBlendColor([255, 255, 255, 255]);
    this.opacity = 255;
};

Sprite_OTBTurnOrder.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    if (this._battler && this._updateReady) {
        this.updateBattlerBitmap();
    }
    this.updateOpacity();
    if (!this._previewMode) {
        this.updateMovement();
        this.updateSelectionEffect();
    }
};

Sprite_OTBTurnOrder.prototype.updateBattlerBitmap = function() {
    if (this._battler.isEnemy()) {
        if (this.checkDragonbones()) {
            var battlerName = dragonBonesIntegration.Game_Enemy_battlerName.call(this._battler);
        } else {
            var battlerName = this._battler.battlerName();
        }
        if (this._battlerName !== battlerName || this._battlerHue !== this._battler.battlerHue()) {
            this._updateReady = false;
            this.removeChild(this._battlerSprite);
            this.createBattlerSprite();
        }
    }
};

Sprite_OTBTurnOrder.prototype.setBattler = function(battler) {
    if (this._battler !== battler) {
        this._battler = battler;
        this._updateReady = false;
        this.removeChild(this._battlerSprite);
        this.createBattlerSprite();
    }
};

Sprite_OTBTurnOrder.prototype.updateMovement = function() {
    if (this._moveDuration) {
        var d = this._moveDuration;
        this.x = (this.x * (d - 1) + this._targetX) / d;
        this._moveDuration--;
    }
};

Sprite_OTBTurnOrder.prototype.updateOpacity = function() {
    if (this._disposeState && this._opacityRate > 0) {
        this._opacityRate *= -1;
    }
    if (!!BattleManager._hideOTBTurnDisplay) {
        this.opacity -= Math.ceil(Olivia.OctoBattle.OTB.OpacitySpeed);
    } else if (this._opacityRate > 0 && this.opacity < 255) {
        this.opacity += this._opacityRate;
    } else if (this._opacityRate < 0 && this.opacity > 0) {
        this.opacity += this._opacityRate;
    }
};

Sprite_OTBTurnOrder.prototype.updateSelectionEffect = function() {
    if (this._battler.isSelected()) {
        this._selectionEffectCount++
        if (this._selectionEffectCount % 30 < 15) {
            this._battlerSprite.setBlendColor([255, 255, 255, 64]);
        } else {
            this._battlerSprite.setBlendColor([0, 0, 0, 0]);
        }
        this._battlerSprite.scale.x = this._largeScale;
        this._battlerSprite.scale.y = this._largeScale;
        this._background2Sprite.opacity = 255;
        this._background1Sprite.opacity = 0;
    } else if (this._bigAppearance && this.x === this._targetX) {
        this._battlerSprite.setBlendColor([0, 0, 0, 0]);
        this._battlerSprite.scale.x = Math.min(this._largeScale, this._battlerSprite.scale.x + 0.05);
        this._battlerSprite.scale.y = Math.min(this._largeScale, this._battlerSprite.scale.y + 0.05);
        this._background2Sprite.opacity = 255;
        this._background1Sprite.opacity = 0;
    } else {
        this._selectionEffectCount = 0;
        this._battlerSprite.setBlendColor([0, 0, 0, 0]);
        this._battlerSprite.scale.x = 1 * this._baseScale;
        this._battlerSprite.scale.y = 1 * this._baseScale;
        this._background1Sprite.opacity = 255;
        this._background2Sprite.opacity = 0;
    }
};

Sprite_OTBTurnOrder.prototype.updatePosition = function() {
    this._moveDuration = Olivia.OctoBattle.OTB.MoveDuration;
    var indices = this._sourceArray.getAllIndices(this._battler);
    var index = indices[this._instance];
    if (this._instance < 0) {
        this._targetX = this.lineHeight();
        this._bigAppearance = true;
    } else if (this._sourceArray === BattleManager._actionBattlers) {
        var width = Math.min(this.lineHeight(), Math.ceil((this._width1 - this.lineHeight()) / (this._sourceArray.length - 1)));
        this._targetX = this._x1 + Math.round(this.lineHeight() / 2) + index * width;
    } else {
        var width = Math.min(this.lineHeight(), Math.ceil((this._width2 - this.lineHeight()) / (this._sourceArray.length - 1)));
        this._targetX = this._x2 + Math.round(this.lineHeight() / 2) + index * width - 4;
    }
};

//-----------------------------------------------------------------------------
// Window_Selectable
//
// The window class with cursor movement and scroll functions.

Olivia.OctoBattle.Battle.___Window_Selectable_select___ = Window_Selectable.prototype.select;
Window_Selectable.prototype.select = function(index) {
    Olivia.OctoBattle.Battle.___Window_Selectable_select___.call(this, index);
    if ($gameParty.inBattle() && BattleManager.isOTB() && SceneManager._scene instanceof Scene_Battle && this._otbTurnPreview) {
        if (index >= 0) {
            this.otbCreateTurnPreview();
        } else {
            this.otbClearTurnPreview();
        }
    }
};

Olivia.OctoBattle.Battle.Window_Selectable_deactivate = Window_Selectable.prototype.deactivate;
Window_Selectable.prototype.deactivate = function() {
    Olivia.OctoBattle.Battle.Window_Selectable_deactivate.call(this);
    this.otbClearTurnPreview();
};

Window_Selectable.prototype.otbCreateTurnPreview = function() {
};

Window_Selectable.prototype.otbClearTurnPreview = function() {
    BattleManager._requestNextTurnPreview = null;
    BattleManager._requestNextTurnPreviewClear = true;
};

Window_Selectable.prototype.otbSetTurnPreviewItem = function(item) {
    if (!!item) {
        DataManager.otbBuffDebuffAgiConvert(item);
        this.otbClearTurnPreview();
        BattleManager._requestNextTurnPreview = item;
        BattleManager._requestNextTurnPreviewClear = false;
    }
};


//-----------------------------------------------------------------------------
// Window_ActorCommand
//
// The window for selecting an actor's action on the battle screen.

Olivia.OctoBattle.Battle.Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function() {
    this._otbTurnPreview = true;
    Olivia.OctoBattle.Battle.Window_ActorCommand_initialize.call(this);
};

Olivia.OctoBattle.Battle.___Window_ActorCommand_makeCommandList___ = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
    Olivia.OctoBattle.Battle.___Window_ActorCommand_makeCommandList___.call(this);
    if (this._actor && Olivia.OctoBattle.OTB.EscapeActorWindow) {
        this.addEscapeCommand();
    }
};

Window_ActorCommand.prototype.addEscapeCommand = function() {
    this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
};

Window_ActorCommand.prototype.otbCreateTurnPreview = function() {
    if (this.currentSymbol() === 'attack') {
        this.otbSetTurnPreviewItem($dataSkills[this._actor.attackSkillId()]);
    } else if (this.currentSymbol() === 'guard') {
        this.otbSetTurnPreviewItem($dataSkills[this._actor.guardSkillId()]);
    } else {
        this.otbClearTurnPreview();
    }
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//
// The window for selecting a target enemy on the battle screen.

Olivia.OctoBattle.Battle.___Window_BattleEnemy_initialize___ = Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(x, y) {
    this._otbTurnPreview = true;
    Olivia.OctoBattle.Battle.___Window_BattleEnemy_initialize___.call(this, x, y);
};

Window_BattleEnemy.prototype.otbCreateTurnPreview = function() {
    this.otbSetTurnPreviewItem(BattleManager.inputtingAction().item());
};

//-----------------------------------------------------------------------------
// Window_BattleSkill
//
// The window for selecting a skill to use on the battle screen.

Olivia.OctoBattle.Battle.___Window_BattleSkill_initialize___ = Window_BattleSkill.prototype.initialize;
Window_BattleSkill.prototype.initialize = function(x, y, width, height) {
    this._otbTurnPreview = true;
    Olivia.OctoBattle.Battle.___Window_BattleSkill_initialize___.call(this, x, y, width, height);
};

Window_BattleSkill.prototype.otbCreateTurnPreview = function() {
    if (!!this.item()) {
        this.otbSetTurnPreviewItem(this.item());
    } else {
        this.otbClearTurnPreview();
    }
};

//-----------------------------------------------------------------------------
// Window_OTBDisplay
//
// The window for displaying the turn order for Battle System OTB

function Window_OTBDisplay() {
    this.initialize.apply(this, arguments);
}

Window_OTBDisplay.prototype = Object.create(Window_Base.prototype);
Window_OTBDisplay.prototype.constructor = Window_OTBDisplay;

Window_OTBDisplay.prototype.initialize = function(helpWindow) {
    this._helpWindow = helpWindow;
    var x = Olivia.OctoBattle.OTB.DisplayX;
    var y = Olivia.OctoBattle.OTB.DisplayY;
    var width = Graphics.boxWidth - x;
    if (Olivia.OctoBattle.SideBattleUI && Olivia.OctoBattle.SideBattleUI.Enabled) {
        width -= Olivia.OctoBattle.SideBattleUI.StatusWidth;
        width -= Math.max(Olivia.OctoBattle.SideBattleUI.ActiveBattlerMove, Olivia.OctoBattle.SideBattleUI.SelectBattlerMove);
        width -= Window_Base._iconWidth * (Olivia.OctoBattle.SideBattleUI.StatesMax + 0.5);
    } else {
        width -= x;
    }
    width = Math.round(width);
    var height = this.lineHeight() * 3;
    this.setupVariableConstants();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.setupWindowConstants();
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.refresh();
};

Window_OTBDisplay.prototype.standardPadding = function() {
    return 0;
};

Window_OTBDisplay.prototype.setupVariableConstants = function() {
    BattleManager._requestCurrentTurnUpdate = false;
    BattleManager._requestCurrentTurnUpdateInstantly = false;
    BattleManager._requestNextTurnUpdate = false;
    BattleManager._requestNextTurnUpdateInstantly = false;
    this._subjectSprite = null;
    this._previewSprites = [];
    this._disposedSprites = [];
};

Window_OTBDisplay.prototype.setupWindowConstants = function() {
    this._x1 = this.lineHeight() * 2;
    this._x2 = Math.ceil(this.width / 2) + Math.round(Window_Base._iconWidth / 2) + 12;
    this._y = this.lineHeight();
    this._width1 = Math.ceil(this.width / 2) - Math.round(this.lineHeight() * 2.5);
    this._width2 = this.width - this._x2;
    this._helpWindowY = Olivia.OctoBattle.OTB.HelpWindowMoveY;
    this._helpMoveSpeed = Olivia.OctoBattle.OTB.HelpWindowMoveSpeed;
    this._spriteContainer = new Sprite();
    this.addChild(this._spriteContainer);
};

Window_OTBDisplay.prototype.refresh = function() {
    this.contents.clear();
    this.drawBackgroundLines();
    this.drawBackgroundText();
};

Window_OTBDisplay.prototype.drawBackgroundLines = function() {
    this.changePaintOpacity(true);
    var points = []
    var lh = this.lineHeight();
    var opacity = 1;
    points = [lh, 0, 0, lh, lh, lh * 2, lh * 2, lh];
    this.contents.drawOutlinePolygon(points, this.normalColor(), this.dimColor1(), 1, opacity, true);
    points = [lh * 2 + 8, lh - 8, lh * 2, lh, lh * 2 + 8, lh + 8, lh * 2 + 12, lh + 4, this._x1 + this._width1 - 8, lh + 4, this._x1 + this._width1 - 4, lh + 8, this._x1 + this._width1 + 4, lh, this._x1 + this._width1 - 4, lh - 8, this._x1 + this._width1 - 8, lh - 4, lh * 2 + 12, lh - 4];
    this.contents.drawOutlinePolygon(points, this.normalColor(), this.dimColor1(), 1, opacity, true);
    points = [this._x2 - 4, lh, this._x2 + 4, lh + 8, this._x2 + 8, lh + 4, this._x2 + this._width2 - 12, lh + 4, this._x2 + this._width2 - 8, lh + 8, this._x2 + this._width2, lh, this._x2 + this._width2 - 8, lh - 8, this._x2 + this._width2 - 12, lh - 4, this._x2 + 8, lh - 4, this._x2 + 4, lh - 8];
    this.contents.drawOutlinePolygon(points, this.normalColor(), this.dimColor1(), 1, opacity, true);
    points = [this._x2 - 12, lh, this._x2 - 12 + lh, lh * 2, this._x2 - 20 + lh, lh * 2, this._x2 - 20, lh, this._x2 - 20 + lh, 0, this._x2 - 12 + lh, 0];
    this.contents.drawOutlinePolygon(points, this.normalColor(), this.dimColor1(), 1, opacity, true);
    points = [this._x2 - 28, lh, this._x2 - 28 + lh, lh * 2, this._x2 - 36 + lh, lh * 2, this._x2 - 36, lh, this._x2 - 36 + lh, 0, this._x2 - 28 + lh, 0];
    this.contents.drawOutlinePolygon(points, this.normalColor(), this.dimColor1(), 1, opacity, true);
};

Window_OTBDisplay.prototype.drawBackgroundText = function() {
    this.resetFontSettings();
    this.changePaintOpacity(true);
    var original = this.contents.outlineColor;
    var text1 = Olivia.OctoBattle.OTB.CurrentTurnText;
    var text2 = Olivia.OctoBattle.OTB.NextTurnText;
    var fontSize1 = Olivia.OctoBattle.OTB.CurrentTurnFontSize;
    var fontSize2 = Olivia.OctoBattle.OTB.NextTurnFontSize;
    this.contents.fontSize = fontSize1;
    this.contents.drawText(text1, this.lineHeight(), this.lineHeight() * 2, this._width1, fontSize1, 'left');
    this.contents.fontSize = fontSize2;
    this.contents.drawText(text2, this._x2, this.lineHeight() * 2, this._width2, fontSize2, 'left');
};

Window_OTBDisplay.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (BattleManager._hideOTBTurnDisplay) {
        this.contentsOpacity -= Math.ceil(Olivia.OctoBattle.OTB.OpacitySpeed);
    } else if (this.contentsOpacity < 255) {
        this.contentsOpacity += Math.ceil(Olivia.OctoBattle.OTB.OpacitySpeed / 2);
    }
    if (!!this._helpWindow) {
        this.updateWindowPosition();
    }
    this.updateDisposeSprites();
    this.updateBattleManagerRequests();
};

Window_OTBDisplay.prototype.updateWindowPosition = function() {
    if (this._helpWindow.visible) {
        this.y = Math.min(this._helpWindowY, this.y + this._helpMoveSpeed);
    } else {
        this.y = Math.max(Olivia.OctoBattle.OTB.DisplayY, this.y - this._helpMoveSpeed);
    }
};

Window_OTBDisplay.prototype.disposeSprite = function(sprite) {
    sprite._opacityRate = Math.abs(sprite._opacityRate) * -1;
    sprite._disposeState = true;
    this._disposedSprites.push(sprite);
};

Window_OTBDisplay.prototype.updateDisposeSprites = function() {
    if (this._disposedSprites.length > 0 && this._disposedSprites[0].opacity <= 0) {
        this._spriteContainer.removeChild(this._disposedSprites.shift());
    }
};

Window_OTBDisplay.prototype.createNewSprites = function() {
    if (this._currentTurnSprites === undefined) {
        this._currentTurnSprites = [];
        this.createNewSpritesFor(true);
        this._nextTurnSprites = [];
        this.createNewSpritesFor(false);
        BattleManager._requestCurrentTurnUpdate = true;
        BattleManager._requestCurrentTurnUpdateInstantly = true;
        BattleManager._requestNextTurnUpdate = true;
        BattleManager._requestNextTurnUpdateInstantly = true;
    } else {
        this.giveTurnSpritesToNewArray();
        this.createNewSpritesFor(false);
        BattleManager._requestCurrentTurnUpdate = true;
        BattleManager._requestCurrentTurnUpdateInstantly = false;
        BattleManager._requestNextTurnUpdate = true;
        BattleManager._requestNextTurnUpdateInstantly = false;
    }
};

Window_OTBDisplay.prototype.giveTurnSpritesToNewArray = function() {
    while (this._currentTurnSprites.length > 0) {
        this.disposeSprite(this._currentTurnSprites.shift());
    }
    while (this._nextTurnSprites.length > 0) {
        var sprite = this._nextTurnSprites.shift();
        sprite._sourceArray = BattleManager._actionBattlers;
        this._currentTurnSprites.push(sprite);
    }
};

Window_OTBDisplay.prototype.createNewSpritesFor = function(currentTurn) {
    if (currentTurn) {
        var sourceArray = BattleManager._actionBattlers;
        var targetArray = this._currentTurnSprites;
    } else {
        var sourceArray = BattleManager._nextTurnActionBattlers;
        var targetArray = this._nextTurnSprites;
    }
    var instances = {};
    for (var i = 0; i < sourceArray.length; i++) {
        var battler = sourceArray[i];
        instances[battler.otbInstanceName()] = instances[battler.otbInstanceName()] || 0;
        var newSprite = new Sprite_OTBTurnOrder(battler, instances[battler.otbInstanceName()], sourceArray);
        instances[battler.otbInstanceName()] += 1;
        this._spriteContainer.addChild(newSprite);
        targetArray.push(newSprite);
        if (!currentTurn) {
            newSprite.x = this.width;
        }
    }
};

Window_OTBDisplay.prototype.createReturnedBattlerSprite = function(battler, currentTurn) {
    if (currentTurn) {
        var sourceArray = BattleManager._actionBattlers;
        var targetArray = this._currentTurnSprites;
        var returnX = this._x1 + this._width1;
        BattleManager._requestCurrentTurnUpdate = true;
    } else {
        var sourceArray = BattleManager._nextTurnActionBattlers;
        var targetArray = this._nextTurnSprites;
        var returnX = this._x2 + this._width2;
        BattleManager._requestNextTurnUpdate = true;
    }
    var instances = {};
    instances[battler.otbInstanceName()] = instances[battler.otbInstanceName()] || 0;
    var indices = sourceArray.getAllIndices(battler);
    while (indices.length > 0) {
        var index = indices.shift()
        var newSprite = new Sprite_OTBTurnOrder(battler, instances[battler.otbInstanceName()], sourceArray);
        instances[battler.otbInstanceName()] += 1;
        this._spriteContainer.addChild(newSprite);
        targetArray.splice(index, 0, newSprite);
        newSprite.x = returnX;
    }
};

Window_OTBDisplay.prototype.createBattlerSpriteAtEnd = function(battler, currentTurn) {
    if (currentTurn) {
        var sourceArray = BattleManager._actionBattlers;
        var targetArray = this._currentTurnSprites;
        var returnX = this._x1 + this._width1;
        BattleManager._requestCurrentTurnUpdate = true;
    } else {
        var sourceArray = BattleManager._nextTurnActionBattlers;
        var targetArray = this._nextTurnSprites;
        var returnX = this._x2 + this._width2;
        BattleManager._requestNextTurnUpdate = true;
    }
    var instances = {};
    var indices = sourceArray.getAllIndices(battler);
    var instance = indices.length - 1;
    var newSprite = new Sprite_OTBTurnOrder(battler, instance, sourceArray);
    targetArray.push(newSprite);
    this._spriteContainer.addChild(newSprite);
    newSprite.x = returnX;
};

Window_OTBDisplay.prototype.updateShiftOrder = function() {
    if (!!this._subjectSprite) {
        this.disposeSprite(this._subjectSprite);
        this._subjectSprite = null;
    }
    for (var i = 0; i < this._currentTurnSprites.length; i++) {
        var sprite = this._currentTurnSprites[i];
        if (sprite._battler === BattleManager._subject) {
            sprite._instance -= 1;
            if (sprite._instance === -1) {
                this._subjectSprite = sprite;
                this._subjectSprite.updatePosition();
                this._currentTurnSprites.splice(this._currentTurnSprites.indexOf(sprite), 1);
                i--;
                BattleManager._requestCurrentTurnUpdate = true;
            } else if (sprite._instance < -1) {
                this.disposeSprite(sprite);
                this._currentTurnSprites.splice(this._currentTurnSprites.indexOf(sprite), 1);
                i--;
                BattleManager._requestCurrentTurnUpdate = true;
            }
        }
    }
};

Window_OTBDisplay.prototype.updateBattleManagerRequests = function() {
    if (BattleManager._requestClearUnableBattlers) {
        this.updateClearUnableBattlers(this._currentTurnSprites);
        this.updateClearUnableBattlers(this._nextTurnSprites);
    }
    if (BattleManager._requestCurrentTurnUpdate) {
        this.updateTurnSpriteLocations(true);
    }
    if (BattleManager._requestNextTurnUpdate) {
        this.updateTurnSpriteLocations(false);
    }
    if (BattleManager._requestCurrentTurnSpriteReorder) {
        this.updateReorderSprites(true);
    }
    if (BattleManager._requestNextTurnSpriteReorder) {
        this.updateReorderSprites(false);
    }
    if (BattleManager._requestNextTurnPreview) {
        this.updateNextTurnPreview();
    }
    if (BattleManager._requestNextTurnPreviewClear) {
        this.updateNextTurnPreviewClear();
    }
};

Window_OTBDisplay.prototype.updateClearUnableBattlers = function(array) {
    BattleManager._requestClearUnableBattlers = false;
    for (var i = 0; i < array.length; i++) {
        var sprite = array[i];
        if (!!sprite && BattleManager.otbCheckIfBattlerIsUnable(sprite._battler, sprite._sourceArray)) {
            this.disposeSprite(sprite);
            array.splice(i, 1);
            i--;
        }
    }
};

Window_OTBDisplay.prototype.updateTurnSpriteLocations = function(currentTurn) {
    if (currentTurn) {
        var array = this._currentTurnSprites;
        var instant = BattleManager._requestCurrentTurnUpdateInstantly;
        BattleManager._requestCurrentTurnUpdate = false;
        BattleManager._requestCurrentTurnUpdateInstantly = false;
    } else {
        var array = this._nextTurnSprites;
        var instant = BattleManager._requestNextTurnUpdateInstantly;
        BattleManager._requestNextTurnUpdate = false;
        BattleManager._requestNextTurnUpdateInstantly = false;
    }
    for (var i = 0; i < array.length; i++) {
        var sprite = array[i];
        if (!sprite) {
            continue;
        }
        sprite.updatePosition();
        if (instant) {
            sprite.x = sprite._targetX;
            sprite._moveDuration = 1;
        }
    }
};

Window_OTBDisplay.prototype.updateReorderSprites = function(currentTurn) {
    if (currentTurn) {
        var sourceArray = BattleManager._actionBattlers;
        var targetArray = this._currentTurnSprites;
        BattleManager._requestCurrentTurnUpdate = true;
        BattleManager._requestCurrentTurnSpriteReorder = false;
    } else {
        var sourceArray = BattleManager._nextTurnActionBattlers;
        var targetArray = this._nextTurnSprites;
        BattleManager._requestNextTurnUpdate = true;
        BattleManager._requestNextTurnSpriteReorder = false;
    }
    targetArray.sort(function(a, b) {
        return a._targetX - b._targetX;
    });
    this._spriteContainer.children.sort(function(a, b) {
        return a._targetX - b._targetX;
    });
};

Window_OTBDisplay.prototype.updateNextTurnPreview = function() {
    this._previewItem = BattleManager._requestNextTurnPreview;
    if (!this._previewItem) {
        return;
    }
    BattleManager._requestNextTurnPreview = null;
    this.updateNextTurnPreviewClear();
    this.updateNextTurnPreviewUser();
    this.updateNextTurnPreviewTargets();
};

Window_OTBDisplay.prototype.updateNextTurnPreviewUser = function() {
    var nextTurnChange = 0;
    if (Olivia.OctoBattle.OTB.ActionSpeedConvert) {
        nextTurnChange += this._previewItem.speed;
    }
    if (this._previewItem.note.match(/<OTB User Next Turn: ([\+\-]\d+)>/i)) {
        nextTurnChange += parseInt(RegExp.$1);
    }
    var battler = BattleManager._subject;
    var sourceArray = BattleManager._nextTurnActionBattlers;
    this.createPreviewSprite(battler, sourceArray, nextTurnChange);
};

Window_OTBDisplay.prototype.createPreviewSprite = function(battler, sourceArray, change) {
    if (change !== 0 && sourceArray.contains(battler)) {
        change += change > 0 ? 0 : -1;
        var indices = sourceArray.getAllIndices(battler);
        var minimum = BattleManager.otbInfinityClamp(sourceArray);
        for (var i = 0; i < indices.length; i++) {
            var index = (indices[i] - change).clamp(minimum, sourceArray.length);
            var newSprite = new Sprite_OTBTurnOrder(battler, i, sourceArray);
            this._spriteContainer.addChild(newSprite);
            this._previewSprites.push(newSprite);
            newSprite.setPreview(index);
        }
    }
};

Window_OTBDisplay.prototype.updateNextTurnPreviewTargets = function() {
    var targets = this.getSelectedBattleTargets();
    if (targets.length > 0) {
        var followTurnChange = 0;
        var currentTurnChange = 0;
        var nextTurnChange = 0;
        if (this._previewItem.note.match(/<OTB Target Follow Turn: ([\+\-]\d+)>/i)) {
            followTurnChange += parseInt(RegExp.$1);
        }
        if (this._previewItem.note.match(/<OTB Target Current Turn: ([\+\-]\d+)>/i)) {
            currentTurnChange += parseInt(RegExp.$1);
        }
        if (this._previewItem.note.match(/<OTB Target Next Turn: ([\+\-]\d+)>/i)) {
            nextTurnChange += parseInt(RegExp.$1);
        }
        for (var i = 0; i < targets.length; i++) {
            var battler = targets[i];
            if (battler.speed() !== Infinity) {
                if (BattleManager._actionBattlers.contains(battler)) {
                    currentTurnChange += followTurnChange;
                } else {
                    nextTurnChange += followTurnChange;
                }
                this.createPreviewSprite(battler, BattleManager._actionBattlers, currentTurnChange);
                this.createPreviewSprite(battler, BattleManager._nextTurnActionBattlers, nextTurnChange);
            }
        }
    }
};

Window_OTBDisplay.prototype.getSelectedBattleTargets = function() {
    var targets = [];
    var members = BattleManager.allBattleMembers();
    for (var i = 0; i < members.length; i++) {
        var member = members[i];
        if (!!member && member.isSelected()) {
            targets.push(member);
        }
    }
    return targets;
};

Window_OTBDisplay.prototype.updateNextTurnPreviewClear = function() {
    BattleManager._requestNextTurnPreviewClear = false;
    while (this._previewSprites.length > 0) {
        var sprite = this._previewSprites.shift();
        this.disposeSprite(sprite);
    }
};

//=============================================================================
} // End OTB
//=============================================================================


























