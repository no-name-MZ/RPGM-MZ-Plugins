//=============================================================================
// Follower Touch for Moghunter Event Sensor
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc Requires: "MOG_EventSensor.js". Follower Touch for Moghunter Event Sensor.
 * @author no__name
 * @url https://mogplugins.com/mz-mog-event-sensor/
 * @help
 * 
 * Place this plugin below MOG_EventSensor.js.
 * Allows events with "follower_touch" to trigger when any follower is adjacent.
 *
 * Usage:
 *  - Add an event comment: follower_touch
 *
 * Followers will trigger the event if they are on or next to the event,
 * regardless of direction faced.
 * 
 */

(() => {
  'use strict';

  const hasFollowerTouchTag = (event) => {
    const page = event.page();
    if (!page || !page.list) return false;
    return page.list.some(cmd =>
      (cmd.code === 108 || cmd.code === 408) &&
      cmd.parameters[0].toLowerCase().includes('follower_touch')
    );
  };

  const _mogSensorUpdate = Game_Event.prototype.update;
  Game_Event.prototype.update = function() {
    _mogSensorUpdate.call(this);
    if (!this.page() || !hasFollowerTouchTag(this)) return;
    if ($gameMap.isEventRunning()) return;

  const allActors = [$gamePlayer, ...$gamePlayer.followers().data()];
  for (const actor of allActors) {
    const dx = Math.abs(actor.x - this.x);
    const dy = Math.abs(actor.y - this.y);
    if ((dx + dy) === 1 || (dx === 0 && dy === 0)) {
      this.start();
      break;
      }
    }
  };
})();
