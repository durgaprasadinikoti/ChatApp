import AuthNavigation from "./routing";
import { useAuthContext } from './store/AuthProvider';
import AppRouting from "./app-routing";

const IndexPage = () => {
    const { authKey } = useAuthContext();

    if(authKey !== '') {
        return <AppRouting />
    }

    return (
        <AuthNavigation />
    )
}

export default IndexPage;