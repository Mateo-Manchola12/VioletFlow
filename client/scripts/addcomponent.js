import { execSync } from 'child_process';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Error: Debes pasar la ruta del componente.');
  process.exit(1);
}

const componentPath = args[0];
const command = `ng g c ${componentPath} --skip-tests --style=none`;

try {
  console.log(`Ejecutando: ${command}`);
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error al generar el componente:', error);
  process.exit(1);
}
