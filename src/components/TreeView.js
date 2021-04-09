// From Material UI: https://material-ui.com/components/tree-view/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
    overflowX: "auto",
    overflowY: "auto",
    padding: 13,
  },
});

function RecursiveTreeView({ data }) {
  const classes = useStyles();

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={
        <div style={ { display: 'flex', justifyContent: 'space-between' } }>
          <span>{nodes.name}</span>
          <input type="checkbox"></input>
        </div>
      }
    >
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<i className="fas fa-chevron-down"></i>}
      defaultExpanded={['root']}
      defaultExpandIcon={<i className="fas fa-chevron-right"></i>}
    >
      {renderTree(data)}
    </TreeView>
  );
}

export { RecursiveTreeView };
