import { Game } from './Game';
import { SceneManager } from './SceneManager';
import { SpaceScene } from './SpaceScene';
import { StartScene } from './StartScene';

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
