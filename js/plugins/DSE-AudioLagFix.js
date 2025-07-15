//═════════════════════════════════════════════════════════════════════════════=
// DSE-AUDIOLAG-FIX.js 0.80
//═════════════════════════════════════════════════════════════════════════════=
/*:
 * @plugindesc Audio Fix for RPGmaker MV (Ver 0.80b)
 * @author SilverKnightArcher 
 * 
 * @param Force HTML5 Audio
 * @desc when true, forces the plugin to only uses HTML5 audio no matter what.
 * @default false
 *
 * @param Use Legacy Static SE
 * @desc should problems arise with static SE (menu OK, cancel) , 
 *  set this to true to use legacy web Audio
 * @defualt true
 *
 * @param Max Loop Start
 * @desc maximum start time for looped, prevents sound failure 
 * Leave 50000 if unsure
 * @ defualt 50000
 *
 * @param Debug
 * @desc shows debugging in console
 * @defualt false
 *
 * @help
 *═════════════════════════════════════════════════════════════════════════════
 *                          Introduction
 *═════════════════════════════════════════════════════════════════════════════
 * RPGmakerMV has a reccuring Audio Lag that is very noticable with long tracks.
 * Particulary BGMs which are typically a few minutes long.
 *
 * This is caused by RPGmaker trying to load the entire tack into memory
 * before playing it. Thus longer tracks take a little bit to load and the
 * lag becomes noticable, espically on low end PCs
 *
 * This script Aims to Remove this Lag without increasing loading times.
 *═════════════════════════════════════════════════════════════════════════════
 *                              Install
 *═════════════════════════════════════════════════════════════════════════════
 *  Simply Place in the JS folder abnd install like any other script.
 *  This plugins may be incompatible with other Audio plugins.
 *
 *
 *═════════════════════════════════════════════════════════════════════════════
 *                          Plugin Commands
 *═════════════════════════════════════════════════════════════════════════════
 * if you want to play a song in the future it may be worth preloading that 
 * song. To do this for BGMS we can use PreloadBGM Song 1
 * - Song is the name of the Audio you want to play. 
 *  names with spaces will not work.
 * - the 1 is the volume of the Audio. (0 to 1.0)
 *  to change the "pitch" add a another number,  for defualt 1. (0.5 to 1.5)
 *  This is always the second Number
 * to change the pan add yet another number, for defualt 0. (-100 to 100)
 * This is always the Third number
 * 
 * Heres an example of playing a clip called song at 90% volume, 50% pitch and 
 * and paning 40
 *  PreloadBGM Song 0.9 0.5 40 
 * 
 * replacing BGM with BGS will preload a BGS
 * replacing BGM with ME wilkl preload a ME.
 *═════════════════════════════════════════════════════════════════════════════
 *                      Script Calls Command
 *═════════════════════════════════════════════════════════════════════════════
 * essentially the same as plugin command but it is written differently.
 * 
 *  AudioManager.PreloadBGM(["Song", 1, 1.0, 0 ]);
 * 
 *═════════════════════════════════════════════════════════════════════════════
 * Bugs
 *═════════════════════════════════════════════════════════════════════════════
 *
 * - Due to the way streamed Audio works, changing 'pitch' will only change
 *    the playback speed of the audio. but the pitch remians the same.
 *
 *  - Some Users expereince a delay when fading out music
 *  - Sound files with spaces Won't work with plugin commands,
 *      in these cases use script calls instead
 *  - needs modukle pattern
 *═════════════════════════════════════════════════════════════════════════════
 * Credits and Contact
 *═════════════════════════════════════════════════════════════════════════════
 *
 *  SilverKnightArcher 
 *  email: acoutnsfornoreason@gmail.com
 *
 *
 *═════════════════════════════════════════════════════════════════════════════
 * Change Log
 *═════════════════════════════════════════════════════════════════════════════
 *
 *  12 Dec 16 - 0.01 started script
 *  13 Dec 16 - 0.10 move Audio Context creation into AudioSourceManager class
 *  13 Dec 16 - 0.14 stop random crashing when scene changes
 *  15 Dec 16 - 0.17 stop random crashing when battle ends
 *  21 Dec 16 - 0.50 Stop crashing when same song slected twice
 *  29 Dec 16 - 0.51 Added Fadein-out function
 *  31 Dec 16 - 0.53 Removed Deprecated functions
 *  02 Jan 17 - 0.55 Fixed BGM starting up early after battles
 *  03 Jan 17 - 0.59 Fixed BGM crash when same BGM is used for Map and Battles
 *  05 Jan 17 - 0.60 Removed Debug code causing crash
 *  05 Jan 17 - 0.63 BGS are now streamed
 *  11 Feb 17 - 0.65 Fixed Pitch Crashing
 *  17 Feb 17 - 0.68 Added Vanilla encryption support.
 *  03 Mar 17 - 0.70 fixed looping, added Preloading support for both HTML5 
 *							and WebAudio
 *  15 Mar 17 - 0.71 fixed replaying bug causing music to continue after battles
 *  20 Apr 17 - 0.72 Fixed null BGS crash
 *  30 Apr 17 - 0.75 Fixed Poor Audio Quality caused by high volumes of SEs
 *  03 Jun 17 - 0.79 Fixed Plugin Command Issues
 *  06 Jun 17 -  0.80 Fixed HTML5 not working.
 *  
 *────────────────────────────────────────────────────────────────────────────┤
 * Licence and Terms of Use
 *────────────────────────────────────────────────────────────────────────────┤
 * Copyright (c) 2016 Fornoreason1000,
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *═════════════════════════════════════════════════════════════════════════════
 * END HELP
 *═════════════════════════════════════════════════════════════════════════════
 */


var Imported = Imported || {};
Imported.DSE4_AudioFix = true;

