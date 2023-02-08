var bancoCadastros = JSON.parse(localStorage.getItem("cadastros"));
if(!bancoCadastros) {
    bancoCadastros = []
}


function limparForm() {
    document.getElementById("name1").value = "";
    document.getElementById("email1").value = "";
    document.getElementById("password1").value = "";
    document.getElementById("pokefav1").value = '<option value="0">SEM PREFERÊNCIA</option>';
    document.getElementById("gamefav1").value = '<option value="0">SEM PREFERÊNCIA</option>';
    document.getElementById("plat1").value = '<option value="0">SEM PREFERÊNCIA</option>';
    document.getElementById("typefav1").value = '<option value="0">SEM PREFERÊNCIA</option>';

}
function pegaSelect(id) {
    let select = document.getElementById(id);
    let optionValue = select.options[select.selectedIndex];
    return optionValue.text;
}
function cadastrarNovo() {

    var name1 = document.getElementById("name1").value;
    var email1 = document.getElementById("email1").value;
    var password1 = document.getElementById("password1").value;
    var pokefav1 = pegaSelect("pokefav1");
    var gamefav1 = pegaSelect("gamefav1");
    var plat1 = pegaSelect("plat1");
    var typefav1 = pegaSelect("typefav1");
    if(name1 == '' || email1 == '' || password1 == '' || !(email1.includes("@"))) {
        alert("Cadastro invalido, favor colocar Nome, email e senhas corretos")
    } else {
        var novoCadastro = {
            "nome": name1,
            "email": email1,
            "senha": password1,
            "pokemonFavorito": pokefav1,
            "jogoFavorito": gamefav1,
            "plataforma": plat1,
            "tipoFavorito": typefav1
        }
        bancoCadastros.push(novoCadastro);
        localStorage.setItem("cadastros", JSON.stringify(bancoCadastros));
        limparForm();
        location.href='treinador.html';
    }

}
var Uservalid = {}

function logar() {
    var emailcad = document.getElementById("email").value;
    var senhacad = document.getElementById("senha").value;

    bancoCadastros.forEach((item) => {
        if (emailcad == item.email && senhacad == item.senha) {
            Uservalid = {
                nome: item.nome,
                email: item.email,
                senha: item.senha,
                pokemonFavorito: item.pokemonFavorito,
                jogoFavorito: item.jogoFavorito,
                plataforma: item.plataforma,
                tipoFavorito: item.tipoFavorito,
            }
        }
    }
    )


    if (emailcad == Uservalid.email && senhacad == Uservalid.senha) {
        alert("LOGADO");
        trocadiv();
        perfil(Uservalid)
    } else {
        alert("USUÁRIO INCORRETO");
    }
}

function trocadiv() {
    var divlogin = document.querySelector("#login");
    var divperfil = document.querySelector("#perfil");
    divlogin.style.display='none';
    divperfil.style.display='block'
}

