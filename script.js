

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
    audio.src = 'sounds/bird-whistling-a.wav'

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
const radius = 0 // size of center circle

// -------------------

function render() {
    ctx.clearRect(0, 0, 600, 600)
    
    
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
        const barLength = frequencyArray[i] /255* 400
        const x1 = (Math.cos(step * i) * radius) + centerX
        const y1 = (Math.sin(step * i) * radius) + centerY
        const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX
        const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY
    
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        
        
    })
  
    ctx.stroke()
    // -------------------------------------------------
  
    requestAnimationFrame(render)
  }
  
