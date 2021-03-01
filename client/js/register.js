window.addEventListener('load', (event) => {
    const registerForm = document.querySelector('#register');
    const url = 'https://frontend-assignment02.herokuapp.com'
    registerForm.addEventListener('submit',  async (event) => {
        event.preventDefault();
        const name = event.target.querySelector('#fullname').value;
        const email = event.target.querySelector('#email').value;
        const password = event.target.querySelector('#password').value;
        
        const body = {
            username: name,
            email: email,
            password: password
        };

        const resp = await fetch(`${url}/register`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(body)
        })
        if(resp.redirected){
            window.location.href = resp.url;
        }
    })
})