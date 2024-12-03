// Getting elements
const input_name = document.getElementById('nameUser');
const input_email = document.getElementById('email');
const input_paswd = document.getElementById('password');
const input_confPaswd = document.getElementById('confirmPassword');
// Button register
const button_confirm = document.getElementById('buttonLogin');
// Dynamic elements
const bg_loading = document.getElementById('loading');
const register_fail = document.getElementById('register-fail');
const register_fail_same = document.getElementById('register-fail-same');
// register endpoint
const url_register = 'https://prog-webii-projeto.onrender.com/api/v1/users';

button_confirm.addEventListener('click', (event) => {
    button_confirm.disabled = true;

    const name = input_name.value;
    const email = input_email.value;
    const password = input_paswd.value;
    const confPassword = input_confPaswd.value;

    bg_loading.classList.add('show');
    register_fail.classList.remove('show');
    register_fail_same.classList.remove('show');
    // Async function to register
    (async() => {
        console.log('clicked');
        if (password==confPassword){
            console.log("passwords matching");
            const response = await fetch(url_register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });
            // Check status code
            const statusCheck = checkResponse(response);
            const status = response.status;
            if (statusCheck){
                window.location.replace('./login.html');
            } else {
                if (status==409){
                    register_fail_same.classList.add('show');
                } else {
                    console.log('Register error');
                }
            }
        } else {
            register_fail.classList.add('show');
        }
        // Set default states
        bg_loading.classList.remove('show');
        button_confirm.disabled = false;
    })();
});

// Checks the response status code
const checkResponse = (response) => {
    const status = response.status;
    if (status==201){
        return true
    } else {
        return false
    }
}