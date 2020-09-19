const app = () => {
    //Selectors
    const $play = document.querySelector(".play_app")
    const $song = document.querySelector(".song")
    const $outline = document.querySelector(".moving-outline circle")
    const $video = document.querySelector(".video-backg video")

    // sounds
    const sounds = document.querySelectorAll(".sounds-btns")
    //time display
    const $timeDisplay = document.querySelector(".time-display")
    const $timeSelect = document.querySelectorAll(".time-btn")
    //get the length of the outline
    const outlineLength = $outline.getTotalLength();
    //Duration
    let fakeDuration = 120;

    $outline.style.strokeDasharray = outlineLength;
    $outline.style.strokeDashoffset = outlineLength;

    //play sound
    $play.addEventListener("click", () => {
        checkPlaying($song)
    })
    //select sound
    $timeSelect.forEach(item => {
        item.addEventListener("click", function(){
            fakeDuration = this.getAttribute("data-time");
            $timeDisplay.textContent = `${fakeDuration / 60}:00`
        })
    })

    //create a function specific to stop and play the sounds
    const checkPlaying = song => {
        if(song.paused){
            song.play()
            $video.play()
            $play.src = "svg/pause.svg"
        }else{
            song.pause()
            $video.pause()
            $play.src = "svg/play.svg"
        }
    }


    //We can animated the circle
    $song.ontimeupdate = () => {
        let currentTime = $song.currentTime;
        let elapsed = fakeDuration - currentTime
        let seconds = Math.floor(elapsed % 60)
        let minutes = Math.floor(elapsed / 60)

        //Animate the circle

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        $outline.style.strokeDashoffset = progress;

        //animate the text
        $timeDisplay.textContent = `${minutes} : ${seconds}`

        
    }
}


app()