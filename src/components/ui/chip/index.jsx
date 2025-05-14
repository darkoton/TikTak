import style from './style.module.scss'
import Image from 'next/image'

const chipsImgs = {
  'gray': '/img/game/chip-gray.svg',
  'yellow': '/img/game/chip-yellow.svg',
  'red': '/img/game/chip-red.svg',
  'blue': '/img/game/chip-blue.svg',
  'green': '/img/game/chip-green.svg',
  'black': '/img/game/chip-black.svg'
}

const Chip = ({ options, ...props }) => {
  return <div
    style={{ fontSize: options.size * 0.2 }}
    className={`${style.chip}`}
    {...props}
  >
    <Image src={chipsImgs[options.value < 1 ? 'gray'
      : options.value < 5 ? 'yellow'
        : options.value < 10 ? 'red'
          : options.value < 25 ? 'blue'
            : options.value < 100 ? 'green'
              : 'black']} width={options.size || 65} height={options.size || 65} alt={`Chip ${options.textValue}`} />
    <span>{options.value}</span>
  </div >
}

export default Chip