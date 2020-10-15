console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUserAll = new Promise(function(todoBien, todoMal) {
  // llamar a un api
  setTimeout(function() {
    // luego de 3 segundos
    todoBien('se acabó el tiempo');
  }, 5000)
})

const getUser = new Promise(function(todoBien, todoMal) {
  // llamar a un api
  setTimeout(function() {
    // luego de 3 segundos
    todoBien('se acabó el tiempo 3');
  }, 3000)
})

/*getUser
  .then(function() {
    console.log('todo está bien en la vida')
  })
  .catch(function(message) {
    console.log(message)
  })
*/
/*Promise.all([
  getUser,
  getUserAll,
])
.then(function(message) {
  console.log(message);
})
.catch(function(message) {
  console.log(message)
})*/

Promise.race([
  getUser,
  getUserAll,
])
.then(function(message) {
  console.log(message);
})
.catch(function(message) {
  console.log(message)
})

// Método con Jquery
$.ajax('https://randomuser.me/api/sdfdsfdsfs', {
  method: 'GET',
  success: function(data){
    console.log(data)
  },
  error: function(error) {

  }
})

// Método con Javascript Vanilla
fetch('https://randomuser.me/api/dsfdsfsd') // Usa promesas
  .then(function (response){
    // console.log(response)
    // se usa json
    return response.json()
  })
  .then(function (user) {
    console.log('user', user.results[0].name.first)
  })
  .catch(function(){
    console.log('algo falló')
  });


