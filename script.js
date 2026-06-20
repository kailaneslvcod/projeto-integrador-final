const btnContraste = document.getElementById('btn-contraste');
btnContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
    btnContraste.textContent = document.body.classList.contains('alto-contraste') 
        ? 'Desativar Alto Contraste' 
        : 'Ativar Alto Contraste';
});

let bancoDeDados = JSON.parse(localStorage.getItem('mensagensIndustria')) || [];

const form = document.getElementById('form-comunicado');
const mural = document.getElementById('mensagens-publicadas');
const contador = document.getElementById('contador-mensagens');

function renderizarMural() {
    mural.innerHTML = ''; 
    
    contador.textContent = `${bancoDeDados.length} publicação(ões)`;

    const mensagensExibicao = [...bancoDeDados].reverse();

    mensagensExibicao.forEach((msg) => {
        const div = document.createElement('div');
        div.className = `mensagem-card card-${msg.categoria}`;
        
        let nomeCategoria = '';
        if(msg.categoria === 'aviso') nomeCategoria = 'Aviso Geral';
        if(msg.categoria === 'ideia') nomeCategoria = 'Ideia Sustentável';
        if(msg.categoria === 'alerta') nomeCategoria = 'Alerta de Segurança';

        div.innerHTML = `
            <span class="tag-categoria cat-${msg.categoria}">${nomeCategoria}</span>
            <button class="btn-deletar" onclick="deletarMensagem(${msg.id})">Excluir</button>
            <p><strong>${msg.nome}</strong> diz:</p>
            <p>${msg.texto}</p>
            <span class="data-hora">Registrado em: ${msg.data}</span>
        `;
        mural.appendChild(div);
    });
}

form.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const dataAtual = new Date();
    
    const novaMensagem = {
        id: Date.now(), 
        nome: document.getElementById('nome').value,
        categoria: document.getElementById('categoria').value,
        texto: document.getElementById('mensagem').value,
        data: dataAtual.toLocaleString('pt-BR')
    };

    bancoDeDados.push(novaMensagem);
    localStorage.setItem('mensagensIndustria', JSON.stringify(bancoDeDados));

    form.reset();
    renderizarMural();
});

window.deletarMensagem = function(id) {
    if(confirm('Tem certeza que deseja apagar esta publicação?')) {

        bancoDeDados = bancoDeDados.filter(msg => msg.id !== id);
        
        localStorage.setItem('mensagensIndustria', JSON.stringify(bancoDeDados));
        renderizarMural();
    }
}

renderizarMural();