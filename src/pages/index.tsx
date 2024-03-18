import { useEffect, useState } from "react";
import { SDK, Oauth2Service } from "@oblo/selfcare-sdk";

const apiConfig = {
  apiKey:
    "cc03abc8de36b15d3c59a27b39401289e2b2c26b5c119002e0facf1af5d2e1f6c09f33922493df01b2c283dd187b43c283172b275dcf95f8b0e289bfd6cec3eefc743da30050ff8d3effe8f017ed6b20cb81b9e4d26c4cf4535472d74b27e72535f8de3f1bcf08c8d8cf1a584556242427273a38a30841b69a4ffa8bbbd616e9ae1fba767d158937ad282a26752dbbc2417886b839665ea35b872b7f5374f895cba56ae7311103d4665ca23482c0f97bdfb3f26fdf6142e0557a09bc536ba713367645ebb50df57bd3ed901948626d1bc97d9dd35f75d1878d539d698a5efe7c66c69d71f7a62e2c6546dc9d2beec9c587e1e6a5c0a46ab212f43ea7eb41e11d",
  apiVersion: "v1",
  url: "http://localhost",
  port: "3000",
};

const mqttConfig = {
  port: 5222,
  url: "wss://localhost",
};

export default function Home() {

  const [devices, setDevices] = useState([]);
  
  useEffect(() => {
    // Create SDK instance
    const sdk = new SDK(apiConfig, mqttConfig);

    // Initialize SDK
    sdk
      .init()
      .then(() => {
        console.log("SDK initialized successfully.");

        const oauthService = sdk.services.authService;
        if (oauthService) {
          oauthService.getMultimedia({ page: 1, limit: 10, id: "example_id" })
            .then((response:any) => {
              console.log("Response from getMultimedia:", response);
              setDevices(response.data);
            })
            .catch((error:any) => {
              console.error("Failed to fetch multimedia devices:", error);
            });
          
        }
      })
      .catch((error: any) => {
        console.error("Failed to initialize SDK:", error);
      });
  }, []);

  return <div>SDK test</div>;
}
