import { Dialog, DialogTitle } from "@material-ui/core";
// import { wordsList } from "random-words";
/* eslint-disable */
import React, {
  createRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";
import UpperMenu from "./UpperMenu";
import { generate } from "random-words";
const TypingBox = () => {
  // in react you get a hook , useRef()
  // react also provides a function, createRef()

  const { testSeconds, testWords, testMode } = useTestMode();
  const [initialRender, setInitialRender] = useState(false);  
  const [words, setWords] = useState(() => {
    if (testMode === "word") {
      return generate(testWords);
    }
    return generate(300);
  });

//   const words = useMemo(() => {
//     return wordsArray;
//   }, [wordsArray]);

  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [countDown, setCountDown] = useState(() => {
    if (testMode === "word") {
      return 180;
    }

    return testSeconds;
  });
  const [testTime, setTestTime] = useState(() => {
    if (testMode === "word") {
      return 180;
    }

    return testSeconds;
  });
  const [correctChars, setCorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectChars, setIncorrectChar] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [open, setOpen] = useState(false);

  const emptySpans = ()=>{
    return Array(words.length)
    .fill(0)
    .map((i) => createRef(null));
  }
  const inputRef = useRef(null);
  const [wordSpanRef, setWordSpanRef] = useState(emptySpans());

  const resetTest = () => {
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestEnd(false);
    clearInterval(intervalId);

    if (testMode === "word") {
      setWords(generate(testWords));
      setWordSpanRef(emptySpans());
      setCountDown(180);
      setTestTime(180);
    } else {
      setWords(generate(300));
      setWordSpanRef(emptySpans());
      setCountDown(testSeconds);
      setTestTime(testSeconds);
    }
    setGraphData([]);
    setCorrectChars(0);
    setCorrectWords(0);
    setExtraChars(0);
    setIncorrectChar(0);
    setMissedChars(0);
    resetWordSpanRefClassname();
    focusInput();
  };

  const redoTest = () => {
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestEnd(false);
    clearInterval(intervalId);
    if (testMode === "word") {
      setCountDown(180);
      setTestTime(180);
    } else {
      setCountDown(testSeconds);
      setTestTime(testSeconds);
    }
    setGraphData([]);
    setCorrectChars(0);
    setCorrectWords(0);
    setExtraChars(0);
    setIncorrectChar(0);
    setMissedChars(0);
    resetWordSpanRefClassname();
    focusInput();
  };


  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      // console.log("timer function is working");
      setCountDown((prevCountDown) => {
        setCorrectChars((correctChars) => {
          // console.log("correct chars",correctChars);
          setGraphData((data) => {
            return [
              ...data,
              [
                testTime - prevCountDown,
                Math.round(
                  correctChars / 5 / ((testTime - prevCountDown + 1) / 60)
                ),
              ],
            ];
          });
          return correctChars;
        });

        if (prevCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return prevCountDown - 1;
      });
    }
  };



  const handleDialogBoxEvents = (e) => {
    if (e.keyCode === 32) {
      //logic for redo game
      e.preventDefault();
      redoTest();
      setOpen(false);
      return;
    }
    if (e.keyCode === 9 || e.keyCode === 13) {
      //logic for reset game
      e.preventDefault();
      resetTest();
      setOpen(false);
      return;
    }

    e.preventDefault();
    setOpen(false);
    startTimer();
  };

  const resetWordSpanRefClassname = () => {
    wordSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        if (j.className.includes("extra")) {
          j.remove();
        }
        j.className = "char";
      });
    });
    wordSpanRef[0].current.childNodes[0].className = "char current";
  };

  const calculateWPM = () => {
    return Math.round(
      correctChars / 5 / ((graphData[graphData.length - 1][0] + 1) / 60)
    );
  };

  const calculateAccuracy = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    focusInput();
    wordSpanRef[0].current.childNodes[0].className = "char current";
  }, []);

  useLayoutEffect(() => {
    if(initialRender){
        console.log("running");
        resetTest();
    }
    else{
        setInitialRender(true);
    }
   
  }, [testSeconds, testWords, testMode]);

  return (
    <div>
      <UpperMenu countDown={countDown} currWordIndex={currWordIndex} />
      {testEnd ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAccuracy()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
          graphData={graphData}
          resetTest={resetTest}
        />
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {words.map((word, index) => (
              <span className="word" ref={wordSpanRef[index]}>
                {word.split("").map((char, ind) => (
                  <span className="char">{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}

      <input
        type="text"
        className="hidden-input"
        ref={inputRef}
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <Dialog
        open={open}
        style={{
          backdropFilter: "blur(2px)",
        }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        onKeyDown={handleDialogBoxEvents}
      >
        <DialogTitle>
          <div className="instruction">press SPACE to redo</div>
          <div className="instruction">press TAB/ENTER to restart</div>
          <div className="instruction">press any other key to exit</div>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default TypingBox;
