import React, { Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import Settings from './components/SettingsTab/Settings';
import Music from './components/Music/Music';
import News from './components/News/News';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp();
	}

	render() {
		if (!this.props.unitialized) return <Preloader />

		return (
			<div className='app-wrapper'>
				<HeaderContainer />
				<Navbar />
				<div className='app-wrapper-content'>
					<Suspense fallback={<div>Загрузка...</div>}>
						<Routes>
							<Route path="/profile" element={<ProfileContainer />}>
								<Route path=":userId"
									element={<ProfileContainer />} />
							</Route>
							<Route path='/dialogs/*' element={<DialogsContainer />} />
							<Route path='/news' element={<News />} />
							<Route path='/music' element={<Music />} />
							<Route path='/settings' element={<Settings />} />
							<Route path='/users' element={<UsersContainer />} />
							<Route path='/login' element={<Login />} />
						</Routes>
					</Suspense>
				</div>
			</div>
		);
	}
}


let mapStateToProps = (state) => {
	return {
		unitialized: state.app.unitialized
	}
}

let AppContainer = compose(
	connect(mapStateToProps, { initializeApp }),
)(App)

const AppWithProvider = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</BrowserRouter>
	)
}

export default AppWithProvider