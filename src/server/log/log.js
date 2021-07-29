function log(message) {
  console.log(`Server Log at ${new Date().toISOString()}:`);
  console.log(message);
  console.log('');
}

module.exports = log;
