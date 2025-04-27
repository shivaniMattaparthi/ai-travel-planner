import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/services/GlobalApis";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photo, setPhoto] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp, "response");
      console.log(resp.data.places[0].photos[3].name);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      console.log(PhotoUrl);
      setPhoto(PhotoUrl);
    });
  };

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-3  flex gap-5 mt-2 hover:scale-105 transistion-all hover:shadow-md cursor-pointer">
        <img
          src={photo}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <p className="mt-2 text-sm">🕒 {place.timeToSpend}</p>
          <a
            href="https://ssridess-git-main-shivanimattaparthis-projects.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="mt-2">
              Book Ride
            </Button>
          </a>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
