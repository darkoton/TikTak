import { create } from 'zustand'

const useGameStore = create((set) => ({
  betting: 0,
  setBetting: (v) => set({ betting: Number(Number(v).toFixed(2)) }),

  openChips: false,
  setOpenChips: (v) => set({ openChips: v }),
  toggleOpenChips: (v) => set(state => ({ openChips: state.openChips })),

  status: ['pending'],
  setStatus: (v) => set({ status: [v] }),
  pushStatus: (v) => set(state => ({ status: [...state.status, v] }))
}))

export default useGameStore