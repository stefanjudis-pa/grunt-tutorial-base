module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    // clean it up
    clean: {
      build: {
        src: [ 'dist' ]
      }
    },

    // css minification
    cssmin: {
      combine : {
        files: {
          'dist/css/main.min.css': [ 'css/bootstrap.min.css', 'css/bootstrap-responsive.min.css' ]
        }
      },
      minify: {
        expand: true,
        src: [ 'css/main.css' ],
        dest: 'dist/',
        ext: '.min.css'
      }
    },


    // copy all the stuff
    copy: {
      scripts : {
        files: [
          {
            src    : ['js/**'],
            dest   : 'dist/',
            filter : 'isFile'
          }
        ]
      },
      stylesheets : {
        files: [
          {
            src    : ['css/**'],
            dest   : 'dist/',
            filter : 'isFile'
          }
        ]
      }
    },


    // html compression
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dist/index.html': 'dist/index.html'     // 'destination': 'source'
        }
      }
    },


    // image optimization
    imagemin: {
      dynamic: {                         // Another target
        files: [
          {
            expand: true,                  // Enable dynamic expansion
            cwd: 'img/',                   // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
            dest: 'dist/img/'                  // Destination path prefix
          }
        ]
      }
    },


    // lint that sneaky js
    jshint: {
      files   : [ 'Gruntfile.js', 'js/**/*.js' ],
      options : {
        ignores : [ 'js/vendor/**/*.js' ]
      }
    },


    // create different index html's
    targethtml: {
      dev : {
        files : {
          'index.html' : 'tmpl/index.html'
        }
      },
      dist: {
        files: {
          'dist/index.html': 'tmpl/index.html'
        }
      }
    },


    // js compression
    uglify : {
      my_target : {
        files : {
          'dist/js/main.min.js' : [ 'js/main.js', 'js/vendor/bootstrap.min.js' ]
        }
      }
    },


    // watcher power
    watch: {
      scripts: {
        files: [ 'Gruntfile.js', 'js/**/*.js' ],
        tasks: [ 'jshint' ],
        options: {
          spawn: false
        }
      },
      template : {
        files: [ 'tmpl/*.html' ],
        tasks: [ 'targethtml:dev' ],
        options: {
          spawn: false
        }
      }
    }
  });


  // load custom tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-targethtml');


  // Default task(s).
  grunt.registerTask( 'default', [] );
  grunt.registerTask( 'dev', [ 'targethtml:dev', 'jshint' ] );
  grunt.registerTask(
    'dist',
    [
      'jshint',
      'clean',
      'copy',
      'targethtml:dist',
      'htmlmin',
      'cssmin:minify',
      'cssmin:combine',
      'uglify',
      'imagemin'
    ]
  );
};
