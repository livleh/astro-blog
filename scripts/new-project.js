import { input } from '@inquirer/prompts'
import fs from 'fs'
import path from 'path'
import { isFileNameSafe } from './utils.js'

function getProjectFullPath(fileName) {
  return path.join('./src/content/projects', `${fileName}.yaml`)
}

const fileName = await input({
  message: 'Enter file name',
  validate: (value) => {
    if (!isFileNameSafe(value)) {
      return 'File name can only contain letters, numbers, and hyphens'
    }
    const fullPath = getProjectFullPath(value)
    if (fs.existsSync(fullPath)) {
      return `${fullPath} already exists`
    }
    return true
  },
})

const title = await input({
  message: 'Enter project title',
})
const description = await input({
  message: 'Enter project description',
})
const link = await input({
  message: 'Enter project URL',
})
const image = await input({
  message: 'Enter preview image URL',
})

const content = `title: ${title}
description: ${description}
link: ${link}
image: ${image}
`

const fullPath = getProjectFullPath(fileName)
fs.writeFileSync(fullPath, content)
console.log(`Successfully created ${fullPath}`)
