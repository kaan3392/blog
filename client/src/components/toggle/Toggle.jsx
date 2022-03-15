import "./toggle.css"
import Sun from "../../images/sun.png"
import Moon from "../../images/moon.png"
import { useContext } from "react"
import { Context } from '../../context/Context'
const Toggle = () => {
  const {dispatch, darkMode} = useContext(Context);
  

  const handleClick = () => {
    dispatch({ type: "TOGGLE" })
  }
  return (
    <div className="t">
      <img src={Sun} alt="" className="t-icon" />
      <img src={Moon} alt="" className="t-icon" />
      <div onClick={handleClick} style={{left: darkMode ? 0 : 25, transition: "all 1s ease"}} className="t-button"></div>
    </div>
  )
}

export default Toggle