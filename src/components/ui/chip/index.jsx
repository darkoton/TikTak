/** @jsxImportSource @emotion/react */

import style from './style.module.scss'
import Image from 'next/image'
import { css } from '@emotion/react'
import { fluid } from '@/style/mixins'

const chipsImgs = {
  'gray': '/img/game/chip-gray.svg',
  'yellow': '/img/game/chip-yellow.svg',
  'red': '/img/game/chip-red.svg',
  'blue': '/img/game/chip-blue.svg',
  'green': '/img/game/chip-green.svg',
  'black': '/img/game/chip-black.svg'
}



const Chip = ({ options, ...props }) => {

  const responsiveFont = css`
  font-size: ${options.size * 0.3}px;
  `

  const responsiveSize = css`
  ${fluid('max-width', options.size, options.size / 2, 320, 640)}
  ${fluid('max-height', options.size, options.size / 2, 320, 640)}
`
  return <div
    className={`${style.chip}`}
    {...props}
  >

    <Image
      css={responsiveSize}
      src={chipsImgs[options.value < 1 ? 'gray'
        : options.value < 5 ? 'yellow'
          : options.value < 10 ? 'red'
            : options.value < 25 ? 'blue'
              : options.value < 100 ? 'green'
                : 'black']} width={options.size || 65} height={options.size || 65} alt={`Chip ${options.value}`} />
    <span css={responsiveFont}>{options.value}</span>
  </div>
}

export default Chip