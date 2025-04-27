import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { doc, setDoc } from "firebase/firestore";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/Options";
import { chatSession } from "@/services/AIModal";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "@/services/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // const login = useGoogleLogin({
  //   onSuccess : (codeResp)=>console.log(codeResp,"codeResp"),
  //   onError:(error)=>console.log(error,"code err")
  // })

  // const login = useGoogleLogin({
  //   onSuccess: (codeResp) => {
  //     GetUserProfile(codeResp, "codeResp");
  //   },
  //   onError: (error) => console.log(error, "code err"),
  // });

  // const login = useGoogleLogin({
  //   onSuccess: (codeResp) => {
  //     GetUserProfile(codeResp, "codeResp");
  //   },
  //   onError: (error) => console.log(error, "code err"),
  //   flow: "auth-code",
  // });

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);

      if (tokenResponse.access_token) {
        GetUserProfile(tokenResponse);
      } else {
        console.error("Access token missing in response:", tokenResponse);
      }
    },
    onError: (error) => console.log("Google Login Error:", error),
  });

  // const OnGenerateTrip = async () => {

  //   const user = localStorage.getItem("user");
  //   if (!user) {
  //     setOpenDialog(true);
  //     return;
  //   }

  //   if (
  //     (formData?.noOfDays > 5 && formData?.location) ||
  //     !formData?.budget ||
  //     !formData?.traveler
  //   ) {
  //     toast("Please Fill All Details");
  //     return;
  //   }
  //   setLoading(true);
  //   const FINAL_PROMPT = AI_PROMPT.replace(
  //     "{location}",
  //     formData?.location?.label
  //   )
  //     .replace("{totalDays}", formData?.noOfDays)
  //     .replace("{traveler}", formData?.traveler)
  //     .replace("{budget}", formData?.budget)
  //     .replace("{totalDays}", formData?.noOfDays);
  //   // console.log(FINAL_PROMPT, "Final prompt");
  //   const result = await chatSession.sendMessage(FINAL_PROMPT);
  //   console.log(result?.response?.text());
  //   setLoading(false);
  //   SaveAiTrip(result?.response?.text());
  // };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
  
    if (
      (formData?.noOfDays > 5 && formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please Fill All Details");
      return;
    }
  
    setLoading(true);
    try {
      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        formData?.location?.label
      )
        .replace("{totalDays}", formData?.noOfDays)
        .replace("{traveler}", formData?.traveler)
        .replace("{budget}", formData?.budget)
        .replace("{totalDays}", formData?.noOfDays);
  
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response?.text();
      console.log(responseText);
  
      await SaveAiTrip(responseText);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Something went wrong while generating trip");
    } finally {
      setLoading(false);
    }
  };
  

  // const SaveAiTrip = async (TripData) => {
  //   setLoading(true);
  //   const userInfo = JSON.parse(localStorage.getItem("user"));
  //   const docId = Date.now().toString();
  //   await setDoc(doc(db, "AITrips", docId), {
  //     userSelection: formData,
  //     tripData: TripData,
  //     userEmail: user?.email,
  //     id: docId,
  //   });
  //   setLoading(false);
  // };

  const SaveAiTrip = async (TripData) => {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: userInfo?.email,
        id: docId,
      });
    
    navigate('/view-trip/' + docId)

  };
  
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-10 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us Your travel Preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl ">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences
      </p>
      <div className="mt-20 flex flex-col gap-9">
        {/* google place API */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your Destination of choice
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning for your trip
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is your Budget? </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
           ${formData?.budget == item.title && "shadow-lg border-black"}
           `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">
          Who your plan on travelling with on your next adventure?{" "}
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
            ${formData?.traveler == item.people && "shadow-lg border-black"}
          `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7 ">Sign In with Google</h2>
              <p>Sign In to the app with google authentication</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
