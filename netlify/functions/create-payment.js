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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: process.env.ATLANTIC_API_KEY,
        nominal: amount,
        metode: "QRIS",
        reff_id: "ORDER" + Date.now()
      })
    });

    const text = await response.text();
    console.log("RAW RESPONSE:", text);

    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Response bukan JSON", raw: text })
      };
    }

    // Ambil QR dari berbagai kemungkinan struktur
    const qr =
      result?.data?.qr_url ||
      result?.data?.qr_string ||
      result?.qr_url ||
      result?.qr_string;

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
