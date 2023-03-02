import { ParallaxBanner } from 'react-scroll-parallax';
import Soldier from '../assets/Aiming.png';
import backGround from '../assets/backGround.jpg';

import './App.scss';
function App() {
	return (
		<>
			<ParallaxBanner
				layers={[
					{
						image: backGround,
						speed: -100,
					},
					{
						image: Soldier,
						speed: -50,
					},
				]}
				className='aspect-[2/1]'
				id='greeting'
			>
				<div className='id'>123</div>
				{/* <img src={backGround} alt='backGround' />
			<h1>hi daddy</h1> */}
			</ParallaxBanner>
			<div className='id'>123</div>
		</>
	);
}

export default App;
