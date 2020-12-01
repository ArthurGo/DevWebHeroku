let obj

function searchListener() {
    console.log('entrou no search Listener')
    this.obj = JSON.parse(this.responseText)

    document.getElementById("dropdown-menu").innerHTML = ""
    this.obj.results.forEach(el => {
        console.log(el)
        getApiData(el.id)
        document.getElementById("dropdown-menu").innerHTML += "<option data-value=" + el.id + " value=" + el.original_title + " class=\"dropdown-item\" >"+el.original_title+"</option>"
    })
};


// este metodo retorno o link da api para uma pesquisa por nome do filme
function getApiSearchByMovieName(nomeFilme) {
    let apiBase = "https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&query=(nome_filme)";
    return apiBase.replace("(nome_filme)", nomeFilme)
}

// função que executa a chamada rest para o link da busca do filme por nome (pesquisa)
function searchApiData(movieName) {
    var oReq = new XMLHttpRequest();
    oReq.onload = searchListener;

    oReq.open("get", getApiSearchByMovieName(movieName), true);
    try {
        oReq.send();
    } catch (error) {
        console.log('error on api retriaving', error)
    }
}

function searchMethod() {
    let movieName = document.getElementById('search_input').value
    console.log('mudou', movieName)

    searchApiData(movieName)
}

function onInput() {
    var val = document.getElementById("search_input").value;
    var opts = document.getElementById('dropdown-menu').childNodes;
    searchMethod()
    for (var i = 0; i < opts.length; i++) {
        if (opts[i].value === val) {
            let selector = document.querySelector('option[value="' + val + '"]')
            redirectToMovieHomePage(selector.getAttribute('data-value'))
            break;
        }
    }
}