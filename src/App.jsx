import { useEffect, useRef, useState } from 'react'
import './App.css'
import songss from"./songs.js"



function App() {
  const [isPlay,setIsPlay] = useState(false)
  const [songs, setSongs] = useState(songss)
  const [currentsong,setCurrentsong] = useState(songs[0])
  const [totalT, setTotalT] = useState("")
  const [ prog ,setProg ] = useState(0)
  const audioElem = useRef()

  useEffect(()=>{
    console.log(audioElem.current.duration)
    let totaltime = audioElem.current.duration
    let currentTime = audioElem.current.currentTime 
    console.log(`total: ${totaltime}, current: ${currentTime}`)
    setTotalT(totaltime)
    setProg(currentTime / totaltime * 100)
  },[])


  //UseEffect play and pause
  useEffect(()=>{
    if(isPlay){
      audioElem.current.play()
    }else{
      audioElem.current.pause()
    }
  },[isPlay,currentsong])

  // lenght of song
  function len(e){
    let width = e.currentTarget.clientWidth  
    let offSet = e.nativeEvent.offsetX
    let divProg = offSet/width * 100
    audioElem.current.currentTime = divProg / 100 * currentsong.duration
  }

  // playing width
  function playing(e){
    let totaltime = e.target.duration
    let currentTime = e.target.currentTime 

    setTotalT(totaltime)
    setProg(currentTime / totaltime * 100)

    setCurrentsong({...currentsong,progress:currentTime/totaltime * 100,duration: totaltime})
    if(currentTime === totaltime){
      next()
    }
  }

  // Previous button
  function back(){
    let index = songs.findIndex(x => x.id == currentsong.id)
    if(index==0){
      setCurrentsong(songs[songs.length-1])
    }else{
      setCurrentsong(songs[index -1])
    }
  }
  // Next button
  function next(){
    let index = songs.findIndex(x => x.id == currentsong.id)
    if(index>= songs.length -1){
      setCurrentsong(songs[0])
    }else{
      setCurrentsong(songs[index +1])
    }
  }
  
  const playpause = isPlay ? <i className="bi bi-pause-circle">pause</i>:<i className="bi bi-play-circle">play</i>;

  return (
    <div className='app'>
      <audio preload='auto' src={currentsong.url} ref={audioElem} onTimeUpdate={playing}></audio>
      <div className="container">
        <h3 className='title'>{currentsong.title}</h3>
        <div className="imgdiv">
          <img src="assets/mp3B.jpeg" alt="" />
        </div>
        <div className='time'></div>
        <div className="lenght" onClick={len}>
          <div className="ll" style={{width: `${prog}%`}}></div>
        </div>
        <div className="controls">
          <button onClick={back}><i className="bi bi-skip-backward-circle"></i>previous</button>
          <button onClick={()=>setIsPlay(!isPlay)}>{playpause}</button>
          <button onClick={next}><i className="bi bi-skip-forward-circle"></i>Next</button>
        </div>
      </div>
      

    </div>
  )
}

export default App
