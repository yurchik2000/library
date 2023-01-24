const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '39b027358amsh126a680bcd929a4p1dcb19jsnfb00d53a85d8',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

const apiKey = "eeecfa5e";

let moviesList = [
    'tt8291806', // Original title: Dolor y gloria
    'tt5827916', //Original title: A Hidden Life
    'tt2056771', //Original title: A Bigger Splash
    'tt7201846', //Original title: Edmond
    'tt0816692', //Original title: Interstellar
    'tt2278388', // The Grand Budapest Hotel
    'tt6060964', //Man of God
    'tt0109830', //Original title: Forrest Gump
    'tt0426931', //Original title: August Rush
    'tt11703710', //Downton Abbey: A New Era
    'tt13880104', //Original title: L'événement
    'tt14369780', //Original title: Lady Chatterley's Lover
    'tt2191765', //Original title: Un moment d'égarement
    'tt0441909', //Original title: Volver
    'tt0424205', //Original title: Joyeux Noël
    'tt8097030', //Original title: Turning Red
    'tt13182756', //The Most Reluctant Convert
    'tt12680684', //Original title: È stata la mano di Dio
    'tt12888462', //My Octopus Teacher
    'tt2398149', //Original title: J'accuse
    'tt6910282', //Original title: Bergman Island
    'tt15738080', //Original title: Koza Nostra
    'tt8075192', //Original title: Manbiki kazoku
    'tt6390668', //A Vida Invisível

]

let moviesDataList = [];
// moviesList.forEach(id => {
//     moviesDataList.push(JSON.parse(window.localStorage.getItem(id)));
// })

const arrowUp = document.querySelector('.arrow__up');
const arrowDown = document.querySelector('.arrow__down');

arrowUp.addEventListener('click', () => {
    moviesDataList = [];
    moviesList.forEach(id => {
        moviesDataList.push(JSON.parse(window.localStorage.getItem(id)));
    })
    moviesDataList.sort(sortByNameUp);    
    movieList.innerText = "";
    moviesDataList.forEach(item => {
        render(item);
    })
})

arrowDown.addEventListener('click', () => {
    moviesDataList = [];
    moviesList.forEach(id => {
        moviesDataList.push(JSON.parse(window.localStorage.getItem(id)));
    })
    moviesDataList.sort(sortByNameDown);    
    movieList.innerText = "";
    moviesDataList.forEach(item => {
        render(item);
    })
})

function sortByNameUp(a, b) {
    const nameFirst = a.title.toLowerCase();
    const nameSecond = b.title.toLowerCase();    
    if (nameFirst > nameSecond) return -1; 
      else return 1;
}

function sortByNameDown(a, b) {
    const nameFirst = a.title.toLowerCase();
    const nameSecond = b.title.toLowerCase();    
    if (nameFirst > nameSecond) return 1; 
      else return -1;
}



let movieList = document.querySelector('ul');

movieList.innerText = "";

moviesList.forEach(id => {

    let movie = {
        id: "",
        title: "Dolor y gloria",
        year: "2019",
        imageUrl: "",
        rating: "",
        genres: [],
        director: "",
        actors: [],
        plot: "",
        link: ""
    }
    if (window.localStorage.getItem(id)) {
        let item = JSON.parse(window.localStorage.getItem(id));
        if (!item.actors) {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)        
                .then(response => response.json())
                .then(data => {                        
                    movie.title = data.Title;
                    movie.year = data.Year;
                    movie.imageUrl = data.Poster;
                    movie.link = `https://www.imdb.com/title/${id}/?ref_=nv_sr_srsg_0`;
                    movie.rating = data.imdbRating;            
                    movie.genres = data.Genre.split(',');
                    movie.director = data.Director;
                    movie.actors = data.Actors;         
                    movie.plot = data.Plot;            
                    window.localStorage.setItem(id, JSON.stringify(movie));
                    render(movie);
            })        
            .catch(err => console.error(err));                        
        } else {
            render(item);
        }        
        
    }   else {
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)        
        .then(response => response.json())
        .then(data => {            
            // console.log(data);
            movie.title = data.Title;
            movie.year = data.Year;
            movie.imageUrl = data.Poster;
            movie.link = `https://www.imdb.com/title/${id}/?ref_=nv_sr_srsg_0`;
            movie.rating = data.imdbRating;            
            movie.genres = data.Genre.split(',');
            movie.director = data.Director;
            movie.actors = data.Actors.split(',');         
            movie.plot = data.Plot;            
            window.localStorage.setItem(id, JSON.stringify(movie));
            render(movie);
        })        
        .catch(err => console.error(err));                        
    }

})




function render(item) {            
        let data = item;
        // console.log(data);
        if (data) {
            const movie = document.createElement('li');
        
            const mainContent = document.createElement('div');
            mainContent.classList.add('main__content')

            const movieTitle = document.createElement('h2');
            movieTitle.textContent = data.title;        

            const movieYear = document.createElement('p');
            movieYear.textContent = data.year;

            const movieRating = document.createElement('p');
            movieRating.textContent = 'IMDb rating: ' + data.rating;

            mainContent.appendChild(movieTitle);
            mainContent.appendChild(movieYear);
            mainContent.appendChild(movieRating);

            const genresList = document.createElement('div');
            genresList.classList.add('genres__wrapper')

            data.genres.forEach(genre => {
                const genreName = document.createElement('div');
                genreName.classList.add('genre');
                genreName.textContent = genre;
                genresList.appendChild(genreName);
            })        

            mainContent.appendChild(genresList);
        
            movie.appendChild(mainContent);

            const movieLink = document.createElement('a');
            movieLink.setAttribute('href', data.link);
            movieLink.setAttribute('target', "_blank");

            const movieImage = document.createElement('img');
            movieImage.setAttribute('src', data.imageUrl);
            movieImage.classList.add('img__poster')

            movieLink.appendChild(movieImage);
            movie.appendChild(movieLink);

            if (data.plot) {
                const moviePlot = document.createElement('p');
                moviePlot.classList.add('plot');
                moviePlot.textContent = data.plot;
                movie.appendChild(moviePlot);
            }
                
            movieList.appendChild(movie);        
        }
        
    
}

// window.addEventListener("storage", render(moviesList));

// let id = 'tt8291806' // Original title: Dolor y gloria

// window.localStorage.setItem(id, JSON.stringify(movie));

// fetch('https://imdb8.p.rapidapi.com/auto-complete?q=game', options)
// 	.then(response => response.json())
// 	.then(data => console.log(data))
// 	.catch(err => console.error(err));


//get genres
// fetch(`https://imdb8.p.rapidapi.com/title/get-genres?tconst=${id}`, options)
// .then(response => response.json())
// .then(response => console.log(response))
// .catch(err => console.error(err));


//get plots
// fetch('https://imdb8.p.rapidapi.com/title/get-plots?tconst=tt2056771', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

//get metadata
// fetch('https://imdb8.p.rapidapi.com/title/get-meta-data?ids=tt4154756&region=US', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));