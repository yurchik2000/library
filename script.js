const apiKey = "eeecfa5e";

let moviesDataList = [];

let movieList = document.querySelector('ul');

// movieList.innerText = "";

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
    // 'tt14028890', //Original title: Stop-Zemlia
    // 'tt8332658', //Original title: Shchedryk
    // 'tt3165612', //Original title: Sleeping with Other People
    // 'tt2278871', //La vie d'Adèle
]

async function getMovieInfo(id) {
    const responce = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
    const data = await responce.json();
    let movie = {
        id: "",
        title: "",
        year: "",
        imageUrl: "",
        rating: "",
        genres: [],
        director: "",
        actors: [],
        plot: "",
        link: "",
        checked: false
    };
    movie.title = data.Title;
    movie.year = data.Year;
    movie.imageUrl = data.Poster;
    movie.link = `https://www.imdb.com/title/${id}/?ref_=nv_sr_srsg_0`;
    movie.rating = data.imdbRating;            
    movie.genres = data.Genre.split(', ');            
    movie.director = data.Director.split(',');
    movie.director.forEach(item => item.trim());
    movie.actors = data.Actors.split(',');
    movie.actors.forEach(item => item.trim());            
    movie.plot = data.Plot;
    movie.id = id;    
    moviesDataList.push(movie); 
    render(movie);    
}

async function getAllMovies() {
    if (!window.localStorage.getItem('alldata')) {
        for( let i = 0; i < moviesList.length; i++) {
            await getMovieInfo(moviesList[i]);            
        }                
        window.localStorage.setItem('alldata', JSON.stringify(moviesDataList));
    }    
    else {
        moviesDataList = JSON.parse(window.localStorage.getItem('alldata'));                
        // console.log(moviesDataList);        
        for( let i = 0; i < moviesList.length; i++) {
            if (!moviesDataList.find(element => element.id === moviesList[i])) {
                await getMovieInfo(moviesList[i]);
                // console.log(moviesList[i])
            }            
        }
        // console.log(moviesDataList);
        moviesDataList.forEach(movie => {
            render(movie);
        });
        window.localStorage.setItem('alldata', JSON.stringify(moviesDataList));
    }
}

getAllMovies();

const arrowUp = document.querySelector('.arrow__up');
const arrowDown = document.querySelector('.arrow__down');

function renderAllMovies(movies, genre) {
    movieList.innerText = "";
    if (genre) {
        movies
        .filter(movie => movie.genres.indexOf(genre) >= 0)
        .forEach(movie => {
            render(movie);
        })        
        addActiveClassGenre(genre);        
    } else {
        movies.forEach(movie => {
            render(movie);
        })
    }    
}

arrowUp.addEventListener('click', () => {        
    moviesDataList.sort(sortByNameUp);
    let genre;
    if (genresSelectedList.length) genre = genresSelectedList[0]
     else genre = "";
    renderAllMovies(moviesDataList, genre); 
})

arrowDown.addEventListener('click', () => {    
    moviesDataList.sort(sortByNameDown);
    let genre;
    if (genresSelectedList.length) genre = genresSelectedList[0]
     else genre = "";
    renderAllMovies(moviesDataList, genre);    
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

let genresSelectedList = [];

function activeMenuRender() {
    let menuActive = document.querySelector('.genres__inner');
    menuActive.textContent = "";    
    genresSelectedList.forEach(genre => {
        const genreName = document.createElement('div');
        genreName.classList.add('genre__menu');
        genreName.textContent = "*" + genre;
        menuActive.appendChild(genreName);
    })    
}

function addActiveClassGenre(genre) {
    const activeGenres = document.querySelectorAll('.genre');    
    activeGenres.forEach(item => {        
        if (item.textContent == genre) item.classList.add('genre__active');        
    })   
    activeMenuRender();
};

function removeActiveClassGenre(genre) {
    const activeGenres = document.querySelectorAll('.genre');    
    activeGenres.forEach(item => {        
        if (item.textContent == genre) item.classList.remove('genre__active');        
    });
    activeMenuRender();
};

document.querySelector('ul').addEventListener('click', () => {
    if (event.target.classList.contains('genre')) {
        const item = event.target.textContent;
        const itemIndex = genresSelectedList.indexOf(item);                
                        
        if (itemIndex === -1) {            
            if (genresSelectedList.length) removeActiveClassGenre(genresSelectedList[0]);            
            genresSelectedList[0] = item;    
            addActiveClassGenre(item);
        } else {
            genresSelectedList.splice(0, 1)
            removeActiveClassGenre(item);
        }                
        if (genresSelectedList.length) {            
            renderAllMovies(moviesDataList.filter(movie => movie.genres.indexOf(item) >= 0));
            addActiveClassGenre(item);
        } else {
            renderAllMovies(moviesDataList);            
        }
    };
})

document.querySelector('ul').addEventListener('click', () => {
    if (event.target.classList.contains('close__btn')) {
        let currentMovieTitle = event.target.parentElement.firstElementChild.firstElementChild.textContent;
        console.log(currentMovieTitle);
        console.log(moviesDataList.find(element => element.title === currentMovieTitle));        
        console.log(moviesDataList.findIndex(element => element.title === currentMovieTitle));
        let currentMovieIndex = moviesDataList.findIndex(element => element.title === currentMovieTitle);
        moviesDataList.splice(currentMovieIndex, 1);        
        event.target.parentElement.remove();
        window.localStorage.setItem('alldata', JSON.stringify(moviesDataList));
    }
})


function render(item) {            
        let data = item;        
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

            const subContent = document.createElement('div');
            subContent.classList.add('sub__content');

            const directorsList = document.createElement('p');            
            directorsList.classList.add('directors__list');
            directorsList.textContent = "Director: ";
            
            const directorsSpan = document.createElement('span');
            let directorsSpanContent = "";
            data.director.forEach(director => {
                directorsSpanContent += director;                
            });
            directorsSpan.textContent = directorsSpanContent;                        
            directorsList.appendChild(directorsSpan);

            subContent.appendChild(directorsList);

            const actorsList = document.createElement('p');            
            actorsList.classList.add('actors__list');
            actorsList.textContent = "Actors: ";
            
            const actorsSpan = document.createElement('span');
            let actorsSpanContent = "";
            data.actors.forEach(actor => {
                actorsSpanContent += actor + ' * ';
            });
            actorsSpan.textContent = actorsSpanContent;                        
            actorsList.appendChild(actorsSpan);

            subContent.appendChild(actorsList);
            
            const moviePlot = document.createElement('p');
            moviePlot.classList.add('plot');
            moviePlot.textContent = data.plot;

            subContent.appendChild(moviePlot);
            movie.appendChild(subContent);
            
            const closeButton = document.createElement('div');
            closeButton.classList.add('close__btn');
            closeButton.textContent = 'X';
            movie.appendChild(closeButton);

            movieList.appendChild(movie);        
        }            
}