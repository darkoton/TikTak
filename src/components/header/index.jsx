
import style from './style.module.scss'
import Image from 'next/image'
import IconTon from '@icons/ton'

const Header = () => {
  return <header className={style.header}>
    <a href='#' className={style.logo}>TikTak</a>

    <div className={style.balance}>

      <div className={style.balanceValue}>
        <span>$ 35.32</span>
        <Image className={style.balanceCurrency} src="/img/icons/ton.png" width={27} height={27} alt="Ton" />
      </div>

      <button className={style.balanceButton}>
        <IconTon className={style.balanceButtonIcon} />
      </button>


    </div>

    <div className={style.menu}>
      <button className={`${style.button} ${style.buttonMoney}`}>
        <Image width={33} height={33} src="/img/icons/money.png" alt='Icon money' />
      </button>

      <button className={style.button}>
        <Image className={style.avatar} src="/img/avatar.png" width={51} height={51} alt='Avatar' />
      </button>
    </div>

  </header>
}

export default Header