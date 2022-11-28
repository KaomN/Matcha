import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from './components/UserContext';
import { LoadingSpinnerPromise } from './components/LoadingSpinnerPromise';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<UserProvider>
			<App />
			<LoadingSpinnerPromise />
		</UserProvider>
	</Router>
);