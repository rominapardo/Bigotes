
var form = document.getElementById("my-form");
        
async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    if(validar(status)){
        var data = new FormData(event.target);
        fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
        }).then(response => {
        if (response.ok) {
            status.innerHTML = "Gracias por contactarnos!";
            form.reset()
        } else {
            response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
                status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
                status.innerHTML = "Oops! Hubo un problema con el envio de su formulario.";
            }
            })
        }
        }).catch(error => {
        status.innerHTML = "Oops! Hubo un problema con el envio de su formulario.";
        });
    }
}
form.addEventListener("submit", handleSubmit)



function validar (status) {
    var inputsTexto = document.getElementsByClassName('tipo_text');
    var inputsNum = document.getElementsByClassName('tipo_num');
    var inputsAreaTexto = document.getElementsByClassName('tipo_textArea');
    var inputsSelect = document.getElementsByClassName('tipo_select');
    var correoElectronico = document.getElementById('correo');
    var estaValidado = true;
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    for (var i=0; i < inputsTexto.length; i++){
        if (inputsTexto[i].value.trim().length >= 4 && inputsTexto[i] !== null){
            inputsTexto[i].classList.remove("input-error");
        }else{
            inputsTexto[i].classList.add("input-error");
            estaValidado = false;
        }
    }

    for (var i=0; i < inputsNum.length; i++){
        if (inputsNum[i].value.trim().length >= 1 && inputsNum[i] !== null){
            inputsNum[i].classList.remove("input-error");
        }else{
            inputsNum[i].classList.add("input-error");
            estaValidado = false;
        }
    }

    for (var i=0; i < inputsAreaTexto.length; i++){
        if (inputsAreaTexto[i].value.trim().length >= 2 && inputsAreaTexto[i] !== null){
            inputsAreaTexto[i].classList.remove("input-error");
        }else{
            inputsAreaTexto[i].classList.add("input-error");
            estaValidado = false;
        }
    }

    for (var i=0; i < inputsSelect.length; i++){
        if (inputsSelect[i].value !== "" && inputsSelect[i] !== null) {
            inputsSelect[i].classList.remove("input-error");
        }else{
            inputsSelect[i].classList.add("input-error");
            estaValidado = false;
        }
    }

	if( validEmail.test(correoElectronico.value) ){
		correoElectronico.classList.remove("input-error");
	}else{
		correoElectronico.classList.add("input-error");
        estaValidado = false;
	}

    if (!estaValidado){
        status.classList.add("error");
        status.innerHTML = "Complete los campos indicados en rojo."
    }else{
        status.classList.remove("error");
        status.innerHTML = "";
    }

    return estaValidado;
}