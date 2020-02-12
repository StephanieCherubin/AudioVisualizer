

let analyzer
let frequencyArray

function startAudio() {
    const audio = new Audio();
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    
    // --------------------------------------------------------
    analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(audioContext.destination)
    frequencyArray = new Uint8Array(analyser.frequencyBinCount)
    // --------------------------------------------------------
    audio.src = 'sounds/Burna Boy - Anybody.mp3'

    audio.play()
    render()
}


// ----------------------

const playButton = document.getElementById('button-play')

playButton.addEventListener('click', (e) => {
    startAudio()
})

// ------------------

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const centerX = 600 / 2
const centerY = 600 / 2
const radius = 300 / 3 // size of center circle

// hex code random color
// function randomColor() {
//     return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
//   }
  
  // rgb random color
  function differentColor() {
    return `rgb(
      ${Math.floor(256 * Math.random())},
      ${Math.floor(256 * Math.random())},
      ${Math.floor(256 * Math.random())})`;
  }
  
  // hue saturation lightness random color
//   function randomHSL(s, l) {
//     const h = Math.floor(Math.random() * 360)
  
//     return `hsl(${h}, ${s}%, ${l}%)`
//   }


// -----------------------------------------------
function render() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.clearRect(0, 0, 600, 600)
    ctx.fill()
    
    
    let gradient = ctx.createLinearGradient(0, 0, 300, 0);
    gradient.addColorStop("0", "yellow");
    gradient.addColorStop("0.5" ,"blue");
    gradient.addColorStop("1.0", "red");
    
    //draw a circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = gradient
    ctx.font = '50px fantasy'
    ctx.strokeText("Audio Visualizer", 10, 50);
    ctx.stroke()
  
    
    
    const bars = 200
    const step = Math.PI * 2 / bars
  
    analyser.getByteFrequencyData(frequencyArray)
      
    // --------------------------------------------
    frequencyArray.forEach((f, i) => {
        const radius = f / 255 * 30
        // const x = i % 20 * 15
        // const y = Math.floor(i / 20) * 15
        // ctx.arc(x, y, radius, 0, Math.PI)
        const barLength = frequencyArray[i] /255* 400
        const x1 = (Math.cos(step * i) * radius) + centerX
        const y1 = (Math.sin(step * i) * radius) + centerY
        const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX
        const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY
    
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        
        // ctx.strokeStyle = randomColor()
        ctx.strokeStyle = differentColor()
        // ctx.strokeStyle = randomHSL(75, 45)
    })
  
    ctx.stroke()
    // -------------------------------------------------
  
    requestAnimationFrame(render)
  }
  
