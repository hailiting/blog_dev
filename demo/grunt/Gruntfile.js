module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      options: {
        banner: '/*! create by <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      static_mappings: {
        files: [
          {
            src: "js/index.js",
            dest: "build/index.min.js",
          },
          {
            src: "js/main.js",
            dest: "build/main.min.js",
          },
        ],
      },
    },
    concat: {
      bar: {
        src: ["build/*.js"],
        dest: "dest/all.min.js",
      },
    },
    watch: {
      files: ["js/index.js"],
      tasks: ["uglify", "uglify"],
    },
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // 默认被执行的任务列表。
  grunt.registerTask("default", ["uglify", "concat", "watch"]);
};
