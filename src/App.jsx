import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null);

  let generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+= "0123456789";
    if(character) str+= "!@#$%&[{}]()~?"
    for(let i=0; i<length; i++){
      let index = Math.floor(Math.random()*(str.length)) + 1;
      pass += str.charAt(index);
    }
    setPassword(pass)
  },[length, number, character, setPassword])

  let copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    generatePassword();
  }, [length, number, character, generatePassword])

  return (
    <>
    <div className="container">
      <div className="main">
        <div className="header">
          <h1 className="name">Password Generator</h1>
          <button className='copy' onClick={copyToClipboard}>Copy</button>
        </div>
        <input type="text"className='input' value={password} ref={passwordRef} readOnly />
        <div className="entity">
          <input type="range" min={5} max={20} value={length} onChange={(e)=>{
            setLength(e.target.value)
            }} id='length' />
          <label htmlFor="length" className="length">Length: {length}</label>
          <input type="checkbox" id="number" defaultChecked={number} onClick={()=>{
            setNumber((prev)=>!prev)
          }} />
          <label htmlFor="number" className='number'>Number</label>
          <input type="checkbox" id="character" defaultChecked={character} onClick={()=>{
            setCharacter((prev)=>!prev)
          }} />
          <label htmlFor="character" className='character'>Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
