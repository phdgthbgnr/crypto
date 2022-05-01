import axios from 'axios';

export default () => ({
  Posts() {
    // return [
    //   { title: 'title 1' },
    //   { title: 'title 2' },
    //   { title: 'title 3' },
    //   { title: 'title 4' },
    //   { title: 'title 5' },
    //   { title: 'title 6' },
    // ];
    return axios
      .get('http://localhost:8081')
      .then((response) => {
        console.log(response.data); // assign it to items in the store
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
