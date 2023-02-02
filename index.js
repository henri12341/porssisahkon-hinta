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

const getCurrentPrice = async () => {
    try {
    const response = await fetch("http://localhost:5000/current_price", {
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
    let data = await getPrices();
    document.getElementById("text").innerHTML = `Sähkön tunnittainen hintadata (48h):<br><br>${JSON.stringify(data)}`;
    let current_price = await getCurrentPrice();

    document.getElementById("current_price_text").innerHTML = `Sähkönhinta tällä hetkellä = ${current_price} snt / kWh`;
    create_chart(data);
}
main()


const create_chart = (data) => {

    chart_x = []
    chart_y = []

    for (let i = data.length - 1; i >= 0; i--) {
        chart_x.push(data[i]["startDate"].split(":")[0])
        chart_y.push(data[i]["price"])
    }

    let chart = document.getElementById("myChart")
    new Chart(chart, {
    type: "line",
    data: {
        labels: chart_x,
        datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,0,1.0)",
        borderColor: "rgba(0,0,0,0.8)",
        data: chart_y
        }]
  },
  options: {
    legend: {display: false},
  }
});
}