var DSEIV = DSEIV || {};
DSEIV.AudioLag = DSEIV.AudioLag || {};
DSEIV.AudioLag.ver = 0.80;



//═════════════════════════════════════════════════════════════════════════════
// Param
//═════════════════════════════════════════════════════════════════════════════
DSEIV.AudioLag.Param = PluginManager.parameters('DSE-AudioLagFix');
DSEIV.AudioLag.forceHTML5 = DSEIV.AudioLag.Param["Force HTML5 Audio"] === "true";
DSEIV.AudioLag.useLegacyStaticSE =
    Boolean(DSEIV.AudioLag.Param["Use Legacy Static SE"]) || true;
DSEIV.AudioLag.Debug = DSEIV.AudioLag.Param["Debug"] === "true";
(function () {
    console.log("Force HTML is set to " + DSEIV.AudioLag.forceHTML5);
    console.log("Legacy Static SE is set to " +
        DSEIV.AudioLag.useLegacyStaticSE);


}());
//════════════════════════════════════════════════════════════════════════════╡
// Plugin Commands
//────────────────────────────────────────────────────────────────────────────┤
var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    Game_Interpreter_pluginCommand.call(this, command, args);
    switch (command) {
        case "PreloadBGM":
            DSEIV.AudioLag.PreloadBGM(args);
            break;
        case "PreloadBGS":
            DSEIV.AudioLag.PreloadBGM(args);
            break;
        case "PreloadME":
            DSEIV.AudioLag.PreloadBGM(args);
            break;
    }
};
/**
 * 
 */
DSEIV.AudioLag.PreloadBGM = function (args) {
    if (DSEIV.AudioLag.Debug) {
        console.log("preload BGM " + args[0] + "Plugin Command");
    }
    var audio = { name: args[0], volume: 1, pitch: 1, pan: 0 };
    audio.volume = args[1] || audio.volume;
    audio.pitch = args[2] || audio.pitch;
    audio.pan = args[3] || audio.pan;

    if (audio.name) {
        AudioManager.preloadBgm(audio);
    }
};
/**
 * 
 */
DSEIV.AudioLag.PreloadBGS = function (args) {
    if (DSEIV.AudioLag.Debug) {
        console.log("preload BGS " + args[0] + "Plugin Command");
    }
    var audio = { name: args[0], volume: 1, pitch: 1, pan: 0 };
    audio.volume = args[1] || audio.volume;
    audio.pitch = args[2] || audio.pitch;
    audio.pan = args[3] || audio.pan;

    if (audio.name) {
        AudioManager.preloadBgs(audio);
    }
};

/**
 * 
 */
DSEIV.AudioLag.PreloadME = function (args) {
    if (DSEIV.AudioLag.Debug) {
        console.log("preload ME " + args[0] + "Plugin Command");
    }
    var audio = { name: args[0], volume: 1, pitch: 1, pan: 0 };
    audio.volume = args[1] || audio.volume;
    audio.pitch = args[2] || audio.pitch;
    audio.pan = args[3] || audio.pan;

    if (audio.name) {
        AudioManager.preloadMe(audio);
    }
};

//═════════════════════════════════════════════════════════════════════════════
// Audio Manager
//
// The static class that handles BGM, BGS, ME and SE.
//═════════════════════════════════════════════════════════════════════════════
AudioManager._bgmVolume = 100;
AudioManager._bgsVolume = 100;
AudioManager._meVolume = 100;
AudioManager._seVolume = 100;
AudioManager._currentBgm = null;
AudioManager._currentBgs = null;
AudioManager._bgmBuffer = null;
AudioManager._bgsBuffer = null;
AudioManager._meBuffer = null;
AudioManager._seBuffers = [];
AudioManager._staticBuffers = [];
AudioManager._replayFadeTime = 0.5;
AudioManager._path = 'audio/';
AudioManager._blobUrl = null;

AudioManager.preloadedBGMS = [];
AudioManager.preloadedBGS = [];
AudioManager.preloadedSFX = [];
AudioManager.preloadedMES = [];
//These ones stay preloaded in memory
AudioManager.preloadedStaticSFX = [];
//-----------------------------------------------------------------------------
// Preload BGM
//-----------------------------------------------------------------------------
AudioManager.preloadBgm = function (bgm) {

    var preload = { bgm: null, buffer: null };
    preload.bgm = bgm;
    preload.buffer = this.createDSEIVBuffer('bgm', bgm.name);
    if (DSEIV.AudioLag.Debug) {
        console.log("preloading " + bgm.name);
    }
    this.preloadedBGMS.push(preload);

};

//-----------------------------------------------------------------------------
// Find Preloaded BGM
// finds a BGM by name in a Preloaded BGM array and Returns the preloaded BGM
//-----------------------------------------------------------------------------
AudioManager.findPreloadedBgm = function (bgm) {

    var finding = this.preloadedBGMS.find(function (element) {

        if (element.buffer._mediaElement == null) { return false; }
        return element.bgm.name === bgm.name;
    });
    if (DSEIV.AudioLag.Debug && finding) {
        console.log("found: " + finding + "\n and its buffer is: " +
            finding);
    }
    return finding;

};

//-----------------------------------------------------------------------------
// Play BGM
//-----------------------------------------------------------------------------
AudioManager.playBgm = function (bgm, pos) {

    if (this.isCurrentBgm(bgm)) {
        this.updateBgmParameters(bgm);
    }
    else {
        this.stopBgm();
        if (bgm.name) {
            var preloaded = this.findPreloadedBgm(bgm);
            this._currentBgm = bgm;
            if (preloaded === undefined) {
                if (DSEIV.AudioLag.Debug) {
                    console.log('bgm not preloaded, creating new buffer');
                }
                this._bgmBuffer = this.createDSEIVBuffer('bgm', bgm.name);

            }
            else {
                this._bgmBuffer = preloaded.buffer;

            }
            this.updateBgmParameters(bgm);
            this._bgmBuffer.play(true, pos || 0);
        }
    }


};

