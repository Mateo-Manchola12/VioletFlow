// generate-module.js
import { existsSync, mkdirSync, writeFileSync, readFileSync, appendFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const name = process.argv[2]

if (!name) {
  console.error('❌ Debes indicar el nombre del módulo. Ej: node generate-module.js users')
  process.exit(1)
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const pascalName = name.charAt(0).toUpperCase() + name.slice(1)
const modulePath = join(__dirname, '..', 'src', 'modules', name)
const indexPath = join(__dirname, '..', 'src', 'modules', 'index.ts')

if (existsSync(modulePath)) {
  console.error(`❌ El módulo "${name}" ya existe.`)
  process.exit(1)
}

mkdirSync(modulePath, { recursive: true })

const files = [
  {
    name: `${name}.controller.ts`,
    content: `import { Request, Response } from 'express'
import * as ${name}Service from './${name}.service'

export async function get${pascalName}(req: Request, res: Response) {
  const data = await ${name}Service.getAll()
  res.json(data)
}
`,
  },
  {
    name: `${name}.service.ts`,
    content: `import { $ } from '../../config/db'
import { ${pascalName}Schema } from './${name}.model'

export async function getAll() {
  const data = await $.collection('${name}').find().toArray()
  return data.map((item) => ${pascalName}Schema.parse(item))
}
`,
  },
  {
    name: `${name}.routes.ts`,
    content: `import { Router } from 'express'
import { get${pascalName} } from './${name}.controller'

const router = Router()

router.get('/', get${pascalName})

export default router
`,
  },
  {
    name: `${name}.model.ts`,
    content: `import { z } from 'zod'

export const ${pascalName}Schema = z.object({
  _id: z.string().optional(),
  // Añade aquí los campos reales
  name: z.string(),
})

export type ${pascalName} = z.infer<typeof ${pascalName}Schema>
`,
  },
  {
    name: `${name}.events.ts`,
    content: `import { Server, Socket } from 'socket.io'

export function register${pascalName}Events(io: Server, socket: Socket) {
  // socket.on('${name}:event', () => { ... })
}
`,
  },
  {
    name: `${name}.types.ts`,
    content: `// Tipos auxiliares para ${name}

export interface Example${pascalName} {
  id: string
}
`,
  },
]

files.forEach(({ name: fileName, content }) => {
  const filePath = join(modulePath, fileName)
  writeFileSync(filePath, content)
  console.log(`✅ Archivo creado: ${fileName}`)
})

// 🔁 Actualizar modules/index.ts
const exportRoutesLine = `import ${name}Routes from './${name}/${name}.routes'`
const exportEventsLine = `import { register${pascalName}Events } from './${name}/${name}.events'`

let indexContent = ''
if (existsSync(indexPath)) {
  indexContent = readFileSync(indexPath, 'utf-8')
} else {
  indexContent = `// Auto generado por generate-module.js

export const moduleRoutes = []
export const socketEventRegistrars = []
`
  writeFileSync(indexPath, indexContent)
}

// Evitar duplicados
if (!indexContent.includes(exportRoutesLine)) {
  indexContent =
    `${exportRoutesLine}\n${exportEventsLine}\n\n` +
    indexContent
      .replace(
        /export const moduleRoutes = \[/,
        `export const moduleRoutes = [\n  { path: '/${name}', router: ${name}Routes },`,
      )
      .replace(
        /export const socketEventRegistrars = \[/,
        `export const socketEventRegistrars = [\n  register${pascalName}Events,`,
      )

  writeFileSync(indexPath, indexContent)
  console.log('✅ index.ts actualizado')
}

console.log(`✅ Módulo funcional "${name}" generado en src/modules/${name}`)
