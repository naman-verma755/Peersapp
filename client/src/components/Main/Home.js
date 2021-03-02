

import './Home.css';
const Home = () => {






  return (
    <div className="Main">
      <div className="contain">
        <nav className="head-bar">
          <div className="heading">
            <h1>Peersapp</h1>
          </div>
        </nav>

        <div className="join-create-container">
          <div className="join-create">
            <div className="jc">
              <h1>Get Started</h1>
              <div className="create">
                <a href="/join?type=Create"><h1>Create</h1></a>
              </div>
              <h2>Or</h2>
              <div className="join">
                <a href="/join?type=Join"><h1>Join</h1></a>
              </div>
            </div>
          </div>

          <div className="introduce">
            <p>Do Programming with your peers in realtime Environment. And exprience on the spot changes in your codepad.</p>
            <ul>
              <li>Click on create room and invite friends.</li>
              <li>Join rooms created by your friend.</li>
            </ul>
          </div>
        </div>

      </div>
      <div className="features">
        <div className="feature"><p>Find different solutions in different ways with your peers.</p></div>
        <div className="feature"><p>You can guide your peers live.</p></div>
        <div className="feature"><p>Built-in chat application.</p></div>
      </div>

    </div>

  )




}

export default Home;