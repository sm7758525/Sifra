import { useContext } from 'react';
import ai from './assets/ai.png';
import { FaMicrophone } from 'react-icons/fa';
import { datacontext } from './context/UserContext';
import aigif from './assets/aiVoice.gif';
import speakimg from './assets/speak.gif';

function App(){
    let {recognition,speaking, setSpeaking,prompt,response,setPrompt,setResponse} = useContext(datacontext)
    // speak("Hello, I am Sifra Your Virtual Asistant");
    return (
        <div className='bg-black h-screen w-screen flex justify-center items-center overflow-hidden' >
            <div className='flex py-10 gap-2 px-10 w-full /*border-2 border-white*/ flex-col justify-center items-center'> 
              <img src={ai} className='lg:h-[35vw] md:h-[25vw] sm:h-[15vw]' alt="ai" />
              <span className='text-white text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-500' >I am Sifra Your Virtual Asistant</span>
            <div className='{/*border-2 border-white*/} h-20 w-40 flex justify-center items-center '>
                {!speaking ?
                <button
                onClick={()=> 
                    {
                        setPrompt('Listening...');
                        setSpeaking(true);             
                        setResponse(false);
                        recognition.start()
                        } }
                className='gap-3 text-black text-md flex justify-center items-center bg-white px-6 py-2 text-center rounded-3xl ' 
                >
                    Click here 
                < FaMicrophone/>
                </button> 
                : <div className='flex flex-col items-center gap-1'>
                    {!response ? <img src={speakimg} className='w-[50px]' /> 
                    : 
                    <img src={aigif} className='w-[50vh] h-[100px]' /> }
                    <p className='text-xl text-white'>{prompt}</p>
                  </div> 
                    }
            </div>                                                  
            </div>
        </div>
    );
}

export default App;
