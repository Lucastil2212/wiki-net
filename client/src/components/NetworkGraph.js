import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone/esm/vis-network.js";
import { DataSet } from "vis-data";

export default function NetworkGraph({
  edgeData,
  nodeData,
  currentWikiPage,
  setCurrentWikiPage,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const nodes = nodeData;
    const edges = edgeData;

    const container = containerRef.current;
    const options = {
      width: "100%",
      height: "500px",
    };
    const network = new Network(container, { nodes, edges }, options);

    return () => {
      network.destroy();
    };
  }, [edgeData, nodeData, currentWikiPage, setCurrentWikiPage]);

  return <div ref={containerRef} />;
}
