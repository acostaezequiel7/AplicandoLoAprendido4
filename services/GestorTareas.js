

const { createTarea } = require('../models/Tarea');

const cloneList = (list) => list.map(t => Object.freeze(Object.assign({}, t)));

function agregarTarea(list, tareaParams) {
  const tarea = createTarea(tareaParams);
  return Object.freeze([ ...cloneList(list), tarea ]);
}

function obtenerPorId(list, id) {
  return list.find(t => t.id === id) || null;
}

function actualizarTarea(list, id, cambios = {}) {
  return Object.freeze(
    list.map(t => {
      if (t.id !== id) return t;
      const nueva = Object.assign({}, t, cambios, { ultimaEdicion: new Date().toISOString() });
      return Object.freeze(nueva);
    })
  );
}

function eliminarTarea(list, id) {
  return Object.freeze(list.filter(t => t.id !== id));
}

function filtrar(list, predicate) {
  return Object.freeze(list.filter(predicate));
}

function ordenarPor(list, key, asc = true) {
  const cloned = cloneList(list);
  const sorted = cloned.sort((a,b) => {
    const va = a[key] || '';
    const vb = b[key] || '';
    if (va < vb) return asc ? -1 : 1;
    if (va > vb) return asc ? 1 : -1;
    return 0;
  });
  return Object.freeze(sorted);
}

function contarPorEstado(list) {
  return list.reduce((acc, t) => {
    acc[t.estado] = (acc[t.estado] || 0) + 1;
    return acc;
  }, {});
}

module.exports = {
  agregarTarea,
  obtenerPorId,
  actualizarTarea,
  eliminarTarea,
  filtrar,
  ordenarPor,
  contarPorEstado
};
