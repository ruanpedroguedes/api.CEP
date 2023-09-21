document.getElementById('consultaBtn').addEventListener('click', () => {
    const cepInput = document.getElementById('cepInput').value;
    
    // Verifica se o CEP é válido (pode haver validações mais robustas)
    if (/^\d{8}$/.test(cepInput)) {
        fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    document.getElementById('resultado').innerHTML = '<p>CEP não encontrado.</p>';
                } else {
                    // Exibe as informações do CEP
                    document.getElementById('resultado').innerHTML = `
                        <h2>Informações do CEP ${cepInput}:</h2>
                        <p>Logradouro: ${data.logradouro}</p>
                        <p>Bairro: ${data.bairro}</p>
                        <p>Cidade: ${data.localidade}</p>
                        <p>Estado: ${data.uf}</p>
                    `;
                }
            })
            .catch(error => {
                // Em caso de erro na consulta
                document.getElementById('resultado').innerHTML = `<p>Erro na consulta do CEP: ${error.message}</p>`;
            });
    } else {
        // Em caso de CEP inválido
        document.getElementById('resultado').innerHTML = '<p>CEP inválido. Digite um CEP válido com 8 dígitos.</p>';
    }
});

