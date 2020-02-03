import * as fs from 'fs-extra'

import ClassModelsLoader from './class-models-loader'
import { IArgs } from './main'
import { IContentType, IEditorInterface } from './model'

const { createClient } = require('contentful-management')

enum SourceType {
  FROM,
  TO
}

export interface ISource {
  id: string
  contentTypes: IContentType[]
  editorInterfaces: IEditorInterface[]
}

export default class Source {
  public static loadSources(args: IArgs): Promise<ISource[]> {
    return Promise.all([
      this.loadSource(args.from, args, SourceType.FROM),
      this.loadSource(args.to, args, SourceType.TO),
    ])
  }

  private static async loadSource(source: string, args: IArgs, sourceType: SourceType): Promise<ISource> {
    let contentTypes: any[]
    let editorInterfaces: IEditorInterface[]

    if (args.modelsDirectory && sourceType === SourceType.FROM) {
      contentTypes = await new ClassModelsLoader(args.modelsDirectory).loadModels()
      // TODO: Make these easy to define in the class models
      editorInterfaces = []
    } else if (await fs.pathExists(source)) {
      const contents = await fs.readFile(source)
      const parsedJSON = JSON.parse(contents.toString())

      contentTypes = parsedJSON.contentTypes
      editorInterfaces = parsedJSON.editorInterfaces
    } else {
      [contentTypes, editorInterfaces] = await this.loadFromContentful(source, args)
    }

    return {
      id: source,
      contentTypes,
      editorInterfaces,
    }
  }

  private static async loadFromContentful(source: string, args: IArgs) {
    if (!args.managementToken) {
      throw new Error(`${source} is not a file and no management token was provided to load from Contentful`)
    }

    const env: any = await this.getContentfulEnvironment(source, args)
    let contentTypes: any[] = (await env.getContentTypes()).items

    if (args.contentTypes && args.contentTypes.length > 0) {
      // User has provided specific contentTypes they want to migrate
      contentTypes = contentTypes.filter((ct) => args.contentTypes.includes(ct.sys.id))
    }

    const editorInterfaces: IEditorInterface[] = contentTypes.map<any>(async (ct) => await ct.getEditorInterface())

    return [contentTypes, editorInterfaces]
  }

  private static async getContentfulEnvironment(source: string, args: IArgs) {
    const { spaceId, envId } = this.parseEnv(source)

    const client = createClient({ accessToken: args.managementToken })

    try {
      const space = await client.getSpace(spaceId)
      return await space.getEnvironment(envId)
    } catch (e) {
      // the source may not be a space - it might be an environment on the '--from' space

      if (args.from === source) {
        // We are already pulling for the "from" space
        throw e
      }

      const fromSpaceId = this.parseEnv(args.from).spaceId
      const toEnvironment = source

      const space = await client.getSpace(fromSpaceId)
      return await space.getEnvironment(toEnvironment)
    }
  }

  private static parseEnv(source: string): { spaceId: string; envId: string } {
    const parts = source.split('/')
    return {
      spaceId: parts[0],
      envId: parts.length > 1 ? parts[1] : 'master',
    }
  }
}
