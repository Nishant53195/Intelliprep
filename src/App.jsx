import {
  useEffect,
} from "react";

import {
  RouterProvider,
} from "react-router-dom";

import router from "./routes";

import useLoginStore from "./login/store/loginStore";

import {hydrateOnboarding} from "./onboarding/services/hydrateOnboarding";

import {hydrateLogin} from "./login/services/hydrateLogin"


import { db } from "./database/dexie";

function App() {
  const user =
    useLoginStore(
      (state) => state.user
    );

  useEffect(() => {
    window.db=db;
    hydrateLogin();
  }, []);

  useEffect(() => {
    if (!user) return;

    hydrateOnboarding(
      user.uid
    );
  }, [user]);

  return (
    <RouterProvider
      router={router}
    />
  );
}

export default App;