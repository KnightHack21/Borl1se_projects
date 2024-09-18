import React from "react";

export default React.memo(function Tabs(props){
    return (
        <div className="StoreTabs Tabs">
            <div className="TabsBox">
                <button className="tablink" onClick={props.openTab} name={"Console"} >Консоль</button>
                <button className="tablink" onClick={props.openTab} name={"Games"}>Игры</button>
                <button className="tablink" onClick={props.openTab} name={"Collections"}>Коллекционки</button>
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    if (nextProps === prevProps){
        return false;
    }
    return true;
}
);