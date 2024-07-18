import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
/* eslint-disable */
import { generate  } from 'random-words'


const TypingBox = () => {

    const inputRef=useRef(null);
  
    const [wordsArray, setWordArray] = useState (()=> {
           return generate(25);

    });
    const [currWordIndex,setCurrWordIndex]=useState(0);
    const[currCharIndex,setCurrCharIndex]=useState(0);



    const wordsSpanRef=useMemo(()=>{
        return Array(wordsArray.length).fill(0).map(i=>createRef(null));
    },[wordsArray])


    

    const handlUserInput = (e)=>{
       const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
         if( e.key === allCurrChars[currCharIndex].textContent){
            console.log("correct Input");
         }
         else {
            console.log("notssss")
         }

    }

    const focusInput=()=>{
        inputRef.current.focus();
    }

    useEffect(()=>{
     focusInput();
     wordsSpanRef[0].current.childNodes[0].className='current';
     
    },[])

    return (
        <div>
            <div className='type-box' onClick={focusInput}>
                <div className='words'>
                    {
                        wordsArray.map((word,index )=> (
                            <span className='word' ref={wordsSpanRef[[index]]}>
                                {
                                word.split('').map(char => (
                                    <span > {char} </span>
                                 ))
                                }
                            </span>
                        ))
                    }
                </div>
            </div>

            <input type="text"
            className='hidden-input'
            ref={inputRef}
            onKeyDown={handlUserInput}


             />

        </div>
    );
}

export default TypingBox;


