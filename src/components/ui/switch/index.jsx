import style from './style.module.scss'

const Switch = ({ id = 'id', ...props }) => {
  return <>
    <input className={style.input} {...props} type="checkbox" id={id} />
    <label className={style.label} htmlFor={id}>Toggle</label>
  </>
}

export default Switch