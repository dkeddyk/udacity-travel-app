const weatherbitIconMap = require.context('./', true, /\.png$/);

function createIconMap() {
  return new Map(
    weatherbitIconMap.keys().map((path) => {
      return [path.slice(2, path.indexOf('.png')), weatherbitIconMap(path)];
    })
  );
}

module.exports = createIconMap();
