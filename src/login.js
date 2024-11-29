const input_username = document.getElementById('nameUser');
const input_password = document.getElementById('password');
const button_confirm = document.getElementById('buttonLogin');

const url_login = 'https://prog-webii-projeto.onrender.com/api/v1/users/login';

button_confirm.addEventListener('click', () => {
    const username = input_username.value;
    const password = input_password.value;
    // Async function to login
    (async () => {
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
            // Reciving json response
            const jsonData = await response.json();
            // Storage authToken on localStorage
            localStorage.authToken = jsonData.authToken;
            console.log('Login success');
            // Change to index page (home)
            window.location.replace('../index.html');
        } catch(err) {
            console.log(`Interface login error: ${err}`);
        }
    })();
});