//-----------------------------------------------------------------------------
// Replays the BGM
//-----------------------------------------------------------------------------
AudioManager.replayBgm = function (bgm) {
    if (this.isCurrentBgm(bgm)) {
        this.updateBgmParameters(bgm);
    } else {
        this.playBgm(bgm, bgm.pos);
        if (this._bgmBuffer) {
            this._bgmBuffer.fadeIn(this._replayFadeTime);
        }
    }
};
//-----------------------------------------------------------------------------
// Save BGM
// 
//-----------------------------------------------------------------------------
AudioManager.saveBgm = function (bgm) {
    bgm = bgm || this._currentBgm;
    this.preloadBgm(bgm);
    return {
        name: bgm.name,
        volume: bgm.volume,
        pitch: bgm.pitch,
        pan: bgm.pan,
        pos: this._bgmBuffer ? this._bgmBuffer.seek() : 0,
    };



};
//-----------------------------------------------------------------------------
// Pauses the BGM
//-----------------------------------------------------------------------------
AudioManager.pauseBgm = function () {

    this._bgmBuffer.pause();

};

//-----------------------------------------------------------------------------
// Stop BGM
//-----------------------------------------------------------------------------
AudioManager.stopBgm = function () {
    if (this._bgmBuffer) {
        this._bgmBuffer.stop();
        this._bgmBuffer = null;
        this._currentBgm = null;
    }

};

//-----------------------------------------------------------------------------
// Preload BGS
//-----------------------------------------------------------------------------
AudioManager.preloadBgs = function (bgs) {
    if (bgs == null) { return; }
    var preload = { bgs: null, buffer: null };
    preload.bgs = bgs;
    preload.buffer = this.createDSEIVBuffer('bgs', bgs.name);
    this.preloadedBGS.push(preload);
};
//-----------------------------------------------------------------------------
// Find Preloaded BGS
//-----------------------------------------------------------------------------
AudioManager.findPreloadedBgs = function (bgs) {

    var finding = this.preloadedBGS.find(function (element) {
        return element.bgs.name == bgs.name;
    });
    return finding;

};
//-----------------------------------------------------------------------------
// Play BGS
//-----------------------------------------------------------------------------
AudioManager.playBgs = function (bgs, pos) {

    if (this.isCurrentBgs(bgs)) {
        this.updateBgsParameters(bgs);
    }
    else {
        this.stopBgs();
        if (bgs.name) {
            var preloaded = this.findPreloadedBgs(bgs);
            this._currentBgs = bgs;
            if (preloaded === undefined) {
                this._bgsBuffer = this.createDSEIVBuffer('bgs', bgs.name);
                if (DSEIV.AudioLag.Debug) {
                    console.log('not preloaded, creating buffer...');
                }
            }
            else {
                this._bgsBuffer = preloaded.buffer;
            }

            this.updateBgsParameters(bgs);
            this._bgsBuffer.play(true, pos || 0);
        }
    }
};

//-----------------------------------------------------------------------------
// Resume BGS
//-----------------------------------------------------------------------------
AudioManager.replayBgs = function (bgs) {
    if (this.isCurrentBgs(bgs)) {
        this.updateBgsParameters(bgs);
    } else {
        this.playBgs(bgs, bgs.pos);
        if (this._bgsBuffer) {
            this._bgsBuffer.fadeIn(this._replayFadeTime);
        }
    }
};
//-----------------------------------------------------------------------------
// Save BGS
// 
//-----------------------------------------------------------------------------
AudioManager.saveBgs = function (bgs) {

    bgs = bgs || this._currentBgs;
    this.preloadBgs(bgs);
    if (bgs) {
        return {
            name: bgs.name,
            volume: bgs.volume,
            pitch: bgs.pitch,
            pan: bgs.pan,
            pos: this._bgsBuffer ? this._bgsBuffer.seek() : 0,
        };
    }
    else {
        return {
            name: "",
            volume: 0,
            pitch: 0,
            pan: 0,
            pos: 0,
        };
    }

};
//-----------------------------------------------------------------------------
// Resume BGS
//-----------------------------------------------------------------------------
AudioManager.resumeBgs = function () {
    if (this._bgsBuffer) {
        this._bgsBuffer.replay();
    }

};
//-----------------------------------------------------------------------------
// Pause BGS
//-----------------------------------------------------------------------------
AudioManager.pauseBgs = function () {
    this._bgsBuffer.pause();
};
//-----------------------------------------------------------------------------
// Stop BGS
//-----------------------------------------------------------------------------
AudioManager.stopBgs = function () {
    if (this._bgsBuffer) {
        this._bgsBuffer.stop();
        this._bgsBuffer = null;
        this._currentBgs = null;
    }

};

//-----------------------------------------------------------------------------
// Preload ME
//-----------------------------------------------------------------------------
AudioManager.preloadMe = function (me) {
    var preload = { me: null, buffer: null };
    preload.me = me;
    preload.buffer = this.createDSEIVBuffer('me', me.name);
    this.preloadedMES.push(preload);
};

//-----------------------------------------------------------------------------
// Find Preloaded ME
//-----------------------------------------------------------------------------
AudioManager.findPreloadedMe = function (me) {

    var finding = this.preloadedME.find(function (element) {
        return element.me.name == me.name;
    });
    return finding;

};

//-----------------------------------------------------------------------------
// Preload Play ME
//-----------------------------------------------------------------------------
AudioManager.playMe = function (me) {
    this.stopMe();
    if (me.name) {
        if (this._bgmBuffer && this._currentBgm) {
            this._bgmBuffer.pause();
        }
        this._meBuffer = this.createDSEIVBuffer('me', me.name);
        this.updateMeParameters(me);
        this._meBuffer.play(false);
        this._meBuffer.addStopListener(this.stopMe.bind(this));
    }
};

