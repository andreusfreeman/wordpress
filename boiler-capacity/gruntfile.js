module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      a: {
        src: ['js-work/*.js'],
        dest: 'dest/script-concat.js',
      },
      b: {
        src: ['styles/*.css'],
        dest: 'dest/style-concat.css',
      },
    },
    uglify: {
      my_target: {
        files: {
          'js/script.min.js': ['dest/script-concat.js']
        }
      }
    },
    cssmin: {
      my_target: {
        files: {
          'css/style.min.css': ['dest/*.css']
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'styles',
          src: ['*.scss'],
          dest: 'styles',
          ext: '.css'
        }]
      }
    },
    watch: {
      sass: {
        // We watch and compile sass files as normal but don't live reload here
        files: ['styles/*.scss'],
        tasks: ['sass'],
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'sass']);

};
