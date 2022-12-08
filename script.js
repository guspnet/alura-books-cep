async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = '';
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error(`CEP não existente!`);
        }
        var cidade = document.getElementById('cidade');
        var estado = document.getElementById('estado');
        var logradouro = document.getElementById('endereco');

        cidade.value = consultaCEPConvertida.localidade;
        estado.value = consultaCEPConvertida.uf;
        logradouro.value = consultaCEPConvertida.logradouro;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch(erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro)
    }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));