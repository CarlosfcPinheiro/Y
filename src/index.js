// Checks if the token is still valid
const isTokenActive = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    // Returns true or false
    return currentTime < payload.exp;
};
  
const tokenActive = isTokenActive(localStorage.getItem('authToken'));
// Hide login and register links
if (tokenActive){
    const link_login = document.getElementById('login-link');
    const link_register = document.getElementById('register-link');

    link_login.style.display = 'none';
    link_register.style.display = 'none';
}
  