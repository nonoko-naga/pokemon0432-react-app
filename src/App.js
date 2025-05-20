import logo from './logo.svg';
import ohkido from './ohkido.png';
import './App.css';
import { useState, useEffect } from 'react';
import { Button, Tooltip } from "@mui/material";
import Const from './Const';

function App() {
  // 状態管理
  const [quizNo, setQuizNo] = useState(1);
  const [isInit, setIsInit] = useState(true);
  const [visibleInitMsg, setVisibleInitMsg] = useState(true);
  const [quizList, setQuizList] = useState(Const.QUIZ_LIST[1]);
  const [point, setPoint] = useState(0);
  const [visibleBaloon, setVisibleBaloon] = useState(false);
  const [msgFromOhkido, setMsgFromOhkido] = useState('');

  // 初期メッセージを点滅させる
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleInitMsg((prev) => !prev);
    }, 500); // 500msごとに切り替え
    return () => clearInterval(interval);
  }, []);

  // クイズスタート
   function startQuiz() {
    // 初期メッセージを削除 & 第n問を表示
    setIsInit(false)
    setMsgFromOhkido('')
    setVisibleBaloon(false)
  }

  // 答えチェック
  const judgeAns = (selected) => {
    let balloonText = '';
    let result = ''; // 最終問題だったら、で使う
    let finalPoint = 0; // 最終問題だったら、で使う
    if (selected === quizList.ANSWER) {
      // 最終問題の結果用
      result = '正解！　プラス10点！　';
      // ポイントをプラス
      let plus = point+10;
      finalPoint = plus;
      setPoint(plus);

      // 吹き出しで実況
      balloonText = '正解！　プラス10点！　合計' + plus + '点！';
    } else {
      finalPoint = point;
      balloonText = '不正解・・・';
    }

    setMsgFromOhkido(balloonText)
    setVisibleBaloon(true)
    
    // 問題番号をインクリメント
    let inc = quizNo+1;

    // 最終問題だったら
    if (Const.QUIZ_LIST[inc] == null) {
      // 最終問題が正解だったらその旨のメッセージ追加
      if (result !== '') {balloonText = result}
      balloonText = result + '問題は終了！　最終得点は' + finalPoint + '点です';
      setMsgFromOhkido(balloonText)
      setIsInit(true)
      setQuizNo(1)
      setQuizList(Const.QUIZ_LIST[1])
      setPoint(0)
    } else{
      setQuizNo(inc)
      setQuizList(Const.QUIZ_LIST[inc])
    }
  };

  // 最初の画面に戻る
  function doInit() {
    setIsInit(true)
    setQuizNo(1)
    setQuizList(Const.QUIZ_LIST[1])
    setPoint(0)
    setVisibleBaloon(false)
  }

  return (
    <>
      <div className="App">
      <header className="App-header">
        {/* 吹き出し */}
        {visibleBaloon && 
          <div class="balloon">
            <span>{msgFromOhkido}</span>
          </div>
        }
        {/* 初期画面 */}
        <div class="zoom-box" onClick={startQuiz}>
          <img src={ohkido} className="ohkido zoom" alt="オーキド博士"/>
        </div>
        <div>
        {isInit && <h3>{Const.TITLE}</h3>}
        {isInit && <p>{!(visibleInitMsg) ? Const.BLANK_ZENKAKU:""}</p>}
        {isInit && <p>{visibleInitMsg ? Const.INIT_MSG:""}</p>}
        </div>

        {/* クイズ中 */}
        {!(isInit) && <h3>第{quizNo}問</h3>}
        {!(isInit) &&
          <div class="quizBoard">
            <p>{quizList.QUESTION}</p>
          </div>
        }
        {!(isInit) &&
          <div class="optionArea">
            <Button class="option" color='info' onClick={() => judgeAns(1)}>{quizList.OPTION1}</Button>
            <Button class="option" color='info' onClick={() => judgeAns(2)}>{quizList.OPTION2}</Button>
            <Button class="option" color='info' onClick={() => judgeAns(3)}>{quizList.OPTION3}</Button>
          </div>
        }

      {/* 最初の画面に戻る */}
      <div style={{marginTop: 50 + 'px'}} >
        {!(isInit) && <Button variant="outlined" onClick={doInit}>{Const.BTN_VALUE_MODORU}</Button>}
      </div>

      </header>
    </div>
    </>
  );
}

export default App;
