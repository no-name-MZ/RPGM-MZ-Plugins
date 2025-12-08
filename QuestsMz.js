/*:
 * @target MZ
 * @plugindesc Quest System
 * @author aura-dev (original) / no__name (edit)
 * @url https://github.com/no-name-MZ/RPGM-MZ-Plugins/blob/main/QuestsMz.js
 * 
 * @help QuestsMz.js
 * 
 * A complete rework of quests.js from aura-dev so that it can stand on its own
 * legs and fit my needs. After installing this plugin you need to create a
 * Quests.json in your /data/ folder.
 * 
 * Quest data format for Quests.json, strings support text code (eg. "//I[84]Tutorial"):
 * 
 *{
 *  "UniqueQuestID": {
 *    "title": "Title of the quest",
 *    "category": "Tutorial",
 *    "description": "A sample quest",
 *    "requirements": "None",
 *    "rewards": "None",
 *    "objectives": {
 *      "ObjectiveID1": "A quest objective",
 *      "ObjectiveID2": "This objective is a kill-type objective (Goblin)(2)"
 *      "ObjectiveID3": "This objective is a gather-type objective [Potion](3)"
 *    }
 *  }
 *}
 * 
 * SCRIPT CALL:
 * QuestManager.getQuestStatus("UniqueQuestID")
 * -> return -1 (not started), 0 (Ongoing), 1 (Completed), 2 (failed)
 * 
 * QuestManager.getObjectiveStatus("UniqueQuestID", "ObjectiveID")
 * -> return -1 (not started), 0 (Ongoing), 1 (Completed), 2 (failed)
 * 
 * QuestManager.isQuestStarted("UniqueQuestID")
 * QuestManager.isQuestCompleted("UniqueQuestID")
 * QuestManager.isQuestFailed("UniqueQuestID")
 * QuestManager.isObjectiveStarted("UniqueQuestID", "ObjectiveID")
 * QuestManager.isObjectiveCompleted("UniqueQuestID", "ObjectiveID")
 * QuestManager.isObjectiveFailed("UniqueQuestID", "ObjectiveID")
 * -> True/False statements
 * 
 * Original work can be found here:
 * https://gitgud.io/auragamedev/auramz/-/blob/develop/AuraMZ_Template_Game/js/plugins/auramz/quests.js
 * All auramz/ and auramzui/ plugins are free to use for commercial and
 * non-commercial projects.
 *
 * @command addQuest
 * @text Add Quest
 * @desc Adds a new quest with objectives
 * @arg questID
 * @type string
 * @text Quest ID
 * @arg objectives
 * @type string[]
 * @text Objectives
 * @default []
 *
 * @command addObjective
 * @text Add Objective
 * @desc Adds an objective to an existing quest
 * @arg questID
 * @type string
 * @text Quest ID
 * @arg objectiveID
 * @type string
 * @text Objective ID
 *
 * @command setQuestStatus
 * @text Set Quest Status
 * @desc Changes a quest's status (0=Ongoing, 1=Completed, 2=Failed)
 * @arg questID
 * @type string
 * @text Quest ID
 * @arg status
 * @type number
 * @min 0
 * @max 2
 * @default 0
 * @text Status
 *
 * @command setObjectiveStatus
 * @text Set Objective Status
 * @desc Changes an objective's status (0=Ongoing, 1=Completed, 2=Failed)
 * @arg questID
 * @type string
 * @text Quest ID
 * @arg objectiveID
 * @type string
 * @text Objective ID
 * @arg status
 * @type number
 * @min 0
 * @max 2
 * @default 0
 * @text Status
 * 
 * @command overrideQuestTitle
 * @text Override Quest Title
 * @desc Overrides a quest's title text
 * @arg questID
 * @type string
 * @text Quest ID
 * @arg titleOverride
 * @type string
 * @text New Title Text
 *
 * @command overrideQuestDescription
 * @text Override Quest Description
 * @desc Overrides a quest's description text
 * @arg questID
 * @type string
 * @text Quest ID
 * @arg descriptionText
 * @type string
 * @text New Description Text
 *
 * @command overrideObjectiveDescription
 * @text Override Objective Description
 * @desc Overrides an objective's description text
 * @arg questID
 * @type string
 * @text Quest ID
 * @arg objectiveID
 * @type string
 * @text Objective ID
 * @arg descriptionOverride
 * @type string
 * @text New Objective Description
 * 
 * @command overrideRequirement
 * @text Override Requirements
 * @desc Overrides a quest's requirements text
 * @arg questID
 * @type string
 * @text Quest ID
 * @arg requirementOverride
 * @type string
 * @text New Requirement Text 
 * 
 * @command overrideReward
 * @text Override Rewards
 * @desc Overrides  a quest's rewards text
 * @arg questID
 * @type string
 * @text Quest ID
 * @arg rewardOverride
 * @type string
 * @text Custom Reward Text
 * 
 * @command resetQuest
 * @text Reset Quest
 * @desc Removes and re-adds the quest to make it repeatable
 * @arg questID
 * @type string
 * @text Quest ID
 *
 */

window.QuestsMz = {};
DataManager._databaseFiles.push({ name: "$dataQuests", src: "Quests.json" });

// Global variable for accessing quest data
$gameQuests = null;
let _trackedQuestId = null;

// Core Data Classes
class Game_Quests {
  constructor() {
    this._data = {};
  }
}

class Quest {
  constructor() {
    this._status = 0; // 0=ongoing, 1=complete, 2=failed
    this._objectives = {}; // map objectiveId -> status (0,1,2)
    this._description = null;
    this._requirements = null;
    this._rewards = null;
    this._descriptionOverride = null;
    this._rewardOverride = null;
    this._requirementOverride = null;
    this._key = null;
  }
}

// QuestManager
class QuestManager {
  static setup() {this._enableCallbacks = true;}
  static setAddQuestCallback(cb) {this._addQuestCallback = cb;}
  static setAddObjectiveCallback(cb) {this._addObjectiveCallback = cb;}
  static setQuestStatusCallback(cb) {this._setQuestStatusCallback = cb;}
  static setObjectiveStatusCallback(cb) {this._setObjectiveStatusCallback = cb;}
  static setOverrideQuestTitleCallback(cb) {this._overrideQuestTitleCallback = cb;}
  static setOverrideQuestDescriptionCallback(cb) {this._overrideQuestDescriptionCallback = cb;}
  static setOverrideObjectiveDescriptionCallback(cb) {this._overrideObjectiveDescriptionCallback = cb;}
  static setOverrideQuestRequirementCallback(cb) {this._overrideQuestRequirementCallback = cb;}
  static setOverrideQuestRewardCallback(cb) {this._overrideQuestRewardCallback = cb;}
  
