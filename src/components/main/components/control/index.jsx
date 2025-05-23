'use client'
import style from './style.module.scss'
import Image from 'next/image'
import Switch from '@/components/ui/Switch'
import { useState } from 'react'
import useGameStore from '@/stores/game'
import { Icon } from '@iconify-icon/react'
import classNames from 'classnames'
import { useSound } from '@/context/SoundContext'

const Control = () => {

  const {
    betting,
    setBetting,
    setOpenChips,
    setStatus,
    pushStatus,
    status,
    insurranceQuestion,
    setInsurranceQuestion,
    setInsurranceActive,
    splitCards, splitActive
  } = useGameStore()
  const { play } = useSound()
  const [showAchivements, setShowAchivements] = useState(false)

  function confirmBet() {

    if (status.includes('active')) {
      pushStatus('play')
    } else {
      setStatus('active')
    }
    setOpenChips(false)
  }



  return <div className={style.control}>
    <div className={style.top}>
      <div className={
        style.actions
      }>

        {insurranceQuestion ? <>
          <Action onClick={() => {
            setInsurranceActive(true)
            setInsurranceQuestion(false)
          }} className={style.row} text='Yes' icon='/img/control/guard.svg' />
          <Action onClick={() => {
            setInsurranceActive(false)
            setInsurranceQuestion(false)
          }} className={style.row} text='No' icon='/img/control/no-guard.svg' />
        </> : <>
          <Action disabled={!status.includes('play')} text='Hit' icon='/img/control/hit.png' />
          <Action disabled={!status.includes('play')} onClick={() => {
            play('dealerFlipCards')
            pushStatus('complete')
          }} text='Stand' icon='/img/control/stand.png' />
          <Action onClick={splitCards} disabled={!status.includes('play') || splitActive} text='Split' icon='/img/control/split.png' />
          <Action disabled={!status.includes('play')} text='Double' icon='/img/control/double.png' />
        </>}
        <button onClick={confirmBet} disabled={!betting || status.includes('play')} className={style.betButton}>
          {status.includes('active') && !status.includes('play') ? <Icon className={style.buttonIcon} icon='icon-park-outline:poker' /> : 'Bet'}
        </button>
      </div>

      <div className={style.widgets}>
        <div className={`${style.widget} ${style.widgetAchievements}`}
          onClick={() => setShowAchivements(!showAchivements)}>
          <span className={style.widgetText}>Achievements
            <span className={style.achievementsCount}>1</span>
          </span>

          <Image className={style.widgetArrow} src='/img/control/arrow.png' width={15} height={11} alt='arrow' />
        </div>

        <div className={`${style.widget} ${style.widgetCollected}`}>
          <span className={style.widgetText}>Collected</span>

          <ul className={style.collectedList}>
            <li className={style.collectedItem}>
              <Image src='/img/control/cards.png' width={20} height={23} alt='Cards' />
            </li>
            <li className={style.collectedItem}>
              <Image src='/img/control/trophy.png' width={20} height={16} alt='Trophy' />
            </li>
            <li className={style.collectedItem}>
              <Image src='/img/control/trophy.png' width={20} height={16} alt='Trophy' />
            </li>
            <li className={style.collectedItem}>
              <Image src='/img/control/trophy.png' width={20} height={16} alt='Trophy' />
            </li>
            <li className={style.collectedItem}>
              <Image src='/img/control/trophy.png' width={20} height={16} alt='Trophy' />
            </li>
          </ul>
        </div>
      </div>
    </div>

    {showAchivements ? <ul className={style.achievements}>
      <li className={style.achievement}>
        <div className={style.achievementHead}>
          <div className={style.achievementHeadLeft}>
            <span className={style.achievementState}>Progressive</span>
            <span className={style.achievementBonuse}>3x win streak <Image src="/img/control/bonus.png" width={15} height={15} alt='Bonuse' /></span>

            <div className={style.achievementProgress}>
              <div className={style.achievementProgressBar}>
                <div className={style.achievementProgressBarValue}></div>
              </div>

              <Image src='/img/control/lock.png' width={22} height={22} alt='Lock' />

              <div className={style.achievementProgressFraction}>
                <span className={style.achievementProgressFractionValue}>3</span> / 4
              </div>
            </div>

          </div>
          <Image src="/img/control/cards.png" width={22} height={26} alt='Cards' />

        </div>

        <p className={style.achievementDesc}>You had a 3x winning streak on BJ Originals, win another hand
          to lock in the 4x win streak Achievement</p>
      </li>

      <li className={style.achievementsTitle}>
        All Achievements
      </li>
    </ul>

      : <input disabled={status.includes('active')} className={style.input} type='number' placeholder='Enter bet amount...' value={betting} onChange={(e) => {
        setBetting(e.target.value)
      }} />
    }



    <div className={style.switch}>
      <span className={style.switchValue}>Real</span>
      <Switch />
      <span className={style.switchValue}>Fun</span>
    </div>
  </div>
}

const Action = ({ text, icon, className = '', disabled = false, ...props }) => {
  const { status } = useGameStore()

  return <button disabled={disabled} className={classNames(style.action, className)} {...props}>
    {text && <span>{text}</span>}

    {icon && <Image src={icon} width={25} height={25} alt='icon' />}

  </button>
}

export default Control