let listaDeItens = [];
let itemAEditar;

const form = document.getElementById('form-itens');
const txtReceberItem = document.getElementById('receber-item');
const listaDeItensAdicionado = document.getElementById('lista-de-itens');
const listaDeItensComprados = document.getElementById('itens-comprados');
const listaRecuperada = localStorage.getItem('listaDeItens');

function atualizarLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens));
};

if(listaRecuperada) {
    listaDeItens = JSON.parse(listaRecuperada)
    mostrarItem();
} else {
    listaDeItens = []
}

form.addEventListener('submit', function (event) {
    event.preventDefault(); // previne o comportamente padrão do navegador

    salvarItem(); // cria os objetos após clicar em salvar item 
    mostrarItem(); // exibe os itens da lista
});

function salvarItem() {
    const criarItem = txtReceberItem.value;
    let verificarDuplicidade = listaDeItens.some((elemento) => elemento.item.toUpperCase() === criarItem.toUpperCase()); // o método some() percorre a lista de itens e retorna true ou false

    if (verificarDuplicidade) {
        alert(`O produto ${criarItem} já foi inserido.`)
    } else {
        listaDeItens.push({
            item: criarItem,
            checar: false
        });
    
    }

    txtReceberItem.value = '';
    txtReceberItem.focus();

};

function mostrarItem() {
    listaDeItensAdicionado.innerHTML = '';
    listaDeItensComprados.innerHTML = '';

    listaDeItens.forEach((elemento, index) => {

        if (elemento.checar) {
            listaDeItensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${elemento.item}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>`
        } else {
            listaDeItensAdicionado.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${elemento.item}" ${index !== Number(itemAEditar) ? 'disabled' : ''}>
                </div>
                <div>
                    ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>`          
        };

    });

    const btnCheck = document.querySelectorAll('input[type="checkbox"]');
    btnCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            let valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value'); // buscar o número do elemento 
            listaDeItens[valorDoElemento].checar = evento.target.checked; // inclui o checked na propriedade checar 
            mostrarItem();
        });
    });

    const btnLimpar = document.querySelectorAll('.deletar');
    btnLimpar.forEach(i => {
        i.addEventListener('click', (evento) => {
            let valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value'); // buscar o número do elemento 
            listaDeItens.splice(valorDoElemento, 1); // o método splice remove objetos
            mostrarItem();
        });
    });

    const btnEditar = document.querySelectorAll('.editar');
    btnEditar.forEach(i => {
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value');
            mostrarItem();
        });
    });

    atualizarLocalStorage();    

};


function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
    listaDeItens[itemAEditar].item = itemEditado.value;
    itemAEditar = -1;
    mostrarItem();
};


