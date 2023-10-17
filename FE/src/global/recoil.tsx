import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const user = atom({
  key: "user",
  default: "" || null,
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: "userState",
  default: {} || null,
  effects_UNSTABLE: [persistAtom],
});
