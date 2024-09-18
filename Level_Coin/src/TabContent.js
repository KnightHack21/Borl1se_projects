import React from "react";
import "./styles/TabContent.css";

export default function TabContent({ children, tabid }){
    return (
        <div className="tabcontent" id={tabid}>
            {children}
        </div>
    );
};