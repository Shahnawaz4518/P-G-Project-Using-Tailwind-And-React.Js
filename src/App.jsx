import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:'\"<>./?`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select()
      document.execCommand('copy')
    }
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-6">
      <div className="w-full max-w-lg bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Password Generator</h1>
        <div className="flex items-center mb-6">
          <input 
            type="text" 
            value={password} 
            className="flex-1 py-2 px-4 bg-gray-700 text-white rounded-lg border border-gray-600 outline-none focus:border-blue-500 transition duration-300"
            placeholder="Generated Password" 
            readOnly 
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition duration-300"
          >
            Copy
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-white mb-2">Length: {length}</label>
          <input 
            type="range" 
            min={6} 
            max={100}
            value={length}
            className="w-full cursor-pointer accent-blue-500"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed(prev => !prev)}
              className="accent-blue-500"
            />
            <label htmlFor="numberInput" className="text-white">Include Numbers</label>
          </div>
          <div className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed(prev => !prev)}
              className="accent-blue-500"
            />
            <label htmlFor="characterInput" className="text-white">Include Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App