  static onAddQuest(q) {if (this._addQuestCallback && this._enableCallbacks) this._addQuestCallback(q);}
  static onAddObjective(q, o) {if (this._addObjectiveCallback && this._enableCallbacks) this._addObjectiveCallback(q, o);}
  static onSetQuestStatus(q) {if (this._setQuestStatusCallback && this._enableCallbacks) this._setQuestStatusCallback(q);}
  static onSetObjectiveStatus(q, o) {if (this._setObjectiveStatusCallback && this._enableCallbacks) this._setObjectiveStatusCallback(q, o);}
  static onOverrideQuestTitle(q) {if (this._overrideQuestTitleCallback && this._enableCallbacks) this._overrideQuestTitleCallback(q);}
  static onOverrideQuestDescription(q) {if (this._overrideQuestDescriptionCallback && this._enableCallbacks) this._overrideQuestDescriptionCallback(q);}
  static onOverrideObjectiveDescription(q, o) {if (this._overrideObjectiveDescriptionCallback && this._enableCallbacks) this._overrideObjectiveDescriptionCallback(q, o);}
  static onOverrideQuestRequirement(q) {if (this._overrideQuestRequirementCallback && this._enableCallbacks) this._overrideQuestRequirementCallback(q);}
  static onOverrideQuestReward(q) {if (this._overrideQuestRewardCallback && this._enableCallbacks) this._overrideQuestRewardCallback(q);}

// QuestManager - logic
  static getQuest(questId) {return $gameQuests?._data?.[questId] || null;}

  static getQuestStatus(questId) {
    const quest = this.getQuest(questId);
    if (!quest) return -1; // not started
    return quest._status;  // 0, 1, or 2
  }

  static getObjectiveStatus(questId, objectiveId) {
    const quest = this.getQuest(questId);
    if (!quest) return -1; // quest not started
    const obj = quest._objectives?.[objectiveId];
    return obj != null ? obj : -1; // -1 = not started / not found
  }

  static isQuestStarted(questId) {return this.getQuestStatus(questId) >= 0;}
  static isQuestCompleted(questId) {return this.getQuestStatus(questId) === 1;}
  static isQuestFailed(questId) {return this.getQuestStatus(questId) === 2;}
  static isObjectiveStarted(questId, objectiveId) {return this.getObjectiveStatus(questId, objectiveId) >= 0;}
  static isObjectiveCompleted(questId, objectiveId) {return this.getObjectiveStatus(questId, objectiveId) === 1;}
  static isObjectiveFailed(questId, objectiveId) {return this.getObjectiveStatus(questId, objectiveId) === 2;}
}

// ---------------------
// Window_QuestCategory
// ---------------------
class Window_QuestCategory extends Window_HorzCommand {
  makeCommandList() {
    this.addCommand("Quest", "quest");
    this.addCommand("Completed", "completed");
    this.addCommand("Failed", "failed");
  }
  update() {
    super.update();
    if (this._questWindow) this._questWindow.setCategory(this.currentSymbol());
  }
  setQuestWindow(win) {
    this._questWindow = win;
  }
}

// -----------------
// Window_QuestTree
// ----------------
class Window_QuestTree extends Window_Selectable {
  constructor(rect) {
    super(rect);
    this._category = "quest";
    this._expanded = {};
    this._list = [];
    this.refresh();
  }

  setCategory(cat) {
    if (this._category !== cat) {
      this._category = cat; this.refresh(); this.scrollTo(0, 0);
    }
  }
  maxCols() {
    return 1;
  }

  maxItems() {
    return this._list.length;
  }

  itemRect(index) {
    const rect = super.itemRect(index);
    const entry = this._list[index];
    if (!entry) return rect;

    if (entry.type === "quest") {
      // Child quest entries title button
      rect.width = Math.floor(rect.width * 0.88); // make smaller
      rect.x = this.innerWidth - rect.width - 10; // align right
    } else {
      // Group header
      rect.x += 8;
      rect.width -= 16;
    }
    return rect;
  }

  makeList() {
    const quests = Object.values($gameQuests._data || {});
    const filtered = quests.filter(q => {
      if (this._category === "quest") return q._status === 0;
      if (this._category === "completed") return q._status === 1;
      if (this._category === "failed") return q._status === 2;
      return true;
    });
    const groups = {};
    for (const q of filtered) {
      const dq = $dataQuests[q._key] || {};
      const g = dq.category || "General";
      if (!groups[g]) groups[g] = [];
      groups[g].push(q);
    }
    const names = Object.keys(groups).sort();
    this._list = [];
    for (const g of names) {
      if (this._expanded[g] === undefined) this._expanded[g] = true;
      this._list.push({ type: "group", key: g, count: groups[g].length, expanded: this._expanded[g] });
      if (this._expanded[g]) {
        for (const q of groups[g]) this._list.push({ type: "quest", quest: q });
      }
    }
  }

  itemAt(index) {
    const entry = this._list[index];
    if (!entry) return null;
    if (entry.type === "quest") return $dataQuests[entry.quest._key] || null;
    return null;
  }

  drawItem(i) {
    const r = this.itemLineRect(i);
    const e = this._list[i]; if (!e) return;
    if (e.type === "group") {
      const marker = e.expanded ? "-" : "+";
      const headerText = `${marker} ${e.key} (${e.count})`;
      // Use drawTextEx to parse text codes (\C, \I, etc.)
      this.drawTextEx(headerText, r.x + 8, r.y);
    } else {
      const dq = $dataQuests[e.quest._key] || {};
      const title = e.quest._titleOverride || dq.title || "Untitled";
      //Quest titles
      this.drawTextEx(title, r.x, r.y);
    }
  }

  processOk() {
    const e = this._list[this.index()];
    if (e?.type === "group") { this._expanded[e.key] = !this._expanded[e.key]; this.refresh(); return; }
    super.processOk();
  }

  selectFirst() {
    for (let i = 0; i < this._list.length; i++) {
      if (this._list[i].type === "quest") { this.forceSelect(i); return; }
    }
    this.forceSelect(0);
  }

  update() {
    super.update();
    const e = this._list[this.index()];
    const quest = e && e.type === "quest" ? e.quest : null;
    if (this._questDetailWindow) this._questDetailWindow.setQuest(quest);
    if (this._questInfoWindow) this._questInfoWindow.setQuest(quest);
  }

  setQuestDetailWindow(w) {
    this._questDetailWindow = w;
  }

  setQuestInfoWindow(w) {
    this._questInfoWindow = w;
  }

  onCursorMove() {
    const e = this._list[this.index()];
    if (this._questInfoWindow) this._questInfoWindow.setQuest(e && e.type === "quest" ? e.quest : null);
  }
  refresh() { this.makeList(); super.refresh(); }
}

// -------------------
// Window_QuestDetail
// -------------------
class Window_QuestDetail extends Window_Selectable {
  constructor(r) {
    super(r);
    this._quest = null;
    this._data = null;

    // Scroll state
    this._scroll = 0; // current vertical scroll offset
    this._contentHeight = this.innerHeight; // measured content height
  }

