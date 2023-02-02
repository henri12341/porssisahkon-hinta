

const getPrices = async () => {
  try {
    const response = await fetch("http://localhost:5000/latest_prices", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    return data

  } catch(err) {
    console.log(err)
  }
};

const main = async () => {
    let data = await getPrices()
    console.log(data)
    document.getElementById("text").innerHTML = JSON.stringify(data);
    create_chart(data);
}
main()


const create_chart = (data) => {

    chart_data = []

    console.log(data[0]["price"])
    console.log(data.length)
    for (let i = 0; i < data.length; i++) {
        chart_data.push({x: i, y: data[i]["price"]})
    }
    console.log(chart_data)

    var xyValues = [
        {x:50, y:7},
        {x:60, y:8},
        {x:70, y:8},
        {x:80, y:9},
        {x:90, y:9},
        {x:100, y:9},
        {x:110, y:10},
        {x:120, y:11},
        {x:130, y:14},
        {x:140, y:14},
        {x:150, y:15}
    ];

    let chart = document.getElementById("myChart")
    console.log(chart)
    new Chart(chart, {
    type: "scatter",
    data: {
        datasets: [{
        pointRadius: 4,
        pointBackgroundColor: "rgb(0,0,255)",
        data: chart_data
        }]
    },
    options: {
        legend: {display: false},
        scales: {
        }
    }
    });
}

