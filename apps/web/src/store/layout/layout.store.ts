import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { LayoutStore } from './layout.types';

export const layoutStore = create(
  persist<LayoutStore>(
    (set) => ({
      isVisibleDeactivationAlert: false,
      setIsVisibleDeactivationAlert: (value) =>
        set({ isVisibleDeactivationAlert: value }),
    }),
    {
      name: 'layout',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
