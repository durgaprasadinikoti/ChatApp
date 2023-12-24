import AuthNavigation from "./routing";
import { useAuthContext } from './store/AuthProvider';
import AppRouting from "./app-routing";

const IndexPage = () => {
    const { authKey } = useAuthContext();

    //this is happened after loggedIN

    if(authKey !== '') {
        return <AppRouting />
    }

      //this is happened before loggedIN
    return (
        <AuthNavigation />
    )
}

export default IndexPage;
