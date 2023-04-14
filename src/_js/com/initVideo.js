export default () => ({
  path: '',
  videoPlayer: '',
  open: false,
  init() {
    this.videoPlayer = document.getElementById('videoPlayer');

    this.$watch('path', (value) => {
      console.log('change ', value);
      // this.contener.
      this.open = true;
    });
  },

  get fullPath() {
    // console.log('get path ', this.path);
    this.videoPlayer.load();
    return this.path;
  },

  close() {
    this.open = false;
    this.path = '';
  },
});
