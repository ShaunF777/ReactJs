// Named export needs to use the {} when importing in the App.jsx
export const Body = () => {
    return (
        <div>{import.meta.env.VITE_H3}</div> 
    )
} 

// Or using the a default export
/* 
const Body = () => {
    return (
        <div>IP ADDRESS:{import.meta.env.VITE_H3}</div> 
    )
}
export default Body 
*/