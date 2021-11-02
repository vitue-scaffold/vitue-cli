const colors = require('colors');

exports.logCompleteMsg = (opts, name) => {
  console.log('');
  console.log('  # Generate successful \n'.gray);
  console.log('  To get started: \n'.green);
  if (Array.isArray(opts.bash)) {
    opts.bash.forEach(function(item){
      console.log('    ' + item );
    })
  }
  console.log('\n  🤗 All finished, Good luck!');
  console.log('\n  To learn more, visit https://fe.workplus.io');
}
