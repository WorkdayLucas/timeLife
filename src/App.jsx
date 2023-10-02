import { useEffect, useState } from "react";
import "./App.css";
import Timer from "./componets/Timer";
import IntroModal from "./componets/IntroModal";

function App() {

  const [introShow, setIntroShow] = useState(true)

  return (
    <div style={{width:"100%",}}>
      <IntroModal visible={introShow} setVisible={setIntroShow}/>
      <Timer/>
    </div>
  );
}

export default App;
