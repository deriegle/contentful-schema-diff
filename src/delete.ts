import { IContext } from './runners'
import { AsyncWrite } from './runners/async_writer'

export class DeleteContentType {
  public static writeDelete(id: string, write: AsyncWrite, context?: IContext): Promise<void> {
    return write(`
    migration.deleteContentType('${id}')
  `)
  }
}

export const writeDelete = DeleteContentType.writeDelete
