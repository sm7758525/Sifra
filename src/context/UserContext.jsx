 import {createContext, useState} from "react";
import {run} from "../gemini"; // importing run function from gemini.js
 // creating global variable
export const datacontext = createContext(); 

function UserContext({children}) {
    let [speaking, setSpeaking] = useState(false);
    let [prompt, setPrompt] = useState("Listening...");
    let [response, setResponse] = useState(false);
    // speak function
    function speak(text){
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "hi-GB"; // or use "en-GB"
        window.speechSynthesis.speak(text_speak)
    }
    async function aiResponse(prompt){
        let text = await run(prompt);
        let newText = text.split("**")&&text.split("*")&&text.replace("google","Shubham Maurya")&&text.replace("Google","Shubham Maurya");
        // console.log(text);
        setPrompt(newText)
        speak(newText)
        setResponse(true)
        setTimeout(() => {
            setSpeaking(false)
        },5000)
    }
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new SpeechRecognition()
    recognition.onresult = (e) => {
        let currentIndex = e.resultIndex
        let transcript = e.results[currentIndex][0].transcript
        // Content.innerText = transcript.toLowerCase()
        setPrompt(transcript);
        takeCommand(transcript.toLowerCase())
    }
    function takeCommand(command){
        if(command.includes("open") && command.includes("youtube")){
            window.open("https://www.youtube.com/", "_blank")
            speak("Opening Youtube")
            setPrompt("Opening Youtube")
            setTimeout(() => {
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("duodeveloper youtube channel")){
            window.open("https://www.youtube.com/results?search_query=duodeveloper", "_blank")
            speak("Opening Youtube")
            setPrompt("Opening duo developer Youtube Channel")
            setTimeout(() => {
                setSpeaking(false)
            },5000)
        }
        else{
            aiResponse(command)
        }
    }

    let value = {
        // speak
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
        }
    return (
       <div>
           <datacontext.Provider value={value}>
           {children}
           </datacontext.Provider>
       </div>
    );
}

export default UserContext; 