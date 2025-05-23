'use client'

import style from './style.module.scss'
import { Icon } from '@iconify-icon/react';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "motion/react"
import useGameStore from '@/stores/game';
import Chip from '@/components/ui/Chip';
import { useSound } from '@/context/SoundContext'
import AchievementNotf from '@/components/ui/Achievement'
import { toast } from 'react-toastify';

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


const animations = {
  putSideBetting: {
    scale: 0.5,
    y: '150%',
    // pointerEvents: 'none'
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

  const {
    betting,
    setBetting,
    openChips,
    setOpenChips,
    status,
    reset,
    getRandomCard,
    userCards,
    rivalCards,
    pushUserCards,
    pushRivalCards,
    setRivalCards,
    insurranceQuestion,
    setInsurranceQuestion,
    insurranceActive
  } = useGameStore()

  const [userChips, setUserChips] = useState([])
  const [userWinner, setUserWinner] = useState(null)
  const [rivalWinner, setRivalWinner] = useState(null)
  const { play } = useSound()

  function addChip(chip) {
    setUserChips([...userChips, { id: userChips.length, ...chip }])
    setBetting(betting + chip.value)
  }

  const notify = () => {
    toast(AchievementNotf, {
      onOpen: () => play('achievementPop'),
      onClose: () => play('selectButton'),
      closeButton: false,
      position: 'top-left',
      customProgressBar: true,
      autoClose: false,
      style: {
        width: "auto",
        maxWidth: '500px',
        padding: 0,
        background: 'transparent'
      }
    });
  };

  useEffect(() => {
    if (userCards.length) {
      if ((userCards.every(c => c.value === 10))) {
        notify()
      }
    }
  }, [userCards])

  useEffect(() => {
    if (status[status.length - 1] === 'play') {
      for (let index = 0; index < 2; index++) {
        pushUserCards({
          id: index,
          delay: 0.8 + 0.4 * index,
          ...getRandomCard(),
        })

        let rivalCard = {
          id: index,
          delay: 1 + 0.4 * index,
          ...getRandomCard()
        }
        if (index === 1) {
          rivalCard.visible = false
        }
        pushRivalCards(rivalCard)
      }


      play('betAccepted')
    } else if (status[status.length - 1] === 'complete') {
      const userCount = userCards.reduce((prev, curr) => prev + curr.value, 0)
      const rivalCount = rivalCards.reduce((prev, curr) => prev + curr.value, 0)
      setUserWinner(rivalCount < userCount && userCount <= 21)
      setRivalWinner(rivalCount > userCount && rivalCount <= 21)

      setRivalCards(rivalCards.map(c => {
        c.visible = true
        return c
      }))

      setTimeout(() => {
        reset()
        setUserWinner(null)
        setRivalWinner(null)
        setBetting(0)
      }, 3000);
    }
  }, [status])

  return <div className={style.game}>
    <motion.div className={style.top} animate={[
      status.includes('play') && animations.titleSpitLea
    ]} >

      {insurranceQuestion
        ? <p className={style.insurranceMessage}>Woul you like Insurrance? </p>
        : <div className={style.titles}>
          <h3 className={style.title}>BLACKJACK PAYS 3 TO 2</h3>
          <h3 className={style.subtitle}>INSURRANCE PAYS 2 to 1</h3>
        </div>
      }
    </motion.div>
    <div className={style.lea}>
      <AnimatePresence>
        {status.includes('play') && <>
          <div className={`${style.hand} ${style.handRival}`}>
            <div className={style.cards}>
              {rivalCards.map((c, index) => <Card winner={rivalWinner} key={c.id} index={index} card={c} />)}
            </div>
            <motion.div
              initial={{
                y: '100%',
                opacity: 0
              }}
              animate={{
                y: '0%',
                opacity: 1
              }}
              transition={{
                duration: 0.5,
                delay: 1
              }}
              className={style.counter}
              key="counter-rival"
            >{
                status.includes('complete')
                  ? rivalCards.reduce((prev, curr) => prev + curr.value, 0)
                  : rivalCards.filter(c => c.visible).reduce((prev, curr) => prev + curr.value, 0)
              }</motion.div>
          </div>

          <div className={`${style.hand} ${style.handUser}`}>
            <div className={style.cards}>
              {userCards.map((c, index) => <Card winner={userWinner} key={c.id} index={index} card={c} />)}
            </div>
            <motion.div
              initial={{
                y: '100%',
                opacity: 0
              }}
              animate={{
                y: '0%',
                opacity: 1
              }}
              transition={{
                duration: 0.5,
                delay: 1
              }}
              className={classNames(style.counter, {
                [style.winner]: userWinner
              })}
              key="counter-user"
            >{
                userCards.reduce((prev, curr) => prev + curr.value, 0)
              }</motion.div>
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
          key="betting"

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

          {insurranceActive && <motion.div
            initial={{
              opacity: 0,
              x: '200%'
            }}
            animate={{
              opacity: 1,
              x: '105%'
            }}
            exit={{
              opacity: 0,
              x: '200%'
            }}
            className={style.bettingInsurrance}>
            <p>Insurrance</p>
            <span>2:1</span>
          </motion.div>}

          {status.includes('play') && !insurranceActive && <motion.div
            onClick={() => setInsurranceQuestion(true)}
            initial={{
              opacity: 0,
              x: '-250%'
            }}
            animate={{
              opacity: 1,
              x: '-155%'
            }}
            exit={{
              opacity: 0,
              x: '-250%'
            }}
            transition={{
              delay: 0.5
            }}
            className={style.bettingRatio}>
            <span>6:1</span>
          </motion.div>}
          {status.includes('active') && <>

            <motion.div
              key='user'
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
              onAnimationStart={() => play('addChip')}
            >
              <Chip options={{
                value: betting,
                size: 120,
              }} />
            </motion.div>

            <motion.div
              key='rival1'
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
              onAnimationStart={() => setTimeout(() => play('addChip'), 1000)}
            >
              <Chip options={{
                value: 5,
                size: 50,
              }} />
            </motion.div>

            <motion.div
              key='rival2'
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
                delay: 1.5,

              }}
              onAnimationStart={() => setTimeout(() => play('addChip'), 1500)}
            >
              <Chip options={{
                value: 5,
                size: 50,
              }} />
            </motion.div>
          </>}

        </motion.div>
      </AnimatePresence>
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

      <button className={style.chipsButton} onClick={() => {
        play('chipSelect')
        setOpenChips(true)
      }}>
        <Image src='/img/game/chips.png' width={150} height={70} alt='Chips' />
      </button>

      <button className={style.button}>
        <Icon icon="akar-icons:arrow-cycle" />
      </button>
      <div className={classNames(style.chips, { [style.active]: openChips })}>

        {chips.map((options) => <ChipButton key={options.value} onClick={() => {
          play('addChip')
          addChip(options)
        }} options={options} />)}

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


        <button className={style.chipSum} onClick={() => {
          play('chipSelect')
          setOpenChips(false)
        }}>
          <Chip
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

const Card = ({ card, winner, index = 0 }) => {
  const { play } = useSound()



  return <div className={classNames(style.card, {
    [style.winner]: winner === true,
    [style.lose]: winner === false
  })}>
    <AnimatePresence >
      <motion.div initial={{
        opacity: 0,
        x: '100%'
      }}
        animate={{
          opacity: 1,
          x: '0%'
        }}
        transition={{
          duration: 0.5,
          delay: card.delay || null
        }}
        onAnimationStart={() => setTimeout(() => play('cardDeal'), (card.delay * 1000) || 0)}>
        <AnimatePresence>
          {!card.visible
            ? <motion.div
              exit={{
                opacity: 0,
                position: 'absolute',
              }}
              key='shirt'>
              <Image src='/img/cards/shirt.png' width={91} height={136} alt='Shirt' />
            </motion.div>
            : <Image src={`/img/cards/${card.suit}/${card.name}.png`} width={91} height={136} alt='Card' />}
        </AnimatePresence>

      </motion.div>
    </AnimatePresence>
  </div>
}



export default Game