import './UsersGuide.css';


const Home = () => {

 
    
    
    
    
      return (
        
    
         <div className="usersguide-main">
             <div className="usersguide-main-heading">
             <h1 className="jk" >Welcome to Peersapp</h1>
            </div>
             <div className="points">
                 <p>When you want to code with your peers you have two choices:</p>

                <div>
                    <div className="guide-create">
                    <h2>Create:</h2>     
<h4>This option is for creation of the coding environment where you will code with your peers.</h4>
                    <ul>
                        <li>When you click on <strong>Create</strong> button you are redirected to a page where you have to fill name, roomname, and 
                        password for the room.</li>
                        <li>By sharing the roomname and roompassword you can invite your peers in the same coding environment. </li>
                        <li>After click on Go option, you are redirected to your newly created coding environment.</li>
                    </ul>
                        </div>
                       <div className="guide-join">
                    <h2>Join:</h2>
                    <h4>You should cilck on this option with the intention of joining coding environment created by your peer.</h4>
                    <ul>
                        
                        <li>When you click on <strong>Join</strong> button you are redirected to a page where you have to fill name, roomname, and 
                        password.</li>
                        <li>After click on Go option, you are redirected to the room created by your peer.</li>
                        
                       
                    </ul>
                    </div>
                     
                </div>                 
             </div>
             
         </div>
    
    
      )
    
    
    
    
    }
    
    export default Home;