(async function load() {

  /* ------ Reto 1: Mostrar Usuarios ------ */
  /* Seleccionar el contenedor */
  const $usuariosContainer = document.getElementById('usuarios');

  /* Crear html (?) */
  function userCreateElement (HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }
  /* Crear Plantilla */
  function UserItemTemplate(user) {
    return (
      `<li class="playlistFriends-item">
        <a href="#">
          <img src="${user.picture.thumbnail}" alt="echame la culpa" />
          <span>
            ${user.name.first} ${user.name.last}
          </span>
        </a>
      </li>`
    )
  }
  /* Función para traer datos (?) */
  async function getDataUsers(url) { 
    const response = await fetch(url);
    if (response.status != 404) {
        const data = await response.json();
        return data;
    }
    throw new Error('No se pueden traer usuarios');
  }
  /* Renderizar Variable */
  function renderUsuariosList(list, $container) {
    $container.children[0].remove();
    list.forEach(user => {
      const HTMLString = UserItemTemplate(user);
      const userElement = userCreateElement(HTMLString);
      $container.append(userElement);
    });
  };
  
  /* Jalar resultados de API */
  try {
    const {results: userlist} = await getDataUsers('https://randomuser.me/api/?results=8');
    renderUsuariosList(userlist, $usuariosContainer);
  } catch (error) {
    console.log(error.message);
  }

  /* ------ Reto 2: Mostrar Playlist ------ */
  const $listapelisContainer = document.getElementById('mi-lista');

  function CrearHtmlListaPelis (HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }

  function listaMisPelisTemplate(pelis) {
    return (
      `<li class="myPlaylist-item">
        <a href="${pelis.url}">
          <span>
            ${pelis.title}
          </span>
        </a>
      </li>`
    )
  }

  async function getDataPelis(url) { 
    const response = await fetch(url);
    if (response.status != 404) {
        const data = await response.json();
        return data;
    }
    throw new Error('No se pueden traer usuarios');
  }

  function renderPelisList(list, $container) {
    $container.children[0].remove();
    list.forEach(pelis => {
      const HTMLString = listaMisPelisTemplate(pelis);
      const userPelisElement = CrearHtmlListaPelis(HTMLString);
      $container.append(userPelisElement);
    });
  };

  try {
    const {data: { movies: userpelislist} } = await getDataPelis('https://yts.mx/api/v2/list_movies.json?limit=9');
    renderPelisList(userpelislist, $listapelisContainer);
  } catch (error) {
    console.log(error.message);
  }


  /*  FORMA MODERNA Xd 
  function myPelisCreateElement(HTMLString) {
      const html = document.implementation.createHTMLDocument();
      html.body.innerHTML = HTMLString;
      return html.body.children[0];
  }

  function myPelisTemplate(url, title) {
      return(`<li class="myPlaylist-item">
                  <a href="${url}">
                  <span>
                      ${title}
                  </span>
                  </a>
              </li>`);
  }

  let getDataPelis = async (url) => {
      const response = await fetch(url);
      if (response.status != 404) {
          const data = await response.json();
          return data;
      }
      throw new Error('No se pueden traer peliculas');
  }

  function renderUserMyPelis(list, $container) {
      $container.children[0].remove();
      list.forEach( element => {
          const HTMLString = myPelisTemplate(element.url, element.title);
          const createElement = myPelisCreateElement(HTMLString);
          $container.append(createElement);
      });
  }

  $containerMyPelis = document.getElementById("mi-lista");
  let url = `https://yts.mx/api/v2/list_movies.json?&limit=9`;
  try {
      const  { data: { movies: mypelis } }  = await getDataPelis(url);
      renderUserMyPelis(mypelis, $containerMyPelis);
  } catch (error) {
      console.log(error.message);
  }*/

  // await
  // action
  // terror
  // animation
  // Funcion para llamar datos

  // --- FORMULARIO BUSCAR --- //
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json()
    if(data.data.movie_count > 0) {
      return data;
    }
    throw new Error('No se encontró ningun resultado');
  }
  const $form = document.getElementById('form');
  const $home = document.getElementById('home');
  const $featuringContainer = document.getElementById('featuring');

  function setAttributes($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }

  const BASE_API = 'https://yts.mx/api/v2/';
  /* const BASE_API = 'https://yts.am/api/v2/';*/

  function featuringTemplate(peli) {
    return (
      `
        <div class="featuring">
          <div class="featuring-image">
            <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
          </div>
          <div class="featuring-content">
            <p class="featuring-title">Pelicula encontrada</p>
            <p class="featuring-album">${peli.title}</p>
          </div>
        </div>
      `
    )
  }

  $form.addEventListener('submit', async (event) => {
    event.preventDefault();
    $home.classList.add('search-active')
    const $loader = document.createElement('img');
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width: 50,
    })
    $featuringContainer.append($loader);

    const data = new FormData($form);
    try {
      const {
        data: {
          movies: pelis
        }
      } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
  
      const HTMLString = featuringTemplate(pelis[0]);
      $featuringContainer.innerHTML = HTMLString;
    } catch(error) {
      alert(error.message);
      $loader.remove();
      $home.classList.remove('search-active');
    }
  })
  /* --- 0 --- */
  
  function videoItemTemplate(movie, category) {
    return (
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
          <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
          </div>
          <h4 class="primaryPlaylistItem-title">
            ${movie.title}
          </h4>
        </div>`
    )
  }
  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }
  function addEventClick($element) {
    $element.addEventListener('click', () => {
      showModal($element)
    })
  }



  function renderMovieList(list, $container, category) {
    $container.children[0].remove();
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie, category);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
      const image = movieElement.querySelector('img');
      image.addEventListener('load', (event) => {
        event.srcElement.classList.add('fadeIn');
      })
      addEventClick(movieElement);
    })
  }
  
  async function cacheExist(category) {
    const listName = `${category}List`;
    const cacheList = window.localStorage.getItem(listName);

    if (cacheList) {
      return JSON.parse(cacheList);
    }
    const { data: { movies: data } } = await getData(`${BASE_API}list_movies.json?genre=${category}`);
    window.localStorage.setItem(listName, JSON.stringify(data));
    
    return data;
  }
  
  // const { data: { movies: actionList} } = await getData(`${BASE_API}list_movies.json?genre=action`)
  const actionList = await cacheExist('action');
  // window.localStorage.setItem('actionList', JSON.stringify(actionList));
  const $actionContainer = document.querySelector('#action');
  renderMovieList(actionList, $actionContainer, 'action');

  const dramaList = await cacheExist('drama');
  const $dramaContainer = document.getElementById('drama');
  renderMovieList(dramaList, $dramaContainer, 'drama');

  const animationList = await cacheExist('animation');
  const $animationContainer = document.getElementById('animation');
  renderMovieList(animationList, $animationContainer, 'animation');

  //const $home = $('.home .list #item');
  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const $modalTitle = modal.querySelector('h1');
  const $modalImage = modal.querySelector('img');
  const $modalDescripcion = modal.querySelector('p');

  function findById(list, id) {
    return list.find(movie => movie.id === parseInt(id, 10))
  }
  function findMovie(id, category) {
    switch (category) {
      case 'action' : {
        return findById(actionList, id)
      }
      case 'drama' : {
        return findById(dramaList, id)
      }
      default : {
        return findById(animationList, id)
      }
    }
  }

  function showModal($element) {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
    // $element.querySelector('p').textContent;
    const id = $element.dataset.id;
    const category = $element.dataset.category;
    const data = findMovie(id, category)

    $modalTitle.textContent = data.title;
    $modalImage.setAttribute('src', data.medium_cover_image);
    $modalDescripcion.textContent = data.description_full;
  }

  $hideModal.addEventListener('click', hideModal);
  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  }

})()
