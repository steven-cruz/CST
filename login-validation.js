document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if(username.trim() === '' || password.trim() === '') {
      alert('Please fill in both fields.');
      return false;
    }

    if(username === "admin" && password === "12345") {
        alert('Login successful!'); // Simulamos una validación exitosa
    }else {
        alert('Invalid Credentials!');
    }

    // Aquí podrías añadir más validaciones o enviar los datos a un servidor
    console.log('Username: ' + username);
    console.log('Password: ' + password);

        return true;
  };