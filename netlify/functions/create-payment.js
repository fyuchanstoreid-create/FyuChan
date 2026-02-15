exports.handler = async (event) => {

  const data = JSON.parse(event.body);
  const amount = data.amount;

  try {

    const response = await fetch("API_URL_PAYMENT_GATEWAY", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.API_KEY
      },
      body: JSON.stringify({
        amount: amount,
        order_id: "ORDER" + Date.now()
      })
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: "Error"
    };
  }
};
