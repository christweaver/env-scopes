
import Dashboard from "@/components/Dashboard";
import Router from "next/router";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  useEffect(()=>{
    
    const getdt = async ()=>{
      await axios('api/hello')
    }
    getdt()
    
  },[])


  function click() {
    Router.replace("/organization");
  }
  return (
    <div>
      <h1>Welcome To env scopes</h1>
      
      <Dashboard />
      <button onClick={click}>Create an organization</button>
    </div>
  );
}
