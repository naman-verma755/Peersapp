


 const Compiled = async function (textmessage,input,language,setOutput,setBit) {
    

        if(textmessage.length !== 0)
        {
        fetch('https://radiant-forest-58947.herokuapp.com/https://api.hackerearth.com/v4/partner/code-evaluation/submissions/',{
            method: 'POST',
            mode:'cors',
            cache: 'no-cache',
            
            headers: {
                         "content-type":"application/json",
                    "client-secret":"3c1774eccb877852264539cf7a352f82bd43aa19"},
            
             redirect: 'follow',
             referrerPolicy:'no-referrer',
            body: JSON.stringify({
                "lang": language,
                "source": textmessage,
                "input": input, 
                "memory_limit": 243232,
                "time_limit": 5,
                "context": "{'id': 213121}", 
                "callback": "https://client.com/callback/" 
              })
        })
        .then(response => {
            
            return response.json();
        })
        .then((data) => {
            
            let link = data["he_id"]
            fetch('https://radiant-forest-58947.herokuapp.com/https://api.hackerearth.com/v4/partner/code-evaluation/submissions/'+link, {
                method: 'POST',
                mode:'cors',
                cache: 'no-cache',
                
                headers: {
                             "content-type":"application/json",
                        "client-secret":"3c1774eccb877852264539cf7a352f82bd43aa19"},
                
                 redirect: 'follow',
                 referrerPolicy:'no-referrer',
                body: JSON.stringify({
                    "lang": "PYTHON", 
                    "source": textmessage,
                    "input": "", 
                    "memory_limit": 243232,
                    "time_limit": 5,
                    "context": "{'id': 213121}",
                    "callback": "https://client.com/callback/"
                  })
    
    
            })
            .then(response => response.json())
            .then(data => {
               
                    if(data['result']['compile_status'] === "OK")
                    {
                        if(data['result']['run_status']['status'] === 'AC')
                        {
                    fetch('https://radiant-forest-58947.herokuapp.com/'+data["result"]["run_status"]["output"])
                    .then(response => response.text())
                    .then(data => {
                        
                        setOutput(data);
                        
                    })
                    }
                    else if(data['result']['run_status']['status'] === 'RE')
                    {
                        setOutput('Error: '+data['result']['run_status']['status_detail']);
                    }
                    else if(data['result']['status'] === 'NA')
                    {
                       
                        setOutput("Error!!!");
                    
                    }
                    else if(data['result']['run_status']['status'] === 'MLE')
                    {
                        setOutput('Memory Limit Exceeded');
                    }
                }
                else if(data['result']['compile_status'] === null)
            {
                   setOutput("Error!!!");
            }   
            else 
            {
                
                if(data['result']['compile_status'].length>1000)
                setOutput(data['result']['compile_status'].slice(0,500) + ' ...');
                else 
                setOutput('Error: '+data['result']['compile_status']);
            }        
                
            
                  setBit(1);
                  
            })
            .catch(() => {
                setOutput("try again or check net connection");
            })

            setBit(1);
            
        })
        .catch(() => {
            setOutput("try again or check net connection");
        })
        
    }
        else {
            setBit(1);
            setOutput("Error! \n source code is empty")
        }
        
    
        
   
        }

      export default Compiled;