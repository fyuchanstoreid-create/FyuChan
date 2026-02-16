exports.handler = async (event) => {

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {

    const { amount } = JSON.parse(event.body);

    const response = await fetch("https://atlantich2h.com/api/transaction/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.ATLANTIC_API_KEY
      },
      body: JSON.stringify({
        nominal: amount,
        metode: "QRIS",
        reff_id: "ORDER" + Date.now()
      })
    });

    const result = await response.json();

    console.log("Response Atlantic:", result);

    // Cek lokasi QR dari response
    const qr = result?.data?.qr_url || result?.qr_url;

    if (!qr) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "QR tidak ditemukan", result })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ qr_url: qr })
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };

  }

};
