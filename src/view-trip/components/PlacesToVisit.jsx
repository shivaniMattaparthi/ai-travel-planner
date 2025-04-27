// import React from "react";

// function PlacesToVisit({ trip }) {
//   return (
//     <div>
//       <h2 className="font-bold text-lg">Places to Visit</h2>
//       <div>
//         {Object.entries(trip.tripData.itinerary).map((item, index) => (
//           <div>
//             <h2>hi</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PlacesToVisit;

import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div >
        {trip.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary).map(([day, places]) => (
            <div className="mt-5">
              <h2 className="font-medium text-lg">{day.toUpperCase()}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
              {places.map((place,index)=>(
                <div>
                    <h2 className="font-medium text-sm text-orange-600">{place.bestTime}</h2>
                    <PlaceCardItem place = {place}/>
                </div>
              ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}


// function PlacesToVisit({ trip }) {
//   return (
//     <div>
//       <h2 className="font-bold text-lg">Places to Visit</h2>
//       <div>
//         {trip.tripData?.itinerary &&
//           Object.entries(trip.tripData.itinerary).map(([day, places], dayIndex) => (
//             <div className="mt-5" key={dayIndex}>
//               <h2 className="font-medium text-lg">{day.toUpperCase()}</h2>
//               <div className="grid md:grid-cols-2 gap-5">
//                 {Array.isArray(places) &&
//                   places.map((place, index) => (
//                     <div key={index}>
//                       <h2 className="font-medium text-sm text-orange-600">{place.bestTime}</h2>
//                       <PlaceCardItem place={place} />
//                     </div>
//                   ))}
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }


export default PlacesToVisit;

