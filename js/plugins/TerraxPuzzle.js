//=============================================================================
// Terrax Plugins - Puzzle system
// TerraxPuzzle.js
// Version: 1.0.0
//=============================================================================
//
// This script overwrites the following core scripts.
// Scene_Load.prototype.onSavefileOk
// Game_Event.prototype.initialize
//=============================================================================
 /*:
 * @plugindesc v1.0.0 Enables events to be pushed around on the map for making puzzles!
 * @author Terrax
 *
 *
 * @help
 * 
 * To make an event with the ability to be moved around set the following:
 * 1 : Plugin command 'Push move' in the event list.
 * 2 : Trigger : action button
 * 3 : Priority 'same as character'
 *
 * To make a pressure plate setup the following:
 * 1 : Put 'Push over' in the note of the event, this will enable other events to be pushed onto it. .
 * 2 : Set the events priority to 'below character'
 * 3 : Set the events trigger to 'parallel' 
 * 4 : Plugin command 'Push Detect 1' in the event list. 
 *     The plugin command will activate SelfSwitch 'D' on the event with the note 'Pushtarget 1'. 
 *
 *
 * To reset a puzzle room, use the plugin command 'push reset 1'
 * This will reset the objects in the map with id 1 to the default positions.
 * (don't forget to move the player if needed)
 *
 *
 * Check out the demo for examples.
 *
 * Released under the MIT license,
 * if used for commercial projects feel free to make a donation or 
 * better yet, give me a free version of what you have created.
 * e-mail : fox(AT)caiw.nl / terraxz2 on steam.
 * 
 * 
*/
//=============================================================================
//  ps.. if my code looks funky, i'm an old guy..
// object orientated programming bugs the hell out of me.


var Imported = Imported || {};
Imported.TerraxPuzzle = true;

var savepush_id = [];
var savepush_x = [];
var savepush_y = [];
var savepush_mapid = [];
var savepush_moved = [];