//-----------------------------------------------------------------------------
// Resume ME
//-----------------------------------------------------------------------------
AudioManager.resumeMe = function () {

};

//-----------------------------------------------------------------------------
// Pause ME
//-----------------------------------------------------------------------------
AudioManager.pauseMe = function () {
    this._meBuffer.pause();

};

//-----------------------------------------------------------------------------
// Stop ME
//-----------------------------------------------------------------------------
AudioManager.stopMe = function () {
    if (this._meBuffer) {
        this._meBuffer.stop();
        this._meBuffer = null;
        if (this._bgmBuffer && this._currentBgm &&
            !this._bgmBuffer.isPlaying()) {
            this._bgmBuffer.play(true, this._currentBgm.pos); //replay
            this._bgmBuffer.fadeIn(this._replayFadeTime);
        }
    }
};


//-----------------------------------------------------------------------------
// Preload SE
//-----------------------------------------------------------------------------
AudioManager.preloadSe = function (se) {
    var preload = { se: null, buffer: null };
    preload.se = se;
    preload.buffer = this.createDSEIVBuffer('se', se.name);
    this.preloadedSFX.push(preload);
};

//-----------------------------------------------------------------------------
// Find Preloaded SE
//-----------------------------------------------------------------------------
AudioManager.findPreloadedSe = function (se) {

    var finding = this.preloadedBGS.find(function (element) {
        return element.se == se.name;
    });
    return finding;
};

//-----------------------------------------------------------------------------
// Play SE
//-----------------------------------------------------------------------------
AudioManager.playSe = function (se) {
    if (se.name) {
        this._seBuffers = this._seBuffers.filter(function (audio) {
            return audio.isPlaying();
        });
        var buffer = this.createDSEIVBuffer('se', se.name);
        this.updateSeParameters(buffer, se);
        buffer.play(false);
        this._seBuffers.push(buffer);
    }
};

//-----------------------------------------------------------------------------
// Resume SE
//-----------------------------------------------------------------------------
AudioManager.resumeSe = function () {
    console.warn('Resume SE not implemented');

};

//-----------------------------------------------------------------------------
// Pause SE
//-----------------------------------------------------------------------------
AudioManager.pauseSe = function () {

    console.warn('Pause SE not implemented');
};

//-----------------------------------------------------------------------------
// Stop SE
//-----------------------------------------------------------------------------
AudioManager.stopSe = function () {
    this._seBuffers.forEach(function (buffer) {
        buffer.stop();
    });
    this._seBuffers = [];

};

//-----------------------------------------------------------------------------
// Play Static SE
//-----------------------------------------------------------------------------
AudioManager.playStaticSe = function (se) {
    var sound;

    if (this.isStaticSe(se) === false) {
        this.loadStaticSe(se);
    }
    sound = this.findStaticSe(se);

    sound.buffer.play(false);
    this._staticBuffers.push(sound);

};
//-----------------------------------------------------------------------------
// Find Static SE
//-----------------------------------------------------------------------------
AudioManager.findStaticSe = function (se) {
    var finding = this.preloadedStaticSFX.find(function (element) {
        return element.se.name == se.name;
    });
    return finding;
};
//-----------------------------------------------------------------------------
// Load Static SE
//-----------------------------------------------------------------------------
AudioManager.loadStaticSe = function (se) {


    if (this.findStaticSe(se) === undefined) {
        if (DSEIV.AudioLag.Debug) {
            console.log('loading static SE');
        }
        var preload = { se: null, buffer: null };
        preload.se = se;
        preload.buffer = this.createBuffer('se', se.name);
        this.preloadedStaticSFX.push(preload);
    }


};

//-----------------------------------------------------------------------------
// Is Static SE
//-----------------------------------------------------------------------------
AudioManager.isStaticSe = function (se) {
    var seBuffer = this.preloadedStaticSFX.find(function (element) {
        return element.name == se.name;
    });
    return !!seBuffer;
};

//-----------------------------------------------------------------------------
// Check Errors
//-----------------------------------------------------------------------------
AudioManager.checkErrors = function () {
    //  this.checkWebAudioError(this._bgmBuffer);
    // this.checkWebAudioError(this._bgsBuffer);
    //  this.checkWebAudioError(this._meBuffer);
    this._seBuffers.forEach(function (buffer) {
        //  this.checkWebAudioError(buffer);
    }.bind(this));
    this._staticBuffers.forEach(function (buffer) {
        //  this.checkWebAudioError(buffer);
    }.bind(this));
};

//-----------------------------------------------------------------------------
// Create Audio Buffer
//-----------------------------------------------------------------------------
AudioManager.createDSEIVBuffer = function (folder, name) {
    var ext, url, audioBuffer;
    ext = this.audioFileExt();
    url = this._path + folder + '/' + encodeURIComponent(name) + ext;
    audioBuffer = new DSEIV.AudioBuffer(url);
    return audioBuffer;
};

//-----------------------------------------------------------------------------
// CheckWeb Audio Error [Obselete]
//-----------------------------------------------------------------------------
AudioManager.checkWebAudioError = function (webAudio) {
    console.log('check webAudio called on' + webAudio +
        ', this function is obselete');
    // if (webAudio && webAudio.isError()) { Depreated
    //     throw new Error('Failed to load: ' + webAudio.url);
    //  }
};

//═════════════════════════════════════════════════════════════════════════════
// DSEIV..AudioContextManager
//
// The static class that handles AudioContext
//═════════════════════════════════════════════════════════════════════════════
DSEIV.AudioContextManager = function () {

    throw new Error("cannot create instance of static class " +
        "DSEIV.AudioContextManager");
};

DSEIV.AudioContextManager.context = null;
DSEIV.AudioContextManager.masterVolumeNode = null;
DSEIV.AudioContextManager.contextElement = null;
DSEIV.AudioContextManager.forceHTML5 = false;

