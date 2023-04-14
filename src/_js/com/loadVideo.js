export default () => ({
  path: '',
  videosRoot: 'http://192.168.1.11/films/',
  // loadvideo() {
  //   this.path = this.videosRoot + this.data.path + this.data.filename;
  // },
  init() {
    this.path = this.videosRoot + this.data.path + this.data.filename;

    this.$watch('path', (value) => {
      console.log('change ', value);
    });
  },

  get getPath() {
    console.log('1 ', this.path);
    return this.path;
  },
});
