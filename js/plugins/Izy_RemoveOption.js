//=============================================================================
// Izy_RemoveOption.js
//=============================================================================
/*:
 * @plugindesc This plugin remove option command from title.
 * @author Izyees Fariz
 */
Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    this.addWindow(this._commandWindow);
};
Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.newGame,   'newGame');
    this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
};