//-----------------------------------------------------------------------------
// Init
//-----------------------------------------------------------------------------
DSEIV.AudioContextManager.init = function () {
    console.log('initializing? Audio lag Fix Version ' + DSEIV.AudioLag.ver);
    DSEIV.AudioContextManager.forceHTML5 = DSEIV.AudioLag.forceHTML5;
    this.createContext();

};

//-----------------------------------------------------------------------------
// Should Use HTML5 Audio?
//-----------------------------------------------------------------------------
DSEIV.AudioContextManager.shouldUseHTML5Audio = function () {
    if (DSEIV.AudioLag.forceHTML5) { return true; }
    return Utils.isAndroidChrome() && !Decrypter.hasEncryptedAudio;

};
//-----------------------------------------------------------------------------
// Create Context
//-----------------------------------------------------------------------------
DSEIV.AudioContextManager.createContext = function () {

    try {
        if (typeof AudioContext !== 'undefined') {
            DSEIV.AudioContextManager.context = new AudioContext();
        } else if (typeof webkitAudioContext !== 'undefined') {
            DSEIV.AudioContextManager.context = new webkitAudioContext();
        }
    } catch (e) {
        DSEIV.AudioContextManager.context = null;
        console.log(e);
    }
};

DSEIV.AudioContextManager.createContextElement = function () {


};
//═════════════════════════════════════════════════════════════════════════════
// DSEIV.AudioBuffer
//
// The instance class that handles Audio Content
//═════════════════════════════════════════════════════════════════════════════

DSEIV.AudioBuffer = function () {
    this.initialize.apply(this, arguments);
};
//-----------------------------------------------------------------------------
// Define Properties
// Url
//-----------------------------------------------------------------------------
Object.defineProperties(DSEIV.AudioBuffer.prototype, {
    url: {
        get: function () {
            return this._url;
        },
        configurable: true
    },

    //-------------------------------------------------------------------------
    // Volume
    //-------------------------------------------------------------------------
    volume: {
        get:
        function () {
            return this._volume;
        },
        set: function (value) {
            this._volume = value;
            if (this._gainNode) {
                this._gainNode.gain.value = this._volume;
            }
        },
        configurable: true
    },
    //-------------------------------------------------------------------------
    // Pitch
    //-------------------------------------------------------------------------
    pitch: {
        get: function () {
            return this._pitch;
        },
        set: function (value) {
            if (this._pitch !== value) {
                this._pitch = value;
                if (this.isPlaying()) {
                    this.play(this._sourceNode.loop, 0);
                }
            }
        },
        configurable: true
    },
    //-------------------------------------------------------------------------
    // Pan
    //-------------------------------------------------------------------------
    pan: {
        get: function () {
            return this._pan;
        },
        set: function (value) {
            this._pan = value;
            //	this.updatePanner()
        },
        configurable: true
    }
});

//-----------------------------------------------------------------------------
//
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.initialize = function (url) {
    if (DSEIV.AudioContextManager.context === null &&
        DSEIV.AudioContextManager.forceHTML5 === false) {
        DSEIV.AudioContextManager.init();
    }

    this._usingHTML5Audio = false;
    this._url = url;
    this._blobURL = '';
    this._autoplay = false;
    this._id = 'nil';
    this._volume = 1;
    this._pan = 0;
    this._pitch = 1;
    this._sourceNode = null;
    this._gainNode = null;
    this._pannerNode = null;
    this._mediaElement = null;
    this._loop = false;
    this._startTime = 0.0;
    this._loopStart = 0.0;
    this._loopEnd = 0.0;
    this._endTime = 0.0;
    this._stopListeners = [];
    this._pauseListeners = [];
    this._loadListeners = [];
    this._playListeners = [];
    this._endListeners = [];
    this._gainInterval = null;
    this._tweenVolume = 0;
    this._waiting = false;
    this._playing = false;
    this._isError = false;

    this.load(url);

};

//-----------------------------------------------------------------------------
//
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.isPlaying = function () {

    return !this.waiting && !!this._mediaElement && this.playing;

};

//-----------------------------------------------------------------------------
// Load
// Loads up an array buffer otf the ENTIRE file, 
// then checks if it needs decrypting
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.load = function (url) {
    var request = new XMLHttpRequest();
    if (Decrypter.hasEncryptedAudio) { url = Decrypter.extToEncryptExt(url); }
    request.open('GET', url);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        if (request.status < 400) {
            this.onLoad(request);
        }
    }.bind(this);
    request.onerror = function () {
        this._hasError = true;
    }.bind(this);
    request.send();
};
//-----------------------------------------------------------------------------
// On Load
// called when xhr request has finished loading file. here we decrypt the 
// audio if needed then pass a BLOB URL to the Audio Element.
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.onLoad = function (xhr) {
    var arrayBuffer, metareader, blob, blobURL;
    arrayBuffer = xhr.response;
    if (Decrypter.hasEncryptedAudio) {
        arrayBuffer = Decrypter.decryptArrayBuffer(arrayBuffer);
    }
    metareader = new DSEIV.AudioMetaReader();
    metareader.readLoopComments(new Uint8Array(arrayBuffer));
    this._loopStart = metareader.getLoopStart();
    this._loopEnd = metareader.getLoopLength();

    this._sampleRate = metareader.getSampleRate();
    blob = new Blob([arrayBuffer], { type: "audio/ogg" });
    blobURL = window.URL.createObjectURL(blob);

    this.createAudioElement(blobURL);


};
//-----------------------------------------------------------------------------
// Create Audio Stream
// Creates out Media Element source from a URL, 
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.createAudioElement = function (blobURL) {

    this._mediaElement = new Audio();
    this._mediaElement.src = blobURL;
    //this._stream.autoplay = true;
    this._mediaElement.preservesPitch = false;
    this._preload = 'metadata';
    this._mediaElement.onload = function () {

    };
    if (this._loopStart > this._mediaElement.duration) {
        this._loopStart = 0;
    }

    //  this._mediaElement._loopStart = this._loopStart;
    //  this._mediaElement._loopEnd = this._loopEnd;

    var instance = this;
    this._mediaElement.addEventListener("timeupdate", function () {
        instance.update();
    });
    this._mediaElement.addEventListener("ended", function () {
        instance.onAudioEnded();
    });
    if (DSEIV.AudioLag.Debug) {
        console.log('created audio element: ' + this._mediaElement);
    }
    if (this._playListeners.length > 0) {
        this.invokePlayListeners();
    }
};

