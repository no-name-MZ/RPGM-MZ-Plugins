/*:
* @target MZ
* @plugindesc ErosMenuMz v1.0
* @author no__name
*
* @help ErosMenuMz v1.0 
*
* Do not change the name of this plugin, it has to be called "ErosMenuMz.js".
*
* This plugin creates a new menu called "Lewd" by default, where you can add a
* background, an image overlay, a second image overlay and a bunch of stats.
*
* (Optional)This plugin allows you to dynamically change the background and/or
* overlay image based on the value of a game variable.
*
* How It Works:
* The plugin can automatically append the variable's current value to your
* image name. For example: If your background is set to "UI/background" and
* the variable you linked has a value of "1", it will look for "UI/background1"
*
* No credit needed, free of use.
*
* Script Call:
* $SceneManager.push(Scene_Lewd);
*
* @param Scene_Menu
* @default
*
* @param ToggleMenuButton
* @text Toggle Menu Button
* @desc Toggle the visibility of the menu button.
* @type boolean
* @default true
* @parent Scene_Menu
*
* @param MenuButtonText
* @text Menu Button Name
* @desc The text displayed on the button in the main menu.
* @default Lewd
* @parent Scene_Menu
* @param MenuButtonFontSize
* @text Menu Button Font Size
* @desc Font size for the menu button.
* @type number
* @default 26
* @parent Scene_Menu
*
* @param MenuButtonAlign
* @text Menu Button Text Align
* @desc Alignment of the menu button.
* @type select
* @option left
* @option center
* @option right
* @default center
* @parent Scene_Menu
*
* @param MenuButtonBackground
* @text Menu Button Background Image
* @desc (Optional) ~240*36 picture drawn behind the menu button.
* @type file
* @dir img/pictures/
* @default
* @parent Scene_Menu
*
* @param Window_SizePosOpacity
* @default
*
* @param Xsize
* @text Window X Size
* @desc The width of the window.
* @default 0
* @parent Window_SizePosOpacity
*
* @param Ysize
* @text Window Y Size
* @desc The height of the window.
* @default 0
* @parent Window_SizePosOpacity
*
* @param Xpos
* @text Window X Position
* @desc The X position of the window.
* @default 0
* @parent Window_SizePosOpacity
*
* @param Ypos
* @text Window Y Position
* @desc The Y position of the window.
* @default 0
* @parent Window_SizePosOpacity
*
* @param WindowOpacity
* @text Window Opacity
* @desc Opacity of the window (0 = fully transparent, 255 = opaque).
* @type number
* @default 255
* @min 0
* @max 255
* @parent Window_SizePosOpacity
*
* @param Image_Background
* @default
*
* @param ShowImageBackground
* @text Show Image Background
* @desc Show an image background in the window.
* @type boolean
* @default false
* @parent Image_Background
*
* @param ImageBackground
* @text Image Background
* @desc The path to the image background.
* @type file
* @dir img/pictures/
* @default
* @parent Image_Background
*
* @param LinkImageToVariable
* @text Link Image To Variable
* @desc Link image to a variable.
* @type boolean
* @default false
* @parent Image_Background
*
* @param VariableID
* @text Variable ID
* @desc The ID of the variable to link the image to.
* @type variable
* @default 0
* @parent Image_Background
*
* @param Image_Overlay
* @default
*
* @param ShowImageOverlay
* @text Show Image Overlay
* @desc Show an image overlay on top of the background image.
* @type boolean
* @default false
* @parent Image_Overlay
*
* @param ImageOverlay
* @text Image Overlay
* @type file
* @dir img/pictures/
* @default
* @parent Image_Overlay
*
* @param LinkOverlayToVariable
* @text Link Image To Variable
* @desc Link image to a variable.
* @type boolean
* @default false
* @parent Image_Overlay
*
* @param VariableIDOverlay
* @text Variable ID
* @desc The ID of the variable to link the image to.
* @type variable
* @default 0
* @parent Image_Overlay
*
* @param Image_Overlay2
*
* @param ShowImageOverlay2
* @text Show Image Overlay 2
* @desc Show an image overlay on top of everything else.
* @type boolean
* @default false
* @parent Image_Overlay2
*
* @param ImageOverlay2
* @text Image Overlay 2
* @type file
* @dir img/pictures/
* @default
* @parent Image_Overlay2
*
* @param LinkOverlay2ToVariable
* @text Link Image To Variable
* @desc Link image to a variable.
* @type boolean
* @default false
* @parent Image_Overlay2
*
* @param VariableIDOverlay2
* @text Variable ID
* @desc The ID of the variable to link the image to.
* @type variable
* @default 0
* @parent Image_Overlay2
*
* @param Stat1_Config
* @default
*
* @param UseStat1
* @text Use Stat1
* @desc Use the Stat1 text configuration.
* @type boolean
* @default false
* @parent Stat1_Config
*
* @param Stat1Text
* @text Stat1 Text
* @desc The text to display for Stat1.
* @default You can use text code here
* @parent Stat1_Config
*
* @param Stat1FontSize
* @text Stat1 Font Size
* @desc Font size of Stat1 (affects text & icons)
* @parent Stat1_Config
* @type number
* @default 26
* @parent Stat1_Config
*
* @param Stat1XPosition
* @text Stat1 X Position
* @desc The X position for Stat1 text.
* @type number
* @min 0
* @default 0
* @parent Stat1_Config
*
* @param Stat1YPosition
* @text Stat1 Y Position
* @desc The Y position for Stat1 text.
* @type number
* @min 0
* @default 0
* @parent Stat1_Config
*
* @param Stat2_Config
* @default
*
* @param UseStat2
* @text Use Stat2
* @desc Use the Stat2 text configuration.
* @type boolean
* @default false
* @parent Stat2_Config
*
* @param Stat2Text
* @text Stat2 Text
* @desc The text to display for Stat2.
* @default You can use text code here
* @parent Stat2_Config
*
* @param Stat2FontSize
* @text Stat2 Font Size
* @desc Font size of Stat2 (affects text & icons)
* @parent Stat2_Config
* @type number
* @default 26
* @parent Stat2_Config
*
* @param Stat2XPosition
* @text Stat2 X Position
* @desc The X position for Stat2 text.
* @type number
* @min 0
* @default 0
* @parent Stat2_Config
*
* @param Stat2YPosition
* @text Stat2 Y Position
* @desc The Y position for Stat2 text.
* @type number
* @min 0
* @default 0
* @parent Stat2_Config
*
* @param Stat3_Config
* @default
*
* @param UseStat3
* @text Use Stat3
* @desc Use the Stat3 text configuration.
* @type boolean
* @default false
* @parent Stat3_Config
*
* @param Stat3Text
* @text Stat3 Text
* @desc The text to display for Stat3.
* @default You can use text code here
* @parent Stat3_Config
*
* @param Stat3FontSize
* @text Stat3 Font Size
* @desc Font size of Stat3 (affects text & icons)
* @parent Stat3_Config
* @type number
* @default 26
* @parent Stat3_Config
*
* @param Stat3XPosition
* @text Stat3 X Position
* @desc The X position for Stat3 text.
* @type number
* @min 0
* @default 0
* @parent Stat3_Config
*
* @param Stat3YPosition
* @text Stat3 Y Position
* @desc The Y position for Stat3 text.
* @type number
* @min 0
* @default 0
* @parent Stat3_Config
*
* @param Stat4_Config
* @default
*
* @param UseStat4
* @text Use Stat4
* @desc Use the Stat4 text configuration.
* @type boolean
* @default false
* @parent Stat4_Config
*
* @param Stat4Text
* @text Stat4 Text
* @desc The text to display for Stat4.
* @default You can use text code here
* @parent Stat4_Config
*
* @param Stat4FontSize
* @text Stat4 Font Size
* @desc Font size of Stat4 (affects text & icons)
* @parent Stat4_Config
* @type number
* @default 26
* @parent Stat4_Config
*
* @param Stat4XPosition
* @text Stat4 X Position
* @desc The X position for Stat4 text.
* @type number
* @min 0
* @default 0
* @parent Stat4_Config
*
* @param Stat4YPosition
* @text Stat4 Y Position
* @desc The Y position for Stat4 text.
* @type number
* @min 0
* @default 0
* @parent Stat4_Config
*
* @param Stat5_Config
* @default
*
* @param UseStat5
* @text Use Stat5
* @desc Use the Stat5 text configuration.
* @type boolean
* @default false
* @parent Stat5_Config
*
* @param Stat5Text
* @text Stat5 Text
* @desc The text to display for Stat5.
* @default You can use text code here
* @parent Stat5_Config
*
* @param Stat5FontSize
* @text Stat5 Font Size
* @desc Font size of Stat5 (affects text & icons)
* @parent Stat5_Config
* @type number
* @default 26
* @parent Stat5_Config
*
* @param Stat5XPosition
* @text Stat5 X Position
* @desc The X position for Stat5 text.
* @type number
* @min 0
* @default 0
* @parent Stat5_Config
*
* @param Stat5YPosition
* @text Stat5 Y Position
* @desc The Y position for Stat5 text.
* @type number
* @min 0
* @default 0
* @parent Stat5_Config
*
* @param Stat6_Config
* @default
*
* @param UseStat6
* @text Use Stat6
* @desc Use the Stat6 text configuration.
* @type boolean
* @default false
* @parent Stat6_Config
*
* @param Stat6Text
* @text Stat6 Text
* @desc The text to display for Stat6.
* @default You can use text code here
* @parent Stat6_Config
*
* @param Stat6FontSize
* @text Stat6 Font Size
* @desc Font size of Stat6 (affects text & icons)
* @parent Stat6_Config
* @type number
* @default 26
* @parent Stat6_Config
*
* @param Stat6XPosition
* @text Stat6 X Position
* @desc The X position for Stat6 text.
* @type number
* @min 0
* @default 0
* @parent Stat6_Config
*
* @param Stat6YPosition
* @text Stat6 Y Position
* @desc The Y position for Stat6 text.
* @type number
* @min 0
* @default 0
* @parent Stat6_Config
*
* @param Stat7_Config
* @default
*
* @param UseStat7
* @text Use Stat7
* @desc Use the Stat7 text configuration.
* @type boolean
* @default false
* @parent Stat7_Config
*
* @param Stat7Text
* @text Stat7 Text
* @desc The text to display for Stat7.
* @default You can use text code here
* @parent Stat7_Config
*
* @param Stat7FontSize
* @text Stat7 Font Size
* @desc Font size of Stat7 (affects text & icons)
* @parent Stat7_Config
* @type number
* @default 26
* @parent Stat7_Config
*
* @param Stat7XPosition
* @text Stat7 X Position
* @desc The X position for Stat7 text.
* @type number
* @min 0
* @default 0
* @parent Stat7_Config
*
* @param Stat7YPosition
* @text Stat7 Y Position
* @desc The Y position for Stat7 text.
* @type number
* @min 0
* @default 0
* @parent Stat7_Config
*
* @param Stat8_Config
* @default
*
* @param UseStat8
* @text Use Stat8
* @desc Use the Stat8 text configuration.
* @type boolean
* @default false
* @parent Stat8_Config
*
* @param Stat8Text
* @text Stat8 Text
* @desc The text to display for Stat8.
* @default You can use text code here
* @parent Stat8_Config
*
* @param Stat8FontSize
* @text Stat8 Font Size
* @desc Font size of Stat8 (affects text & icons)
* @parent Stat8_Config
* @type number
* @default 26
* @parent Stat8_Config
*
* @param Stat8XPosition
* @text Stat8 X Position
* @desc The X position for Stat8 text.
* @type number
* @min 0
* @default 0
* @parent Stat8_Config
*
* @param Stat8YPosition
* @text Stat8 Y Position
* @desc The Y position for Stat8 text.
* @type number
* @min 0
* @default 0
* @parent Stat8_Config
*
* @param Stat9_Config
* @default
*
* @param UseStat9
* @text Use Stat9
* @desc Use the Stat9 text configuration.
* @type boolean
* @default false
* @parent Stat9_Config
*
* @param Stat9Text
* @text Stat9 Text
* @desc The text to display for Stat9.
* @default You can use text code here
* @parent Stat9_Config
*
* @param Stat9FontSize
* @text Stat9 Font Size
* @desc Font size of Stat9 (affects text & icons)
* @parent Stat9_Config
* @type number
* @default 26
* @parent Stat9_Config
*
* @param Stat9XPosition
* @text Stat9 X Position
* @desc The X position for Stat9 text.
* @type number
* @min 0
* @default 0
* @parent Stat9_Config
*
* @param Stat9YPosition
* @text Stat9 Y Position
* @desc The Y position for Stat9 text.
* @type number
* @min 0
* @default 0
* @parent Stat9_Config
*
* @param Stat10_Config
* @default
*
* @param UseStat10
* @text Use Stat10
* @desc Use the Stat10 text configuration.
* @type boolean
* @default false
* @parent Stat10_Config
*
* @param Stat10Text
* @text Stat10 Text
* @desc The text to display for Stat10.
* @default You can use text code here
* @parent Stat10_Config
*
* @param Stat10FontSize
* @text Stat10 Font Size
* @desc Font size of Stat10 (affects text & icons)
* @parent Stat10_Config
* @type number
* @default 26
* @parent Stat10_Config
*
* @param Stat10XPosition
* @text Stat10 X Position
* @desc The X position for Stat10 text.
* @type number
* @min 0
* @default 0
* @parent Stat10_Config
*
* @param Stat10YPosition
* @text Stat10 Y Position
* @desc The Y position for Stat10 text.
* @type number
* @min 0
* @default 0
* @parent Stat10_Config
*
* @param Stat11_Config
* @default
*
* @param UseStat11
* @text Use Stat11
* @desc Use the Stat11 text configuration.
* @type boolean
* @default false
* @parent Stat11_Config
*
* @param Stat11Text
* @text Stat11 Text
* @desc The text to display for Stat11.
* @default You can use text code here
* @parent Stat11_Config
*
* @param Stat11FontSize
* @text Stat11 Font Size
* @desc Font size of Stat11 (affects text & icons)
* @parent Stat11_Config
* @type number
* @default 26
* @parent Stat11_Config
*
* @param Stat11XPosition
* @text Stat11 X Position
* @desc The X position for Stat11 text.
* @type number
* @min 0
* @default 0
* @parent Stat11_Config
*
* @param Stat11YPosition
* @text Stat11 Y Position
* @desc The Y position for Stat11 text.
* @type number
* @min 0
* @default 0
* @parent Stat11_Config
*
* @param Stat12_Config
* @default
*
* @param UseStat12
* @text Use Stat12
* @desc Use the Stat12 text configuration.
* @type boolean
* @default false
* @parent Stat12_Config
*
* @param Stat12Text
* @text Stat12 Text
* @desc The text to display for Stat12.
* @default You can use text code here
* @parent Stat12_Config
*
* @param Stat12FontSize
* @text Stat12 Font Size
* @desc Font size of Stat12 (affects text & icons)
* @parent Stat12_Config
* @type number
* @default 26
* @parent Stat12_Config
*
* @param Stat12XPosition
* @text Stat12 X Position
* @desc The X position for Stat12 text.
* @type number
* @min 0
* @default 0
* @parent Stat12_Config
*
* @param Stat12YPosition
* @text Stat12 Y Position
* @desc The Y position for Stat12 text.
* @type number
* @min 0
* @default 0
* @parent Stat12_Config
*
* @param Stat13_Config
* @default
*
* @param UseStat13
* @text Use Stat13
* @desc Use the Stat13 text configuration.
* @type boolean
* @default false
* @parent Stat13_Config
*
* @param Stat13Text
* @text Stat13 Text
* @desc The text to display for Stat13.
* @default You can use text code here
* @parent Stat13_Config
*
* @param Stat13FontSize
* @text Stat13 Font Size
* @desc Font size of Stat13 (affects text & icons)
* @parent Stat13_Config
* @type number
* @default 26
* @parent Stat13_Config
*
* @param Stat13XPosition
* @text Stat13 X Position
* @desc The X position for Stat13 text.
* @type number
* @min 0
* @default 0
* @parent Stat13_Config
*
* @param Stat13YPosition
* @text Stat13 Y Position
* @desc The Y position for Stat13 text.
* @type number
* @min 0
* @default 0
* @parent Stat13_Config
*
* @param Stat14_Config
* @default
*
* @param UseStat14
* @text Use Stat14
* @desc Use the Stat14 text configuration.
* @type boolean
* @default false
* @parent Stat14_Config
*
* @param Stat14Text
* @text Stat14 Text
* @desc The text to display for Stat14.
* @default You can use text code here
* @parent Stat14_Config
*
* @param Stat14FontSize
* @text Stat14 Font Size
* @desc Font size of Stat14 (affects text & icons)
* @parent Stat14_Config
* @type number
* @default 26
* @parent Stat14_Config
*
* @param Stat14XPosition
* @text Stat14 X Position
* @desc The X position for Stat14 text.
* @type number
* @min 0
* @default 0
* @parent Stat14_Config
*
* @param Stat14YPosition
* @text Stat14 Y Position
* @desc The Y position for Stat14 text.
* @type number
* @min 0
* @default 0
* @parent Stat14_Config
*
* @param Stat15_Config
* @default
*
* @param UseStat15
* @text Use Stat15
* @desc Use the Stat15 text configuration.
* @type boolean
* @default false
* @parent Stat15_Config
*
* @param Stat15Text
* @text Stat15 Text
* @desc The text to display for Stat15.
* @default You can use text code here
* @parent Stat15_Config
*
* @param Stat15FontSize
* @text Stat15 Font Size
* @desc Font size of Stat15 (affects text & icons)
* @parent Stat15_Config
* @type number
* @default 26
* @parent Stat15_Config
*
* @param Stat15XPosition
* @text Stat15 X Position
* @desc The X position for Stat15 text.
* @type number
* @min 0
* @default 0
* @parent Stat15_Config
*
* @param Stat15YPosition
* @text Stat15 Y Position
* @desc The Y position for Stat15 text.
* @type number
* @min 0
* @default 0
* @parent Stat15_Config
*
* @param Stat16_Config
* @default
*
* @param UseStat16
* @text Use Stat16
* @desc Use the Stat16 text configuration.
* @type boolean
* @default false
* @parent Stat16_Config
*
* @param Stat16Text
* @text Stat16 Text
* @desc The text to display for Stat16.
* @default You can use text code here
* @parent Stat16_Config
*
* @param Stat16FontSize
* @text Stat16 Font Size
* @desc Font size of Stat16 (affects text & icons)
* @parent Stat16_Config
* @type number
* @default 26
* @parent Stat16_Config
*
* @param Stat16XPosition
* @text Stat16 X Position
* @desc The X position for Stat16 text.
* @type number
* @min 0
* @default 0
* @parent Stat16_Config
*
* @param Stat16YPosition
* @text Stat16 Y Position
* @desc The Y position for Stat16 text.
* @type number
* @min 0
* @default 0
* @parent Stat16_Config
*
* @param Stat17_Config
* @default
*
* @param UseStat17
* @text Use Stat17
* @desc Use the Stat17 text configuration.
* @type boolean
* @default false
* @parent Stat17_Config
*
* @param Stat17Text
* @text Stat17 Text
* @desc The text to display for Stat17.
* @default You can use text code here
* @parent Stat17_Config
*
* @param Stat17FontSize
* @text Stat17 Font Size
* @desc Font size of Stat17 (affects text & icons)
* @parent Stat17_Config
* @type number
* @default 26
* @parent Stat17_Config
*
* @param Stat17XPosition
* @text Stat17 X Position
* @desc The X position for Stat17 text.
* @type number
* @min 0
* @default 0
* @parent Stat17_Config
*
* @param Stat17YPosition
* @text Stat17 Y Position
* @desc The Y position for Stat17 text.
* @type number
* @min 0
* @default 0
* @parent Stat17_Config
*
* @param Stat18_Config
* @default
*
* @param UseStat18
* @text Use Stat18
* @desc Use the Stat18 text configuration.
* @type boolean
* @default false
* @parent Stat18_Config
*
* @param Stat18Text
* @text Stat18 Text
* @desc The text to display for Stat18.
* @default You can use text code here
* @parent Stat18_Config
*
* @param Stat18FontSize
* @text Stat18 Font Size
* @desc Font size of Stat18 (affects text & icons)
* @parent Stat18_Config
* @type number
* @default 26
* @parent Stat18_Config
*
* @param Stat18XPosition
* @text Stat18 X Position
* @desc The X position for Stat18 text.
* @type number
* @min 0
* @default 0
* @parent Stat18_Config
*
* @param Stat18YPosition
* @text Stat18 Y Position
* @desc The Y position for Stat18 text.
* @type number
* @min 0
* @default 0
* @parent Stat18_Config
*
* @param Stat19_Config
* @default
*
* @param UseStat19
* @text Use Stat19
* @desc Use the Stat19 text configuration.
* @type boolean
* @default false
* @parent Stat19_Config
*
* @param Stat19Text
* @text Stat19 Text
* @desc The text to display for Stat19.
* @default You can use text code here
* @parent Stat19_Config
*
* @param Stat19FontSize
* @text Stat19 Font Size
* @desc Font size of Stat19 (affects text & icons)
* @parent Stat19_Config
* @type number
* @default 26
* @parent Stat19_Config
*
* @param Stat19XPosition
* @text Stat19 X Position
* @desc The X position for Stat19 text.
* @type number
* @min 0
* @default 0
* @parent Stat19_Config
*
* @param Stat19YPosition
* @text Stat19 Y Position
* @desc The Y position for Stat19 text.
* @type number
* @min 0
* @default 0
* @parent Stat19_Config
*
* @param Stat20_Config
* @default
*
* @param UseStat20
* @text Use Stat20
* @desc Use the Stat20 text configuration.
* @type boolean
* @default false
* @parent Stat20_Config
*
* @param Stat20Text
* @text Stat20 Text
* @desc The text to display for Stat20.
* @default You can use text code here
* @parent Stat20_Config
*
* @param Stat20FontSize
* @text Stat20 Font Size
* @desc Font size of Stat20 (affects text & icons)
* @parent Stat20_Config
* @type number
* @default 26
* @parent Stat20_Config
*
* @param Stat20XPosition
* @text Stat20 X Position
* @desc The X position for Stat20 text.
* @type number
* @min 0
* @default 0
* @parent Stat20_Config
*
* @param Stat20YPosition
* @text Stat20 Y Position
* @desc The Y position for Stat20 text.
* @type number
* @min 0
* @default 0
* @parent Stat20_Config
*/

