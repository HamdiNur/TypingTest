import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
/* eslint-disable */
import { generate  } from 'random-words'


const TypingBox = () => {

    const inputRef=useRef(null);
  
    const [wordsArray, setwordArray] = useState (()=> {
           return generate(40);

    });
    const [currwordIndex,setCurrWordIndex]=useState(0)
    const[currCharIndex,setCurrCharIndex]=useState(0);



    const wordsSpanRef=useMemo(()=>{
        return Array(wordsArray.length).fill(0).map(i=>createRef(null));
    },[wordsArray])
    console.log(wordsSpanRef)

    

    const handlUserInput=(e)=>{
       const allCurrChars=wordsSpanRef[currwordIndex].current.childNodes;
       if(e.key === allCurrChars[currCharIndex].innerText){
        console.log("correct");
       }
       else
       {
        console.log("its incorect");
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
                                word.split(' ').map(char => (
                                    <span className='current' >{char} </span>
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

export default TypingBox


