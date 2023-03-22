console.log("Entro index.js");

const BASE_URL = 'https://animales-api.onrender.com';
const myChart = document.getElementById('myChart').getContext('2d');

const grafica = new Chart(myChart, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Animales del Zoo',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function setData(chart, labels_for_chart, data_for_chart) {
    chart.data = {
        labels: labels_for_chart,
        datasets: [{
            label: 'Animales del Zoo',
            data: data_for_chart,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    };
    chart.update();
}


function loadData() {
    fetch(BASE_URL + '/animales',
        {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("tablaLoca").innerHTML = "";
            for (let i = 0; i < data.data.length; i++) {
                document.getElementById("tablaLoca").innerHTML +=
                    `<tr>
                            <td>${data.data[i].id}</td>
                            <td>${data.data[i].nombre}</td>
                            <td>${data.data[i].cantidad}</td>
                        </tr>`;
            }

            let labels_for_chart = data.data.map((item) => {
                return item.nombre;
            });

            let data_for_chart = data.data.map((item) => {
                return item.cantidad;
            });

            setData(grafica, labels_for_chart, data_for_chart);

        });

}

(() => {
    console.log("Entro a la funcion anonima");
    loadData();
})()

function add() {
    var inputNombre = document.getElementById("inputNombre");
    var inputMonto = document.getElementById("inputMonto");

    var btnAdd = document.getElementById("btnAdd");

    console.log(inputNombre.value, inputMonto.value);

    btnAdd.innerHTML = `<button class="btn btn-primary" type="button" disabled>
                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>`;

    fetch(BASE_URL + '/animales', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: inputNombre.value,
            cantidad: inputMonto.value
        })
    })
        .then((response) => {
            console.log("Respuesta: ", response);

            btnAdd.innerHTML = `<button type="button" class="btn btn-primary" onclick="add()" id="btnAdd">Agregar</button>`;
            loadData();
        });
}