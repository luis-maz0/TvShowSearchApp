//API: https://www.tvmaze.com/api

const form = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");

//Obtenemos los datos de busqueda de la pelicula buscada.
const getShow = async ()=>{
    const configAxios = {params:{q:searchInput.value}}; 
    const tvShow = await axios.get("https://api.tvmaze.com/search/shows", configAxios)
    return tvShow.data; 
}

//Con el resultado de la busqueda, se mostrarán las imagenes en el body. 
const createShowsImages = async ()=>{
    const tvShowResp = await getShow(); 
    for(let index = 0; index < tvShowResp.length; index++){
        if(tvShowResp[index].show.image){
            const img = document.createElement("img");
            img.src = tvShowResp[index].show.image.medium;
            document.body.append(img);
        } 
    }
}
//En cada busqueda limpiamos el input y el body.
const cleanBody = ()=>{
    const images = document.querySelectorAll("img"); 
    for(let img of images) img.remove(); 
}

const cleanInput = ()=>{
    searchInput.value = ""; 
}

//Eventos. 
form.addEventListener("submit", (e)=>{
    e.preventDefault(); 
    cleanBody(); 
    createShowsImages(); 
    cleanInput(); 
})
