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
        id: 1,
        track: summer,
        icon: sunIcon,
        background: summerBg,
        current: false
    },
    {
        id: 2,
        track: rain,
        icon: rainIcon,
        background: rainBg,
        current: false
    },
    {
        id: 3,
        track: winter,
        icon: snowIcon,
        background: winterBg,
        current: false
    },
]

const audio = new Audio()

const volumeSelector = document.querySelector("#volume-control")
audio.volume = volumeSelector.value / 100
audio.loop = true;
volumeSelector.addEventListener("change", (e) => {
    audio.volume = e.currentTarget.value / 100
})

function getBackStr(backImg) {
    return `url(${backImg}) no-repeat 0 0/cover`
}

function handleTrackBtn(e, oTrack) {
    if (oTrack.current) {
        if (audio.paused) {
            audio.play()
            e.currentTarget.style.background = getBackStr(pauseIcon)
        } else {
            audio.pause()
            e.currentTarget.style.background = getBackStr(oTrack.icon)
        }
    } else {
        trackList.forEach(el => {
            if (el.id === oTrack.id) {
                el.current = true
                document.querySelector('.background').style.background = getBackStr(el.background)
            } else {
                el.current = false
                document.getElementById(`${el.id}`).style.background = getBackStr(el.icon)
            }
        })
        audio.src = oTrack.track
        audio.play()
        e.currentTarget.style.background = getBackStr(pauseIcon)
    }
}

function createMusicList(list) {
    const musicList = document.getElementsByTagName('ul')[0];

    list.forEach(el => {
        const track = document.createElement('li')
        track.style.background = getBackStr(el.background)

        const trackBtn = document.createElement('span')
        trackBtn.style.background = getBackStr(el.icon)
        trackBtn.setAttribute('id', `${el.id}`)

        track.append(trackBtn)
        musicList.append(track)

        trackBtn.addEventListener('click', (e) => handleTrackBtn(e, el))
    })
}

createMusicList(trackList)