module.exports = {
  gpsToRad: (gpsCoords) => gpsCoords.map(coord => ((coord/180)*Math.PI).toPrecision(7)),
  toAngularRadius: (radius) => (radius/6371).toPrecision(7)
}