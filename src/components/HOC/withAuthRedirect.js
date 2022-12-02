import React from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";



export const withAuthRedirect = (Component) => {
    let mapStateToPropsForRedirect = (state) => ({
        isAuth: state.auth.isAuth
    })

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to='/login' /> 
            return <Component {...this.props}/>
        }
    }
    let connectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return connectedAuthRedirectComponent;
}

export function withRouter(Component) {
    let mapStateToPropsForRedirect = (state) => ({
        profile: state.profilePage.profile
    })

    function ComponentWithRouterProp(props) {
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ params }}
            />
        );
    }
    let connectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(ComponentWithRouterProp);

    return connectedAuthRedirectComponent;
}