function Scene_Lewd() {
  this.initialize.apply(this, arguments);
}

Scene_Lewd.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Lewd.prototype.constructor = Scene_Lewd;

Scene_Lewd.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Lewd.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createLewdWindow();
};

Scene_Lewd.prototype.createLewdWindow = function() {
  const p = PluginManager.parameters("ErosMenuMz");
  const width = Number(p["Xsize"]) || Graphics.boxWidth;
  const height = Number(p["Ysize"]) || Graphics.boxHeight;
  const x = Number(p["Xpos"]) || 0;
  const y = Number(p["Ypos"]) || 0;
  this._lewdWindow = new Window_Lewd(x, y, width, height);
  this.addWindow(this._lewdWindow);
};

Scene_Lewd.prototype.update = function() {
  Scene_MenuBase.prototype.update.call(this);
  if (TouchInput.isTriggered() || TouchInput.isCancelled()) SceneManager.pop();
};

//-----------------------------------------------------------------------------
//  Window_Lewd
//-----------------------------------------------------------------------------
function Window_Lewd() {
  this.initialize.apply(this, arguments);
}
Window_Lewd.prototype = Object.create(Window_Base.prototype);
Window_Lewd.prototype.constructor = Window_Lewd;

Window_Lewd.prototype.initialize = function(x, y, w, h) {
  Window_Base.prototype.initialize.call(this, new Rectangle(x, y, w, h));
  const p = PluginManager.parameters("ErosMenuMz");

  this.opacity = Number(p["WindowOpacity"] || 255);

  this._imageBackground = p["ImageBackground"];
  this._showImageBackground = p["ShowImageBackground"] === "true";
  this._linkImageToVariable = p["LinkImageToVariable"] === "true";
  this._variableID = Number(p["VariableID"]);

  this._imageOverlay = p["ImageOverlay"];
  this._showImageOverlay = p["ShowImageOverlay"] === "true";
  this._linkOverlayToVariable = p["LinkOverlayToVariable"] === "true";
  this._variableIDOverlay = Number(p["VariableIDOverlay"]);

  this._imageOverlay2 = p["ImageOverlay2"];
  this._showImageOverlay2 = p["ShowImageOverlay2"] === "true";
  this._linkOverlay2ToVariable = p["LinkOverlay2ToVariable"] === "true";
  this._variableIDOverlay2 = Number(p["VariableIDOverlay2"]);

  for (let i = 1; i <= 20; i++) {
    this["_useStat" + i] = p["UseStat" + i] === "true";
    this["_stat" + i + "Text"] = p["Stat" + i + "Text"] || "";
    this["_stat" + i + "XPosition"] = Number(p["Stat" + i + "XPosition"]) || 0;
    this["_stat" + i + "YPosition"] = Number(p["Stat" + i + "YPosition"]) || 0;
    this["_stat" + i + "FontSize"] = Number(p["Stat" + i + "FontSize"]) || 26;
  }

  this.loadImages();
};

