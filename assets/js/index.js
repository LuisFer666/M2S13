console.log("Entro index.js");

(() => {
    console.log("Entro a la funcion anonima");
    const BASE_URL = 'https://animales-api.onrender.com';
    const myChart = document.getElementById('myChart').getContext('2d');

    const loadData = () =>{
        fetch(BASE_URL + '/animales',
        {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
        for (let i = 0; i < data.data.length; i++) {
            document.getElementById("tablaLoca").innerHTML +=
            `<tr>
                <td>${data.data[i].id}</td>
                <td>${data.data[i].nombre}</td>
                <td>${data.data[i].cantidad}</td>
            </tr>`;
            console.log(data.data);
        }

            let labels_for_chart = data.data.map((item) =>{
                return item.nombre;
            });

            let data_for_chart = data.data.map((item) =>{
                return item.cantidad;
            });

            const grafica = new Chart(myChart, {
                type: 'bar',
                data: {
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
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
    }

    loadData();

})()