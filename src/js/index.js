import axios from 'axios';

async function getResults(query) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '985bae1e1ba4fca94db72ba79093602d';
    try {
        const res = await axios(`${proxy}https://api.darksky.net/forecast/${key}/${query},-71.0589`);
        const temps = res.data.currently;
        console.log(res);
        console.log(temps);
    } catch(error) {
        alert(error);
    }
}

getResults(42.3601);

