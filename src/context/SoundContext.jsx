'use client'

import { createContext, useContext, useRef } from 'react'
import { Howl } from 'howler'

const SoundContext = createContext()

const sounds = {
  achievementPop: '/sound/achievementpop.mp3',
  addChip: '/sound/addchip.mp3',
  betAccepted: '/sound/betaccepted.mp3',
  cardDeal: '/sound/carddeal.mp3',
  chipSelect: '/sound/chipselect.mp3',
  dealerFlipCards: '/sound/dealerflipcards.mp3',
  reverseAction: '/sound/reverseaction.mp3',
  selectButton: '/sound/selectbutton.mp3',
}

export const SoundProvider = ({ children }) => {
  const soundRefs = useRef({})

  const play = (key) => {
    if (!sounds[key]) return

    // создаём звук, если ещё не создан
    if (!soundRefs.current[key]) {
      soundRefs.current[key] = new Howl({ src: [sounds[key]], volume: 1 })
    }

    soundRefs.current[key].play()
  }

  return (
    <SoundContext.Provider value={{ play }}>
      {children}
    </SoundContext.Provider>
  )
}

export const useSound = () => useContext(SoundContext)
