import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import {API_BASE_URL} from './constants/apiConstants';


export default function ClientComponent() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(API_BASE_URL + "/api");
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