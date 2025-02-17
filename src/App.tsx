import { useEffect, useState } from 'react';
import './App.css'
import Arrow from './icons/Arrow';
import { coin, highVoltage, rocket, trophy } from './images';

function App() {
  const [points, setPoints] = useState(1290848);
  const [energy, setEnergy] = useState(2532);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number}[]>([]);
  const pointsToAdd = 12;
  const energyToReduce = 12;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { 
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy- energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y,}]);
  };

  const handlAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(clicks => clicks.id !== id));
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 5000));
    },100); //Restore 10 energy points every scond

    return () => clearInterval(interval); // clear interval on component unmount
  },[]);


  return (
    <div className="big-gradient-main-h-screen px-4 flex flex-col item-center text-white font-medium">
    
      <div className="absolute inset-0 h-1/2 big-gradient-overly z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">

        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-x1">
              <p className="text-lg">Join squad<Arrow size={18} className="ml
              -0 mb-1 inline-block" /></p>
              </div>
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <img src={coin} width={44} height={44} />
            <span className="m1-2">{points.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
            <img src={trophy} width={24} height={24} />
            <span className="ml-1">Gold <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
            <div className="flex items-center justify-center">
              <img src={highVoltage} width={44} height={44} alt="High voltage" />
              <div className="ml-2 text-left">
                <span className="text-white text-2xl font-bold block">{energy}</span>
                <span className="text-white text-large opticity-75">/ 5000</span>
              </div>
            </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-[#ffc284] py-4 rounded-2xl flex justify-arround">
                <button className="flex flex-col items-center gap-1">
                  <img src={rocket} width={24} height={24} alt="High voltage" />
                  <span>Frens</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1">
                  <img src={coin} width={24} height={24} alt="High voltage" />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1">
                  <img src={rocket} width={24} height={24} alt="High voltage" />
                  <span>Boosts</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f9c035] rounded-full mt-4">
          const energy = 1000; // Define the energy variable

            <div className="h-4 bg-[#ffc284] rounded-full" style={{ width: `${(energy / 5000) * 100}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App

