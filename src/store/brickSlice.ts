import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BrickItem } from "../types";
import { hydrateList, importList } from "../utils/serialize";
import { extract } from "../utils/compress";

interface BrickState {
  bricks: BrickItem[];
}

function initialState(): BrickState {
  try {
    const query = window.location.search.slice(3);
    const bricks = query ? hydrateList(importList(extract(query))) : [];
    return { bricks };
  } catch {
    return { bricks: [] };
  }
}

const brickSlice = createSlice({
  name: "bricks",
  initialState,
  reducers: {
    importData: (state, action: PayloadAction<BrickItem[]>) => {
      state.bricks = action.payload;
    },
    addBrick: (state, action: PayloadAction<Omit<BrickItem, "id">>) => {
      const newBrick: BrickItem = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.bricks.push(newBrick);
    },
    removeBrick: (state, action: PayloadAction<string>) => {
      state.bricks = state.bricks.filter(
        (brick) => brick.id !== action.payload,
      );
    },
    toggleBrickComplete: (state, action: PayloadAction<string>) => {
      const brick = state.bricks.find((b) => b.id === action.payload);
      if (brick) {
        brick.completed = !brick.completed;
      }
      state.bricks = state.bricks.sort((a, b) => {
        if (a.completed && !b.completed) return 1;
        if (b.completed && !a.completed) return -1;
        if (a.partName && b.partName) {
          return a.partName.localeCompare(b.partName);
        }
        return a.id.localeCompare(b.id);
      });
    },
  },
});

export const { addBrick, removeBrick, toggleBrickComplete, importData } =
  brickSlice.actions;

export default brickSlice.reducer;
