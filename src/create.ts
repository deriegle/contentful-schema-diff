import { IContentType } from './model'
import { IContext } from './runners'
import { AsyncWrite } from './runners/async_writer'
import { dump } from './utils/object'
import { camelCase } from './utils/string'

export class CreateContentType {
  public static async writeCreate(newType: IContentType, write: AsyncWrite, context: IContext): Promise<void> {
    const v = camelCase(newType.sys.id)
    const typeDef = Object.assign({}, newType)
    delete (typeDef.fields)
    delete (typeDef.sys)

    await write(`
  var ${v} = migration.createContentType('${newType.sys.id}', ${dump(typeDef)})
`)
    context.varname = v

    for (const field of newType.fields) {
      const fieldDef = Object.assign({}, field)
      delete (fieldDef.id)

      await write(`
  ${v}.createField('${field.id}', ${dump(fieldDef)})
`)
    }
  }
}

export const writeCreate = CreateContentType.writeCreate
