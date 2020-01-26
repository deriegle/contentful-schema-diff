import { IArgs } from '../main'
import { FilePerContentTypeRunner } from './file_per_content_type'
import { WriteSingleFileRunner } from './write_single_file'

export interface IContext {
  open?: boolean,

  [key: string]: any
}

export default function buildRunner(args: IArgs, header: string, footer: string) {
  return args.oneFile
    ? new WriteSingleFileRunner(args.out, header, footer)
    : new FilePerContentTypeRunner(args.out, header, footer)
}
