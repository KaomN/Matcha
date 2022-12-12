import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
//import { UserProvider } from './components/UserContext';
import { LoadingSpinnerPromise } from './components/LoadingSpinnerPromise';
import {SocketContext, socket} from './context/socket';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		{/* <UserProvider> */}
		<SocketContext.Provider value={socket}>
			<App />
			<LoadingSpinnerPromise />
		</SocketContext.Provider>
		{/* </UserProvider> */}
	</Router>
);