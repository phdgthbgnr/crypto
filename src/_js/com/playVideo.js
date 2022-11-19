export default () => ({
  id: 0,
  playVideo() {
    console.log(this.data.path + this.data.filename);
    console.log('playVideo');
  },
});
