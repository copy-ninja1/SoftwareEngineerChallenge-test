import React, { useState, useEffect } from "react";
import reactLogo from "../../assets/react.svg";
import FacebookLogin, { SuccessResponse, ProfileSuccessResponse } from "@greatsumini/react-facebook-login";
import { useNavigate } from "react-router-dom";

interface profileI {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}
function Login() {
  let navigate = useNavigate();
  const [profile, setProfile] = useState<profileI>({
    id: "",
    name: "",
    email: "",
    accessToken: "",
  });

  const onLoginSuccess = (response: SuccessResponse) => {
    console.log("Login Success!", response);
    if (Object.keys(response).length !== 0 && response.accessToken) {
      setProfile((prev) => {
        return {
          ...prev,
          accessToken: response.accessToken,
        };
      });
    }
  };

  const onLoginFailed = (error: any) => {
    console.log("Login Failed!", error);
  };

  const onProfileSuccess = (response: ProfileSuccessResponse) => {
    console.log("Get Profile Success!", response);
    if (response) {
      setProfile((prv) => {
        return {
          ...prv,
          id: response.id,
          name: response.name,
          email: response.email,
        };
      });
    }
  };

  const login = async (fbData: profileI) => {
    var payload = JSON.stringify({
      fbId: fbData.id,
      name: fbData.name,
      emailAddress: fbData.email,
      accessToken: fbData.accessToken,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: payload,
    };
    const data = await (await fetch("http://localhost:1337/api/v1/user/", requestOptions)).json();
    navigate(`/${data._id}/pages`);
    console.log({ data });
  };

  useEffect(() => {
    if (Object.keys(profile).length !== 0 && profile.accessToken && profile.id) {
      login(profile);
    }
  }, [profile]);
  return (
    <div>
      <FacebookLogin
        useRedirect
        appId="470194968646611"
        onSuccess={(response) => onLoginSuccess(response)}
        onFail={(error) => onLoginFailed(error)}
        onProfileSuccess={(response) => onProfileSuccess(response)}
        // dialogParams={{ redirect_uri: "http://localhost:5173/pages", state: "fbLogin", response_type: "token" }}
      />
    </div>
  );
}

export default Login;
