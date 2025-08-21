import React, { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState("");
  const [searchedUsername, setSearchedUsername] = useState(""); // to trigger API call
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState([]);

  
    useEffect(() =>{
    if (!searchedUsername) return; // Prevent API call if no username is searched, early return
    fetch(`https://api.github.com/users/${searchedUsername}`) 
    .then((response) => response.json())
    .then((data) => setUserData(data));
  }, [searchedUsername]);

     useEffect(() =>{
     if(!username) return;
     fetch(`https://api.github.com/users/${username}/repos`)
     .then(res => res.json())
     .then(data => setRepoData(data));
  }, [username]);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchedUsername(username.trim());
  }

  return(
    <div style={{ textAlign: "center", marginTop: "50px", height:"20vh", marginTop:"-5px"}}>
      <img src="data:image/png;base64,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" alt="Github logo"  style={{width:"25px", height:"25px", marginRight:"240px", marginBottom:"-48px"}}/>
      <h2>Github User Search</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e => setUsername(e.target.value))} style={{width: "290px", height:"25px"}}/>
        <button type="submit" style={{width:"100px", height:"30px", marginLeft:"5px"}}>Search</button>
      </form>
      {userData && (
        <div>
          <h2>Overview of <span style={{fontWeight:"bold", color:"blue"}}>{userData.login}</span></h2>
        <div>
          <img src={userData.avatar_url} alt="github avatar" style={{width:"150px", borderRadius:"50%", marginRight:"250px"}}/>
          <h2 style={{display:"flex", marginTop:"-110px", left:"585px", position:"absolute"}}>{userData.name || userData.login}</h2>
          {/* <p style={{display:"flex", marginTop:"-65px", left:"580px", position:"absolute"}}>{userData.login}</p> */}
          <p style={{display:"flex", marginTop:"-75px", left:"585px", position:"absolute"}}>{userData.location}</p>
          <p style={{display:"flex", marginTop:"-55px", left:"585px", position:"absolute"}}>{userData.bio}</p>

          <button style={{position:"absolute", bottom:"265px", left:"580px", width:"100px", height:"25px", cursor:"pointer", boxShadow:"0 2px 4px rgba(0,0,0,0.2)"}}>Follow</button>
          {/* <p style={{display:"flex"}}>User view type: {userData.user_view_type}</p> */}
          <p style={{display:"flex", position:"absolute", top:"400px", left:"220px", marginTop:"-10px", fontWeight:"bold",fontSize:"large"}}>FOLLOWING <span style={{color:"blue", display:"flex", position:"relative", top:"22px", right:"48px", fontSize:"x-large"}}><br/>{userData.following}</span></p>
          <p style={{display:"flex", position:"absolute", top:"400px", left:"420px",marginTop:"-10px", fontWeight:"bold",fontSize:"large"}}>FOLLOWERS <span style={{color:"blue", display:"flex", position:"relative", top:"22px", right:"48px", fontSize:"x-large"}}><br/>{userData.followers}</span></p>
          <p style={{display:"flex", position:"absolute", top:"400px", left:"620px",marginTop:"-10px", fontWeight:"bold",fontSize:"large"}}>PUBLIC_REPOS <span style={{color:"blue", display:"flex", position:"relative", top:"22px", right:"48px", fontSize:"x-large"}}><br/>{userData.public_repos}</span></p>
          <p style={{display:"flex", position:"absolute", top:"400px", left:"820px",marginTop:"-10px", fontWeight:"bold",fontSize:"large"}}>PUBLIC_GISTS <span style={{color:"blue", display:"flex", position:"relative", top:"22px", right:"48px", fontSize:"x-large"}}><br/>{userData.public_gists}</span></p>
          {/* <p>Received events URL: {userData.received_events_url}</p> */}
          {/* <p>Email: {userData.email}</p>
          <p>Website: {userData.website}</p> */}
          <div>
          <h1 style={{}}>Repositories <span>{[]}</span></h1>
          </div>
            <div style={{ padding:"10px", display:"flex", flexWrap:"wrap", gap:"10px",}}>
        {repoData.map(repo => (
          <div style={{flex:"1 1 300px", border:"1px solid #8b7676ff", borderRadius:"10px", padding:"10px", background:"#f5ecec82"}} key={repo.id}>
            <a style={{fontSize:"large"}}
              href={repo.html_url} 
              target="_blank" 
              rel="noreferrer" 
            >
              {repo.name}
            </a>
            <p>{repo.description || "No description available"}</p>
            <p className="text-sm text-gray-600">{repo.language || "N/A"}</p>
            <div className="flex gap-4 text-sm mt-2">
              ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
            </div>
          </div>
        ))}
      </div>
        </div>
         </div>
      )}
        </div>
  );
}

export default App;