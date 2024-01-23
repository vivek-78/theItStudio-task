import React from "react";
import SendData from "./SendData";
import DeleteRows from "./DeleteRows";

const TableActionButtons = (props) => {
  const { userIds, onClick } = props;
  return (
    <div className="flex flex-row gap-2">
      <SendData userIds={userIds} onClick={onClick}/>
      <DeleteRows userIds={userIds} onClick={onClick}/>
    </div>
  );
};

export default TableActionButtons;
