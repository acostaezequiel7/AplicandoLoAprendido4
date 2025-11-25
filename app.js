
const fs = require('fs');
const path = require('path');
const rl = require('readline-sync');

const dataPath = path.join(__dirname, 'data', 'tareas.json');

const {
  agregarTarea,
  obtenerPorId,
  actualizarTarea,
  eliminarTarea,
  filtrar,
  ordenarPor,
  contarPorEstado
} = require('./services/GestorTareas');

const { tituloIncluye, porEstado } = require('./utils/accionesTareas');

function readData() {
  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeData(list) {
  fs.writeFileSync(dataPath, JSON.stringify(list, null, 2), 'utf8');
}


function mostrarMenu() {
  console.log('\n=== TP4 - Lista de Tareas (Funcional) ===');
  console.log('1) Listar tareas');
  console.log('2) Agregar tarea');
  console.log('3) Editar tarea');
  console.log('4) Eliminar tarea');
  console.log('5) Filtrar por estado');
  console.log('6) Buscar por título');
  console.log('7) Contar por estado');
  console.log('0) Salir');
  const opt = rl.question('Elige una opción: ');
  return opt.trim();
}

function listar(list) {
  console.log('\n--- Tareas (' + list.length + ') ---');
  list.forEach(t => {
    console.log(`${t.id} | ${t.titulo} | ${t.estado} | ${t.dificultad}`);
  });
}

function run() {
  let tareas = readData();

  while (true) {
    const opt = mostrarMenu();
    if (opt === '0') {
      console.log('Saliendo. Guardando cambios...');
      writeData(tareas);
      break;
    }
    if (opt === '1') {
      listar(tareas);
    } else if (opt === '2') {
      const titulo = rl.question('Titulo: ');
      const descripcion = rl.question('Descripcion (opcional): ');
      const dificultad = rl.question('Dificultad (Fácil/Medio/Difícil): ') || 'Fácil';
      tareas = agregarTarea(tareas, { titulo, descripcion, dificultad });
      console.log('Tarea agregada.');
    } else if (opt === '3') {
      const id = rl.question('ID de tarea a editar: ');
      const exist = obtenerPorId(tareas, id);
      if (!exist) { console.log('Tarea no encontrada'); continue; }
      const nuevoTitulo = rl.question(`Nuevo titulo (ENTER para mantener: ${exist.titulo}): `) || exist.titulo;
      const nuevoEstado = rl.question(`Nuevo estado (Pendiente/En Curso/Terminada/Cancelada) [${exist.estado}]: `) || exist.estado;
      tareas = actualizarTarea(tareas, id, { titulo: nuevoTitulo, estado: nuevoEstado });
      console.log('Tarea actualizada.');
    } else if (opt === '4') {
      const id = rl.question('ID de tarea a eliminar: ');
      tareas = eliminarTarea(tareas, id);
      console.log('Si existia, la tarea fue eliminada.');
    } else if (opt === '5') {
      const estado = rl.question('Estado a filtrar: ');
      const filtradas = filtrar(tareas, porEstado(estado));
      listar(filtradas);
    } else if (opt === '6') {
      const term = rl.question('Texto a buscar en título: ');
      const result = filtrar(tareas, tituloIncluye(term));
      listar(result);
    } else if (opt === '7') {
      console.log('Conteo por estado:', contarPorEstado(tareas));
    } else {
      console.log('Opción inválida.');
    }
  }
}

if (require.main === module) {
  run();
}
