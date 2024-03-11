import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        botId: "de466ec4-2bae-4c84-b084-743d50a5c60d",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "de466ec4-2bae-4c84-b084-743d50a5c60d",
      });
    };
  }, []);

  return <div id="webchat" />;
};

export default Chatbot;
