import { execSync } from 'child_process'

const [, , pkg, cmd, ...args] = process.argv

if (!pkg || !cmd) {
  console.error('Uso: node run-in-package.js <paquete> <comando> [args...]')
  process.exit(1)
}

const command = `npm run ${cmd} --prefix ${pkg} -- ${args.join(' ')}`

try {
  console.log(`Ejecutando: ${command}`)
  execSync(command, { stdio: 'inherit' })
} catch (error) {
  console.error('Error ejecutando comando:', error)
  process.exit(1)
}
