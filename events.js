const opcaoPrato = document.querySelectorAll(".single-dish");
const opcaoBebida = document.querySelectorAll(".single-drink");
const opcaoSobremesa = document.querySelectorAll(".single-dessert");

let opcaoAtualPrato;
let opcaoAnteriorPrato;
let nomePrato;
let valorPrato;
let auxValorPrato;

let opcaoAtualBebida;
let opcaoAnteriorBebida;
let nomeBebida;
let valorBebida;
let auxValorBebida;

let opcaoAtualSobremesa;
let opcaoAnteriorSobremesa;
let nomeSobremesa;
let valorSobremesa;
let auxValorSobremesa;


let currentIdPrato;
let currentIdBebida;
let currentIdSobremesa;

let contador = 0;

for(let i = 0; i < opcaoPrato.length; i++){
    opcaoPrato[i].addEventListener('click', selecionarPrato);
}
for(let i = 0; i < opcaoBebida.length; i++){
    opcaoBebida[i].addEventListener('click', selecionarBebida);
}
for(let i = 0; i < opcaoSobremesa.length; i++){
    opcaoSobremesa[i].addEventListener('click', selecionarSobremesa);
}

function selecionarPrato(){
    const optionChecked = document.querySelectorAll('.check-dish-option');
    currentIdPrato = this.id;
    opcaoAtualPrato = parseInt(currentIdPrato[(currentIdPrato.length)-1]);
    if(opcaoAtualPrato !== opcaoAnteriorPrato){
        if(opcaoAnteriorPrato !== undefined){
            optionChecked[opcaoAnteriorPrato-1].classList.add('non-checked');
            optionChecked[opcaoAtualPrato-1].classList.remove('non-checked');
            opcaoPrato[opcaoAnteriorPrato-1].classList.remove('selecionado');
            this.classList.add('selecionado');
        }else{
            optionChecked[opcaoAtualPrato-1].classList.remove('non-checked');
            this.classList.add('selecionado');
            contador++;
        }
        opcaoAnteriorPrato = opcaoAtualPrato;
        nomePrato = document.querySelectorAll('.option-dish-name')[opcaoAtualPrato-1].innerHTML;
        auxValorPrato = document.querySelectorAll('.option-dish-value > span')[opcaoAtualPrato-1].innerHTML;
        valorPrato = auxValorPrato.replace(',', '.');
        valorPrato = parseFloat(valorPrato)
        finalizaPedido();
        console.log(contador);
    }
}

function selecionarBebida(){
    const optionChecked = document.querySelectorAll('.check-drink-option');
    currentIdBebida = this.id;
    opcaoAtualBebida = parseInt(currentIdBebida[(currentIdBebida.length)-1]);
    if(opcaoAtualBebida !== opcaoAnteriorBebida){
        if(opcaoAnteriorBebida !== undefined){
            optionChecked[opcaoAnteriorBebida-1].classList.add('non-checked');
            optionChecked[opcaoAtualBebida-1].classList.remove('non-checked');
            opcaoBebida[opcaoAnteriorBebida-1].classList.remove('selecionado');
            this.classList.add('selecionado');
        }else{
            optionChecked[opcaoAtualBebida-1].classList.remove('non-checked');
            this.classList.add('selecionado');
            contador++;
        }
        opcaoAnteriorBebida = opcaoAtualBebida;
        nomeBebida = document.querySelectorAll('.option-drink-name')[opcaoAtualBebida-1].innerHTML;
        auxValorBebida = document.querySelectorAll('.option-drink-value > span')[opcaoAtualBebida-1].innerHTML;
        valorBebida = auxValorBebida.replace(',', '.');
        valorBebida = parseFloat(valorBebida)
        finalizaPedido();
        console.log(contador);
    }
}

function selecionarSobremesa(){
    const optionChecked = document.querySelectorAll('.check-dessert-option');
    currentIdSobremesa = this.id;
    opcaoAtualSobremesa = parseInt(currentIdSobremesa[(currentIdSobremesa.length)-1]);
    if(opcaoAtualSobremesa !== opcaoAnteriorSobremesa){
        if(opcaoAnteriorSobremesa !== undefined){
            optionChecked[opcaoAnteriorSobremesa-1].classList.add('non-checked');
            optionChecked[opcaoAtualSobremesa-1].classList.remove('non-checked');
            opcaoSobremesa[opcaoAnteriorSobremesa-1].classList.remove('selecionado');
            this.classList.add('selecionado');
        }else{
            optionChecked[opcaoAtualSobremesa-1].classList.remove('non-checked');
            this.classList.add('selecionado');
            contador++;
        }
        opcaoAnteriorSobremesa = opcaoAtualSobremesa;
        nomeSobremesa = document.querySelectorAll('.option-dessert-name')[opcaoAtualSobremesa-1].innerHTML;
        auxValorSobremesa = document.querySelectorAll('.option-dessert-value > span')[opcaoAtualSobremesa-1].innerHTML;
        valorSobremesa = auxValorSobremesa.replace(',', '.');
        valorSobremesa = parseFloat(valorSobremesa)
        finalizaPedido();
        console.log(contador);
    }
}

function finalizaPedido(){
    if(contador >= 3){
        const containerButton = document.querySelector('.container-button'); //trocar nome dessa variavel
        containerButton.classList.remove('button-inactive')
        containerButton.classList.add('button-active');
        document.querySelector('.text-button').innerHTML = 'Finalizar Pedido';
        document.querySelector('#finalize-request').addEventListener('click', confirmarPedido(containerButton));
    }
}

function confirmarPedido(containerButton){
    const modal = document.querySelector("#modal-request");
    const opcaoModal = document.querySelectorAll(".modal-buttons");
    comboSelecionado();
    opcaoModal[0].onclick = () => {
        modal.style.display = 'none';
        contatoWhatsApp();
    }
    opcaoModal[1].onclick = () => {
        modal.style.display = 'none';
    }
    containerButton.onclick = () => {
      modal.style.display = 'block';
    }
    window.onclick = (e) => {
      if (e.target == modal) {
        modal.style.display = 'none';
      }
    }
}

function comboSelecionado(){    
    let valorTotal = Number((valorPrato+valorSobremesa+valorBebida).toFixed(2));
    let auxValorTotal = ''+valorTotal;
    auxValorTotal = auxValorTotal.replace('.', ',');
    document.querySelectorAll('.selected-option')[0].innerHTML = nomePrato;
    document.querySelectorAll('.selected-option')[1].innerHTML = nomeBebida;
    document.querySelectorAll('.selected-option')[2].innerHTML = nomeSobremesa;
    document.querySelectorAll('.option-value')[0].innerHTML = auxValorPrato;
    document.querySelectorAll('.option-value')[1].innerHTML = auxValorBebida;
    document.querySelectorAll('.option-value')[2].innerHTML = auxValorSobremesa;
    document.querySelector('.option-value > span').innerHTML = auxValorTotal;
}

function contatoWhatsApp(){
    const nome = prompt('Digite seu nome.');
    const endereco = prompt('Digite seu endereço.');
    const valorTotal = valorPrato+valorBebida+valorSobremesa
    const mensagem = `Olá, eu gostaria de fazer o pedido:\n- Prato: ${nomePrato}\n-
    Bebida: ${nomeBebida}\n- Sobremesa: ${nomeSobremesa}\nTotal: R$ ${Number(valorTotal.toFixed(2))}\n\nNome: ${nome}\nEndereço: ${endereco}\n`;
    const link = 'https://wa.me/5585986840362?text='+mensagem; //encodeURIComponent() não funcionou;
    window.location.href = link;
}
