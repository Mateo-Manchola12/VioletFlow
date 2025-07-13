import { execSync } from 'child_process';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Error: Debes pasar la ruta del modulo.');
  process.exit(1);
}

const modulePath = args[0];
const command = `ng g m modules/${modulePath} --routing --route`;

try {
  console.log(`Ejecutando: ${command}`);
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error al generar el modulo:', error);
  process.exit(1);
}
