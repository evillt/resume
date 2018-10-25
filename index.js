const marked = require('marked')
const fs = require('fs-extra')
const readFileSync = path => fs.readFileSync(path, 'utf8')
const template = readFileSync('./template.html')

const renderPage = (file, md) => {
  const html = template.replace('<!-- render-markdown-outlet -->', marked(md))
  fs.outputFileSync(
    `dist/${file}.html`,
    html,
    'utf8'
  )
}

const markdownSources = {}

const pages = [ 'index', 'en' ]
pages.forEach(page => {
  markdownSources[page] = readFileSync(`./markdown/${page}.md`)
  renderPage(page, markdownSources[page])
})
