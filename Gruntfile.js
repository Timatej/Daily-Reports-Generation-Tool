module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
            },
            dist: {
                src: [
                    'js/lib/angular.min.js',
                    'js/lib/angular-route.js',
                    'js/app.js',
                    'js/templates.js',
                    'js/filters/*.js',
                    'js/services/*.js',
                    'js/controllers/*.js',
                    'js/directives/*.js'
                ],
                dest: 'public/scripts.js',
            },
        },
        sass: {
            dist: {
                files: {
                    'public/style.css': 'sass/styles.scss'
                }
            }
        },
        ngtemplates:  {
            app: {
                options: {
                    module: 'daily'
                },
                cwd:      'views',
                src:      '**/*.html',
                dest:     'js/templates.js'
            }
        },
        watch: {
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['concat']
            },
            styles: {
                files: ['sass/styles.scss'],
                tasks: ['sass']
            },
            templates: {
                files: ['views/**/*.html'],
                tasks: ['ngtemplates']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-angular-templates');
}
