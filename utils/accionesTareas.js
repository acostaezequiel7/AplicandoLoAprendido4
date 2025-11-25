
function compose(...fns) {
  return function(initial) {
    return fns.reduceRight((acc, fn) => fn(acc), initial);
  };
}

function pipe(...fns) {
  return function(initial) {
    return fns.reduce((acc, fn) => fn(acc), initial);
  };
}

function curry2(fn) {
  return function(a) {
    return function(b) {
      return fn(a,b);
    };
  };
}

function porEstado(estado) {
  return function(tarea) {
    return tarea.estado === estado;
  };
}

function tituloIncluye(text) {
  const lower = String(text || '').toLowerCase();
  return function(tarea) {
    return tarea.titulo.toLowerCase().includes(lower);
  };
}

module.exports = {
  compose,
  pipe,
  curry2,
  porEstado,
  tituloIncluye
};
