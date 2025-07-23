const { ProductAdvertisingAPIv1 } = require("@aws-sdk/client-product-advertising-api");

export default async function handler(req, res) {
  // Your secret keys are loaded from Vercel's Environment Variables
  const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
  const SECRET_KEY = process.env.AWS_SECRET_KEY_1; // Make sure this matches the name you used in Vercel
  const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG;
  const REGION = "us-east-1";

  const { keywords, category } = req.body;

  const paapi = ProductAdvertisingAPIv1.fromIni({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    partnerTag: PARTNER_TAG,
    region: REGION
  });

  const searchParams = {
    Keywords: keywords,
    SearchIndex: category,
    ItemCount: 10,
    Resources: [
      "Images.Primary.Medium",
      "ItemInfo.Title",
      "Offers.Listings.Price"
    ],
  };

  try {
    const response = await paapi.searchItems(searchParams);
    
    const products = response.SearchResult.Items.map(item => ({
      title: item.ItemInfo?.Title?.DisplayValue || 'No title available',
      url: item.DetailPageURL,
      image: item.Images?.Primary?.Medium?.URL || 'https://via.placeholder.com/150',
      price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || null
    }));

    res.status(200).json(products);

  } catch (error) {
    console.error("Amazon API Error:", error);
    res.status(500).json({ error: "Failed to fetch data from Amazon." });
  }
}
