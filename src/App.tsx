import './App.css'
import TimeWidget from "./components/time-widget.tsx";

function App() {

  return (
    <div style={{
        width: '800px',
        height: '300px',
    }}>
      <TimeWidget
        timeline={[]}
        filter={{
          id: '1',
          field: 'time',
          value: [0, 100],
          animationWindow: '1',
          plot: 'line',
          animation: false,
          speed: 1
        }}
        index={0}
        isAnimatable={true}
        resetAnimation={() => {}}
        setFilterAnimationWindow={() => {}}
        showTimeDisplay={true}
        setFilterAnimationTime={() => {}}
        toggleAnimation={() => {}}
        updateAnimationSpeed={() => {}}
        datasets={[]}
        readOnly={false}
        setFilterPlot={() => {}}
        onClose={() => {}}
      />
    </div>
  )
}

export default App
