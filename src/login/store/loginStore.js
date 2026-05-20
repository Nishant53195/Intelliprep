import { create } from "zustand";

const useLoginStore = create(
  (set) => ({
    user: null,

    onboardingCompleted: false,

    authInitialized: false,

    setUser: (user) =>
      set({
        user,
      }),

    clearUser: () =>
      set({
        user: null,
      }),

    setOnboardingCompleted:
      (value) =>
        set({
          onboardingCompleted:
            value,
        }),

    setAuthInitialized:
      (value) =>
        set({
          authInitialized:
            value,
        }),
  })
);

export default useLoginStore;