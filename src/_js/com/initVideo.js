export default () => ({
  path: '',
  videoPlayer: '',
  init() {
    this.videoPlayer = document.getElementById('videoPlayer');
  },
  get fullPath() {
    console.log('get path ', this.path);
    // $refs.videoPlayer.load();
    this.videoPlayer.load();
    return this.path;
  },
});
