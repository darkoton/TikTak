import style from './style.module.scss'
import Control from './components/Control'
import Game from './components/Game'

const Main = () => {
  return <div className={style.main}>
    <Game />
    <Control />
  </div>
}

export default Main