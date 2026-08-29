import { Game } from './Game';
import { SceneManager } from './SceneManager';
import { StartScene } from './StartScene';

window.addEventListener('DOMContentLoaded', () => {
  const sceneManager = new SceneManager();

  /**
   * create and register scenes.
   */
  const gameScene = new StartScene(sceneManager);

  sceneManager.add(gameScene);

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
