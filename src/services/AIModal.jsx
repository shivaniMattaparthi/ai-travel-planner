import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "application/json",
  };
  
   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location - Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a Hotels options list with HotelName, Hotel Address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot directly access and display images or real-time pricing for hotels.  Hotel prices fluctuate constantly.  Therefore, I cannot provide URLs for hotel images or exact pricing.  I will provide you with a JSON structure containing the other requested information, which you can then populate with data from hotel booking websites (like Expedia, Booking.com, Kayak) and Google Maps.\n\n```json\n{\n  \"tripName\": \"Las Vegas Budget Getaway for Couples (3 Days)\",\n  \"budget\": \"Cheap\",\n  \"travelers\": 2,\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1\", \n      \"hotelAddress\": \"123 Example St, Las Vegas, NV\",\n      \"priceRange\": \"$50-$80/night\",  //Update with actual price range from booking site\n      \"hotelImageUrl\": \"InsertImageUrlHere\", //Replace with actual image URL from booking site\n      \"geoCoordinates\": {\n        \"latitude\": 36.1699,\n        \"longitude\": -115.1398\n      },\n      \"rating\": 3.8, //Update with actual rating from booking site\n      \"description\": \"A basic but clean hotel located off the Strip. Offers free parking and a pool.\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 2\",\n      \"hotelAddress\": \"456 Another Ave, Las Vegas, NV\",\n      \"priceRange\": \"$60-$90/night\", //Update with actual price range from booking site\n      \"hotelImageUrl\": \"InsertImageUrlHere\", //Replace with actual image URL from booking site\n      \"geoCoordinates\": {\n        \"latitude\": 36.1215,\n        \"longitude\": -115.1739\n      },\n      \"rating\": 4.0,  //Update with actual rating from booking site\n      \"description\": \"Slightly further from the Strip but offers free shuttle service. Includes a small fitness center.\"\n    },\n     {\n      \"hotelName\": \"Hotel Name 3\",\n      \"hotelAddress\": \"789 Strip Blvd, Las Vegas, NV\",\n      \"priceRange\": \"$100-$150/night\", //Update with actual price range from booking site\n      \"hotelImageUrl\": \"InsertImageUrlHere\", //Replace with actual image URL from booking site\n      \"geoCoordinates\": {\n        \"latitude\": 36.1099,\n        \"longitude\": -115.1727\n      },\n      \"rating\": 4.2, //Update with actual rating from booking site\n      \"description\": \"Closer to the Strip action but expect higher prices. Offers some amenities, but may be more expensive than your budget.\"\n    }\n\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Free outdoor pedestrian mall with light shows and street performers.\",\n        \"placeImageUrl\": \"InsertImageUrlHere\", //Replace with actual image URL from Google Images\n        \"geoCoordinates\": {\n          \"latitude\": 36.1699,\n          \"longitude\": -115.1400\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToSpend\": \"3-4 hours\",\n        \"bestTime\": \"Evening (for the light show)\"\n      },\n      {\n        \"placeName\": \"The Neon Museum\",\n        \"placeDetails\": \"Outdoor museum featuring vintage Las Vegas signs. (Ticket required)\",\n        \"placeImageUrl\": \"InsertImageUrlHere\", //Replace with actual image URL from Google Images\n        \"geoCoordinates\": {\n          \"latitude\": 36.1777,\n          \"longitude\": -115.1502\n        },\n        \"ticketPricing\": \"$20-30\", //Update with actual price\n        \"timeToSpend\": \"1-2 hours\",\n        \"bestTime\": \"Late afternoon\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"The Strip (walking tour)\",\n        \"placeDetails\": \"Explore the famous Las Vegas Strip, see the hotels and casinos.\",\n        \"placeImageUrl\": \"InsertImageUrlHere\", //Replace with actual image URL from Google Images\n        \"geoCoordinates\": {\n          \"latitude\": 36.11,\n          \"longitude\": -115.17\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToSpend\": \"4-6 hours\",\n        \"bestTime\": \"Daytime\"\n      },\n      {\n        \"placeName\": \"Bellagio Fountains\",\n        \"placeDetails\": \"Free water show with music and lights.\",\n        \"placeImageUrl\": \"InsertImageUrlHere\", //Replace with actual image URL from Google Images\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1729\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToSpend\": \"30 minutes - 1 hour\",\n        \"bestTime\": \"Evening (shows are more frequent)\"\n      }      \n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Colorful art installation outside of the city (requires transportation).\",\n        \"placeImageUrl\": \"InsertImageUrlHere\", //Replace with actual image URL from Google Images\n        \"geoCoordinates\": {\n          \"latitude\": 36.0018,\n          \"longitude\": -114.9481\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToSpend\": \"1-2 hours\",\n        \"bestTime\": \"Afternoon\"\n      },\n      {\n        \"placeName\": \"Red Rock Canyon National Conservation Area\",\n        \"placeDetails\": \"Scenic desert landscape with hiking trails. (Entrance fee applies)\",\n        \"placeImageUrl\": \"InsertImageUrlHere\",  //Replace with actual image URL from Google Images\n        \"geoCoordinates\": {\n          \"latitude\": 36.1955,\n          \"longitude\": -115.7456\n        },\n        \"ticketPricing\": \"$15 per vehicle\",  //Update with actual price\n        \"timeToSpend\": \"2-3 hours\",\n        \"bestTime\": \"Morning or Late afternoon (avoid midday heat)\"\n      }\n    ]\n  }\n}\n```\n\nRemember to replace the placeholder values with actual data from your research.  Consider using public transportation or ride-sharing services to reduce costs, especially for locations outside the Strip.  Look for happy hour deals and free activities to save money on food and entertainment.  Have a great trip!\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  
    console.log(result.response.text());
  
  
