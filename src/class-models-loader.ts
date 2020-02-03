import * as fs from 'fs-extra'
import * as path from 'path'

export default class ClassModelsLoader {
  private modelsFolder: string

  constructor(modelsFolder: string) {
    this.modelsFolder = path.join(__dirname, modelsFolder)
  }

  public async loadModels(): Promise<any[]> {
    const files = fs.readdirSync(this.modelsFolder)

    return files.map((f) => require(f).toJSON())
  }
}