//-----------------------------------------------------------------------------
// Seek
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.seek = function () {

    return DSEIV.AudioContextManager.context.currentTime;

};

//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.update = function () {
    var endtime;
    if (this._mediaElement === null) { return; }
    //console.log(this._loopStart);
    //console.log(this);

    endtime = this._mediaElement.duration;

    if (this._loopEnd > 0) {
        endtime = this._loopEnd + this._loopStart;
    }

    if ((this._mediaElement.currentTime / endtime) > 0.9999 && this._loop) {
        this._mediaElement.currentTime = this._loopStart;
        if (this._loop) {
            this.onAudioLoop();
            this._mediaElement.play();
        }
    }

};

//-----------------------------------------------------------------------------
// On Audio End
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.onAudioEnded = function () {
    if (DSEIV.AudioLag.Debug) {
        console.log("Audio " + this._url + " has ended");
    }
    if (this._loopStart > this._mediaElement.duration) {
        this._loopStart = 0;
    }
    if (this._loop === false) {
        this.stop();
    }
    else {
        this._mediaElement.currentTime = this._loopStart;
        if (this._loop) {
            this.onAudioLoop();
            this._mediaElement.play();
        }

    }


};

//-----------------------------------------------------------------------------
// onAudioLoop
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.onAudioLoop = function () {
    if (DSEIV.AudioLag.Debug) {
        console.log("Audio " + this._url + " has looped");
    }
};

//-----------------------------------------------------------------------------
// Play
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.play = function (loop, offset) {
    offset = offset || 0;
    if (loop === undefined) { loop = true; }
    this._loop = loop;

    this.playing = true;

    if (DSEIV.AudioContextManager.shouldUseHTML5Audio() || DSEIV.AudioLag.forceHTML5) {
        this._usingHTML5Audio = true;
        if (this._mediaElement === null) {
            this.waiting = true;
            this.addPlayListener(function () {
                this.startPlayingHTLM5(loop, offset);
            }.bind(this));
        }
        else {
            this.startPlayingHTLM5();
        }
    }
    else {
        this._usingHTML5Audio = false;

        if (this._mediaElement === null) {
            this.waiting = true;
            this.addPlayListener(function () {
                this.startPlayingWebAudio(loop, offset);
            }.bind(this));
        }
        else {
            this.startPlayingWebAudio(loop, offset);

        }

    }

};






//-----------------------------------------------------------------------------
// Start Playing [HTML5]
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.startPlayingHTLM5 = function () {
    if (DSEIV.AudioLag.Debug) {
        console.log("Using HTML 5 Audio");
    }
    this._mediaElement.play();


};
//-----------------------------------------------------------------------------
// Start Playing [WebAudio]
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.startPlayingWebAudio = function (loop, offset) {
    if (DSEIV.AudioLag.Debug) {
        console.log("Playing: " + this._url);
    }
    this._mediaElement.loop = false;
    this._waiting = false;
    this.removeNodes();
    this.createNodes();
    this.connectNodes();
    this._mediaElement.play();
    this.setTime(offset);
    if (this.pitch > 0.01) {
        this._mediaElement.playbackRate =
            this._mediaElement.defaultPlaybackRate * this._pitch;
    }

};

//-----------------------------------------------------------------------------
// Fade Out
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.fadeOut = function (duration) {
    duration = duration || 0.5;
    var gain, currentTime;
    if (DSEIV.AudioLag.Debug) {
        console.log('fadeing out');
    }
    if (this._gainNode) {
        gain = this._gainNode.gain;
        currentTime = DSEIV.AudioContextManager.context.currentTime;
        gain.setValueAtTime(gain.value, currentTime);
        gain.linearRampToValueAtTime(0, currentTime + duration);
    }
    else if (this._usingHTML5Audio) {
        this.fadeOutHTML5(duration);


    }
    this._autoPlay = false;

};
DSEIV.AudioBuffer.prototype.fadeOutHTML5 = function (duration) {

    var TargetVolume = 0;
    this._tweenVolume = this._volume
    this._mediaElement.volume = this._volume;

    var GainStep = (0 - this._volume) / (duration * 60);
    this._gainInterval = setInterval(function (buffer, target, step) {

        buffer._tweenVolume += step;

        //if less than zero set to zero
        if (step < 0 && buffer._tweenVolume < 0) {
            buffer._tweenVolume = 0;
        }
        else if (buffer._tweenVolume > buffer._volume && step > 0) {
            buffer._tweenVolume = buffer._volume;
        }
        //check if we reached target
        if (Math.abs(target - buffer._tweenVolume) < 0.01) {
            console.error("reached target");
            buffer._tweenVolume = target;
            clearInterval(buffer._gainInterval);
            buffer._gainInterval = null;

        }
        console.log(buffer._tweenVolume);
        console.log(step);
        buffer._mediaElement.volume = buffer._tweenVolume;

    }, 1000 / 60, this, TargetVolume, GainStep);

};
//-----------------------------------------------------------------------------
// Fade In
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.fadeIn = function (duration) {
    var gain, currentTime;
    if (DSEIV.AudioLag.Debug) {
        console.log('fade in');
    }
    if (this._gainNode) {
        gain = this._gainNode.gain;
        currentTime = DSEIV.AudioContextManager.context.currentTime;
        gain.setValueAtTime(0, currentTime);
        gain.linearRampToValueAtTime(this._volume, currentTime + duration);
    }
    else if (this._usingHTML5Audio) {
        this.fadeInHTML5(duration);
        console.warn("HTML5 Fade In not implemented");
    }
    this._autoPlay = true;

};

