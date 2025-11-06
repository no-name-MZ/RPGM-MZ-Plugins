/*:
 * @target MZ
 * @plugindesc Neutralize battlebacks zoom.
 * @author no__name
 * 
 * @help
 *
 * Experimental. 
 * Tested on Front-view.
 * 
 * @param ZoomFactor
 * @text Zoom-out factor
 * @desc 1 = default, <1 zooms out, >1 zooms in.
 * @default 0.83
 *
 * @param OffsetY
 * @text Vertical offset
 * @desc Negative moves up, Positive moves down
 * @default -110
 */

(() => {
  const params = PluginManager.parameters(document.currentScript.src.match(/([^/]+)\.js$/)[1]);
  const ZOOM = parseFloat(params.ZoomFactor || "0.83");
  const OFFSET_Y = parseFloat(params.OffsetY || "-110");

  const _updatePos = Spriteset_Battle.prototype.updatePosition;
  Spriteset_Battle.prototype.updatePosition = function() {
    _updatePos.call(this);

    if (this._baseSprite) {
      this._baseSprite.scale.set(ZOOM, ZOOM);

      const scaledH = Graphics.height * ZOOM;
      const offsetY = Graphics.height - scaledH + OFFSET_Y;

      this._baseSprite.x = (Graphics.width * (1 - ZOOM)) / 2;
      this._baseSprite.y = offsetY;
    }
  };
})();
