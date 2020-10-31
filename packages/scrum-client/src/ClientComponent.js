import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export default function ClientComponent() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient("http://worldclockapi.com/api/json/utc/now");
    socket.on("FromAPI", data => {
      setResponse(data);
    });

  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}