exports.handler = async (event) => {

  if (!event.body) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Function aktif" })
    };
  }

  try {

    const data = JSON.parse(event.body);
    const amount = data.amount;

    return {
      statusCode: 200,
      body: JSON.stringify({
        qr_url: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ORDER-" + amount
      })
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };

  }

};
