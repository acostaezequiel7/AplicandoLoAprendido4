

const { v4: uuidv4 } = require('uuid');

/**
 * @param {Object} params
 * @returns {Object}
 */
function createTarea(params = {}) {
  const {
    titulo = '',
    descripcion = '',
    estado = 'Pendiente',
    vencimiento = null,
    dificultad = 'Fácil',
  } = params;

  const now = new Date().toISOString();

  return Object.freeze({
    id: params.id || uuidv4(),
    titulo: String(titulo).slice(0, 100),
    descripcion: descripcion ? String(descripcion).slice(0, 500) : '',
    estado,
    creacion: params.creacion || now,
    ultimaEdicion: params.ultimaEdicion || now,
    vencimiento,
    dificultad
  });
}

module.exports = { createTarea };
