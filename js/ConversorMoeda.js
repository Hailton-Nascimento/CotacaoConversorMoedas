const url = `https://economia.awesomeapi.com.br/all`;
const selectMoedaElement = document.querySelector('#moedas');
const inputQtdMoedaParaConversao = document.querySelector('#entradaValor');
const loaderContainer = document.querySelector('.loader');
const cotacaoConteiner = document.querySelector('.cotacao-container');


let data;
let moedaSelected = 'USD';


const getCotacao = async() => {
    const response = await fetch(url);
    data = await response.json();
    return data;
};

const generataMoedasTemplate = cotacoes => {
    let templateOptions = "";
    for (cotacao in cotacoes) {
        const { code, name } = cotacoes[cotacao];
        templateOptions += `<option value="${code}">${name}</option>`;
    }
    return templateOptions;
};

const insertOpitionsIntoSelection = async() => {
    const cotacoes = await getCotacao();
    const moedasTemplate = generataMoedasTemplate(cotacoes);
    selectMoedaElement.innerHTML += moedasTemplate;
};

const removeLoader = () => {
    setTimeout(() => {
        loaderContainer.classList.remove("show");
        setTimeout(() => {
            handleCotacaoMoedaSelected(objetoMoedaSelected);
            cotacaoConteiner.style.display = "flex"
        }, 200);
    }, 500);
};

const showLoader = () => {
    cotacaoConteiner.style.display = "none";
    loaderContainer.classList.add("show");
    removeLoader();
};
const zeroFix = (valor) => valor < 10 ? `0${valor}` : valor;

const criarData = (create_date) => {
    const data = new Date(create_date);
    const dia = zeroFix(data.getDate());
    const mes = zeroFix(data.getMonth() + 1);
    const hora = zeroFix(data.getHours());
    const minuto = zeroFix(data.getMinutes());

    return dataFormatted = `${dia}/${mes}/${data.getFullYear()} ÀS ${hora}:${minuto}`;
}

const setTencenciaDeVariacao = (varBid) => {
    if (varBid < 0) {
        document.querySelector(".valor-container").classList.add("dow")
        document.querySelector(".valor-container").classList.remove("up")

    } else {
        document.querySelector(".valor-container").classList.add("up");
        document.querySelector(".valor-container").classList.remove("dow")
    }
};


const handleCotacaoMoedaSelected = ({ code, bid, create_date, name, varBid }) => {
    const moeda = name.substr(0, name.indexOf("/"));
    const valorDaMoedaSelcionada = parseFloat(bid);
    const ultimaCotação = criarData(create_date);
    setTencenciaDeVariacao(varBid);
    const codeMoeda = code;
    const cotacaoInfoContainerElemento =
        document.querySelector('.cotacao-container');
    const [elementCode, elementMoeda, elementInfoCotacao, elementValorCotacao] = ['code', 'moeda', 'info-cotacao', 'valorCotacao'].
    map((classe) => cotacaoInfoContainerElemento.querySelector(`.${classe}`));
    elementCode.innerHTML = `${codeMoeda}`;
    elementMoeda.innerHTML = `${moeda} | `;
    elementInfoCotacao.innerHTML = `Cotação na Data de: ${ultimaCotação}`
    elementValorCotacao.innerHTML = `R$: ${(valorDaMoedaSelcionada).toFixed(2)}`

};

const stardedInput = () => {
    setTimeout(() => {
        const optionDolarAmericano =
            selectMoedaElement.querySelector(`[value="${moedaSelected}"]`);
        optionDolarAmericano.selected = true;
        handleCotacaoMoedaSelected(data[moedaSelected]);
    }, 500)

}

const setCotacao = () => {
    moedaSelected = event.target.value;
    objetoMoedaSelected = data[moedaSelected];
    showLoader();
    getConversao()
};

const handleConversao = (valorEmReal) => {
    document.getElementById("valorConvertido").innerHTML = `R$ ${valorEmReal}`
};

const getConversao = () => {
    const valorDaMoedaSelcionada = data[moedaSelected].bid;
    const valorEmDolarNumero = parseFloat(inputQtdMoedaParaConversao.value);
    const valorEmReal = (valorEmDolarNumero * valorDaMoedaSelcionada).toFixed(2);
    handleConversao(valorEmReal)
};

insertOpitionsIntoSelection();
selectMoedaElement.addEventListener('change', setCotacao);
inputQtdMoedaParaConversao.addEventListener('change', getConversao);
window.addEventListener("load", stardedInput);