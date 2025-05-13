import style from './style.module.scss'
import Image from 'next/image'

const Navigation = () => {
  return <div className={style.navigation}>
    <button className={style.button}>
      <Image src='/img/navigation/quest.png' width={45} height={42} />

      <p className={style.text}>Quest</p>
    </button>

    <button className={style.button}>
      <Image src='/img/navigation/play.png' width={40} height={40} />

      <p className={style.text}>Play</p>
    </button>

    <button className={style.button}>
      <Image src='/img/navigation/tickets.png' width={42} height={42} />

      <p className={style.text}>Play</p>
    </button>
  </div>
}

export default Navigation