const apiKey = "eeecfa5e";

let moviesDataList = [];

let movieList = document.querySelector('ul');

let moviesListArchive = [];

let moviesList = [    
    'tt0816692', //Original title: Interstellar
    'tt12888462', //My Octopus Teacher         
    'tt6226232', //Young Sheldon    
    // 'tt6060964', //Man of God
    // 'tt0063518', //Original title: Romeo and Juliet
    // 'tt8332658', //Original title: Shchedryk
    // 'tt9032400', //Original title: Eternals
    // 'tt9770150', //Original title: Nomadland
    // 'tt0109830', //Original title: Forrest Gump    
    // 'tt13182756', //The Most Reluctant Convert
    // 'tt12680684', //Original title: È stata la mano di Dio    
    // 'tt15738080', //Original title: Koza Nostra
    // 'tt8075192', //Original title: Manbiki kazoku    
    // 'tt11813216', //Original title: The Banshees of Inisherin    
    // 'tt6160448', //Original title: White Noise    
    // 'tt19770238', //Original title: Aftersun
    // 'tt1488589', //Original title: Guillermo del Toro's Pinocchio            
    // 'tt3704428', //Original title: Elvis
    // 'tt6910282', //Original title: Bergman Island
    // 'tt8291806', // Original title: Dolor y gloria                
    // 'tt0124315', // Original title: The Cider House Rules    
    // 'tt2278388', // The Grand Budapest Hotel
    // 'tt8097030', //Original title: Turning Red
    // 'tt2398149', //Original title: J'accuse
    // 'tt14028890', //Original title: Stop-Zemlia
    // 'tt10627352', // Delete history
    // 'tt2353868', //Original title: True Spirit
    // 'tt9100054', //Original title: The Lost Daughter
    // 'tt10451852', //Original title: Nine Days
    // 'tt5776858', //Original title: Phantom Thread
    // 'tt7983894', //Original title: Ammonite
    // 'tt6987770', //Original title: Destination Wedding
    // 'tt1226837', //Original title: Beautiful Boy
    // 'tt4682786', //Original title: Collateral Beauty
    // 'tt0344510', //A very long engagement
    // 'tt5827916', //Original title: A Hidden Life
    // 'tt6390668', //A Vida Invisível    
    // 'tt3165612', //Original title: Sleeping with Other People
    // 'tt2278871', //La vie d'Adèle
    // 'tt0808357', //Порочний зв'язок
    // 'tt0160916', //Original title: The Story of Us
    // 'tt2278871', //Original title: La vie d'Adèle
    // 'tt3165612', //Original title: Sleeping with Other People
    // 'tt2056771', //Original title: A Bigger Splash
    // 'tt14369780', //Original title: Lady Chatterley's Lover
    // 'tt7201846', //Original title: Edmond    
    // 'tt0426931', //Original title: August Rush
    // 'tt11703710', //Downton Abbey: A New Era
    // 'tt13880104', //Original title: L'événement    
    // 'tt2191765', //Original title: Un moment d'égarement
    // 'tt0441909', //Original title: Volver
    // 'tt0424205', //Original title: Joyeux Noël
    // 'tt0401445', //Original title: A Good Year       
]

clearLocalStorage();

function clearLocalStorage() {
    moviesList.forEach(id => {        
        if (window.localStorage.getItem(`${id}`)) window.localStorage.removeItem(`${id}`);
    })
}

function resetLocalStorage() {    
    if (window.localStorage.getItem('alldata')) {
        window.localStorage.removeItem('alldata');
        moviesDataList = [];        
    }
}

document.querySelector('.reset__btn').addEventListener('click', () => {
    resetLocalStorage();    
    movieList.innerText = "";
    getAllMovies();
})