  setQuest(q) {
    if (this._quest !== q) {
      this._quest = q;
      // reset scroll position whenever quest changes
      this._scroll = 0;
      this.refresh();
      this.scrollTo(0, 0);
    }
  }

  makeDetail() {
    if (this._quest) {
      const dq = $dataQuests[this._quest._key] || {};
      const title = this._quest._titleOverride || dq.title || `Quest ${this._quest._key}`;
      const description = this._quest._descriptionOverride || dq.description || "";
      const reward = this._quest._rewardOverride || dq.rewards || "";
      const objectives = Object.keys(this._quest._objectives || {}).map(key => {
        const overrideText = this._quest._objectiveDescriptionOverrides
          ? this._quest._objectiveDescriptionOverrides[key]
          : null;
        const baseText = (dq.objectives && dq.objectives[key]) || key;
        return {
          text: overrideText || baseText, status: this._quest._objectives[key], key: key
        };
      });
      this._data = {
        title, description, objectives, reward
      };
    } else {
      this._data = null;
    }
  }

  // -------------------------
  // Scrolling helpers
  // -------------------------
  _ensureScrollInit() {
    if (this._scroll === undefined) this._scroll = 0;
    if (this._contentHeight === undefined) this._contentHeight = this.innerHeight;
  }

  scrollY() {
    this._ensureScrollInit();
    return this._scroll;
  }

  setScrollY(y) {
    this._ensureScrollInit();
    const maxY = Math.max(0, (this._contentHeight || 0) - this.innerHeight);
    this._scroll = Math.max(0, Math.min(y, maxY));
  }

  // Measure exact content height using same layout as drawAllItems
  _measureContentHeight() {
    if (!this._data) return this.innerHeight;
    const rect = this.itemRect();
    let y = rect.y + this.itemPadding();
    const lineH = this.lineHeight();

    // Title area (3 lines reserved)
    y += lineH * 3;

    // Description wrapping
    if (this._data.description) {
      const wrapped = this._wrapText(this._data.description, this.innerWidth - 8);
      y += wrapped.length * lineH;
      y += lineH; // extra spacing
    }

    // Objectives block
    if (this._data.objectives && this._data.objectives.length > 0) {
      y += lineH + 6; // space for "Objectives:" title
      for (const obj of this._data.objectives) {
        const wrappedLines = this._wrapText(obj.text, this.innerWidth - 8);
        y += wrappedLines.length * lineH + 4;
      }
    }

    y += lineH * 2; // bottom padding
    return Math.max(y, this.innerHeight);
  }

  scrollByLines(lines) {
    const step = this.lineHeight() * lines;
    this.setScrollY(this.scrollY() + step);
    this.refresh();
  }

  scrollDown() {
    this.scrollByLines(1);
  }
  scrollUp() {
    this.scrollByLines(-1);
  }
  pageDown() {
    this.scrollByLines(Math.floor(this.innerHeight / this.lineHeight()));
  }
  pageUp() {
    this.scrollByLines(-Math.floor(this.innerHeight / this.lineHeight()));
  }

  // -------------------------
  // Drawing (apply scroll offset)
  // -------------------------
  drawAllItems() {
    this._ensureScrollInit();
    this.contents.clear();
    if (!this._data) return;

    const rect = this.itemRect();
    const lineH = this.lineHeight();
    let y = rect.y + this.itemPadding() - this._scroll; // apply scroll offset here
    const xBase = rect.x + 8;

    // Title
    const cleanTitle = this._data.title.replace(/\\I\[\d+\]/gi, "");
    this.drawTextEx("\\FS[64]" + cleanTitle + "\\FS[20]", xBase, y);
    y += lineH * 3;

    // Description (word-wrapping)
    if (this._data.description) {
      const wrappedLines = this._wrapText(this._data.description, this.innerWidth - 8);
      for (const line of wrappedLines) {
        this.drawTextEx(line, rect.x + 8, y);
        y += lineH;
      }
      y += lineH;
    }

    // Objectives
    if (this._data.objectives && this._data.objectives.length > 0) {
      this.changeTextColor(ColorManager.textColor(17));
      this.drawTextEx("\\C[17]Objectives:\\C[0]", rect.x + 8, y);
      this.resetTextColor();
      y += lineH + 6;

      for (const obj of this._data.objectives) {
        let colorId = 0;
        if (obj.status === 1) colorId = 29;
        else if (obj.status === 2) colorId = 2;

        const text = "\\C[" + colorId + "]- " + obj.text;
        const wrappedLines = this._wrapText(text, this.innerWidth - 8);
        if (wrappedLines.length > 0) {
          const joined = wrappedLines.map(l => l.trim()).join("\n");
          this.drawTextEx(joined, rect.x + 24, y);
          y += lineH * wrappedLines.length;
        }
        y += 4;
      }
    }

    // update measured content height for scrolling limits (exact)
    this._contentHeight = Math.max(this._measureContentHeight(), y + lineH * 2);
  }

  // -------------------------
  // Input & wheel handling
  // -------------------------
  update() {
    // keep default selectable update behaviour
    super.update();
    this._ensureScrollInit();
    // Only process scrolling when window is active
    if (this.isOpenAndActive()) {
      if (Input.isRepeated("down")) this.scrollDown();
      if (Input.isRepeated("up")) this.scrollUp();
      if (Input.isTriggered("pageup")) this.pageUp();
      if (Input.isTriggered("pagedown")) this.pageDown();
      // Mouse wheel (TouchInput.wheelY)
      if (typeof TouchInput !== "undefined") {
        const w = TouchInput.wheelY || 0;
        if (w > 0) this.scrollDown();
        else if (w < 0) this.scrollUp();
      }
      if (TouchInput.isTriggered()) {
        const x = TouchInput.x;
        const y = TouchInput.y;
        if (this.isTouchedInsideFrame(x, y)) {
          if (this.scrollY() > 0) {
            this.processOk();
          }
        }
      }
    }
  }
  
  // size + clamp after refresh
  refresh() {
    this.makeDetail();
    super.refresh();
    this._ensureScrollInit();
    this._contentHeight = this._measureContentHeight();
    this.setScrollY(this.scrollY()); // clamp to new content height
  }

  maxCols() {
    return 1;
  }
  maxItems() {
    return 1;
  }

  itemRect() {
    const x = 0; const y = 0; const width = this.width; const height = this.height;
    return new Rectangle(x, y, width, height);
  }

