import { Link } from "react-router-dom";


function Navbar() {


    return (
      <>
      <Link to="/create"><button className="create">Make a post</button></Link>
      <Link to="/browse"><button className="browse">Browse posts</button></Link>
  
      </>
    )
  }
  
  export default Navbar
  