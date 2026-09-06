import { Game } from './scene/Game';
import { SceneManager } from './scene/SceneManager';
import { SpaceScene } from './scene/SpaceScene';
import { StartScene } from './scene/StartScene';

window.addEventListener('DOMContentLoaded', () => {
  const sceneManager = new SceneManager();

  /**
   * create and register scenes.
   */
  sceneManager.add(new StartScene(sceneManager));
  sceneManager.add(new SpaceScene(sceneManager));

  /**
   * Set the initial scene.
   */
  sceneManager.changeTo('StartScene');

  /**
   * Start the game.
   */
  const game = new Game('canvas', sceneManager);
  game.start();
});
