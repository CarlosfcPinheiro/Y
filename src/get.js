async function callPost(){
    try {
        const response = await fetch('http://prog-webii-projeto.onrender.com/api/v1/posts', 
            {
                method : 'GET',
                mode : 'no-cors',
                headers : {
                     'Content-Type': 'application/json'
                }
            }
        )
        if(!response.ok){
            throw new Error(`Erro ao acessar o servidor ${response.mesage}`)
        }else{
            const data = await response.json();
            console.log(data)
            displayPosts(data)
        }
    } catch (error) {
        console.log(`Erro ao acessar o servidor ${error}`)
    }
}

async function displayPosts(data){
    const postData = data;
    const divPost = document.querySelector('#posts')

    postData.forEach(post => {
        const name = document.createElement('h1');
        const profileImage = document.createElement('img');
        const image = document.createElement('img');
        const footer = document.createElement('div');

        name.classList.add('nameUser');
        profileImage.classList.add('profileImage')
        image.classList.add('post');
        footer.classList.add('footer')    

    });
} 


window.onload = callPost;