'use client'

import style from './style.module.scss'
import { Icon } from '@iconify-icon/react';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "motion/react"
import useGameStore from '@/stores/game';
import Chip from '@ui/chip';

const chips = [
  {
    value: 0.1,
    size: 65,
    style: {
      left: '3%',
      bottom: '47%',

    }
  },
  {
    value: 1,
    size: 65,
    style: {
      left: '18%',
      bottom: '67%',
    }
  },
  {
    value: 5,
    size: 65,
    style: {
      left: '50%',
      bottom: '76%',
      transform: 'translateX(-50%)'
    }
  },
  {
    value: 10,
    size: 65,
    style: {
      right: '18%',
      bottom: '67%',
    }
  },
  {
    value: 25,
    size: 65,
    style: {
      right: '3%',
      bottom: '47%',
    }
  },
]

const cards = {
  clubs: {
    7: {
      img: '/img/cards/clubs/7.png',
      value: 7
    },
    10: {
      img: '/img/cards/clubs/10.png',
      value: 10
    },
    a: {
      img: '/img/cards/clubs/a.png',
      value: 11
    },
    q: {
      img: '/img/cards/clubs/q.png',
      value: 10
    },
  },
  spades: {
    5: {
      img: '/img/cards/spades/5.png',
      value: 5
    },
    10: {
      img: '/img/cards/spades/10.png',
      value: 10
    },
  }
}

const animations = {
  putSideBetting: {
    scale: 0.5,
    y: '150%',
    pointerEvents: 'none'
  },
  hiddeActions: {
    opacity: 0,
    pointerEvents: 'none'
  },
  titleSpitLea: {
    y: '220%',
    transition: {
      duration: 0.5
    }
  }
}

const Game = () => {

  const { betting, setBetting, openChips, setOpenChips,
    status, setStatus, pushStatus
  } = useGameStore()

  const [userChips, setUserChips] = useState([])


  function addChip(chip) {
    setUserChips([...userChips, { id: userChips.length, ...chip }])
    setBetting(betting + chip.value)
  }

  useEffect(() => {
    if (status.includes('active')) {

    }
  }, [status])

  return <div className={style.game}>
    <motion.div animate={[
      status.includes('play') && animations.titleSpitLea
    ]} className={style.titles}>
      <h3 className={style.title}>BLACKJACK PAYS 3 TO 2</h3>
      <h3 className={style.subtitle}>INSURRANCE PAYS 2 to 1</h3>
    </motion.div>
    <div className={style.lea}>

      {status.includes('play') && <>
        <div className={`${style.hand} ${style.handRival}`}>
          <div className={style.cards}>
            <Card />
            <Card visible={false} />
          </div>
          <div className={style.counter}>20</div>
        </div>

        <div className={`${style.hand} ${style.handUser}`}>
          <div className={style.cards}>
            <Card />
            <Card />
          </div>
          <div className={style.counter}>20</div>
        </div>
      </>}

      <motion.div
        className={style.betting}
        animate={[
          status.includes('play') && animations.putSideBetting
        ]}
        transition={{
          duration: 0.5
        }}
      >
        <div className={`${style.bettingArc} ${style.bettingArcLeft}`}>
          <Image src='/img/game/arc.png' width={65} height={195} alt='Arc' />
          <span>РР</span>
        </div>

        <div className={style.bettingChip}>
          <Image src='/img/game/ton-chip.png' width={118} height={118} alt='Ton chip' />
        </div>

        <div className={`${style.bettingArc} ${style.bettingArcRight}`}>
          <Image src='/img/game/arc.png' width={65} height={195} alt='Arc' />
          <span>21+3</span>
        </div>

        {status.includes('active') && <>

          <motion.div
            key='rival1'
            initial={{
              pointerEvents: 'none',
              opacity: 0,
              position: 'absolute',
              left: '50%',
              x: '-50%',
              top: '125%',
            }}
            animate={{
              opacity: 1,
              top: '50%',
              y: '-50%'
            }}

          >
            <Chip options={{
              value: betting,
              size: 120,
            }} />
          </motion.div>

          <motion.div
            key='rival2'
            initial={{
              pointerEvents: 'none',
              opacity: 0,
              position: 'absolute',
              left: '-20%',
              top: '50%',
              y: '-50%'
            }}
            animate={{
              opacity: 1,
              left: '0%'
            }}
            transition={{
              delay: 1
            }}
          >
            <Chip options={{
              value: 5,
              size: 50,
            }} />
          </motion.div>

          <motion.div
            initial={{
              pointerEvents: 'none',
              opacity: 0,
              position: 'absolute',
              right: '-20%',
              top: '50%',
              y: '-50%'
            }}
            animate={{
              opacity: 1,
              right: '0%'
            }}
            transition={{
              delay: 1.5
            }}
          >
            <Chip options={{
              value: 5,
              size: 50,
            }} />
          </motion.div>
        </>}

      </motion.div>
    </div>

    <motion.div

      className={style.actions}
      animate={[
        status.includes('play') && animations.hiddeActions
      ]}
      transition={{
        duration: 0.5
      }}>
      <button className={style.button}>
        <Icon icon="pajamas:redo" />
      </button>

      <button onClick={() => setOpenChips(true)}>
        <Image src='/img/game/chips.png' width={150} height={70} alt='Chips' />
      </button>

      <button className={style.button}>
        <Icon icon="akar-icons:arrow-cycle" />
      </button>
      <div className={classNames(style.chips, { [style.active]: openChips })}>

        {chips.map((options) => <ChipButton key={options.value} onClick={() => addChip(options)} options={options} />)}

        {userChips.map((chip) => (
          <motion.div
            key={chip.id}
            initial={{
              // transition: 'all 0.3s ease 0s',
              pointerEvents: 'none',
              display: 'inline-block',
              // opacity: 0,
              position: 'absolute',
              ...chip.style
            }}
            animate={{
              // opacity: 1,
              left: chip.style.left ? '50%' : 'auto',
              right: chip.style.right ? '50%' : 'auto',
              bottom: '48%',
              x: chip.style.left ? '-50%' : '50%'
            }}
          >
            <Chip options={chip} />
          </motion.div>
        ))}


        <button className={style.chipSum} onClick={() => setOpenChips(false)}>
          <Chip
            style={{ fontSize: '50%' }}
            options={{
              textValue: betting,
              value: betting,
              size: 100,
            }} />

        </button>

        <p className={style.chipNote}>Chips value is pegged to $ US</p>
      </div>
    </motion.div>
  </div >
}

const ChipButton = ({ options, ghost, ...props }) => {
  return <button
    style={!ghost ?
      options.style
      : { position: 'relative' }}
    {...props}
    className={`${style.chip}`}>
    <Chip options={options} />
  </button >
}

const Card = ({ visible = true }) => {
  return <div className={style.card}>
    <AnimatePresence>
      {!visible ?
        <motion.div>
          <Image src='/img/cards/shirt.png' width={91} height={136} alt='Shirt' />
        </motion.div>
        :
        <motion.div>
          <Image src='/img/cards/clubs/10.png' width={91} height={136} alt='Card' />
        </motion.div>}
    </AnimatePresence>
  </div>
}



export default Game