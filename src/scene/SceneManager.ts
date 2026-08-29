import { IScene } from './IScene';

export class SceneManager {
  private scenes: Map<string, IScene> = new Map();
  private currentScene: IScene | null = null;

  constructor() {}

  /**
   * Register new scene with its name.
   */
  public add(scene: IScene): void {
    this.scenes.set(scene.name, scene);
  }

  /**
   * Change to the next scene. On start, the first scene is null.
   */
  public async changeTo(name: string) {
    if (this.currentScene) {
      this.currentScene.destroy();
    }

    const nextScene = this.scenes.get(name);
    if (!nextScene) {
      throw new Error(`Szene "${name}" existiert nicht.`);
    }

    this.currentScene = nextScene;
    this.currentScene.create();
  }

  /**
   * The function updates the current scene.
   */
  public update(deltaTime: number): void {
    if (this.currentScene) {
      this.currentScene.update(deltaTime);
    }
  }

  /**
   * The function renders the current scene.
   */
  public render(ctx: CanvasRenderingContext2D): void {
    if (this.currentScene) {
      this.currentScene.render(ctx);
    }
  }
}
