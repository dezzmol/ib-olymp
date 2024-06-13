import { FC, ReactNode } from "react"

interface IModal {
    children: ReactNode,
    visible: boolean,
    setVisible: (visible: boolean) => void
}

const Modal: FC<IModal> = ({children, visible, setVisible}) => {
    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 ${!visible && "hidden"} bg-my-modal-bg ${visible && "flex justify-center items-center"}`} onClick={() => setVisible(false)}>
            <div className="p-[25px] bg-my-white rounded-[16px] min-w-[350px]" onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;