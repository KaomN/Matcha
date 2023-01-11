import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import { LoadingSpinnerPromise } from './components/LoadingSpinnerPromise';
import {SocketContext, socket} from './context/SocketContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<UserProvider>
		<SocketContext.Provider value={socket}>
			<App />
			<LoadingSpinnerPromise />
		</SocketContext.Provider>
		</UserProvider>
	</Router>
);