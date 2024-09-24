const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    // e.preventDefault() Prevent Submit

    let errors = [];

    if(firstname_input) {
        // If we have a firstname input we are in the signup
        errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value);
    }
    else {
        // If we don't have a firstname input then we are in the login
        errors = getLoginFormErrors(firstname_input.value, email_input.value);
    }

    if(errors.length > 0) {
        e.preventDefault();
        error_message.innerHTML = errors.join(". ");
    }
})

function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = [];

    if(firstname === '' || firstname == null) {
        errors.push('Primeiro nome é Obrigatório');
        firstname_input.parentElement.classList.add('incorrect');
    }

    if(email === '' || email == null) {
        errors.push('Email é Obrigatório');
        email_input.parentElement.classList.add('incorrect');
    }

    if(password === '' || password == null) {
        errors.push('Senha é Obrigatória.');
        password_input.parentElement.classList.add('incorrect');
    }

    if(password.length < 8) {
        errors.push('A senha deve ter pelo menos 8 caracteres');
        password_input.parentElement.classList.add('incorrect');
    }

    if(password !== repeatPassword) {
        errors.push('Senha não corresponde.');
        password_input.parentElement.classList.add('incorrect');
        repeat_password_input.parentElement.classList.add('incorrect');
    }

    return errors;

}

function getLoginFormErrors(email, password) {
    let errors = [];

    if(email === '' || email == null) {
        errors.push('Email é Obrigatório');
        email_input.parentElement.classList.add('incorrect');
    }

    if(password === '' || password == null) {
        errors.push('Senha é Obrigatória.');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

/*
function areaAdm(email, password) {
    let errors = [];

    if(firstname === 'adm' && email === 'aparecida@gmail.com' && password === 'aparecida123' && repeatPassword === 'aparecida123') {
        error_message.innerHTML = <a href="area-adm.html">Área Adm</a>;
    }

    return errors;
} 
*/

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null);

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';
        }
    })
})

//31:20 está dando erro