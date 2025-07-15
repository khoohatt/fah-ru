/*
Title: Name Input
Author: DK (Denis Kuznetsov) (http://vk.com/id8137201)
Site: http://dk-plugins.ru/
Group in VK: http://vk.com/dkplugins
Version: 1.0
Release: 18.06.2016
First release: 18.06.2016
Supported languages: Russian, English
*/

/*ru
Название: Ввод Имени
Автор: DK (Денис Кузнецов) (http://vk.com/id8137201)
Сайт: http://dk-plugins.ru/
Группа ВК: http://vk.com/dkplugins
Версия: 1.0
Релиз: 18.06.2016
Первый релиз: 18.06.2016
Поддерживаемые языки: Русский, Английский
*/

/*:
 * @plugindesc v.1.0 Allows input the name from the keyboard
 * @author DK (Denis Kuznetsov)
 * @help

 ### Info about plugin ###
 Title: DK_Name_Input
 Author: DK (Denis Kuznetsov) (http://vk.com/id8137201)
 Site: http://dk-plugins.ru/
 Group in VK: http://vk.com/dkplugins
 Version: 1.0
 Release: 18.06.2016
 First release: 18.06.2016
 Supported languages: Russian, English

 ### License and terms of use for plugin ###
 You can:
 -Free use the plugin for your commercial and non commercial projects.
 -Translate the plugin to other languages (please, inform, if you do this)

 You can't:
 -Delete or change any information about plugin (Title, authorship, contact information, version and release)
 -Change code of plugin out of border "Plugin settings" and "End of plugin settings" (if you found a bug contact me)

*/

/*:ru
 * @plugindesc v.1.0 Позволяет вводить имя с клавиатуры
 * @author DK (Денис Кузнецов)
 * @help

 ### Информация о плагине ###
 Название: DK_Name_Input
 Автор: DK (Денис Кузнецов) (http://vk.com/id8137201)
 Сайт: http://dk-plugins.ru/
 Группа ВК: http://vk.com/dkplugins
 Версия: 1.0
 Релиз: 18.06.2016
 Первый релиз: 18.06.2016
 Поддерживаемые языки: Русский, Английский

 ### Лицензия и правила использования плагина ###
 Вы можете:
 -Бесплатно использовать данный плагин в некоммерческих и коммерческих проектах
 -Переводить плагин на другие языки (пожалуйста, сообщите, если Вы перевели плагин на другой язык)

 Вы не можете:
 -Убирать или изменять любую информацию о плагине (Название, авторство, контактная информация, версия и дата релиза)
 -Изменять код плагина вне поля "Настройки плагина" и "Конец настройки плагина" (если нашли ошибку, напишите мне о ней)

*/

var Imported = Imported || {};
Imported.DK_Name_Input = true;

var DKVersion = DKVersion || {};
DKVersion.DK_Name_Input = 1.0;

//===========================================================================
// Name Input Manager
//===========================================================================

function NameInputManager() {
	throw new Error('This is a static class (Это статический класс!)');
}

NameInputManager.isKeyCodeIgnored = function(key_code) {
	var escape_code = 8, enter_code = 13, backspace_code = 27;
	return key_code === escape_code || key_code === enter_code || key_code === backspace_code;
};

NameInputManager.onKeyPress = function(event) {
	if (NameInputManager.isKeyCodeIgnored(event.keyCode)) return;
	if (NameInputManager.checkInputText())
		NameInputManager.input_text += String.fromCharCode(event.charCode);
    else
        NameInputManager.input_text = String.fromCharCode(event.charCode);
};

NameInputManager.clearInputText = function() {
	this.input_text = null;
};

NameInputManager.checkInputText = function() {
	return this.input_text != null;
};

NameInputManager.getInputText = function() {
	if (!this.checkInputText()) return '';
	var text = this.input_text;
	this.clearInputText();
	return text;
};

//===========================================================================
// Input
//===========================================================================

Input.keyMapper[8] = 'backspace'; // backspace

var Name_Input_Input_clear = Input.clear;
Input.clear = function() {
	Name_Input_Input_clear.call(this);
	NameInputManager.clearInputText();
};

var Name_Input_Input_setupEventHandlers = Input._setupEventHandlers;
Input._setupEventHandlers = function () {
	Name_Input_Input_setupEventHandlers.call(this);
    document.addEventListener('keypress', NameInputManager.onKeyPress);
};

//===========================================================================
// Window Name Input
//===========================================================================

var Name_Input_Window_NameInput_initialize = Window_NameInput.prototype.initialize;
Window_NameInput.prototype.initialize = function(editWindow) {
	Name_Input_Window_NameInput_initialize.call(this, editWindow);
	NameInputManager.clearInputText();
};

Window_NameInput.prototype.processHandling = function() {
    if (this.isOpen() && this.active)
	{
		if (NameInputManager.checkInputText())
		{
			if (this._editWindow.add(NameInputManager.getInputText()))
				SoundManager.playOk();
			else
				SoundManager.playBuzzer();
		}
		if (Input.isRepeated('backspace'))
			this.processBack();
        if (Input.isRepeated('cancel'))
            this.processBack();
        if (Input.isRepeated('ok'))
            this.processOk();
    }
};