function perfil(Uservalid) {

    let strnome = `<label for="first_name">
                        <h4>Nome do Treinador</h4>
                    </label>
                    <input type="text" class="form-control" name="perfilNomeTreinador"
                    value="${Uservalid.nome}" id="nomePerfil" disabled>`;

    let strInicialFavorito = `<label for="inicial-favorito">
    <h4>Inicial Favorito</h4>
</label>
<select class="form-control form-select" aria-label="Default select example"
    id="perfilInicialFavorito" disabled>
    <option selected>${Uservalid.pokemonFavorito}</option>
    <option value="0">SEM PREFERÊNCIA</option>
    <option value="1">BULBASAUR</option>
    <option value="2">CHARMANDER</option>
    <option value="3">SQUIRTLE</option>
    <option value="4">CHIKORITA</option>
    <option value="5">CYNDAQUIL</option>
    <option value="6">TOTODILE</option>
    <option value="7">TREECKO</option>
    <option value="8">TORCHIC</option>
    <option value="9">MUDKIP</option>
    <option value="10">TURTWIG</option>
    <option value="11">CHIMCHAR</option>
    <option value="12">PIPLUP</option>
    <option value="13">SNIVY</option>
    <option value="14">TEPIG</option>
    <option value="15">OSHAWOTT</option>
    <option value="16">CHESPIN</option>
    <option value="17">FENNEKIN</option>
    <option value="18">FROAKIE</option>
    <option value="19">ROWLET</option>
    <option value="20">LITTEN</option>
    <option value="21">POPPLIO</option>
    <option value="22">GROOKEY</option>
    <option value="23">SCORBUNNY</option>
    <option value="24">SOBBLE</option>
</select>`;

    let strjogoFavorito = `<label for="inicial-favorito">
    <h4>Jogo Favorito</h4>
</label>
<select class="form-control form-select" aria-label="Default select example"
id="perfilGameFav" disabled>
    <option selected>${Uservalid.jogoFavorito}</option>
    <option value="0">SEM PREFERÊNCIA</option>
    <option value="1">POKEMON RED/BLUE/YELLOW</option>
    <option value="2">POKEMON FIRE RED/LEAF GREEN</option>
    <option value="3">POKEMON LET'S GO PIKACHU/EEVEE</option>
    <option value="4">POKEMON GOLD/SILVER/CRYSTAL</option>
    <option value="5">POKEMON HERAT GOLD/SOUL SILVER</option>
    <option value="6">POKEMON RUBY/SAPHIRE/EMERALD</option>
    <option value="7">POKEMON OMEGA RUBY/ALPHA SAPHIRE</option>
    <option value="8">POKEMON DIAMOND/PEARL/PLATINUM</option>
    <option value="9">POKEMON BRILLIANT DIAMOND/SHINING PEARL</option>
    <option value="10">POKEMON BLACK/WHITE</option>
    <option value="11">POKEMON BLACK 2/WHITE 2</option>
    <option value="12">POKEMON X/Y</option>
    <option value="13">POKEMON SUN/MOON</option>
    <option value="14">POKEMON Ultra SUN/MOON</option>
    <option value="15">POKEMON SWORD/SHIELD</option>`;

    let strtipoFavorito = `<label for="tipo-favorito">
    <h4>Tipo Favorito</h4>
</label>
<select class="form-control form-select"
    aria-label="Default select example" id="perfiltipofav" disabled>
    <option selected>${Uservalid.tipoFavorito}</option>
    <option value="0">SEM PREFERÊNCIA</option>
    <option value="1">NORMAL</option>
    <option value="2">FIRE</option>
    <option value="3">WATER</option>
    <option value="4">GRASS</option>
    <option value="5">ELECTRIC</option>
    <option value="6">ICE</option>
    <option value="7">FIGHTING</option>
    <option value="8">POISON</option>
    <option value="9">GROUND</option>
    <option value="10">FLYING</option>
    <option value="11">PSYCHIC</option>
    <option value="12">BUG</option>
    <option value="13">GHOST</option>
    <option value="14">DRAGON</option>
    <option value="15">DARK</option>
    <option value="16">STEEL</option>
    <option value="17">FAIRY</option>
</select>`;

    let strplataforma = `<label for="Plataforma">
    <h4>Plataforma aonde jogo</h4>
</label>
<select class="form-control form-select"
    aria-label="Default select example" id="perfilplat" disabled>
    <option value="0">${Uservalid.plataforma}</option>
    <option value="0">SEM PREFERÊNCIA</option>
    <option value="1">COMPUTADOR</option>
    <option value="2">PORTÁTIL DA NINTENDO</option>
    <option value="3">CELULAR</option>
</select>`;

    document.querySelector("#perfilNomeTreinador").innerHTML = strnome;
    document.querySelector("#perfilInicialfav").innerHTML = strInicialFavorito;
    document.querySelector("#perfilJogoFav").innerHTML = strjogoFavorito;
    document.querySelector("#perfiltipoFav").innerHTML = strtipoFavorito;
    document.querySelector("#perfilPlatfav").innerHTML = strplataforma;
}

function editaPerfil() {
    desabilitabtns(editaPerfil);
    
}
function salva() {
    desabilitabtns(salva);
    let novoNome = document.getElementById("nomePerfil").value;
    let novoPoke = pegaSelect("perfilInicialFavorito");
    let novoJogo = pegaSelect("perfilGameFav");
    let novaPlat = pegaSelect("perfilplat");
    let novoTipo = pegaSelect("perfiltipofav");
    bancoCadastros.forEach((item) => {
        if (item.email == Uservalid.email && item.senha == Uservalid.senha) {
            let indexItem = bancoCadastros.indexOf(item);
            bancoCadastros.splice(indexItem, 1);
            item = {
                nome: novoNome,
                email: item.email,
                senha: item.senha,
                pokemonFavorito: novoPoke,
                jogoFavorito: novoJogo,
                plataforma: novaPlat,
                tipoFavorito: novoTipo,
            }
            bancoCadastros.push(item)
            localStorage.setItem("cadastros", JSON.stringify(bancoCadastros));
        }
    })


}
function desabilitabtns(funcao) {
    if(funcao == editaPerfil) {
        document.querySelector("#nomePerfil").disabled = false;
        document.querySelector("#perfilInicialFavorito").disabled = false;
        document.querySelector("#perfilGameFav").disabled = false;
        document.querySelector("#perfiltipofav").disabled = false;
        document.querySelector("#perfilplat").disabled = false;
        document.querySelector("#btnSalvar").style.display = 'block';

    } else if(funcao == salva) {
        document.querySelector("#nomePerfil").disabled = true;
        document.querySelector("#perfilInicialFavorito").disabled = true;
        document.querySelector("#perfilGameFav").disabled = true;
        document.querySelector("#perfiltipofav").disabled = true;
        document.querySelector("#perfilplat").disabled = true;
        document.querySelector("#btnSalvar").style.display = 'none';
    }
}