  _wrapText(text, maxWidth) {
      this.resetFontSettings(); // sync font to current drawTextEx font
      const plainText = text.replace(/\\C\[\d+\]/g, "");
      const words = plainText.split(" ");
      const lines = [];
      let curLine = "";
      for (const w of words) {
          this.resetFontSettings(); // make sure font metrics stay correct
          const test = curLine + w + " ";
          if (this.textWidth(test) > maxWidth) {
              lines.push(curLine.trim());
              curLine = w + " ";
          } else {
              curLine = test;
          }
      }
      if (curLine.trim().length > 0) lines.push(curLine.trim());
      const colorMatch = text.match(/\\C\[(\d+)\]/);
      if (colorMatch) {
          const colorCode = `\\C[${colorMatch[1]}]`;
          return lines.map(l => colorCode + l);
      }
      return lines;
  }
}
// ---------------------------------
// Window_QuestInfo Tracking ON/OFF
// ---------------------------------
Window_QuestDetail.prototype.processOk = function() {
  if (!this._quest) return;
  const questId = this._quest._key;
  const scene = SceneManager._scene;

  if (scene instanceof Scene_Quest) {
    // Decide which message to show
    let message;
    if (_trackedQuestId === questId) {
      _trackedQuestId = null;
      message = "Stopped tracking quest";
    } else {
      _trackedQuestId = questId;
      message = "Tracking quest!";
    }

    // Popup setup
    const popupWidth = 400;
    const popupHeight = 48;
    const popup = new Sprite(new Bitmap(popupWidth, popupHeight));
    popup.bitmap.fontSize = 26;
    popup.bitmap.textColor = "#ffff80";
    popup.bitmap.outlineColor = "rgba(0,0,0,0.8)";
    popup.bitmap.outlineWidth = 4;

    // Position top-right
    popup.anchor.set(1, 0);
    popup.x = Graphics.width - 30;
    popup.y = 10;
    popup.opacity = 255;

    // Draw text aligned to the right
    popup.bitmap.drawText(message, 0, 0, popupWidth + 120, popupHeight, "center");

    // Remove previous popup if exists
    if (scene._pureQuestPopup) {
      scene.removeChild(scene._pureQuestPopup);
      scene._pureQuestPopup = null;
    }

    // Add popup to the scene
    scene.addChild(popup);
    scene._pureQuestPopup = popup;

    // Fade-out behavior
    let duration = 90; // ~1.5 seconds
    popup.update = function() {
      this.opacity -= 255 / duration;
      if (this.opacity <= 0) {
        if (this.parent) this.parent.removeChild(this);
        if (scene._pureQuestPopup === this) scene._pureQuestPopup = null;
      }
    };

    // Ensure popup updates with the scene
    if (!scene._originalUpdateForQuestPopup) {
      const originalUpdate = scene.update.bind(scene);
      scene.update = function() {
        originalUpdate();
        if (this._pureQuestPopup) this._pureQuestPopup.update();
      };
      scene._originalUpdateForQuestPopup = true;
    }

  } else {
    // Silent toggle outside quest scene
    _trackedQuestId = _trackedQuestId === questId ? null : questId;
  }
};

// ------------------------------------------
// Window_QuestInfo (Requirements / Rewards)
// ------------------------------------------
class Window_QuestInfo extends Window_Base {
  constructor(rect, label) { super(rect); this._label = label; this._quest = null; this.refresh(); }
  setQuest(q) { if (this._quest !== q) { this._quest = q; this.refresh(); } }
  refresh() {
    this.contents.clear();
    this.drawTextEx(this._label + ":", 8, 4);
    if (!this._quest) return;
    const dq = $dataQuests[this._quest._key] || {};

    // Use runtime overrides if present (saved in $gameQuests)
    const runtimeQuest = $gameQuests._data?.[String(this._quest._key)] || this._quest;

    const requirementsText = runtimeQuest._requirementOverride != null
      ? runtimeQuest._requirementOverride
      : (dq.requirements || "");

    const rewardText = runtimeQuest._rewardOverride != null
      ? runtimeQuest._rewardOverride
      : (dq.rewards || "");

    const text = (this._label === "Requirements") ? requirementsText : rewardText;
    this.drawTextEx(text, 8, this.lineHeight() + 6);
  }
}

// ------------------------------------
// Window_QuestMessage (popup for map)
// ------------------------------------
class Window_QuestMessage extends Window_Base {
  constructor(rect) {
    super(rect);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._showCount = 0;
    this._messageQueue = [];
    this._message = "";
    this.hide();
    this.refresh();
  }
  update() {
    super.update();
    if (this._showCount > 0) {
      this.contentsOpacity += 16;
      this._showCount--;
    } else if (this.visible) {
      this.contentsOpacity -= 16;
      if (this.contentsOpacity <= 0) {
        if (this._messageQueue.length > 0) {
          this._message = this._messageQueue.shift();
          this._showCount = 150;
        } else {
          this.hide();
        }
        this.refresh();
      }
    }
  }
  open(message) {
    this.show();
    if (this._showCount == 0) {
      this._showCount = 150;
      this._message = message;
    } else {
      this._messageQueue.push(message);
    }
    this.refresh();
  }
  close() { this._showCount = 0; }
  refresh() { this.contents.clear(); this.drawTextEx(this._message, 0, 0); }
}

// --------------------
// Window_QuestTracker
// --------------------
class Window_QuestTracker extends Window_Base {
  constructor(rect) {
    // start with a tiny rect
    super(rect);
    // Make window visually minimal
    this.opacity = 120;            // window background invisible (user_custom)
    this.backOpacity = 120;        // back window skin background (user_custom)
    this.contentsOpacity = 255;  // contents visible (user_custom)
    this.padding = 6;
    this._lastTrackedId = null;
    this._refreshTimer = 0;
    this.hide();
  }

  update() {
    super.update();

    // Refresh when tracked quest changes
    if (this._lastTrackedId !== _trackedQuestId) {
      this._lastTrackedId = _trackedQuestId;
      this.refresh(true); // force refresh
    }
  }

