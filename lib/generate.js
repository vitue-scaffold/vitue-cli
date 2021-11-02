const async = require('async');
const Metalsmith = require('metalsmith');
const inquirer = require('inquirer');
const render = require('consolidate').underscore.render;

const path = require('path');
const metadata = require('read-metadata');
const exists = require('fs').existsSync;
const gituser = require('./git-user');
const validateName = require('validate-npm-package-name');

const logger = require('./logger');

/**
 * Build.
 */
module.exports = function generate (name, src, dest, done) {
  let opts = {
    'name': '',
    'description': '',
    'bash': ['yarn || npm install', 'yarn dev || npm run dev'],
  };
  let metalsmith = Metalsmith(src)
    .use(ask(opts))
    .use(template)
    .clean(false)
    .source('.') // current directory
    .destination(dest)
    .build(function(err){
      if (err) return done(err);
      logger.logCompleteMsg(opts, name);
      done();
    });
};

/**
 * Prompt plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function ask(opts){
  return function(files, metalsmith, done) {
    let questions = [{
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: opts.name,
      validate: function(name){
        var its = validateName(name)
        if (!its.validForNewPackages) {
          var errors = (its.errors || []).concat(its.warnings || [])
          return 'Sorry, ' + errors.join(' and ') + '.'
        }
        return true
      }
    },{
      type: 'input',
      name: 'description',
      message: 'Project description',
      default: opts.description,
      validate: function(name){
        if (name.trim().length === 0) {
          return 'Description cannot be empty';
        } 
        return true;
      }
    },{
      type: 'input',
      name: 'author',
      message: 'Author',
      default: gituser,
      validate: function(name){
        if (name.trim().length === 0) {
          return 'Author cannot be empty';
        } 
        return true;
      }
    }];
    let metadata = metalsmith.metadata();

    inquirer.prompt(questions)
      .then((answers) => {
        questions.forEach((item)=>{
          metadata[item.name] = answers[item.name];
        })
        done();
      });
  }
}

/**
 * Template in place plugin.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */

function template(files, metalsmith, done){
  var keys = Object.keys(files);
  var metadata = metalsmith.metadata();

  async.each(keys, run, done);

  function run(file, done){
    var str = files[file].contents.toString();

    // do not attempt to render files that do not have mustaches
    if (!/<%=([^]+)%>/g.test(str)) {
      return done();
    }
    render(str, metadata, function(err, res){
      if (err) return done(err);
      files[file].contents = new Buffer(res);
      done();
    });
  }
}
