import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone/esm/vis-network.js";
import { DataSet } from "vis-data";

export default function NetworkGraph({
  edgeData,
  nodeData,
  currentWikiPage,
  setCurrentWikiPage,
  nodeIndex,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // create an array with nodes
    var nodes = new DataSet(nodeData.current);

    // create an array with edges
    var edges = new DataSet(edgeData.current);

    const container = containerRef.current;
    const options = {
      width: "100%",
      height: "500px",
    };
    const network = new Network(container, { nodes, edges }, options);

    network.on("click", (params) => {
      var clickedNodeId = params.nodes[0];
      var clickedNode = nodes.get(clickedNodeId);

      if (!clickedNode) return;

      setCurrentWikiPage(clickedNode.label);
      nodeIndex.current = clickedNode.id;
    });
    return () => {
      network.destroy();
    };
  }, [edgeData, nodeData, currentWikiPage, setCurrentWikiPage, nodeIndex]);

  return <div ref={containerRef} />;
}
