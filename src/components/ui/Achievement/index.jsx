'use client'
import style from './style.module.scss'
import { Icon } from '@iconify-icon/react'
import Image from 'next/image'
import ProgressBar from './components/ProgressBar'

const Achievement = ({ closeToast }) => {

  return <div className={style.achiev}>
    <div className={style.header}>
      <p className={style.message}>New Achievement</p>

      <button onClick={closeToast} className={style.close}>
        <Icon icon={'ic:round-close'} />
      </button>
    </div>

    <div className={style.main}>
      <div className={style.picture}>
        <Image src='/img/game/achiev.jpg' width={58} height={72} alt='Achievement' />
      </div>
      <div className={style.info}>
        <div className={style.infoHead}>
          <p className={style.title}>Perfect pair</p>
          <p className={style.rarity}>Rare</p>
          <p className={style.xp}>+ 100 XP</p>
        </div>

        <p className={style.desc}>Got a pefect pair in BlackJack Originals</p>

        <p className={style.note}>Achievements by MetBlta</p>
      </div>

      <button className={style.share}>
        Share
        <span>+XP</span>
      </button>

    </div>

    <ProgressBar onAnimationEnd={closeToast} />
  </div>
}

export default Achievement