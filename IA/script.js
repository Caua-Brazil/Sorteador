document.addEventListener('DOMContentLoaded', () => {
    const formCard = document.getElementById('form-card');
    const resultCard = document.getElementById('result-card');
    const btnSortear = document.getElementById('btn-sortear');
    const btnSortearNovamente = document.getElementById('btn-sortear-novamente');
    const inputQtd = document.getElementById('qtd');
    const inputMin = document.getElementById('min');
    const inputMax = document.getElementById('max');
    const inputNoRepeat = document.getElementById('no-repeat');
    const drawnNumbersContainer = document.getElementById('drawn-numbers');
    const sorteioNumText = document.getElementById('sorteio-num');

    let sorteioCount = 0;

    btnSortear.addEventListener('click', () => {
        const qtd = parseInt(inputQtd.value);
        const min = parseInt(inputMin.value);
        const max = parseInt(inputMax.value);
        const noRepeat = inputNoRepeat.checked;

        // Validações
        if (min >= max) {
            alert('O valor mínimo deve ser menor que o máximo.');
            return;
        }

        if (noRepeat && qtd > (max - min + 1)) {
            alert('A quantidade de números a sortear é maior que o intervalo disponível.');
            return;
        }

        // Lógica do Sorteio
        const results = [];
        while (results.length < qtd) {
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            if (noRepeat) {
                if (!results.includes(randomNum)) {
                    results.push(randomNum);
                }
            } else {
                results.push(randomNum);
            }
        }

        // Atualiza textos
        sorteioCount++;
        sorteioNumText.innerText = `${sorteioCount}º RESULTADO`;

        // Limpa a tela de resultados e esconde o botão voltar
        drawnNumbersContainer.innerHTML = '';
        btnSortearNovamente.style.display = 'none';
        btnSortearNovamente.classList.remove('fade-in-up');

        // Troca os cartões (esconde formulário, mostra resultado)
        formCard.style.display = 'none';
        resultCard.style.display = 'flex';

        // Cria a animação para cada número sorteado
        results.forEach((num, index) => {
            // Cria a caixa principal
            const numDiv = document.createElement('div');
            numDiv.className = 'number-result';

            // Cria a forma roxa de fundo
            const bgShape = document.createElement('div');
            bgShape.className = 'bg-shape';
            // Atraso de 2s multiplicado pela posição do número (o 1º tem 0s, o 2º tem 2s, etc)
            bgShape.style.animationDelay = `${index * 2}s`; 

            // Cria o número
            const numText = document.createElement('span');
            numText.className = 'num-text';
            numText.innerText = num;
            numText.style.animationDelay = `${index * 2}s`; // Mesmo atraso do fundo

            // Junta tudo e joga na tela
            numDiv.appendChild(bgShape);
            numDiv.appendChild(numText);
            drawnNumbersContainer.appendChild(numDiv);
        });

        // Mostra o botão "SORTEAR NOVAMENTE" apenas depois de todas as animações terminarem
        const tempoTotalAnimacoes = results.length * 2000; // 2000ms (2s) por número
        setTimeout(() => {
            btnSortearNovamente.style.display = 'flex';
            btnSortearNovamente.classList.add('fade-in-up');
        }, tempoTotalAnimacoes);
    });

    // Botão Voltar (Reiniciar)
    btnSortearNovamente.addEventListener('click', () => {
        resultCard.style.display = 'none';
        formCard.style.display = 'block';
    });
});