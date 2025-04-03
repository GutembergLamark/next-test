import { Label } from "@prisma/client";

import { create } from "zustand";

type labelState = {
  label: Label | null;
};

type labelActions = {
  getLabelById: (id: number) => void;
  getLabelByTaskId: (id: number) => void;
};

export const labelStore = create<labelState & labelActions>((set) => ({
  label: null,

  getLabelById: async (id: number) => {
    await fetch(`http://localhost:3030/prisma/labels/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const data = await res.json();

      console.log("DATA", data);

      set({ label: data });
    });
  },

  getLabelByTaskId: async () => {
    throw new Error("Function not implemented.");
  },
}));

type labelIdState = {
  labelId: number | null;
};

type labelIdActions = {
  setLabelId: (id: number) => void;
};

export const labelIdStore = create<labelIdState & labelIdActions>((set) => ({
  labelId: null,

  setLabelId: async (id: number) => {
    set({ labelId: id });
  },
}));