  refresh(force = false) {
    // If quest tracking is off, hide but don't destroy state
    if (!_trackedQuestId || !$gameQuests._data[_trackedQuestId]) {
      this.visible = false;
      return;
    }
    this.visible = true;

    const quest = $gameQuests._data[_trackedQuestId];
    const dq = $dataQuests[quest._key] || {};
    const title = quest._titleOverride || dq.title || `Quest ${quest._key}`;
    const objectives = Object.entries(quest._objectives || {});

    // Build item list (title + objectives)
    const items = [];
    items.push({ kind: "title", text: title });

    for (const [objId, status] of objectives) {
      const raw = (dq.objectives && dq.objectives[objId]) || objId;
      const runtimeText = quest._objectiveDescriptionOverrides?.[objId];
      let displayText = runtimeText || raw;

      // Handle (kill/gather) dynamic progress
      const killMatch = (runtimeText || raw).match(/\(([^)]*)\)\((\d+)\)/);
      if (killMatch) {
        const targetCount = Number(killMatch[2]);
        const data = quest._killObjectives?.[objId];
        const current = data ? data.current : 0;
        displayText =
          (raw.replace(/\s*\([^)]*\)\(\d+\)/, "") || objId) +
          ` (${Math.min(current, targetCount)}/${targetCount})`;
      } else {
        const gatherMatch = (runtimeText || raw).match(/\[([^\]]+)\]\((\d+)\)/);
        if (gatherMatch) {
          const itemName = gatherMatch[1];
          const targetCount = Number(gatherMatch[2]);
          const item = $dataItems.find(i => i && i.name === itemName);
          const current = item ? $gameParty.numItems(item) : 0;
          displayText =
            (raw.replace(/\s*\[[^\]]*\]\(\d+\)/, "") || objId) +
            ` (${Math.min(current, targetCount)}/${targetCount})`;
        }
      }

      let color = 0;
      if (status === 1) color = 29;
      else if (status === 2) color = 2;

      items.push({ kind: "objective", color: color, text: displayText });
    }

    // Layout & size
    const width = 260;
    const x = Graphics.boxWidth - width - 10;
    const y = 50;
    const lineH = 16;
    const maxTextWidth = 396;

    // Estimate height from text wrapping
    let totalLines = 0;
    for (const it of items) {
      const clean = it.text.replace(/\\[A-Z]+\[\d+\]/gi, "").replace(/\\[{}]/g, "");
      const words = clean.split(" ");
      let cur = "";
      let linesNeeded = 1;
      for (const w of words) {
        const test = cur + w + " ";
        if (this.textWidth(test) > maxTextWidth && cur.length > 0) {
          linesNeeded++;
          cur = w + " ";
        } else cur = test;
      }
      totalLines += linesNeeded;
    }

    const finalHeight = Math.max(54, totalLines * lineH + this.padding * 2 + 18);
    const needsResize = this.width !== width || this.height !== finalHeight;

    // Only recreate contents when needed
    if (force || needsResize) {
      this.move(x, y, width, finalHeight);
      this.createContents();
    } else {
      this.contents.clear();
    }

    // Draw all
    let drawY = 0;

    // Title
    this.drawTextEx(`\\FS[18]${title}\\FS[20]`, 0, drawY);
    drawY += 24;

    // Objectives
    for (const it of items) {
      if (it.kind === "title") continue;

      const clean = it.text.replace(/\\[{}]/g, "");
      const words = clean.split(" ");
      let curLine = "";

      for (const w of words) {
        const test = curLine + w + " ";
        const plain = test.replace(/\\[A-Z]+\[\d+\]/gi, "");
        if (this.textWidth(plain) > maxTextWidth && curLine.length > 0) {
          this.drawTextEx(`\\FS[12]\\C[${it.color}]${curLine.trim()}\\FS[20]`, 0, drawY);
          drawY += lineH;
          curLine = w + " ";
        } else {
          curLine = test;
        }
      }

      if (curLine.trim().length > 0) {
        this.drawTextEx(`\\FS[12]\\C[${it.color}]${curLine.trim()}\\FS[20]`, 0, drawY);
        drawY += lineH;
      }
    }
  }
}

// ------------
// Scene_Quest
// ------------
class Scene_Quest extends Scene_MenuBase {
  create() {
    super.create();
    this.createHelpWindow();
    this.createCategoryWindow();
    this.createQuestTreeWindow();
    this.createQuestDetailWindow();
    this.createQuestInfoWindows();
    this.createQuestMessageWindow();
  }

  createCategoryWindow() {
    const rect = this.categoryWindowRect();
    this._categoryWindow = new Window_QuestCategory(rect);
    this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
  }

  categoryWindowRect() {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
  }

  createQuestTreeWindow() {
    const rect = this.questTreeWindowRect();
    this._questTreeWindow = new Window_QuestTree(rect);
    this._questTreeWindow.setHandler("ok", this.onQuestOk.bind(this));
    this._questTreeWindow.setHandler("cancel", this.onQuestCancel.bind(this));
    this.addWindow(this._questTreeWindow);
    this._categoryWindow.setQuestWindow(this._questTreeWindow);
  }

  questTreeWindowRect() {
    const wx = 0;
    const wy = this._categoryWindow.y + this._categoryWindow.height;
    const ww = Math.floor(Graphics.boxWidth / 3);
    const bottomHeight = this.questInfoHeight();
    const wh = this.mainAreaBottom() - wy - bottomHeight + 95;
    return new Rectangle(wx, wy, ww, wh);
  }

  createQuestDetailWindow() {
    const rect = this.questDetailWindowRect();
    this._questDetailWindow = new Window_QuestDetail(rect);
    this._questDetailWindow.setHandler("cancel", this.onQuestDetailCancel.bind(this));
    this.addWindow(this._questDetailWindow);
    this._questTreeWindow.setQuestDetailWindow(this._questDetailWindow);
    this._questDetailWindow.setHandler("ok", this.onQuestDetailOk.bind(this));
  }

  questDetailWindowRect() {
    const wx = this._questTreeWindow.width;
    const wy = this._questTreeWindow.y;
    const ww = Graphics.boxWidth - wx;
    const wh = this._questTreeWindow.height;
    return new Rectangle(wx, wy, ww, wh);
  }

  //Tracking pop up
  createQuestMessageWindow() {
  const rect = new Rectangle(0, 0, 500, this.calcWindowHeight(3, false));
  this._questMessageWindow = new Window_QuestMessage(rect);
  this.addWindow(this._questMessageWindow);
  }

  createQuestInfoWindows() {
    const rect = this.questInfoWindowRect();
    const halfWidth = Math.floor(Graphics.boxWidth / 2);

    const reqRect = new Rectangle(rect.x, rect.y, halfWidth, rect.height);
    const rewardRect = new Rectangle(rect.x + halfWidth, rect.y, Graphics.boxWidth - halfWidth, rect.height);

    this._questReqWindow = new Window_QuestInfo(reqRect, "Requirements");
    this._questRewardWindow = new Window_QuestInfo(rewardRect, "Rewards");

    this.addWindow(this._questReqWindow);
    this.addWindow(this._questRewardWindow);

    this._questTreeWindow.setQuestInfoWindow({
      setQuest: (quest) => {
        this._questReqWindow.setQuest(quest);
        this._questRewardWindow.setQuest(quest);
      }
    });
  }

  questInfoHeight() {
    // slightly smaller 
    return this.calcWindowHeight(2, true);
  }

  questInfoWindowRect() {
    const wx = 0;
    const wy = Graphics.boxHeight - this.questInfoHeight() - this.mainAreaBottomMargin();
    const ww = Graphics.boxWidth;
    const wh = this.questInfoHeight();
    return new Rectangle(wx, wy, ww, wh);
  }

  mainAreaBottomMargin() { return 0; }

