function getRandomUser() {
    // crea una instancia de XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // define la función que se llamará cuando se complete la solicitud
    xhr.onload = function () {
        // verifica si la solicitud fue exitosa (código 200)
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const user = response.results[0];
            console.log(user);
            document.getElementById("nombre-completo").innerHTML = `<p>${user.name.first}</p> <p>${user.name.last}</p>`;
            document.getElementById("edad").innerHTML = user.dob.age;
            document.getElementById("correo").innerHTML = user.email;
            document.getElementById("telefono").innerHTML = user.cell;
            document.getElementById("calle").innerHTML = user.location.street.name;
            document.getElementById("numero-ca").innerHTML = user.location.street.number;
            document.getElementById("estado").innerHTML = user.location.state;
            document.getElementById("ciudad").innerHTML = user.location.city;
            document.getElementById("nacionalidad").innerHTML = user.nat;
            document.getElementById("fotografia").src = user.picture.large;
        } else {
            alert('Error 2 al obtener usuario aleatorio');
        }
    };

    xhr.open('GET', 'https://randomuser.me/api/', true);
    xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
    getRandomUser();

    //funcion para +info a cada texto
    const infoSpans = document.querySelectorAll('.info');
    const infoTexts = {};

    infoSpans.forEach(span => {
        const parent = span.parentElement;
        const info = parent.getAttribute('data-info');
        infoTexts[info] = span;
    });

    infoSpans.forEach(span => {
        span.addEventListener('mouseover', () => {
            const parent = span.parentElement;
            const info = parent.getAttribute('data-info');
            const infoPopup = document.createElement('div');
            infoPopup.textContent = info;
            infoPopup.style.position = 'absolute';
            infoPopup.style.color = '#ffffff';
            infoPopup.style.background = '#26496f';
            infoPopup.style.padding = '10px';
            infoPopup.style.border = '1px solid #ccc';
            infoPopup.style.zIndex = '1';
            infoPopup.style.top = parent.offsetTop + parent.offsetHeight + 'px';
            infoPopup.style.left = parent.offsetLeft + 'px';
            document.body.appendChild(infoPopup);
            infoTexts[info] = infoPopup;
        });

        span.addEventListener('mouseout', () => {
            const parent = span.parentElement;
            const info = parent.getAttribute('data-info');
            const infoPopup = infoTexts[info];
            document.body.removeChild(infoPopup);
            infoTexts[info] = null;
        });
    });

});