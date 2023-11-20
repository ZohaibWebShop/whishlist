import { useState, useCallback } from 'react';

let SelectionType;
(function (SelectionType) {
  SelectionType["All"] = "all";
  SelectionType["Page"] = "page";
  SelectionType["Multi"] = "multi";
  SelectionType["Single"] = "single";
})(SelectionType || (SelectionType = {}));
function defaultResourceIDResolver(resource) {
  if ('id' in resource) {
    return resource.id;
  }
  throw new Error('Your resource does not directly contain an `id`. Pass a `resourceIDResolver` to `useIndexResourceState`');
}
function useIndexResourceState(resources, {
  selectedResources: initSelectedResources = [],
  allResourcesSelected: initAllResourcesSelected = false,
  resourceIDResolver = defaultResourceIDResolver,
  resourceFilter = undefined
} = {
  selectedResources: [],
  allResourcesSelected: false,
  resourceIDResolver: defaultResourceIDResolver,
  resourceFilter: undefined
}) {
  const [selectedResources, setSelectedResources] = useState(initSelectedResources);
  const [allResourcesSelected, setAllResourcesSelected] = useState(initAllResourcesSelected);
  const handleSelectionChange = useCallback((selectionType, isSelecting, selection) => {
    if (selectionType === SelectionType.All) {
      setAllResourcesSelected(isSelecting);
    } else if (allResourcesSelected) {
      setAllResourcesSelected(false);
    }
    switch (selectionType) {
      case SelectionType.Single:
        setSelectedResources(newSelectedResources => isSelecting ? [...newSelectedResources, selection] : newSelectedResources.filter(id => id !== selection));
        break;
      case SelectionType.All:
      case SelectionType.Page:
        if (resourceFilter) {
          const filteredResources = resources.filter(resourceFilter);
          setSelectedResources(isSelecting && selectedResources.length < filteredResources.length ? filteredResources.map(resourceIDResolver) : []);
        } else {
          setSelectedResources(isSelecting ? resources.map(resourceIDResolver) : []);
        }
        break;
      case SelectionType.Multi:
        if (!selection) break;
        setSelectedResources(newSelectedResources => {
          const ids = [];
          const filteredResources = resourceFilter ? resources.filter(resourceFilter) : resources;
          for (let i = selection[0]; i <= selection[1]; i++) {
            if (filteredResources.includes(resources[i])) {
              const id = resourceIDResolver(resources[i]);
              if (isSelecting && !newSelectedResources.includes(id) || !isSelecting && newSelectedResources.includes(id)) {
                ids.push(id);
              }
            }
          }
          return isSelecting ? [...newSelectedResources, ...ids] : newSelectedResources.filter(id => !ids.includes(id));
        });
        break;
    }
  }, [allResourcesSelected, resourceFilter, selectedResources.length, resources, resourceIDResolver]);
  const clearSelection = useCallback(() => {
    setSelectedResources([]);
    setAllResourcesSelected(false);
  }, []);
  const removeSelectedResources = useCallback(removeResources => {
    const selectedResourcesCopy = [...selectedResources];
    const newSelectedResources = selectedResourcesCopy.filter(resource => !removeResources.includes(resource));
    setSelectedResources(newSelectedResources);
    if (newSelectedResources.length === 0) {
      setAllResourcesSelected(false);
    }
  }, [selectedResources]);
  return {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
    removeSelectedResources
  };
}

export { SelectionType, useIndexResourceState };