  onCategoryOk() {
    this._questTreeWindow.activate();
    this._questTreeWindow.selectFirst();
  }

  onQuestOk() {
    this._questDetailWindow.activate();
  }

  onQuestCancel() {
    this._questTreeWindow.deselect();
    this._categoryWindow.activate();
  }

  onQuestDetailCancel() {
    this._questDetailWindow.deselect();
    this._questTreeWindow.activate();
  }

  onQuestDetailOk() {
    this._questDetailWindow.processOk();
  }
}

// ---------------------------
// Plugin & Scene integration
// ---------------------------
(() => {
  const NAME = "QuestsMz";

  // Data container init
  const _DataManager_createGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function() {
    _DataManager_createGameObjects.call(this);
    $gameQuests = new Game_Quests();
  };

  // Save integration
  const _DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
    const contents = _DataManager_makeSaveContents.call(this);
    contents.quests = $gameQuests;
    return contents;
  };

  const _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
    _DataManager_extractSaveContents.call(this, contents);
    if (contents.quests) $gameQuests = contents.quests;
  };

  QuestManager.setup();

  // -----------------
  // Plugin Commands
  // -----------------
  PluginManager.registerCommand(NAME, "addQuest", args => {
    console.log("Added quest:", args.questID, "with objectives", args.objectives);
    const quest = new Quest();
    quest._key = args.questID;
    $gameQuests._data[args.questID] = quest;
    QuestManager.onAddQuest(quest);

    const objectives = JSON.parse(args.objectives || "[]");
    for (const objective of objectives) {
      quest._objectives[objective] = 0;

      // Description-based KILL parsing
      const dq = $dataQuests[quest._key] || {};
      const desc = (dq.objectives && dq.objectives[objective]) || "";
      const match = desc.match(/\(([^)]*)\)\((\d+)\)/);
      if (match) {
        // Parse enemy names from description (edit: exact match, no quotes in JSON)
        const enemies = match[1]
          .split(',')
          .map(e => e.trim())
          .filter(e => e.length > 0);
        const count = parseInt(match[2], 10);
        if (!quest._killObjectives) quest._killObjectives = {};
        quest._killObjectives[objective] = { enemies, count, current: 0 };
        // Updates the displayed objective text
        if (!quest._objectiveDescriptionOverrides)
          quest._objectiveDescriptionOverrides = {};
        // Remove "(...)(N)" from the description and append progress text
        const baseText = desc.replace(/\s*\([^)]*\)\(\d+\)/, '');
        quest._objectiveDescriptionOverrides[objective] = `${baseText} (0/${count})`;
      }


      // Description-based GATHER parsing
      const gatherMatch = desc.match(/\[([^\]]+)\]\((\d+)\)/);
      if (gatherMatch) {
        const itemName = gatherMatch[1].trim();
        const count = parseInt(gatherMatch[2], 10);
        if (!quest._gatherObjectives) quest._gatherObjectives = {};
        quest._gatherObjectives[objective] = { item: itemName, count, current: 0 };
        if (!quest._objectiveDescriptionOverrides)
          quest._objectiveDescriptionOverrides = {};
        // Determine current item count (sync inventory)
        const item = $dataItems.find(i => i && i.name === itemName);
        let current = 0;
        if (item) current = $gameParty.numItems(item);
        quest._gatherObjectives[objective].current = current;
        const baseText = desc.replace(/\s*\[[^\]]*\]\(\d+\)/, '');
        quest._objectiveDescriptionOverrides[objective] =
          `${baseText} (${Math.min(current, count)}/${count})`;
        // Auto-complete if already has enough items
        if (current >= count) {
          quest._objectives[objective] = 1;
        }
      }

      QuestManager.onAddObjective(quest, objective);
    }
  });

  PluginManager.registerCommand(NAME, "addObjective", args => {
    const quest = $gameQuests._data[args.questID];
    if (quest) {
      quest._objectives[args.objectiveID] = 0;
      QuestManager.onAddObjective(quest, args.objectiveID);
    }
  });

  PluginManager.registerCommand(NAME, "setQuestStatus", args => {
    const quest = $gameQuests._data[args.questID];
    if (quest) {
      quest._status = parseInt(args.status);
      QuestManager.onSetQuestStatus(quest);
    }
  });

  PluginManager.registerCommand(NAME, "setObjectiveStatus", args => {
    const quest = $gameQuests._data[args.questID];
    if (!quest) return console.warn(`Quest ${args.questID} not found.`);
    if (!quest._objectives) quest._objectives = {};
    // Update the status
    quest._objectives[args.objectiveID] = Number(args.status);
    QuestManager.onSetObjectiveStatus(quest, args.objectiveID);
  });

  PluginManager.registerCommand(NAME, "overrideQuestTitle", args => {
    const quest = $gameQuests._data[args.questID];
    if (quest) {
      quest._titleOverride = args.titleOverride;
      QuestManager.onOverrideQuestTitle(quest);
    }
  });

  PluginManager.registerCommand(NAME, "overrideQuestDescription", args => {
    const quest = $gameQuests._data[args.questID];
    if (quest) {
      quest._descriptionOverride = args.descriptionText;
      QuestManager.onOverrideQuestDescription(quest);
    }
  });

  PluginManager.registerCommand(NAME, "overrideObjectiveDescription", args => {
    const quest = $gameQuests._data[args.questID];
    if (quest) {
      // Store the new description override
      if (!quest._objectiveDescriptionOverrides) quest._objectiveDescriptionOverrides = {};
      quest._objectiveDescriptionOverrides[args.objectiveID] = args.descriptionOverride || "";
      QuestManager.onOverrideObjectiveDescription(quest, args.objectiveID);
    }
  });

  PluginManager.registerCommand(NAME, "overrideRequirement", args => {
    const quest = $gameQuests._data[args.questID];
    if (quest) {
      quest._requirementOverride = args.requirementOverride;
      QuestManager.onOverrideQuestRequirement(quest);
    }
  });

  PluginManager.registerCommand(NAME, "overrideReward", args => {
    const quest = $gameQuests._data[args.questID];
    if (quest) {
      quest._rewardOverride = args.rewardOverride;
      QuestManager.onOverrideQuestReward(quest);
    }
  });

  PluginManager.registerCommand(NAME, "resetQuest", args => {
    const questId = args.questID;
    if ($gameQuests._data[questId]) delete $gameQuests._data[questId];
    PluginManager.callCommand(null, NAME, "addQuest", {
      questID: questId, objectives: JSON.stringify(Object.keys($dataQuests[questId].objectives || {}))
    });
  });

  // Menu integration
  const _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
  Window_MenuCommand.prototype.addMainCommands = function() {
    _Window_MenuCommand_addMainCommands.call(this);
    const enabled = this.areMainCommandsEnabled();
    this.addCommand("Quests", "quest", enabled);
  };

  const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("quest", this.commandQuest.bind(this));
  };

  Scene_Menu.prototype.commandQuest = function() {
    SceneManager.push(Scene_Quest);
  };

  // Map popup: only create the popup window on actual map scenes (avoid showing in menus)
  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  
  Scene_Map.prototype.createAllWindows = function() {
    // Quest tacker optimization (thick->trigger based)
    const scene = this;
    if (this._questTrackerWindow && window.QuestManager) {
        QuestManager.setAddQuestCallback(() => scene._questTrackerWindow.refresh(true));
        QuestManager.setAddObjectiveCallback(() => scene._questTrackerWindow.refresh(true));
        QuestManager.setSetQuestStatusCallback(() => scene._questTrackerWindow.refresh(true));
        QuestManager.setSetObjectiveStatusCallback(() => scene._questTrackerWindow.refresh(true));
        QuestManager.setOverrideObjectiveDescriptionCallback(() => scene._questTrackerWindow.refresh(true));
        QuestManager.setOverrideQuestDescriptionCallback(() => scene._questTrackerWindow.refresh(true));
        QuestManager.setOverrideQuestRewardCallback(() => scene._questTrackerWindow.refresh(true));
    }

    _Scene_Map_createAllWindows.call(this);
    if (SceneManager._scene instanceof Scene_Map) {
      const rect = this.questMessageWindowRect ? this.questMessageWindowRect() : new Rectangle(0,0,500,100);
      this._questMessageWindow = new Window_QuestMessage(rect);
      this.addWindow(this._questMessageWindow);

      // Tracker Window
      const trackRect = new Rectangle(Graphics.boxWidth - 2, 40, 1, 1); // tiny initial rect, tracker resize itself
      this._questTrackerWindow = new Window_QuestTracker(trackRect);
      this._questTrackerWindow.hide()
      this.addWindow(this._questTrackerWindow);

      QuestManager.setAddQuestCallback((quest) => {this.onAddQuest(quest);});
      QuestManager.setAddObjectiveCallback((quest, objective) => {this.onAddObjective(quest, objective);});
      QuestManager.setQuestStatusCallback((quest) => {this.onSetQuestStatus(quest);});
      QuestManager.setObjectiveStatusCallback((quest, objective) => {this.onSetObjectiveStatus(quest, objective);});
      QuestManager.setOverrideQuestTitleCallback((quest) => {this.onOverrideQuestTitle(quest);});
      QuestManager.setOverrideQuestDescriptionCallback((quest) => {this.onOverrideQuestDescription(quest);});
      QuestManager.setOverrideObjectiveDescriptionCallback((quest, objective) => {this.onOverrideObjectiveDescription(quest, objective);});
      QuestManager.setOverrideQuestRequirementCallback((quest) => {this.onOverrideQuestRequirement(quest);});
      QuestManager.setOverrideQuestRewardCallback((quest) => {this.onOverrideQuestReward(quest);});
    }
  };

  //Resize icon for Window_QuestTracker
  Window_Base.prototype.processDrawIcon = function(iconIndex, textState) {
    const iconBitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const textHeight = this.contents.fontSize;
    const scale = textHeight / ph;
    const dw = pw * scale;
    const dh = ph * scale;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(iconBitmap, sx, sy, pw, ph, textState.x, textState.y + (this.lineHeight() - dh) / 2, dw, dh);
    textState.x += dw + 4; // small gap after icon
  };

  // Map popup handlers (displaying messages)
  Scene_Map.prototype.onAddQuest = function(quest) {
    const title = ($dataQuests[quest._key] && $dataQuests[quest._key].title) || `Quest ${quest._key}`;
    const message = `\\c[6]NEW QUEST\n\\{${title}`;
    if (this._questMessageWindow) this._questMessageWindow.open(message);
  };

  Scene_Map.prototype.onAddObjective = function(quest, objective) {
    const dq = $dataQuests[quest._key] || {};
    // runtime override -> data text -> objective key
    const objText =
      (quest._objectiveDescriptionOverrides && quest._objectiveDescriptionOverrides[objective]) ||
      (dq.objectives && dq.objectives[objective]) ||
      objective;
    const message = `\\c[6]NEW OBJECTIVE\n\\}${objText}`;
    if (this._questMessageWindow) this._questMessageWindow.open(message);
  };

  Scene_Map.prototype.onSetQuestStatus = function(quest) {
    let label = "QUEST FAILED";
    if (quest._status == 1) label = "QUEST COMPLETED";
    else if (quest._status == 0) label = "QUEST REOPENED";
    const title = ($dataQuests[quest._key] && $dataQuests[quest._key].title) || `Quest ${quest._key}`;
    const message = `\\c[6]${label}\n\\{${title}`;
    if (this._questMessageWindow) this._questMessageWindow.open(message);
  };

  Scene_Map.prototype.onSetObjectiveStatus = function(quest, objective) {
    const status = quest._objectives[objective];
    // Use override if present so completed/failed popups show the cleaned text too
    const dq = $dataQuests[quest._key] || {};
    const objText =
      (quest._objectiveDescriptionOverrides && quest._objectiveDescriptionOverrides[objective]) ||
      (dq.objectives && dq.objectives[objective]) ||
      objective;

    if (status == 1) {
      const message = `\\c[29]OBJECTIVE COMPLETED\n\\}${objText}`;
      if (this._questMessageWindow) this._questMessageWindow.open(message);
    } else if (status == 2) {
      const message = `\\c[2]OBJECTIVE FAILED\n\\}${objText}`;
      if (this._questMessageWindow) this._questMessageWindow.open(message);
    } else {
      // updated description (progress changed)
      this.onOverrideObjectiveDescription(quest, objective);
    }
  };

  Scene_Map.prototype.onOverrideQuestTitle = function(quest) {
    const title = quest._titleOverride || (($dataQuests[quest._key] && $dataQuests[quest._key].title) || `Quest ${quest._key}`);
    const message = `\\c[6]QUEST TITLE UPDATED\n\\}${title}`;
    if (this._questMessageWindow) this._questMessageWindow.open(message);
  };

  Scene_Map.prototype.onOverrideQuestDescription = function(quest) {
    const description = quest._descriptionOverride || (($dataQuests[quest._key] && $dataQuests[quest._key].description) || "");
    const message = `\\c[6]QUEST DESCRIPTION UPDATED\n\\}${description}`;
    if (this._questMessageWindow) this._questMessageWindow.open(message);
  };

  Scene_Map.prototype.onOverrideObjectiveDescription = function(quest, objective) {
    const dq = $dataQuests[quest._key] || {};
    const newDesc =
      (quest._objectiveDescriptionOverrides && quest._objectiveDescriptionOverrides[objective]) ||
      (dq.objectives && dq.objectives[objective]) ||
      objective;
    const message = `\\c[6]OBJECTIVE DESCRIPTION UPDATED\n\\}${newDesc}`;
    if (this._questMessageWindow) this._questMessageWindow.open(message);
  };

  Scene_Map.prototype.onOverrideQuestRequirement = function(quest) {
    const requirement = quest._requirementOverride || (($dataQuests[quest._key] && $dataQuests[quest._key].requirements) || "");
    const message = `\\c[6]REQUIREMENT UPDATED\n\\}${requirement}`;
    if (this._questMessageWindow) this._questMessageWindow.open(message);
  };

  Scene_Map.prototype.onOverrideQuestReward = function(quest) {
    const reward = quest._rewardOverride || (($dataQuests[quest._key] && $dataQuests[quest._key].rewards && $dataQuests[quest._key].rewards[quest._reward]) || "");
    const message = `\\c[6]REWARD UPDATED\n\\}${reward}`;
    if (this._questMessageWindow) this._questMessageWindow.open(message);
  };

  Scene_Map.prototype.questMessageWindowRect = function() {
    const wx = 0;
    const wy = 0;
    const ww = 500;
    const wh = this.calcWindowHeight(3, false);
    return new Rectangle(wx, wy, ww, wh);
  };

  const _Scene_Map_stop = Scene_Map.prototype.stop;
  Scene_Map.prototype.stop = function() {
    _Scene_Map_stop.call(this);
    if (this._questMessageWindow) this._questMessageWindow.close();
  };

  const _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    _Scene_Map_terminate.call(this);
    if (this._questMessageWindow) this._questMessageWindow.hide();
    if (this._questTrackerWindow) this._questTrackerWindow.hide();
  };

  const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
  Scene_Map.prototype.callMenu = function() {
    _Scene_Map_callMenu.call(this);
    if (this._questMessageWindow) this._questMessageWindow.hide();
    if (this._questTrackerWindow) this._questTrackerWindow.hide();
  };

  const _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
  Scene_Map.prototype.launchBattle = function() {
    _Scene_Map_launchBattle.call(this);
    if (this._questMessageWindow) this._questMessageWindow.hide();
    if (this._questTrackerWindow) this._questTrackerWindow.hide();
  };

  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);

    if (this._questTrackerWindow) {
      // Force immediate refresh so tracker reflects changes made in menus
      this._questTrackerWindow._lastTrackedId = null;
      this._questTrackerWindow.refresh();
      if (_trackedQuestId) this._questTrackerWindow.show();
      else this._questTrackerWindow.hide();
    }
  };

  // -------------------------------------
  // Hook enemy death for KILL objectives
  // -------------------------------------
  const _Game_Enemy_die = Game_Enemy.prototype.die;
  Game_Enemy.prototype.die = function() {
    _Game_Enemy_die.call(this);
    const enemyName = this.enemy().name;
    for (const questId in $gameQuests._data) {
      const quest = $gameQuests._data[questId];
      if (!quest._killObjectives) continue;
      // Skip if quest is not ongoing
      if (quest._status !== 0) continue;
      for (const [objId, data] of Object.entries(quest._killObjectives)) {
        // Skip this objective if already completed or failed
        if (quest._objectives[objId] === 1 || quest._objectives[objId] === 2) continue;
        if (data.enemies.includes(enemyName) && quest._objectives[objId] === 0) {
          data.current++;
          const dq = $dataQuests[quest._key] || {};
          const desc = (dq.objectives && dq.objectives[objId]) || '';
          const baseText = desc.replace(/\s*\([^)]*\)\(\d+\)/, '');
          if (!quest._objectiveDescriptionOverrides) quest._objectiveDescriptionOverrides = {};
          quest._objectiveDescriptionOverrides[objId] = baseText + ` (${data.current}/${data.count})`;
          QuestManager.onOverrideObjectiveDescription(quest, objId);
          if (data.current >= data.count) {
            quest._objectives[objId] = 1;
            QuestManager.onSetObjectiveStatus(quest, objId);
          }
        }
      }
    }
  };

  // ------------------------------------------
  // Hook item gain/loss for GATHER objectives
  // ------------------------------------------
  