Window_Lewd.prototype.loadImages = function() {
  const p = PluginManager.parameters("ErosMenuMz");
  const refresh = () => this.refresh();

  const loadAndListen = (show, img, link, varId) => {
    if (!show) return;
    let filename = img;
    if (link && varId > 0) filename = `${img}${$gameVariables.value(varId)}`;
    ImageManager.loadBitmap("img/pictures/", filename, 0, 0).addLoadListener(refresh);
  };

  loadAndListen(this._showImageBackground, this._imageBackground, this._linkImageToVariable, this._variableID);
  loadAndListen(this._showImageOverlay, this._imageOverlay, this._linkOverlayToVariable, this._variableIDOverlay);
  loadAndListen(this._showImageOverlay2, this._imageOverlay2, this._linkOverlay2ToVariable, this._variableIDOverlay2);

  if (!this._showImageBackground && !this._showImageOverlay && !this._showImageOverlay2) {
    this.refresh();
  }
};

//-----------------------------------------------------------------------------
// Draw background/overlay/overlay2/stats
//-----------------------------------------------------------------------------
Window_Lewd.prototype.refresh = function() {
  this.contents.clear();

  const drawImage = (base, linkVar, varId) => {
    let img = base;
    if (linkVar && varId > 0) img = `${base}${$gameVariables.value(varId)}`;
    const bmp = ImageManager.loadBitmap("img/pictures/", img, 0, 0);
    this.contents.blt(bmp, 0, 0, this.width, this.height, 0, 0);
  };

  if (this._showImageBackground) drawImage(this._imageBackground, this._linkImageToVariable, this._variableID);
  if (this._showImageOverlay) drawImage(this._imageOverlay, this._linkOverlayToVariable, this._variableIDOverlay);
  if (this._showImageOverlay2) drawImage(this._imageOverlay2, this._linkOverlay2ToVariable, this._variableIDOverlay2);
  
  // Local helper for parsing text codes (\v, \i, \c)
  const parseRichText = text => {
    let t = text.replace(/\\v\[(\d+)\]/gi, (_, id) => String($gameVariables.value(Number(id))));
    const icons = [...t.matchAll(/\\i\[(\d+)\]/gi)].map(m => Number(m[1]));
    const colorMatches = [...t.matchAll(/\\c\[(\d+)\]/gi)];
    const color = colorMatches.length ? Number(colorMatches[colorMatches.length - 1][1]) : 0;
    const name = t.replace(/\\[icv]\[\d+\]/gi, "").trim();
    return { icons, color, name };
  };

  for (let i = 1; i <= 20; i++) {
    if (!this["_useStat" + i]) continue;

    const raw = this["_stat" + i + "Text"];
    const { icons, color, name } = parseRichText(raw);
    const xStart = this["_stat" + i + "XPosition"];
    const y = this["_stat" + i + "YPosition"];
    const fontSize = this["_stat" + i + "FontSize"] || 26;

    const oldSize = this.contents.fontSize;
    this.contents.fontSize = fontSize;

    let x = xStart;

    const iconScale = fontSize / 26;
    const iconW = ImageManager.iconWidth * iconScale;
    const iconH = ImageManager.iconHeight * iconScale;

    for (const icon of icons) {
      const bitmap = ImageManager.loadSystem("IconSet");
      const pw = ImageManager.iconWidth;
      const ph = ImageManager.iconHeight;
      const sx = (icon % 16) * pw;
      const sy = Math.floor(icon / 16) * ph;
      this.contents.blt(bitmap, sx, sy, pw, ph, x, y + 2, iconW, iconH);
      x += iconW + 2;
    }

    if (color > 0) this.changeTextColor(ColorManager.textColor(color));
    else this.resetTextColor();

    this.drawText(name, x, y, this.width - x, fontSize + 4, "left");
    this.resetTextColor();

    this.contents.fontSize = oldSize;
  }
};

