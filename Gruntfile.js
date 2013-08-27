module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dist/index.html': 'index.html'     // 'destination': 'source'
        }
      }
    }
  });


  // load custom tasks
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task(s).
  grunt.registerTask( 'default', []);
  grunt.registerTask( 'dist', [ 'htmlmin' ] );

};
