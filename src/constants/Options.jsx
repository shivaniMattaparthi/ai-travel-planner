export const SelectTravelesList = [
    {
        id:1,
        title:'Just Me',
        desc:'A sole travels in exploration',
        icon: '✈',
        people:"1"
    },
    {
        id:2,
        title:'Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people:'2 People',
    },{
        id:3,
        title:'Family',
        desc:'A group of Fun Loving Adv',
        icon: '🏡',
        people: '3 to 5 people'
    },{
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'👬',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions = [
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of cost',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
    },{
        id:3,
        title:'Luxury',
        desc:'Dont Worry about the cost',
        icon:'💸'
    }
]

export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image URL, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day with each day plan with best time to visit in JSON format.And make sure the hotel name should be there if there is no hotel name just populate it with some random name'

// export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image URL, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day with each day plan with best time to visit in JSON format.'

// export const AI_PROMPT = 
// `Generate a detailed travel plan for {location} for {totalDays} days for {traveler} travelers with a {budget} budget.

// - Provide a list of **hotels** with:
//   - Hotel Name  
//   - Hotel Address  
//   - Price  
//   - **A real image URL from an actual source**  
//   - Geo Coordinates  

// - Create a **day-wise itinerary** with:
//   - Best places to visit  
//   - Ticket pricing  
//   - Time to spend at each location  
//   - Best time to visit  
//   - **A real image URL for each location**  

// Format the response strictly in **JSON**.`;

// `Generate a detailed travel plan for {location} for {totalDays} days for {traveler} travelers with a {budget} budget.

// - Provide a list of **hotels** with:
//   - Hotel Name  
//   - Hotel Address  
//   - Price  
//   - **A real image URL from a verified source (Google Maps, TripAdvisor, or official hotel website)**  
//   - Geo Coordinates  

// - Create a **day-wise itinerary** with:
//   - Best places to visit  
//   - Ticket pricing  
//   - Time to spend at each location  
//   - Best time to visit  
//   - **A real image URL from a reliable source (Google Maps, TripAdvisor, or the official website of the attraction)**  

// Ensure that the image URLs are accessible and not broken.  
// Format the response strictly in **JSON**.`

// `Generate a detailed travel plan for {location} for {totalDays} days for {traveler} travelers with a {budget} budget.

// Provide a list of hotels with:

// Hotel Name

// Hotel Address

// Price

// A real image URL from a verified source (Google Maps, TripAdvisor, Expedia, or the hotel's official website)

// Geo Coordinates

// Create a day-wise itinerary with:

// Best places to visit

// Ticket pricing

// Time to spend at each location

// Best time to visit

// A real image URL from a reliable source (Google Maps, TripAdvisor, the attraction’s official website, or Expedia)`
