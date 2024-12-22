const input_username = document.getElementById('nameUser');
const input_password = document.getElementById('password');
const button_confirm = document.getElementById('buttonLogin');

// Dynamic elements
const bg_loading = document.getElementById('loading');
const login_fail = document.getElementById('login-fail');

const url_login = 'http://localhost:3000/api/v1/users/login';

button_confirm.addEventListener('click', () => {
    button_confirm.disabled = true;

    const username = input_username.value;
    const password = input_password.value;

    // Async function to login
    (async () => {
        bg_loading.classList.add('show');
        try{
            const response = await fetch(url_login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            });
            // Check status code
            const status = checkResponse(response);
            if (status){
                console.log("200")
                // Reciving json response
                const jsonData = await response.json();
                // Storage authToken on localStorage
                localStorage.authToken = jsonData.authToken;
                localStorage.id = jsonData.user.id;
                localStorage.name = jsonData.user.name;
                localStorage.posts_quant = jsonData.user.posts_quant;
                // window.location.replace('../index.html');
                window.location.replace('../index.html');
            } else {
                login_fail.classList.add('show');
            }
        } catch(err) {
            console.log(`Interface login error: ${err}`);
        }
        // Set default states
        bg_loading.classList.remove('show');
        button_confirm.disabled = false;
    })();
});

// Check request response
const checkResponse = (responseData) => {
    if (responseData.status == 200){
        return true
    } else {
        return false
    }
}