import {useAuth0} from "@auth0/auth0-react";
import config from "../auth_config.json";

const useToken = () => {
    const {getAccessTokenSilently} = useAuth0();

    return async () => {
        try {
            return await getAccessTokenSilently({
                audience: config.audience
            })
        } catch (e) {
            console.log(e);
        }
    };
}

export default useToken;