// We need a special library from Amazon to help create the request
const { ProductAdvertisingAPIv1 } = require("@aws-sdk/client-product-advertising-api");

// This is the main function that Vercel will run
// It takes a request (req) and response (res) object
export default async function handler(req, res) {
  // 1. Check if the request is a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 2. Your secret keys and partner tag, securely loaded from environment variables
  const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY_1 = process.env.AWS_SECRET_ACCESS_KEY_1;
  const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG;
  const REGION = "us-east-1"; // Change this if your account is in a different region

  // 3. Get the keywords and category sent from your website
  const { keywords, category } = req.body;

  // 4. Create the Amazon API client
  const paapi = ProductAdvertisingAPIv1.fromIni({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    partnerTag: PARTNER_TAG,
    region: REGION
  });

  // 5. Define what we want to get back from Amazon
  const searchParams = {
    Keywords: keywords,
    SearchIndex: category,
    ItemCount: 10, // How many products to fetch
    Resources: [
      "Images.Primary.Medium",
      "ItemInfo.Title",
      "Offers.Listings.Price"
    ],
  };

  try {
    // 6. Make the actual request to Amazon
    const response = await paapi.searchItems(searchParams);

    // 7. Simplify the complex response from Amazon into a clean list
    const products = response.SearchResult.Items.map(item => ({
      title: item.ItemInfo?.Title?.DisplayValue || 'No title available',
      url: item.DetailPageURL,
      image: item.Images?.Primary?.Medium?.URL || 'https://via.placeholder.com/150',
      price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || null
    }));

    // 8. Send the clean list of products back to your frontend
    res.status(200).json(products);

  } catch (error) {
    console.error("Amazon API Error:", error);
    res.status(500).json({ error: "Failed to fetch data from Amazon." });
  }
}
