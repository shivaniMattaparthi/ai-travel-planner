import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/services/GlobalApis";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  const [photo, setPhoto] = useState()
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip])

  const GetPlacePhoto = async()=>{
    const data = {
      textQuery:trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp,"response")
      console.log(resp.data.places[0].photos[3].name)

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      console.log(PhotoUrl)
      setPhoto(PhotoUrl)
    })
  }

  
  
  // const GetPlacePhoto = async () => {
  //   try {
  //     const data = { textQuery: trip?.userSelection?.location?.label };
  //     const resp = await GetPlaceDetails(data);
  //     const photoRef = resp.data.places[0].photos[0].name; // Use first photo
  //     const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
  
  //     // Fetch with headers (if needed)
  //     const response = await fetch(photoUrl, {
  //       headers: { 
  //         'Authorization': `Bearer ${import.meta.env.VITE_GOOGLE_API_KEY}`,
  //         'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
  //       },
  //     });
  
  //     if (!response.ok) throw new Error("Failed to fetch image");
      
  //     const blob = await response.blob();
  //     const objectUrl = URL.createObjectURL(blob);
  //     console.log(objectUrl,"objurl")
  //     setPhoto(objectUrl); // Works in <img>
  //   } catch (error) {
  //     console.error("Error loading photo:", error);
  //   }
  // };
 
  // const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?
  // center=${trip.latitude},${trip.longitude}&
  // zoom=15&
  // size=800x400&
  // markers=color:red%7C${trip.latitude},${trip.longitude}&
  // key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

// Use in <img> directly
  
  return (
    <div>
      <img
        src={photo}
        className="h-[300px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2 ">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📆 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No. Of Traveler: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button><IoIosSend /></Button>
      </div>
    </div>
  );
}

export default InfoSection;



// const GetPlacePhoto = async () => {
  //   const data = {
  //     textQuery: trip?.userSelection?.location?.label
  //   };
  //   const resp = await GetPlaceDetails(data);
  //   const photoRef = resp.data.places[0].photos[0].name;
  //   const imageURL = `https://places.googleapis.com/v1/${photoRef}/media?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}&maxWidthPx=1000`;
  // console.log(imageURL)
  //   setPhoto(imageURL);
  // };