function hasActiveGatherObjectives() {
    return Object.values($gameQuests._data || {}).some(q =>
        q._status === 0 && q._gatherObjectives && Object.keys(q._gatherObjectives).length > 0
    );
}

const _Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    _Game_Party_gainItem.call(this, item, amount, includeEquip);
    if (!item || !hasActiveGatherObjectives()) return;

    for (const questId in $gameQuests._data) {
      const quest = $gameQuests._data[questId];
      if (!quest._gatherObjectives || quest._status !== 0) continue;

      for (const [objId, data] of Object.entries(quest._gatherObjectives)) {
        if (quest._objectives[objId] === 1 || quest._objectives[objId] === 2) continue;
        if (data.item !== item.name) continue;

        const current = $gameParty.numItems(item);
        data.current = current;

        const dq = $dataQuests[quest._key] || {};
        const desc = (dq.objectives && dq.objectives[objId]) || '';
        const baseText = desc.replace(/\s*\[[^\]]*\]\(\d+\)/, '');
        if (!quest._objectiveDescriptionOverrides)
          quest._objectiveDescriptionOverrides = {};
        quest._objectiveDescriptionOverrides[objId] =
          `${baseText} (${Math.min(current, data.count)}/${data.count})`;

        QuestManager.onOverrideObjectiveDescription(quest, objId);

        if (current >= data.count) {
          quest._objectives[objId] = 1;
          QuestManager.onSetObjectiveStatus(quest, objId);
        } else {
          quest._objectives[objId] = 0;
        }
      }
    }
  };

  // Quest Tracker Instant Refresh for Objective Updates
  const _onSetObjectiveStatus = QuestManager.onSetObjectiveStatus;
  QuestManager.onSetObjectiveStatus = function(quest, objectiveId) {
      _onSetObjectiveStatus.call(this, quest, objectiveId);
      if (SceneManager._scene && SceneManager._scene._questTrackerWindow) {
          SceneManager._scene._questTrackerWindow.refresh(true);
      }
  };

  const _onOverrideObjectiveDescription = QuestManager.onOverrideObjectiveDescription;
  QuestManager.onOverrideObjectiveDescription = function(quest, objectiveId) {
      _onOverrideObjectiveDescription.call(this, quest, objectiveId);
      if (SceneManager._scene && SceneManager._scene._questTrackerWindow) {
          SceneManager._scene._questTrackerWindow.refresh(true);
      }
  };

  // Quest Tracker Instant Refresh for Add Objective
  const _onAddObjective = QuestManager.onAddObjective;
  QuestManager.onAddObjective = function(quest, objectiveId) {
      _onAddObjective.call(this, quest, objectiveId);
      if (SceneManager._scene && SceneManager._scene._questTrackerWindow) {
          SceneManager._scene._questTrackerWindow.refresh(true);
      }
  };
})();
