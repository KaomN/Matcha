import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import { ActiveChatProvider } from './context/ActiveChatContext';
import { LoadingSpinnerPromise } from './components/LoadingSpinnerPromise';
import {SocketContext, socket} from './context/SocketContext';
import { disableReactDevTools } from './components/disable-react-devtools/disableReactDevtools'

disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<UserProvider>
		<ActiveChatProvider>
		<SocketContext.Provider value={socket}>
			<App />
			<LoadingSpinnerPromise />
		</SocketContext.Provider>
		</ActiveChatProvider>
		</UserProvider>
	</Router>
);