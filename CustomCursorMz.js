/*:
 * @target MZ
 * @plugindesc Replace the default mouse cursor. v0.1
 * @author no__name
 *
 * @help
 *
 * Replace the default mouse cursor.
 * 
 * @param CursorImage
 * @text Cursor Image
 * @type file
 * @dir img/system/
 * @desc Choose the image file from img/system/ or leave blank to disable.
 * @default 
 */

(() => {
    const pluginName = "CustomCursorMz";
    const parameters = PluginManager.parameters(pluginName);
    let cursorFile = String(parameters["CursorImage"] || "").trim();

    if (cursorFile && !/\.[a-z0-9]+$/i.test(cursorFile)) {
        cursorFile += ".png";
    }

    const CustomCursorMz = {
        _cursorElement: null,
        _imagePath: cursorFile ? `img/system/${cursorFile}` : null,
    };

    CustomCursorMz.apply = function() {
        if (!this._imagePath) {
            document.body.style.cursor = "auto";
            return;
        }

        if (this._cursorElement) {
            this._cursorElement.remove();
            this._cursorElement = null;
        }

        const img = document.createElement("img");
        img.src = this._imagePath;
        img.id = "CustomCursorMzImage";
        Object.assign(img.style, {
            position: "fixed",
            pointerEvents: "none",
            zIndex: "9999",
            width: "auto",
            height: "auto",
            display: "none"
        });

        document.body.appendChild(img);
        this._cursorElement = img;

        img.onload = () => {
            img.style.display = "block";
            document.body.style.cursor = "none";
        };

        img.onerror = () => {
            console.warn(`[${pluginName}] Failed to load cursor image: ${this._imagePath}`);
            document.body.style.cursor = "auto";
        };

        window.addEventListener("mousemove", e => this.updatePosition(e));
    };

    CustomCursorMz.updatePosition = function(e) {
        if (!this._cursorElement) return;
        this._cursorElement.style.left = e.clientX + "px";
        this._cursorElement.style.top = e.clientY + "px";
    };

    const _SceneManager_run = SceneManager.run;
    SceneManager.run = function(sceneClass) {
        _SceneManager_run.call(this, sceneClass);
        CustomCursorMz.apply();
    };
})();
