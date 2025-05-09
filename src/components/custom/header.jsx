import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const users = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

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
        window.location.reload();
      });
  };

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
  useEffect(() => {
    console.log(users);
  }, []);
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" />
      <div>
        {users ? (
          <div className="flex items-center gap-5">
             <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips" target="_blank"   rel="noopener noreferrer"
            >
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
            <a href="https://ssridess-git-main-shivanimattaparthis-projects.vercel.app/">
              <Button variant="outline" className="rounded-full">
                Book Ride
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={users?.picture}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Sign In
          </Button>
        )}
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

export default Header;