//-----------------------------------------------------------------------------
// Menu Button
//-----------------------------------------------------------------------------
const _AddCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
  _AddCommands.call(this);
  const p = PluginManager.parameters("ErosMenuMz");
  if (p["ToggleMenuButton"] === "true") this.addCommand(p["MenuButtonText"], "lewdScene");
};

const _CreateCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  _CreateCommandWindow.call(this);
  this._commandWindow.setHandler("lewdScene", this.commandLewdScene.bind(this));
};
Scene_Menu.prototype.commandLewdScene = function() {
  SceneManager.push(Scene_Lewd);
};

//-----------------------------------------------------------------------------
// Draw Menu Button
//-----------------------------------------------------------------------------
(() => {
  // Local helper for parsing text codes (\v, \i, \c)
  function parseRichText(text) {
    let t = text.replace(/\\v\[(\d+)\]/gi, (_, id) => String($gameVariables.value(Number(id))));
    const iconMatch = t.match(/\\i\[(\d+)\]/i);
    const colorMatch = t.match(/\\c\[(\d+)\]/i);
    const icon = iconMatch ? Number(iconMatch[1]) : 0;
    const color = colorMatch ? Number(colorMatch[1]) : 0;
    const name = t.replace(/\\[icv]\[\d+\]/gi, "").trim();
    return { icon, color, name };
  }

  Window_MenuCommand.prototype.drawLewdSceneItem = function(index) {
    const rect = this.itemLineRect(index);
    const p = PluginManager.parameters("ErosMenuMz");
    const fontSize = Number(p["MenuButtonFontSize"] || 26);
    const align = (p["MenuButtonAlign"] || "center").toLowerCase();
    const bg = p["MenuButtonBackground"] || "";

    // Draw background image
    if (bg) {
      const bmp = ImageManager.loadBitmap("img/pictures/", bg);
      if (bmp.isReady()) {
        const scale = Math.min(rect.width / bmp.width, rect.height / bmp.height);
        const w = bmp.width * scale;
        const h = bmp.height * scale;
        const dx = rect.x + (rect.width - w) / 2;
        const dy = rect.y + (rect.height - h) / 2;
        this.contents.blt(bmp, 0, 0, bmp.width, bmp.height, dx, dy, w, h);
      } else {
        bmp.addLoadListener(() => this.refresh());
      }
    }

    const cmd = this.commandName(index);
    const { icon, color, name } = parseRichText(cmd);

    const oldSize = this.contents.fontSize;
    this.contents.fontSize = fontSize;
    const textWidth = this.textWidth(name);
    const totalWidth = textWidth + (icon > 0 ? ImageManager.iconWidth + 4 : 0);

    let startX = rect.x;
    if (align === "center") startX = rect.x + (rect.width - totalWidth) / 2;
    else if (align === "right") startX = rect.x + rect.width - totalWidth;

    let x = startX;

    // Draw icon (if any)
    if (icon > 0) {
      const bitmap = ImageManager.loadSystem("IconSet");
      const pw = ImageManager.iconWidth;
      const ph = ImageManager.iconHeight;
      const sx = (icon % 16) * pw;
      const sy = Math.floor(icon / 16) * ph;
      const scale = fontSize / 26;
      const w = pw * scale;
      const h = ph * scale;
      const iconY = rect.y + (rect.height - h) / 2;
      this.contents.blt(bitmap, sx, sy, pw, ph, x, iconY, w, h);
      x += w + 4;
    }

    // Draw text with color
    if (color > 0) this.changeTextColor(ColorManager.textColor(color));
    else this.resetTextColor();

    const y = rect.y + (rect.height - this.lineHeight()) / 2;
    this.drawText(name, x, y, textWidth, this.lineHeight(), "left");

    this.resetTextColor();
    this.contents.fontSize = oldSize;
  };

  const _ErosMenu_drawAllItems = Window_MenuCommand.prototype.drawAllItems;
  Window_MenuCommand.prototype.drawAllItems = function() {
    _ErosMenu_drawAllItems.call(this);

    for (let i = 0; i < this.maxItems(); i++) {
      if (this.commandSymbol(i) === "lewdScene") {
        this.drawLewdSceneItem(i);
      }
    }
  };
})();
