const makeid = function (length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const errByType = function (error) {
  if (error && error.details) {
    error = error.details.reduce((byPath, errors) => {
      byPath[errors.path[0]] = errors.message;
      return byPath;
    }, {});

    return error;
  }

  return null;
}

module.exports = {
  makeid,
  errByType
}