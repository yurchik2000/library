const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '39b027358amsh126a680bcd929a4p1dcb19jsnfb00d53a85d8',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

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
]


let movieList = document.querySelector('ul');
movieList.innerText = "";

moviesList.forEach(id => {

    // console.log(id); 

    let movie = {
        title: "Dolor y gloria",
        year: "2019",
        imageUrl: "",
        rating: "",
        genres: [],
        director: "",
        stars: [],
        plot: "",
        link: ""
    }
    if (window.localStorage.getItem(id)) {
        render(id);
        // let active = JSON.parse(window.localStorage.getItem(id))    
        // console.log(active);        
    
        // if (!active.genres.length) {
        //     fetch(`https://imdb8.p.rapidapi.com/title/get-genres?tconst=${id}`, options)
        //     .then(response => response.json())
        //     .then(data => {
        //         // console.log(data);
        //         movie.genres = data;            
        //         // console.log(1, movie);            
        //         window.localStorage.setItem(id, JSON.stringify(movie));
        //     })
        //     .catch(err => console.error(err));
        // }
    
        // if (!active.plot) {        
        //     fetch(`https://imdb8.p.rapidapi.com/title/get-plots?tconst=${id}`, options)        
        //         .then(response => response.json())
        //         .then(data => {
        //             //  console.log(data)                
        //             movie.plot = data.plots[0].text;
        //             movie.title = data.base.title;
        //             movie.year = data.base.year;
        //             movie.imageUrl = data.base.image.url;
        //             // console.log(2, movie);                
        //             window.localStorage.setItem(id, JSON.stringify(movie));
        //         })
        //         .catch(err => console.error(err));        
        // }        

    }   else {
        fetch(`https://imdb8.p.rapidapi.com/title/get-meta-data?ids=${id}&region=US`, options)
        .then(response => response.json())
        .then(data => {
            // console.log(data[id]);
            movie.title = data[id].title.title;
            movie.year = data[id].title.year;
            movie.imageUrl = data[id].title.image.url;
            movie.link = `https://www.imdb.com/title/${id}/?ref_=nv_sr_srsg_0`;
            movie.rating = data[id].ratings.rating;
            movie.genres = data[id].genres;            
            // console.log(3, movie);                            
            window.localStorage.setItem(id, JSON.stringify(movie));
            render(id);
        })        
        .catch(err => console.error(err));                

        // fetch(`https://imdb8.p.rapidapi.com/title/get-plots?tconst=${id}`, options)        
        // .then(response => response.json())
        // .then(data => {
        //     // console.log(data)                
        //     movie.plot = data.plots[0].text;                                      
        //     // console.log(2, movie);                
        //     window.localStorage.setItem(id, JSON.stringify(movie));
        // })
        // .catch(err => console.error(err)); 
    
    }

})


function render(id) {
    
    
        
        let data = JSON.parse(window.localStorage.getItem(id));
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

        movieLink.appendChild(movieImage);
        movie.appendChild(movieLink);

        if (data.plot) {
            const moviePlot = document.createElement('p');
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