/**
 * 
 */
DSEIV.AudioBuffer.prototype.fadeInHTML5 = function (duration) {

   
    var TargetVolume = this._volume;
    this._tweenVolume = 0;
    this._mediaElement.volume = 0;

    var GainStep = (TargetVolume) / (duration * 60);
    this._gainInterval = setInterval(function (buffer, target, step) {
        buffer._tweenVolume += step;
        //if less than zero set to zero
        if (step < 0 && buffer._tweenVolume < 0) {
            buffer._tweenVolume = 0;
        }
        else if (buffer._tweenVolume > buffer._volume && step > 0) {
            buffer._tweenVolume = buffer._volume;
        }
        //check if we reached target
        if (Math.abs(target - buffer._tweenVolume) < 0.01) {
            buffer._tweenVolume = target;
            clearInterval(buffer._gainInterval);
            buffer._gainInterval = null;

        }

        buffer._mediaElement.volume = buffer._tweenVolume;

    }, 1000 / 60, this, TargetVolume, GainStep);
};

//-----------------------------------------------------------------------------
// Set the current time
// note. if sounds playing a large chop effect will be heard
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.setTime = function (time) {


    if (this._mediaElement === null) {
        console.warn('cannot set time on a null reference, ' +
            'if possible  please wait until it is created');
        return;
    }
    if (DSEIV.AudioLag.Debug) {
        console.log('setting time');
    }
    this._mediaElement.currentTime = time;

};



//-----------------------------------------------------------------------------
// Add Play Listener
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.addPlayListener = function (listener) {
    this._playListeners.push(listener);
};

//-----------------------------------------------------------------------------
// Invoke Play Listener
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.invokePlayListeners = function () {
    if (this._playListeners !== null) {
        this._playListeners.forEach(function (listener) {
            if (listener !== undefined) {
                listener();
            }
        });
    }
};

//-----------------------------------------------------------------------------
// Stop
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.stop = function () {
    if (DSEIV.AudioLag.Debug) {
        console.log("stop");
    }
    if (DSEIV.AudioContextManager.shouldUseHTML5Audio()) {
        this.stopHTML5();
        return;

    }
    else {
        this.stopWebAudio();
    }
};

//-----------------------------------------------------------------------------
// Stop [HTML5]
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.stopHTML5 = function () {
    if (DSEIV.AudioLag.Debug) {
        console.log("stopHTML5");
    }
    clearInterval(this._gainInterval);
    if (this._mediaElement) {

        this.volume = 0;
        this._mediaElement.autoplay = false;
        this._mediaElement.pause();
        this._mediaElement.currentTime = 0;
        this._mediaElement = null;

    }

    this.invokeStopListeners();
};

//-----------------------------------------------------------------------------
// Stop [WebAudio]
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.stopWebAudio = function () {
    if (DSEIV.AudioLag.Debug) {
        console.log("stopWebAudio: " + this._url);
    }
    this.removeNodes();

    if (this._mediaElement) {

        this._mediaElement.autoplay = false;
        this._mediaElement.pause();
        this._mediaElement.currentTime = 0;
        this._mediaElement = null;

    }
    this.invokeStopListeners();
};

//-----------------------------------------------------------------------------
// Add Stop Listener
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.addStopListener = function (listener) {
    this._stopListeners.push(listener);
};

//-----------------------------------------------------------------------------
// Invoke Stop Listener
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.invokeStopListeners = function () {
    while (this._stopListeners.length > 0) {
        var listner = this._stopListeners.shift();
        listner();
    }
};

//-----------------------------------------------------------------------------
// Pause
// Pauses the sound without decosntructing the buffer
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.pause = function () {
    if (DSEIV.AudioLag.Debug) {
        console.log("pausing " + this._url);
    }
    this._mediaElement.pause();


};

//-----------------------------------------------------------------------------
// Replay
// Replays the sound if Paused.
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.replay = function () {
    if (DSEIV.AudioLag.Debug) {
        console.log("replaying " + this._url);
    }
    //   time = time || 0;
    if (this._mediaElement !== null) {
        this._mediaElement.play();
    }

    else {
        console.warn("media element is null but your trying to replay it." +
            "this may be becuase stop() was called instead of pause(), " +
            "your Audio may lag.");
        //  this.play(this.loop, time);

    }
};

//-----------------------------------------------------------------------------
// Create Nodes
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.createNodes = function () {
    if (DSEIV.AudioLag.Debug) {
        console.log("creating nodes");
    }
    this.createSourceNode();
    this.createGainNode();
    this.createPannerNode();

};

//-----------------------------------------------------------------------------
// Create Source Node
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.createSourceNode = function () {
    var context = DSEIV.AudioContextManager.context;
    if (this._sourceNode === null) {
        this._sourceNode = context.createMediaElementSource(this._mediaElement);
    }
};

//-----------------------------------------------------------------------------
// Create Pan Node
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.createPannerNode = function () {
    var context = DSEIV.AudioContextManager.context;
    this._pannerNode = context.createPanner();
};

//-----------------------------------------------------------------------------
// Update Pan Node
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.updatePanner = function () {
    var x, z;
    if (this._pannerNode) {
        x = this._pan;
        z = 1 - Math.abs(x);
        this._pannerNode.setPosition(x, 0, z);
    }
};

//-----------------------------------------------------------------------------
// Create Gain Node
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.createGainNode = function () {
    var context = DSEIV.AudioContextManager.context;
    this._gainNode = context.createGain();
    this._gainNode.gain.value = this._volume;
};

