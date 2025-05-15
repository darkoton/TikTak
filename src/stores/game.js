import { create } from 'zustand'


const cards = {
  clubs: {
    7: {
      suit: 'clubs',
      name: '7',
      value: 7
    },
    10: {
      suit: 'clubs',
      name: '10',
      value: 10
    },
    a: {
      suit: 'clubs',
      name: 'a',
      value: 11
    },
    q: {
      suit: 'clubs',
      name: 'q',
      value: 10
    },
  },
  spades: {
    5: {
      suit: 'spades',
      name: '5',
      value: 5
    },
    10: {
      suit: 'spades',
      name: '10',
      value: 10
    },
  }
}

const useGameStore = create((set) => ({
  betting: 0,
  setBetting: (v) => set({ betting: Number(Number(v).toFixed(2)) }),

  openChips: false,
  setOpenChips: (v) => set({ openChips: v }),
  toggleOpenChips: (v) => set(state => ({ openChips: state.openChips })),

  status: ['pending'],
  setStatus: (v) => set({ status: [v] }),
  pushStatus: (v) => set(state => ({ status: [...state.status, v] })),

  getRandomCard: () => {
    const suits = Object.keys(cards)
    const randomSuit = suits[Math.floor(suits.length * Math.random())]

    const suitCards = Object.keys(cards[randomSuit])
    const randomSuitCard = suitCards[Math.floor(suitCards.length * Math.random())]

    return {
      ...cards[randomSuit][randomSuitCard],
      visible: true
    }
  },
  userCards: [],
  setUserCards: (v) => set((state) => ({ userCards: v })),
  pushUserCards: (v) => set((state) => ({ userCards: [...state.userCards, v] })),
  rivalCards: [],
  setRivalCards: (v) => set((state) => ({ rivalCards: v })),
  pushRivalCards: (v) => set((state) => ({ rivalCards: [...state.rivalCards, v] })),

  reset: () => {
    set({
      status: ['pending'],
      userCards: [],
      rivalCards: [],
      insurranceActive: false
    })
  },

  insurranceQuestion: false,
  setInsurranceQuestion: (v) => set({ insurranceQuestion: v }),

  insurranceActive: false,
  setInsurranceActive: (v) => set({ insurranceActive: v })
}))

export default useGameStore