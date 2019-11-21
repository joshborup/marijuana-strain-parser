import React from "react";
export default (function() {
  return {
    cleanData: data => {
      const fixedData = [];
      for (let key in data) {
        data[key].name = key;
        fixedData.push(data[key]);
      }
      return fixedData;
    },
    background: race => {
      switch (race) {
        case "hybrid":
          return "#00da0088";
        case "sativa":
          return "#fffb0488";
        case "indica":
          return "#8300da7a";
        default:
          return "grey";
      }
    },
    effects: effects => {
      return effects.map(effect => {
        return (
          <div key={effect} className="effect">
            {effect}
          </div>
        );
      });
    }
  };
})();
