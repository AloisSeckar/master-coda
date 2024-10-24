import { preventSingleLetterOrphans } from 'elrh-pslo'

export default defineNitroPlugin((nitroApp) => {
  console.log('elrh-pslo plugin initialized')
  nitroApp.hooks.hook('content:file:beforeParse', (file) => {
    console.log('Treating Markdown with elrh-pslo')
    if (file._id.endsWith('.md')) {
      file.body = preventSingleLetterOrphans(file.body)
    }
  })
})
