/*:
 * @plugindesc WASD Movement, Disable F keys and Disable mouse/touch input.
 * 
 * @author Astra Cat
 * 
 * @param WASD Control
 * @desc Use WASD to move character?
 * @default false
 * @param Disable F2 F3 and F4
 * @desc Disable F2, F3, and F4 keys?
 * @default false
 * @param Disable Gamepad
 * @desc Disable gamepad input
 * @default false
 * @param Disable Mouse
 * @desc Disable mouse input
 * @default false
 * @param Disable Mouse Move
 * @desc Disable player moving through mouse click or touch input.
 * @default false
 * @help Simple input settings plugin.

 */

/* global PluginManager, Input */
var parameters = PluginManager.parameters('AS_InputSettings');
var WASDcontrol = String(parameters['WASD Control'] || 'false');
var DisableF2F3F4 = String(parameters['Disable F2 F3 and F4'] || 'false');
var NoGamepad = String(parameters['Disable Gamepad'] || 'false');
var MouseDisabled = String(parameters['Disable Mouse'] || 'false');
var MouseDisabledCharMapMovement = String(parameters['Disable Mouse to Move Character on Map'] || 'false');


if (MouseDisabledCharMapMovement == 'true'){
    var alias_AstraCat_processMapTouch = Scene_Map.prototype.processMapTouch;
    Scene_Map.prototype.processMapTouch = function() {
    alias_AstraCat_processMapTouch.call();
        
    if (TouchInput.isTriggered() || this._touchCount > 0) {
        if (TouchInput.isPressed()) {
            if (this._touchCount === 0 || this._touchCount >= 15) {
                //var x = $gameMap.canvasToMapX(TouchInput.x);
                //var y = $gameMap.canvasToMapY(TouchInput.y);
                //$gameTemp.setDestination(x, y);
            }
            this._touchCount++;
        } else {
            this._touchCount = 0;
        }
    }
};
}

 //Disable F2, F3, and F4
 if (DisableF2F3F4 == 'true') {
    Graphics._onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
            case 113:   // F2
            event.preventDefault();
            break;
        case 114:   // F3
            event.preventDefault();
            break;
        case 115:   // F4
            event.preventDefault();
            break;
        }
    }
    };
 }
else if (DisableF2F3F4 == 'false') {
        Graphics._onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
        case 113:   // F2
            event.preventDefault();
            this._switchFPSMeter();
            break;
        case 114:   // F3
            event.preventDefault();
            this._switchStretchMode();
            break;
        case 115:   // F4
            event.preventDefault();
            this._switchFullScreen();
            break;
        }
    }
    };
}

if (WASDcontrol == 'true') {
    Input.keyMapper = 
        {
        9: 'tab',       // tab
        13: 'ok',       // enter
        16: 'shift',    // shift
        17: 'control',  // control
        18: 'control',  // alt
        27: 'escape',   // escape
        32: 'ok',       // space
        33: 'pageup',   // pageup
        34: 'pagedown', // pagedown
        65: 'left',     // left arrow
        87: 'up',       // up arrow
        68: 'right',    // right arrow
        83: 'down',     // down arrow
        45: 'escape',   // insert
        81: 'pageup',   // Q
        82: 'pagedown', // W
        88: 'escape',   // X
        90: 'ok',       // Z
        96: 'escape',   // numpad 0
        98: 'down',     // numpad 2
        100: 'left',    // numpad 4
        102: 'right',   // numpad 6
        104: 'up',      // numpad 8
        120: 'debug'    // F9
        } 
    }
    else if (WASDcontrol == 'false')
    {
    Input.keyMapper = 
        {
        9: 'tab',       // tab
        13: 'ok',       // enter
        16: 'shift',    // shift
        17: 'control',  // control
        18: 'control',  // alt
        27: 'escape',   // escape
        32: 'ok',       // space
        33: 'pageup',   // pageup
        34: 'pagedown', // pagedown
        37: 'left',     // left arrow
        38: 'up',       // up arrow
        39: 'right',    // right arrow
        40: 'down',     // down arrow
        45: 'escape',   // insert
        81: 'pageup',   // Q
        87: 'pagedown', // W
        88: 'escape',   // X
        90: 'ok',       // Z
        96: 'escape',   // numpad 0
        98: 'down',     // numpad 2
        100: 'left',    // numpad 4
        102: 'right',   // numpad 6
        104: 'up',      // numpad 8
           120: 'debug'    // F9
        };
    }
    
    
if (NoGamepad == 'false') {
    //No gamepad
    Input.gamepadMapper = {
        0: 'ok',        // A
        1: 'cancel',    // B
        2: 'shift',     // X
        3: 'menu',      // Y
        4: 'pageup',    // LB
        5: 'pagedown',  // RB
        12: 'up',       // D-pad up
        13: 'down',     // D-pad down
        14: 'left',     // D-pad left
        15: 'right',    // D-pad right
        };
}
else if (NoGamepad == 'true') {
        //Map the gamepad to some random useless key for none-use
        Input.gamepadMapper = {
        222: 'ok',        // A
        222: 'cancel',    // B
        222: 'shift',     // X
        222: 'menu',      // Y
        222: 'pageup',    // LB
        222: 'pagedown',  // RB
        222: 'up',       // D-pad up
        222: 'down',     // D-pad down
        222: 'left',     // D-pad left
        222: 'right',    // D-pad right
        };
}

if (MouseDisabled == 'true') {
TouchInput.initialize = function() {
    this.clear();
};
}
else if (MouseDisabled == 'false') {
TouchInput.initialize = function() {
    this.clear();
    this._setupEventHandlers();
};
}