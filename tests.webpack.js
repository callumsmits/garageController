const context = require.context('./components', true, /-test\.jsx?$/);
console.log(context.keys());
context.keys().forEach(context);
