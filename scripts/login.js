console.log("Login js connected");

document.getElementById("sign-btn").addEventListener('click',function(){
    const user = document.getElementById('user-inp');
    const username = user.value;
    const pass = document.getElementById('user-pass');
    const password = pass.value;

    if(username == 'admin' && password == 'admin123'){
        alert("login successful");
        window.location.assign('/home.html');
    }
    else{
        alert('try again');
        return;
    }
})