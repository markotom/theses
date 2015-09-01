'use strict';

require('colors');

var debug = require('./lib/debug');
var fs = require('fs');
var MongooseError = require('mongoose').Error;
var program = require('commander');
var Thesis = require('./models/thesis');

/** Find or create theses */
var findOrCreate = function (theses) {
  theses = theses || [];

  /** Mapping */
  theses.forEach(function (params) {
    /** Find thesis if exists */
    Thesis.findOneAsync({ title: params.title })
      .then(function (thesis) {
        thesis = thesis || {};
        thesis.title = params['Título'];
        thesis.author = params['Sustentante'];
        thesis.advisor = params['Asesor'];
        thesis.source = params['Medio'];
        thesis.url = params['Recurso electrónico'];
        thesis.year = params['Datos de Publicación'];
        thesis.description = params['Descripción física'];

        if (/Facultad de Estudios Superiores Acatlán/.test(params['Sec. Corporativo'])) {
          thesis.institution = 'Facultad de Estudios Superiores Acatlán';
        }

        if (/Facultad de Filosofía y Letras/.test(params['Sec. Corporativo'])) {
          thesis.institution = 'Facultad de Filosofía y Letras';
        }

        if (thesis._id) {
          /** Update thesis */
          return thesis.updateAsync().then(function () {
            return Thesis.findOneAsync({ _id: thesis._id });
          });
        }

        /** Create thesis */
        return Thesis.createAsync(thesis);
      })
      .then(function (thesis) {
        if (thesis) {
          console.log('Thesis synced'.cyan, thesis._id.toString().yellow);
          debug.database.info(thesis);
        };
      })
      .catch(MongooseError, debug.database.error)
      .catch(debug);
  });
};

// Program defaults
program
  .version('0.0.1')
  .option('-f, --file <file>', 'Add JSON file to sync', './raw/theses.json');

// Command to sync theses
program
  .command('theses')
  .action(function () {
    if (program.file) {
      var theses = fs.readFileSync(program.file).toString();
      theses = JSON.parse(theses);

      if (theses) {
        findOrCreate(theses);
      }
    }
  });

program.parse(process.argv);
