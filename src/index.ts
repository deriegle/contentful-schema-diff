// tslint:disable no-console

import * as fs from 'fs-extra'
import * as yargs from 'yargs'

import Run from './main'

const argv = yargs
  .usage('$0 --from <export file or space> --to <export file or space>')
  .option('from', {
    alias: 'f',
    demandOption: true,
    type: 'string',
    description: 'A contentful export file, or Contentful Space ID',
  })
  .option('modelsDir', {
    alias: 'm',
    type: 'string',
    description: 'Provide a models directory to use in place of "to"',
  })
  .option('to', {
    alias: 't',
    demandOption: true,
    type: 'string',
    description: 'A contentful export file, space ID, or environment within the "from" space',
  })
  .option('content-type', {
    alias: 'c',
    type: 'string',
    description: 'Generate a migration only for this content type.  Repeat to select multiple types.',
  })
  .option('out', {
    alias: 'o',
    type: 'string',
    description: 'The output directory (or file if "--one-file" was specified) in which to place the migration',
  })
  .option('token', {
    alias: 'a',
    type: 'string',
    description: 'A Contentful management token to download content types from a space',
  })
  .option('oneFile', {
    alias: 'one-file',
    description: 'Write all the migrations in a single file',
    type: 'boolean',
  })
  .argv

if (!argv.out) {
  if (fs.existsSync('./db/migrate/')) {
    argv.out = './db/migrate/'
  } else {
    argv.out = './'
  }
}

fs.mkdirp(argv.out as string)

const contentTypes = argv.contentType && (Array.isArray(argv.contentType) ? argv.contentType : [argv.contentType])

Run({
  from: argv.from,
  out: argv.out,
  to: argv.to,
  modelsDirectory: argv.modelsDir,
  managementToken: (argv.token || process.env.CONTENTFUL_MANAGEMENT_TOKEN),
  oneFile: argv.oneFile,
  contentTypes,
})
  .then((files) => files.forEach((file) => console.log(file)))
  .catch(console.error)