(function() {
	/*
	var savepush_id = [];
	var savepush_x = [];
	var savepush_y = [];
	var savepush_mapid = [];
	var savepush_moved = [];
	*/
	var debugtext= 'debug';
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
       	
        command = command.toLowerCase();
        
        if (command === 'push') {

	    	if (args[0] == 'reset') {
	    		MapId = args[1];

	    		var newpush_id = [];
				var	newpush_x = [];
				var newpush_y = []; 
				var	newpush_mapid = [];
				var	newpush_moved = [];
				
	        	for (var i = 0; i <  savepush_id.length; i++) {     	
	
		        	if (savepush_mapid[i] != MapId ) {
						//save events from other mapids
				  		newpush_id.push(savepush_id[i]);
						newpush_x.push(savepush_x[i]);
						newpush_y.push(savepush_y[i]);
						newpush_mapid.push(savepush_mapid[i]);
						newpush_moved.push(savepush_moved[i]);		
					} 
				}	
				savepush_id = newpush_id;
				savepush_x = newpush_x;
				savepush_y = newpush_y;
				savepush_mapid = newpush_mapid;
				savepush_moved = newpush_moved;
				
				
				//for (var i = 0; i <  savepush_id.length; i++) {     	
			    //    debugtext = debugtext + savepush_id[i] + ':' + savepush_mapid[i] + '   ';	
				//	Graphics.printError('test',debugtext);	
			 	//	}	
        		$gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        		$gamePlayer.requestMapReload();	
    		}
	    
	    	// move push objects        
	        if (args[0] == 'move') {
		        var evid = this._eventId;
	        	var mapid = $gameMap.mapId();	
		        var px = $gamePlayer.x;
		        var py = $gamePlayer.y;
		         
		        var character = this.character();
				var ex = character.x;
				var ey = character.y;
				
				var checkbuttonpress = false;
		        
		        if (ey == py && ex < px) {  // push left
			        if (checkpushboundary(ex-1,ey,6) == true) {
			        	character.locate(ex-1,ey);
			        	checkbuttonpress = true;
			        	updatepushobject(evid,ex-1,ey,mapid,true);
		        	}
	        	}
		        
	        	if (ey == py && ex > px) {  // push right
			        if (checkpushboundary(ex+1,ey,4) == true) {
			        	character.locate(ex+1,ey);
			        	checkbuttonpress = true;
			        	updatepushobject(evid,ex+1,ey,mapid,true);
		        	}
	        	}
	
	        	if (ex == px && ey < py) {  // push up
			        if (checkpushboundary(ex,ey-1,2) == true) {
			        	character.locate(ex,ey-1);
			        	checkbuttonpress = true;
			        	updatepushobject(evid,ex,ey-1,mapid,true);
		        	}
	        	}
		        
	        	if (ex == px && ey > py) {  // push down
			        if (checkpushboundary(ex,ey+1,8) == true) {
			        	character.locate(ex,ey+1);
			        	checkbuttonpress = true;
			        	updatepushobject(evid,ex,ey+1,mapid,true);
		        	}  
	        	}      

			}
			
			if (args[0] == 'detect') {
												
				var triggerswitch = args[1];
				if (triggerswitch < 1) { 
					triggerswitch = 1;
				}
				// is the player on the trigger?	
				
		        var px = $gamePlayer.x;
		        var py = $gamePlayer.y;
		         
		        var character = this.character();
				var ex = character.x;
				var ey = character.y;
				  
				buttonpressed = false;
				
				if (px == ex && py == ey) {
					// player is on button
					activate_selftrigger(triggerswitch,true);
					buttonpressed = true;
				}
				
				for (var i = 0; i < savepush_id.length; i++) {
	        				        	
				    var ex2 = savepush_x[i];
				    var ey2 = savepush_y[i];
				              
				    if (ey == ey2 && ex == ex2) {
						// event is on button			
						activate_selftrigger(triggerswitch,true);
						buttonpressed = true;
					}
				}  
				
				if (buttonpressed == false) {
					activate_selftrigger(triggerswitch,false);
				}  
			
			} 
	        
        }
    }
    
    // *****************************************************
    
    function activate_selftrigger(triggernumber,active) {
	   for (var i = 0; i < $dataMap.events.length; i++) {
        	if ($dataMap.events[i]) {
	        	var note = $dataMap.events[i].note
	        	note = note.toLowerCase();
		        var note_args = note.split(" ");
		        
            	if (note_args[0] == 'pushtarget' && note_args[1] == triggernumber) {
					var mapid = $gameMap.mapId();
					var eventid = $dataMap.events[i].id;
					var key = [mapid,eventid,'D'];
					$gameSelfSwitches.setValue(key, active);					 
    			} 
			}
		} 
	}
	
     // ***********UPDATE ARRAY WITH EVENT POSITIONS ***************************
    
	function updatepushobject(id,x,y,mapid,moved) {
		var addnew = true;
		keyid = (1000 * mapid) + id

		for (var i = 0; i < savepush_id.length; i++) {
			if (savepush_id[i] == keyid) {
				savepush_x[i] = x;
				savepush_y[i] = y;
				savepush_mapid[i] = mapid;	
				savepush_moved[i] = moved;
				addnew = false;
			}			
		}
		if (addnew == true) {
			savepush_id.push(keyid);
			savepush_x.push(x);
			savepush_y.push(y);	
			savepush_mapid.push(mapid);
			savepush_moved.push(moved);
		}
		//debugtext = 'stack ';
		//for (var i = 0; i <  savepush_id.length; i++) {     	
		//	debugtext = debugtext + savepush_id[i] + '   ';	
		//	Graphics.printError('test',debugtext);	
		//}
		
		
		$gameVariables.setPushEventID(savepush_id);
		$gameVariables.setPushEventX(savepush_x);
		$gameVariables.setPushEventY(savepush_y);
		$gameVariables.setPushMapId(savepush_mapid);
		$gameVariables.setPushMoved(savepush_moved);
	}
	
	 // *************BOUNDARY CHECK ***********************

	function checkpushboundary(ex,ey,d) {
		var pushable = false;
		if (ex >= 0 && ey >= 0){
			var wpas = $gameMap.isPassable(ex, ey, d)  // walls
			if (wpas == true) {
				pushable = true;
				var mapid = $gameMap.mapId();	 
				for (var i = 0; i < savepush_id.length; i++) {
					if (savepush_x[i] == ex && savepush_y[i] == ey && savepush_mapid[i] == mapid) {
						pushable = false;   // other pushable in the way 
					}
				}			
			}	
		}		
		return pushable;
	}
	
	 // *********** LOADING AND SAVING DATA *************************
	 Game_Variables.prototype.valuePushEventID = function() {
	   	var default_ID = [];
    	return this._Terrax_PushEvent_ID || default_ID;
	};

	Game_Variables.prototype.setPushEventID= function(value) {
    	this._Terrax_PushEvent_ID = value;
	};	

	Game_Variables.prototype.valuePushEventX = function() {
	   	var default_X = [];
    	return this._Terrax_PushEvent_X || default_X;
	};

	Game_Variables.prototype.setPushEventX= function(value) {
    	this._Terrax_PushEvent_X = value;
	};
		
	Game_Variables.prototype.valuePushEventY = function() {
	   	var default_Y = [];
    	return this._Terrax_PushEvent_Y || default_Y;
	};

	Game_Variables.prototype.setPushEventY = function(value) {
    	this._Terrax_PushEvent_Y = value;
	};	
	
	Game_Variables.prototype.valuePushMapId = function() {
	   	var default_MapId = [];
    	return this._Terrax_PushMapId || default_MapId;
	};

	Game_Variables.prototype.setPushMapId = function(value) {
    	this._Terrax_PushMapId = value;
	};	
	
	Game_Variables.prototype.valuePushMoved = function() {
	   	var default_Moved = [];
    	return this._Terrax_PushMoved || default_Moved;
	};

	Game_Variables.prototype.setPushMoved = function(value) {
    	this._Terrax_PushMoved = value;
	};			
	

	
	// *********** OVERWRITTEN CORE SCRIPTS *************************
	
	Scene_Load.prototype.onSavefileOk = function() {
	    Scene_File.prototype.onSavefileOk.call(this);
	    if (DataManager.loadGame(this.savefileId())) {
	        this.onLoadSuccess();
	        
	        if (Imported.TerraxLighting) {	        
	        	SaveLightingVariables();
        	}
	        if (Imported.TerraxPuzzle) {
				SavePuzzleVariables();
		    }
	        
	    } else {
	        this.onLoadFailure();
	    }
	}
	

	Game_Event.prototype.initialize = function(mapId, eventId) {
	    Game_Character.prototype.initialize.call(this);
	    this._mapId = mapId;
	    this._eventId = eventId;
	   
	    var org_x = this.event().x;
	    var org_y = this.event().y;
	    
	    var newpush_id = [];
		var	newpush_x = [];
		var newpush_y = []; 
		var	newpush_mapid = [];
		var	newpush_moved = [];

	    for (var i = 0; i < savepush_id.length; i++) {
			if (savepush_moved[i] == true) {  
				//save moved events from other maps
				newpush_id.push(savepush_id[i]);
				newpush_x.push(savepush_x[i]);
				newpush_y.push(savepush_y[i]);
				newpush_mapid.push(savepush_mapid[i]);
				newpush_moved.push(savepush_moved[i]);
			}
			
			if (savepush_mapid[i] == mapId ) {	   // restore events on this map
				keyid = (1000 * mapId) + eventId
				if (savepush_id[i] == keyid) {
					org_x = savepush_x[i];
					org_y =	savepush_y[i];	
				}
			}
		}			
		savepush_id = newpush_id;
		savepush_x = newpush_x;
		savepush_y = newpush_y;
		savepush_mapid = newpush_mapid;
		savepush_moved = newpush_moved;	
		
		// store all events on this map on the stack that are not yet on the stack
		for (var i = 0; i < $dataMap.events.length; i++) {
        	if ($dataMap.events[i]) {
            	if ($dataMap.events[i].note != 'Push over') {	            	
            		var ex = $dataMap.events[i].x;
            		var ey = $dataMap.events[i].y;
            		var eid = $dataMap.events[i].id;
            		var IdOnStack = false;
            		for (var j = 0; j < savepush_id.length; j++) {
	            		keyid = (1000 * mapId) + eid
						if (savepush_id[j] == keyid) {
							IdOnStack = true;
						}
        			}
        			if (IdOnStack == false) {
            			updatepushobject(eid,ex,ey,mapId,false);
        			}
        		}
        	}
    	}	
    	
    			
		$gameVariables.setPushEventID(savepush_id);
		$gameVariables.setPushEventX(savepush_x);
		$gameVariables.setPushEventY(savepush_y);
		$gameVariables.setPushMapId(savepush_mapid);
		$gameVariables.setPushMoved(savepush_moved);
		
	    this.locate(org_x,org_y);
	    this.refresh();
	};

	
})();

function SavePuzzleVariables() {
	savepush_id = $gameVariables.valuePushEventID();
	savepush_x = $gameVariables.valuePushEventX();
	savepush_y = $gameVariables.valuePushEventY();
	savepush_mapid = $gameVariables.valuePushMapId();
	savepush_moved = $gameVariables.valuePushMoved();
}