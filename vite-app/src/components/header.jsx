export const Header = () => {
  return (
    <div>hello shaun</div>
  )
}

export const EnvVar = () => {
  return (
    <div>{import.meta.env.VITE_API_URL}</div> // Render the actual value
  )
}



