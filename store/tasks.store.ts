import { create } from "zustand";
type State = {
  showModal: boolean;
  type: "create" | "update" | "view";
};

type Actions = {
  changeModal: (
    trueOrFalse: boolean,
    type: "create" | "update" | "view"
  ) => State;
};

export const taskModalStore = create<State & Actions>((set) => ({
  showModal: false,
  type: "create",
  changeModal(trueOrFalse, type) {
    set({ showModal: trueOrFalse, type: type });

    return { showModal: trueOrFalse, type: type };
  },
}));
