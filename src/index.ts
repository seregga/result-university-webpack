import './index.scss'
import summer from './assets/sounds/summer.mp3'
import rain from './assets/sounds/rain.mp3'
import winter from './assets/sounds/winter.mp3'
import pauseIcon from './assets/icons/pause.svg'
import rainIcon from './assets/icons/cloud-rain.svg'
import snowIcon from './assets/icons/cloud-snow.svg'
import sunIcon from './assets/icons/sun.svg'
import summerBg from './assets/summer-bg.jpg'
import rainBg from './assets/rainy-bg.jpg'
import winterBg from './assets/winter-bg.jpg'

const trackList = [
    {
        id: 0,
        track: summer,
        icon: sunIcon,
        background: summerBg,
        current: false
    },
    {
        id: 1,
        track: rain,
        icon: rainIcon,
        background: rainBg,
        current: false
    },
    {
        id: 2,
        track: winter,
        icon: snowIcon,
        background: winterBg,
        current: false
    },
]

const volumeSelector = document.querySelector<HTMLInputElement>("#volume-control")
const audio = new Audio()
audio.loop = true

if (volumeSelector) { 
    audio.volume = parseFloat(volumeSelector.value) / 100
    volumeSelector.addEventListener("input", (e) => {        
        audio.volume = parseFloat(volumeSelector.value) / 100
    })
} 


function getBackStr(url: string) {
    return `url(${url})  0 0 / cover no-repeat`
}

function handleTrackBtn(e: MouseEvent) {
    if ((e.target as HTMLElement).localName != "span") {
        return
    }

    const oTrack = trackList[Number((e.target as HTMLElement).id)]

    if (oTrack.current) {
        if (audio.paused) {
            audio.play();
            (e.target as HTMLElement).style.background = getBackStr(pauseIcon)
        } else {
            audio.pause();
            (e.target as HTMLElement).style.background = getBackStr(oTrack.icon)
        }
    } else {
        trackList.forEach((el) => {
            if (el.id === oTrack.id) {
                el.current = true
                const b = document.getElementById('background')
                    document.getElementById('background')!.style.background = getBackStr(el.background)
            } else {
                el.current = false
                const b = document.getElementById(`${el.id}`)
                b && ((b.style.background = getBackStr(el.icon)))
            }
        })
        audio.src = oTrack.track
        audio.play();
        (e.target as HTMLElement).style.background = getBackStr(pauseIcon)
    }
}

interface ListTypes {
    background: string
    icon: string
    id: number
}

function createMusicList(list: ListTypes[]) {
    const musicList = document.getElementsByTagName('ul')[0]
    musicList.addEventListener('click', (e) => handleTrackBtn(e))

    list.forEach(el => {
        const track = document.createElement('li')
        track.style.background = getBackStr(el.background)

        const trackBtn = document.createElement('span')
        trackBtn.style.background = getBackStr(el.icon)
        trackBtn.setAttribute('id', `${el.id}`)

        track.append(trackBtn)
        musicList.append(track)

    })
}

createMusicList(trackList)