import Dashboard from "@/components/Dashboard";
import Router from "next/router";
export default function Home() {
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
