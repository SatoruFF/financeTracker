import { Button } from "antd";
import cn from "classnames"
import styles from "../../styles/navbar.module.scss"
import useAuthStore from "../../store/useAuthStore";

const NavBar = () => {
    const userLogout = useAuthStore(state => state.logout)

    const logout = () => {
        userLogout()
        localStorage.removeItem("token")
    }

    return ( <div className={cn(styles.navBarContainer)}>
        <Button className={cn(styles.logout)} onClick={() => logout()}>Выйти</Button>
    </div> );
}
 
export default NavBar;