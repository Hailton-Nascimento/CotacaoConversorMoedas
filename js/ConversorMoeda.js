var valorDaMoedaSelcionada;
var data;

var url = `https://economia.awesomeapi.com.br/all`;
var request = new XMLHttpRequest();
var moedaSelecionada = '';

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');

});


// Or with jQuery

document.querySelector("input").addEventListener("change", function() {
    resultadoConversao(event)
});



request.open('GET', url);
request.onload = function() {
    const moedas = JSON.parse(request.responseText);

    let selectHtml = `<option value="" disabled selected>Selecione a moeda</option>`;

    for (let moeda in moedas) {

        selectHtml += `<option value="${moeda}">${moedas[moeda].name}</option>`;

    }

    document.querySelector("#moedas").innerHTML = selectHtml;

}

request.send();

function getCotacao() {
    var select = document.querySelector("#moedas");
    var moedaSelecionada = select.options[select.selectedIndex].value;
    const resposta = JSON.parse(request.responseText);
    valorDaMoedaSelcionada = parseFloat(resposta[moedaSelecionada].bid);

    data = new
    Date(resposta[moedaSelecionada].create_date);

    document.getElementById("valorCotacao").innerHTML = `Cotação do(a) ${resposta[moedaSelecionada].name.substr(0, resposta[moedaSelecionada].name.indexOf("/"))} no dia ${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} as ${data.getHours()}:${data.getMinutes()} <br> <span class="valor">é R$ ${valorDaMoedaSelcionada.toFixed(2)} </span>`



    if (resposta[moedaSelecionada].varBid < 0) {
        document.getElementById("valorCotacao").classList.add("vermelho")
        document.getElementById("valorCotacao").classList.remove("verde")
    } else {
        document.getElementById("valorCotacao").classList.add("verde");
        document.getElementById("valorCotacao").classList.remove("vermelho")
    }
    resultadoConversao();
}

var valorEmDolarTexto = document.querySelector('#entradaValor');



function resultadoConversao() {
    // this.preventDefault();

    let valorEmDolarNumero = parseFloat(valorEmDolarTexto.value);

    let valorEmReal = valorEmDolarNumero * valorDaMoedaSelcionada;

    let valorEmRealDecimal = valorEmReal.toFixed(2);

    document.getElementById("valorConvertido").innerHTML = `R$ ${valorEmRealDecimal}`
}