//-----------------------------------------------------------------------------
// Connect Nodes
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.connectNodes = function () {
    if (DSEIV.AudioLag.Debug) {
        console.log('connecting nodes');
    }
    var context = DSEIV.AudioContextManager.context;
    this._sourceNode.connect(this._gainNode);
    this._gainNode.connect(context.destination);
};

//-----------------------------------------------------------------------------
// Remove Nodes
//-----------------------------------------------------------------------------
DSEIV.AudioBuffer.prototype.removeNodes = function () {

    if (DSEIV.AudioLag.Debug) {
        console.log('removing nodes');
    }
    if (this._sourceNode !== null) {
        this._sourceNode.disconnect();
        this._gainNode.disconnect();
        this._pannerNode.disconnect();
    }
    this._sourceNode = null;
    this._gainNode = null;
    this._pannerNode = null;

};

DSEIV.AudioBuffer.prototype.isError = function () { };

//═════════════════════════════════════════════════════════════════════════════
// DSEIV.AudioMetaReader
//═════════════════════════════════════════════════════════════════════════════
DSEIV.AudioMetaReader = function () {

    this._loopLength = 0;
    this._loopStart = 0;
    this._samplerate = 48100;

};

//-----------------------------------------------------------------------------
// Read Loop Comments
//-----------------------------------------------------------------------------
DSEIV.AudioMetaReader.prototype.readLoopComments =
    function (array, samplerate) {
        this.readOGG(array);
        return samplerate;
    };

//-----------------------------------------------------------------------------
// readOGG
//-----------------------------------------------------------------------------
DSEIV.AudioMetaReader.prototype.readOGG = function (array) {
    var index,
        i,
        vorbisHeaderFound,
        numSegments,
        segments,
        headerType;

    index = 0;
    while (index < array.length) {
        if (this._readFourCharacters(array, index) === 'OggS') {
            index += 26;
            vorbisHeaderFound = false;
            numSegments = array[index++];
            segments = [];
            for (i = 0; i < numSegments; i++) {
                segments.push(array[index++]);
            }
            for (i = 0; i < numSegments; i++) {
                if (this._readFourCharacters(array, index + 1) === 'vorb') {
                    headerType = array[index];
                    if (headerType === 1) {
                        this._sampleRate =
                            this._readLittleEndian(array, index + 12);
                    } else if (headerType === 3) {
                        this.readMetaData(array, index, segments[i]);
                    }
                    vorbisHeaderFound = true;
                }
                index += segments[i];
            }
            if (!vorbisHeaderFound) {
                break;
            }
        } else {
            break;
        }
    }
};

//-----------------------------------------------------------------------------
// Read MetaData
//-----------------------------------------------------------------------------
DSEIV.AudioMetaReader.prototype.readMetaData = function (array, index, size) {
    var i,
        text,
        text2;

    for (i = index; i < index + size - 10; i++) {
        if (this._readFourCharacters(array, i) === 'LOOP') {
            text = '';
            while (array[i] > 0) {
                text += String.fromCharCode(array[i++]);
            }
            if (text.match(/LOOPSTART=([0-9]+)/)) {
                this._loopStart = parseInt(RegExp.$1, 10);
            }
            if (text.match(/LOOPLENGTH=([0-9]+)/)) {
                this._loopLength = parseInt(RegExp.$1, 10);
            }
            if (text == 'LOOPSTART' || text == 'LOOPLENGTH') {
                text2 = '';
                i += 16;
                while (array[i] > 0) {
                    text2 += String.fromCharCode(array[i++]);
                }
                if (text == 'LOOPSTART') {
                    this._loopStart = parseInt(text2, 10);
                } else {
                    this._loopLength = parseInt(text2, 10);
                }
            }
        }
    }

};

//-----------------------------------------------------------------------------
// Read Four Characters
//-----------------------------------------------------------------------------
DSEIV.AudioMetaReader.prototype._readFourCharacters = function (array, index) {
    var string,
        i;
    string = '';
    for (i = 0; i < 4; i++) {
        string += String.fromCharCode(array[index + i]);
    }
    return string;
};

//-----------------------------------------------------------------------------
// Read Little Endian
//-----------------------------------------------------------------------------
DSEIV.AudioMetaReader.prototype._readLittleEndian = function (array, index) {
    return (array[index + 3] * 0x1000000 + array[index + 2] * 0x10000 +
        array[index + 1] * 0x100 + array[index + 0]);
};

//-----------------------------------------------------------------------------
// Read Big Endian Encoding
//-----------------------------------------------------------------------------
DSEIV.AudioMetaReader.prototype._readBigEndian = function (array, index) {
    return (array[index + 0] * 0x1000000 + array[index + 1] * 0x10000 +
        array[index + 2] * 0x100 + array[index + 3]);
};

//-----------------------------------------------------------------------------
// Get Loop Start
//-----------------------------------------------------------------------------
DSEIV.AudioMetaReader.prototype.getLoopStart = function () {
    if (this._loopStart > 50000) {
        return 0;
    }
    return this._loopStart;
};

//-----------------------------------------------------------------------------
// Get Sample Rate
//-----------------------------------------------------------------------------
DSEIV.AudioMetaReader.prototype.getSampleRate = function () {

    return this._sampleRate;
};

//-----------------------------------------------------------------------------
// Get Loop Length
//-----------------------------------------------------------------------------
DSEIV.AudioMetaReader.prototype.getLoopLength = function () {

    return this._loopLength;
};

//═════════════════════════════════════════════════════════════════════════════
// Array
//
// Poly fills Array.Find becuase MV doesn't support it.
//═════════════════════════════════════════════════════════════════════════════
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        }
    });
}
//═════════════════════════════════════════════════════════════════════════════=
// End Of File
//═════════════════════════════════════════════════════════════════════════════=