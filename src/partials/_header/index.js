import {
    appendHtml
} from '@/utils'

import './header.scss'
import tpl from './header.pug'

export default function (el) {
    appendHtml(el, tpl())
}