import { db } from "@/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  // used to get trip information from the fire base

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document: ", docSnap.data());
      setTrip(docSnap.data())

    } else {
      console.log("No Such Document");
      toast("No trip Found");
    }
  };
  return <div className="p-10 md:px-20 lg:px-44 xl:px-56">
    {/* Information section  */}
  <InfoSection trip = {trip}/>
    {/* Recommended hotels */}
    <Hotels trip = {trip}/>

    {/* Daily Plan */}
  <PlacesToVisit trip = {trip} />
    {/* footer */}
    <Footer trip = {trip}/>
  </div>;
}

export default Viewtrip;
