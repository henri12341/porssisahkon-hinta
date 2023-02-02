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
}
main()