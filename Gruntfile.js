/**
 * Project Name
 * ========================================================================
 * Gruntfile.js
 * @version   1.0 | Dec 12th 2013
 * @author    Luke Martin | @iamlukem
 * @link      https://github.com/iamlukem
 * @license   MIT license
 *
 * Installation
 *
 * First time instructions, uinstall Grunt globally:
 * 'npm uninstall -g grunt'
 *
 * Then install the Grunt CLI globally:
 * 'npm install -g grunt-cli'
 *
 * Each time a new project is started, local to the project; run:
 * 'npm install grunt --save-dev'
 *
 * Plus install the appropriate package for each required task,
 * use 'npm install' and it will install all the packages listed in the 'package.json' file.
 *
 * Also uncomment the related task loader in the Load Tasks section of this file
 *
 * Further instructions: http://gruntjs.com/getting-started
 * ======================================================================== */

module.exports = function(grunt) {
	'use strict';

	/* ========================================================================
		Init configuration
		======================================================================== */
	grunt.initConfig({

		/**
		 * Package file
		 * ========================================================================
		 * All variable, dependency and version information for the project.
		 * ======================================================================== */
		pkg: grunt.file.readJSON("package.json"),

		/**
		 * Sass
		 * ========================================================================
		 * https://github.com/gruntjs/grunt-contrib-sass
		 * If utilising Compass, simply point to your
		 * config.rb file via sass.method.options.compass:
		 * ======================================================================== */
		sass:
		{
			development:
			{
				files:
				{
					"<%= pkg.path.dev %>/<%= pkg.path.lib.css %>/custom.css":
						"<%= pkg.path.src.sass %>/style.scss"
				},
				options:
				{
					style: "expanded",
					lineNumbers: true
				}
			},
			deploy:
			{
				files:
				{
					"<%= pkg.path.deploy %>/<%= pkg.path.lib.css %>/custom.css":
						"<%= pkg.path.src.sass %>/style.scss"
				},
				options:
				{
					style: "compressed",
					lineNumbers: false
				}
			}
		},

		/**
		 * cssLint
		 * ========================================================================
		 * https://github.com/gruntjs/grunt-contrib-csslint
		 * ======================================================================== */
		csslint:
		{
			all:
			{
				src:
				[
					"<%= pkg.path.dev %>/style.css"
				]
			}
		},

		/**
		 * Concat
		 * ========================================================================
		 * https://github.com/gruntjs/grunt-contrib-concat
		 * ======================================================================== */
		concat:
		{
			build:
			{
				src:
				[
					"<%= pkg.path.src.js %>/*.js"
				],
				dest: "<%= pkg.path.dev %>/<%= pkg.path.lib.js %>/custom.js"
			}
		},

		/**
		 * jsHint
		 * ========================================================================
		 * https://github.com/gruntjs/grunt-contrib-jshint
		 * ======================================================================== */
		jshint:
		{
			all:
			[
				"<%= pkg.path.src %>/<%= pkg.path.src.js %>/*.js",
			]
		},


		/**
		 * Clean
		 * ========================================================================
		 * https://github.com/gruntjs/grunt-contrib-clean
		 * ======================================================================== */
		clean:
		{
			deploy: ["<%= pkg.path.deploy %>/"],
			enviro: ["<%= pkg.path.enviro %>"]
		},

		/**
		 * Copy
		 * ========================================================================
		 * https://github.com/gruntjs/grunt-contrib-copy
		 * For WordPress theme development, use:
		 * copy.build.files.dest:"<%= pkg.path.enviro %>"
		 * ======================================================================== */
		copy:
		{
			build:
			{
				files:
				[
					{
						expand: true,
						cwd:    "<%= pkg.path.dev %>/public",
						src:    ["**", "!**.DS_Store", ".gitignore"],
						dest:   "<%= pkg.path.enviro %>/public",
						dot:    true
					}
				]
			},
			deploy:
			{
				files:
				[
					{
						expand: true,
						cwd:    "<%= pkg.path.dev %>/",
						src:    ["**", "!**.DS_Store", ".gitignore"],
						dest:   "<%= pkg.path.deploy %>/",
						dot:    true
					}
				]
			}
		},

		/**
		 * Smushit
		 * ========================================================================
		 * https://github.com/heldr/grunt-smushit
		 * ======================================================================== */
		smushit:
		{
			deploy:
			{
				src:
				[
					'<%= pkg.path.dev %>/**/*.jpg',
					'<%= pkg.path.dev %>/**/*.png'
				]
			}
		},

		/**
		 * Watch
		 * ========================================================================
		 * https://github.com/gruntjs/grunt-contrib-watch
		 * ======================================================================== */
		watch:
		{
			files:
			{
				files: ["<%= pkg.path.src.sass %>/*.scss"],
				tasks: ["sass:development"],
				options:
				{
					spawn: false,
				}
			},
			scripts:
			{
				files: ["<%= pkg.path.src.js %>/*.js"],
				tasks: ["concat:build"],
				options:
				{
					spawn: false,
				}
			},
			// used with event listener
			event:
			{
				files: ["<%= pkg.path.dev %>/**"],
					tasks: ["copy:changed"],
					options:
					{
						spawn: false,
					}
				}
			},

	});


	/** Dynamic Watch task
	 * ========================================================================
	 * To be used with Contrib Watch Task, this event function
	 * will capture the actual file changed and run run the task
	 * on it, rather then the entire watched folder.
	 * ======================================================================== */
	grunt.event.on("watch", function (event, file) {
		var pkg = grunt.file.readJSON("package.json");
		var cwd = pkg.path.dev + "/";
		var filepath = file.replace(cwd, "");
		grunt.config.set("copy",
		{
			changed:
			{
				expand: true,
				cwd:    cwd,
				src:    filepath,
				dest:   '<%= pkg.path.enviro %>'
			}
		});

		/* May need to use this instead of grunt.watch.event.tasks:copy:changed */
		// return grunt.task.run("copy:changed");
	});

	/* ========================================================================
		Load Tasks
		======================================================================== */
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-csslint");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-smushit");
	grunt.loadNpmTasks("grunt-contrib-watch");

	/* ========================================================================
		Register custom tasks aliases
		======================================================================== */

	/**
	 * The default Grunt task
	 * ========================================================================
	 * Tasks to run simply with the command `grunt`
	 */
	grunt.registerTask("default", ["sass:development", "concat:build"]);

	/**
	 * Watch Sass
	 * ========================================================================
	 * Simply watch for Sass changes, and process
	 */
	grunt.registerTask("watchSass", ["watch:sass"]);

	/**
	 * Build
	 * ========================================================================
	 * Run preprocessing and copy files to the test environment
	 */
	grunt.registerTask("build", ["sass:development", "concat:build", "copy:build"]);

	/**
	 * Deploy
	 * ========================================================================
	 * Run preprocessing, concatenate, minify and copy files for deployment
	 */
	grunt.registerTask("deploy", [
		"clean:deploy", "sass:deploy", "concat:build", "copy:deploy"
	]);

};
