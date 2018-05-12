import {
    appendHtml
} from '@/utils'

import './ripple.scss'
import tpl from './ripple.pug'

export default function (el) {
    appendHtml(el, tpl())
}