const APIURL = 
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';


  const IMGPATH = `https://image.tmdb.org/t/p/w1280`;
  const SEARCHAPI = 
                 `https://api.themoviedb.org/3/
                       search/movie?&
                       api_key=04c35731a5ee918f014970082a0088b1&
                       query=`;

  const main = document.getElementById('main');
  const form = document.getElementById('form');
  const search = document.getElementById('search');


   //Initialises the get fav method function......
   getMovies(APIURL)

   async function getMovies(url){
      const resp = await fetch(url);
      const respData = await resp.json();

      console.log(respData );

 showMovies(respData.results);

    //   return respData;
  }
  
    async function showMovies(movies){
        //Initial clear main
        main.innerHTML = '';
        
     movies.forEach((movie)=> {
              
        const {poster_path, title, vote_average,release_date, overview} = movie;

         const movieEL = document.createElement('div');
         movieEL.classList.add("movie");

         movieEL.innerHTML = `
          <img s
          src="${IMGPATH + poster_path}" 
          alt="${title}"
          \>
         <div class="movie-info">
             <h3>${title}</h3>
             <span class="${getClassByRate(vote_average)}">
             ${vote_average}</span><br>
         </div>
     </div>
        <div class="overview">
        <h3>Overview:</h3><hr>
           ${overview}<br>
           <small class="release">Release Date<br>${release_date}</small>
        </div>
     ` 
        
       

       //  img.src =  IMGPATH + movie.poster_path;

        main.appendChild(movieEL);
   

    });

    }
   function getClassByRate(vote) {
       if(vote >= 8) {
           return 'green';
       } else if(vote >= 5) {
           return 'orange';
       }
       else{
           return 'red';
       }
   }





  getMovies();


  form.addEventListener('submit', (e) => {
      e.preventDefault();

      const searchTerm = search.value;

      if(searchTerm) {
          getMovies(SEARCHAPI + searchTerm);

          search.value = '';

      }
  })