async function getMovieInfo(id) {
    const responce = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
        .catch(error => concole.log(error));
    const data = await responce.json()
        .catch(error => concole.log(error));
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

let searchMoviesList = [];

let searchInner = document.querySelector('.search__movie-list');

async function searchMovieByTitle(title) {
    const responce = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`)
        .catch(error => concole.log(error));
    const data = await responce.json()
        .catch(error => concole.log(error));
    document.querySelector('.search__list-inner').style.display = "block";    
    document.querySelector('body').style.overflow = "hidden";    
    searchMoviesList = data.Search;    
    if (searchMoviesList) {                
        searchInner.textContent = "";
        searchMoviesList.forEach(item => {
            renderShort(item);                        
        })                
    }    
    document.querySelector('.search__list-inner').focus();     
    return searchMoviesList;
}    

document.querySelector('.search__list-close').addEventListener('click', () => {
    document.querySelector('.search__list-inner').style.display = "none";      
    document.querySelector('body').style.overflow = "visible";    
    searchInner.textContent = "";
})


async function getAllMovies() {
    if (!window.localStorage.getItem('alldata')) {        
        for( let i = 0; i < moviesList.length; i++) {
            await getMovieInfo(moviesList[i]);            
        }                
        window.localStorage.setItem('alldata', JSON.stringify(moviesDataList));
    }    
    else {        
        moviesDataList = JSON.parse(window.localStorage.getItem('alldata'));                        
        for( let i = 0; i < moviesList.length; i++) {
            if (!moviesDataList.find(element => element.id === moviesList[i])) {
                await getMovieInfo(moviesList[i]);                
            }            
        }
        movieList.innerText = "";
        moviesDataList.forEach(movie => {
            render(movie);
        });
        window.localStorage.setItem('alldata', JSON.stringify(moviesDataList));
    }
}

async function addMovieToLocalStorage(movieId) {
    await getMovieInfo(movieId);    
    window.localStorage.setItem('alldata', JSON.stringify(moviesDataList));
}

document.querySelector('.search__movie-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('add__movie-btn')) {
        let newMovieId = event.target.nextSibling.textContent;        
        addMovieToLocalStorage(newMovieId)
    }
})

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
        // console.log(moviesDataList.find(element => element.title === currentMovieTitle));        
        // console.log(moviesDataList.findIndex(element => element.title === currentMovieTitle));
        let currentMovieIndex = moviesDataList.findIndex(element => element.title === currentMovieTitle);
        moviesDataList.splice(currentMovieIndex, 1);        
        event.target.parentElement.remove();
        window.localStorage.setItem('alldata', JSON.stringify(moviesDataList));
    }
})

document.querySelector('.search__btn').addEventListener('click', () => {
    const searchValue = document.querySelector('.search__input').value;
    if (searchValue.length > 3) {        
        searchMovieByTitle(searchValue);                
    }        
})

let inputField = document.querySelector('.search__input');
inputField.addEventListener('keypress', (event) => {
    if (event.keyCode === 13 && inputField.value.length > 3) searchMovieByTitle(inputField.value);      
})

function renderShort(item) {
    const movie = document.createElement('div');
    movie.classList.add('short__movie');

    const shortMovieTitle = document.createElement('h4');
    shortMovieTitle.classList.add('short__movie-title');    
    shortMovieTitle.textContent = item.Title;

    const movieImage = document.createElement('img');
            if (item.Poster != "N/A") {
                movieImage.setAttribute('src', item.Poster);
            } else {
                movieImage.setAttribute('src', "img/unknown.png");
            }            
            movieImage.classList.add('short__movie-img')

    movie.appendChild(movieImage);
    movie.appendChild(shortMovieTitle);

    const addMovie = document.createElement('div');
    addMovie.classList.add('add__movie-btn');
    addMovie.textContent = "+";

    movie.appendChild(addMovie);

    const movieId = document.createElement('div');
    movieId.classList.add('short__movie-id');
    movieId.textContent = item.imdbID;

    movie.appendChild(movieId);
    
    searchInner.appendChild(movie);    
}


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