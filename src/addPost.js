const input_url = document.getElementById('input-url');
const input_desc = document.getElementById('description');
const img_selected = document.getElementById('img-selected');

const button_send = document.getElementById('postSubmit');

const url_create_post = 'http://localhost:3000/api/v1/posts'

button_send.addEventListener('click', async () => {
    const url_image = String(input_url.value);
    const description = input_desc.value;

    console.log(url_image);
    console.log(description);

    const authToken = localStorage.authToken;
    const userid = localStorage.id;

    try{
        const response = await fetch(url_create_post, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                description: description,
                img_data: url_image,
                userid: userid
            })
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse);

    } catch(err){
        console.log(`Error when create new Post: ${err}`);
    }
});

input_url.addEventListener('input', (event) => {
    img_selected.src = input_url.value;
    console.log(event);
});