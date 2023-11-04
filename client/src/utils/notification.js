import { Store } from "react-notifications-component";

export const notification = {
    title: "Success",
    message: "successfull",
    autoClose: 3000,
    type: "success",
    insert: "top",
    container: "top-right",
    dismiss: {
        duration: 3000,
    },
    animationIn: ["animate__animated animate__flipInX"],
    animationOut: ["animate__animated animate__flipInX"],
};

const notify = ({...props}) => {
    Store.addNotification({
        ...notification,
        ...props
    });
}

export default notify