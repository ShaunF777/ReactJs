
// Import React hooks and assets
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import scrimbaLogo from './assets/2.jpg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header' // Demonstrating a default import/export
import Footer from './components/Footer'
import { Body } from './components/Body' // Demonstrating a named import/export


function App() {
  // Get greeting from environment variable
  const greeting = import.meta.env.VITE_GREETING

  // State for the counter button
  const [count, setCount] = useState(0)
  // State to store the user's IP address
  const [ipAddress, setIpAddress] = useState("")

  // Fetch the user's public IP address from the API when the component mounts
  useEffect(() => {
    const fetchIpAddress = async () => {
      // Get the API URL from environment variables
      const apiUrl = import.meta.env.VITE_API_URL

      try {
        // Use backticks for template literals so apiUrl is interpolated
        const response = await fetch(`${apiUrl}?format=json`)
        if (!response.ok) {
          // If the response is not OK, throw an error
          throw new Error(`API error: ${response.status}`)
        }
        // Parse the JSON response
        const data = await response.json()
        // Set the IP address in state
        setIpAddress(data.ip)
      } catch (err) {
        // If there is an error, set IP address to NOT AVAILABLE
        setIpAddress("NOT AVAILABLE")
        // Log the error for debugging
        console.log(err.message)
      }
    }
    /*The API (api.ipify.org) is reliable, but if you are offline, blocked by a firewall, or the API is down, 
    it will show "NOT AVAILABLE" as expected. Otherwise, it should display your public IP address.
    If you still see "NOT AVAILABLE," check your network connection or try opening 
    https://api.ipify.org?format=json in your browser to verify the API is reachable.
    */

    fetchIpAddress()
  }, []) // Empty dependency array means this runs once on mount



  return (
    <>
      {/* Header component */}
      <Header />
      {/* Body component */}
      <Body />
      {/* Logos and links */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://scrimba.com" target="_blank">
          <img src={scrimbaLogo} className="logo react" alt="Scrimba logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {/* Greeting from environment variable */}
      <h2>{greeting}</h2>
      {/* Display the user's IP address */}
      <h3>Your IP address is {ipAddress}</h3>
      <div className="card">
        {/* Counter button */}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* Footer component */}
      <Footer />
    </>
  )
}

export default App
