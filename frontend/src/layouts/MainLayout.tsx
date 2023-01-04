import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components";

function MainLayout(): JSX.Element {
  return (
    <div>
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
