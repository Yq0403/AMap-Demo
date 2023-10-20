import React from "react";

interface InfoBoxProps {
  thermalValue: number;
}

const InfoBox = (props: InfoBoxProps) => {
  const { thermalValue } = props;
  return (
    <div style={{ background: "white" }}>
      <span>测试：</span>
      <span>该区域热力值：{thermalValue}</span>
    </div>
  );
};

export default InfoBox;
